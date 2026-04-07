"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  PORTFOLIO_KNOWLEDGE,
  type PortfolioKnowledgeEntry,
} from "@/lib/portfolioKnowledge";

const STOP_WORDS = new Set([
  "a",
  "an",
  "and",
  "any",
  "about",
  "are",
  "as",
  "at",
  "be",
  "for",
  "from",
  "how",
  "i",
  "in",
  "is",
  "it",
  "me",
  "my",
  "of",
  "on",
  "or",
  "the",
  "to",
  "what",
  "which",
  "with",
]);

const SYNONYMS: Record<string, string[]> = {
  battery: ["battery", "batteries", "cell", "cells", "4680", "thermal", "proterra"],
  cryogenic: ["cryo", "cryogenic", "lox", "liquid", "bluefors", "dunk", "helium"],
  propulsion: ["propulsion", "rocket", "engine", "valve", "feed", "rqd", "alula"],
  resume: ["resume", "experience", "background", "work", "roles", "internship", "career"],
  cad: ["cad", "solidworks", "catia", "nx", "fusion", "onshape", "pdm", "plm"],
  analysis: ["analysis", "simulation", "fea", "cfd", "ansys", "matlab", "python"],
  community: ["community", "leadership", "mentor", "mentorship", "outreach", "advocacy"],
  test: ["test", "testing", "validation", "qualification", "instrumentation", "daq"],
};

type IntentKey =
  | "projects"
  | "experience"
  | "skills"
  | "leadership"
  | "awards"
  | "general";

type IntentRule = {
  key: IntentKey;
  triggerTokens: string[];
  preferredTypes: PortfolioKnowledgeEntry["type"][];
};

const INTENT_RULES: IntentRule[] = [
  {
    key: "experience",
    triggerTokens: ["resume", "experience", "intern", "internship", "career", "work", "roles"],
    preferredTypes: ["experience", "project"],
  },
  {
    key: "skills",
    triggerTokens: ["skills", "toolkit", "cad", "cfd", "fea", "analysis", "machining", "sim"],
    preferredTypes: ["skills", "project"],
  },
  {
    key: "leadership",
    triggerTokens: ["leadership", "lead", "mentor", "mentorship", "community", "advocacy", "founder"],
    preferredTypes: ["community", "experience", "project"],
  },
  {
    key: "awards",
    triggerTokens: ["award", "awards", "honor", "honors", "scholar", "recognition"],
    preferredTypes: ["awards", "experience"],
  },
  {
    key: "projects",
    triggerTokens: ["project", "projects", "example", "examples", "built", "build"],
    preferredTypes: ["project", "skills"],
  },
];

type SearchResult = {
  answer: string;
  matches: PortfolioKnowledgeEntry[];
  intent: IntentKey;
};

function tokenize(input: string) {
  return input
    .toLowerCase()
    .split(/[^a-z0-9+#]+/i)
    .map((token) => token.trim())
    .filter((token) => token && !STOP_WORDS.has(token));
}

function expandTokens(tokens: string[]) {
  const expanded = new Set(tokens);

  for (const token of tokens) {
    if (SYNONYMS[token]) {
      for (const synonym of SYNONYMS[token]) expanded.add(synonym);
    }

    for (const [base, values] of Object.entries(SYNONYMS)) {
      if (values.includes(token)) expanded.add(base);
    }
  }

  return [...expanded];
}

function detectIntent(tokens: string[]): IntentKey {
  let winner: IntentKey = "general";
  let best = 0;

  for (const rule of INTENT_RULES) {
    const hits = rule.triggerTokens.reduce(
      (count, token) => count + (tokens.includes(token) ? 1 : 0),
      0
    );
    if (hits > best) {
      best = hits;
      winner = rule.key;
    }
  }

  return winner;
}

function sentenceCase(text: string) {
  const cleaned = text.replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  return cleaned[0].toUpperCase() + cleaned.slice(1);
}

function cleanDetailLine(line: string) {
  const cleaned = line.replace(/[{}]/g, "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "";
  if (cleaned.toLowerCase().includes("insert")) return "";
  return sentenceCase(cleaned);
}

function trimSentence(text: string, maxLength = 170) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}...`;
}

function topEvidenceLine(entry: PortfolioKnowledgeEntry, tokens: string[]) {
  const cleanedDetails = entry.details.map(cleanDetailLine).filter(Boolean);
  if (cleanedDetails.length === 0) return "";

  const sorted = cleanedDetails
    .map((line) => {
      const normalized = line.toLowerCase();
      const overlap = tokens.reduce(
        (count, token) => count + (normalized.includes(token) ? 1 : 0),
        0
      );
      return { line, overlap };
    })
    .sort((a, b) => b.overlap - a.overlap);

  return sorted[0].line;
}

function scoreEntry(entry: PortfolioKnowledgeEntry, tokens: string[], intent: IntentKey) {
  const title = entry.title.toLowerCase();
  const summary = entry.summary.toLowerCase();
  const keywords = new Set(entry.keywords.map((keyword) => keyword.toLowerCase()));
  const detailBlob = entry.details.join(" ").toLowerCase();
  const intentRule = INTENT_RULES.find((rule) => rule.key === intent);

  let score = 0;

  for (const token of tokens) {
    if (keywords.has(token)) score += 10;
    if (title.includes(token)) score += 8;
    if (summary.includes(token)) score += 5;
    if (detailBlob.includes(token)) score += 3;
  }

  if (intentRule?.preferredTypes.includes(entry.type)) score += 14;
  if (entry.type === "project") score += 3;

  return score;
}

function uniqueById(items: PortfolioKnowledgeEntry[]) {
  const seen = new Set<string>();
  return items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

function summarizeProject(entry: PortfolioKnowledgeEntry, tokens: string[]) {
  const projectType = entry.projectType ? entry.projectType.toLowerCase() : "engineering work";
  const timing = entry.yearLabel ? ` (${entry.yearLabel})` : "";
  const tags = entry.tags?.slice(0, 2).join(" and ");
  const details = tags ? ` with emphasis on ${tags}` : "";
  const evidence = topEvidenceLine(entry, tokens);

  if (evidence) {
    return `${entry.title}${timing} is ${projectType}${details}; ${trimSentence(
      evidence.toLowerCase(),
      110
    )}`;
  }

  return `${entry.title}${timing} is ${projectType}${details}.`;
}

function skillSummary(matches: PortfolioKnowledgeEntry[]) {
  const projectMatches = matches.filter((item) => item.type === "project").slice(0, 2);
  const toolHints = new Set<string>();

  for (const entry of matches) {
    for (const token of entry.keywords) {
      if (
        [
          "solidworks",
          "catia",
          "nx",
          "ansys",
          "matlab",
          "python",
          "labview",
          "cfd",
          "fea",
        ].includes(token)
      ) {
        toolHints.add(token.toUpperCase());
      }
    }
  }

  const tools = [...toolHints].slice(0, 4).join(", ");
  const projectPhrase =
    projectMatches.length > 0
      ? ` This shows up in ${projectMatches.map((p) => p.title).join(" and ")}.`
      : "";
  const toolingPhrase = tools ? ` Core tools include ${tools}.` : "";

  return `Sophya's portfolio points to hands-on strength across CAD, analysis, and hardware test workflows.${toolingPhrase}${projectPhrase}`;
}

function experienceSummary(matches: PortfolioKnowledgeEntry[], tokens: string[]) {
  const firstProject = matches.find((entry) => entry.type === "project");
  const evidence = firstProject ? topEvidenceLine(firstProject, tokens) : "";

  if (firstProject && evidence) {
    return `Her experience blends industry roles with build ownership, and ${firstProject.title} is a strong example of that pattern. ${trimSentence(
      evidence,
      120
    )}`;
  }

  return "Her experience spans propulsion, structures, cryogenics, and test engineering, with repeated ownership from design through validation in both industry and research environments.";
}

function projectSummary(matches: PortfolioKnowledgeEntry[], tokens: string[]) {
  const projects = matches.filter((entry) => entry.type === "project").slice(0, 2);
  if (projects.length === 0) {
    return "The portfolio highlights project work across propulsion, analysis, instrumentation, and robotics, with references below for concrete examples.";
  }

  if (projects.length === 1) return summarizeProject(projects[0], tokens);

  return `${summarizeProject(projects[0], tokens)} ${trimSentence(
    `${projects[1].title} complements it with related work in ${
      projects[1].projectType ? projects[1].projectType.toLowerCase() : "adjacent systems"
    }.`,
    100
  )}`;
}

function buildAnswer(
  query: string,
  matches: PortfolioKnowledgeEntry[],
  intent: IntentKey,
  tokens: string[]
) {
  if (!query.trim()) {
    return "Ask about Sophya's projects, experience, skills, leadership, or awards and I will synthesize a concise answer from the portfolio.";
  }

  if (matches.length === 0) {
    return "I could not find a reliable match for that question in the current portfolio data, but a narrower prompt about a role, skill, or project should produce a stronger answer with references.";
  }

  if (intent === "skills") return skillSummary(matches);
  if (intent === "experience") return experienceSummary(matches, tokens);
  if (intent === "projects") return projectSummary(matches, tokens);
  if (intent === "leadership") {
    const leadershipProject = matches.find((entry) => entry.type === "project");
    return leadershipProject
      ? `Leadership appears as technical ownership and team momentum: Sophya repeatedly takes systems from concept through test, and ${leadershipProject.title} is one concrete example. References below point to direct evidence.`
      : "Leadership in this portfolio is framed as technical ownership, mentorship, and community building across engineering teams.";
  }
  if (intent === "awards") {
    return "Recognition on the site emphasizes engineering rigor and leadership, including major scholarship and space-focused honors that align with Sophya's propulsion and hardware work.";
  }

  return projectSummary(matches, tokens);
}

function searchPortfolio(query: string): SearchResult {
  const expanded = expandTokens(tokenize(query));
  const intent = detectIntent(expanded);

  const ranked = PORTFOLIO_KNOWLEDGE.map((entry) => ({
    entry,
    score: scoreEntry(entry, expanded, intent),
  }))
    .filter(({ score }) => score >= 10)
    .sort((a, b) => b.score - a.score)
    .slice(0, 7)
    .map(({ entry }) => entry);

  const deduped = uniqueById(ranked).slice(0, 4);

  return {
    answer: buildAnswer(query, deduped, intent, expanded),
    matches: deduped,
    intent,
  };
}

const starterPrompts = [
  "What propulsion systems has Sophya worked on?",
  "What CAD software is Sophya fluent in?",
  "Which projects show cryogenic experience?",
  "Show me examples of Sophya's experience with batteries.",
  "Can she do FEA or CFD analysis?",
  "What are examples of Sophya's leadership experience?",
];

export default function TldrPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const result = useMemo(() => searchPortfolio(submittedQuery), [submittedQuery]);
  const references = useMemo(() => {
    const seen = new Set<string>();

    return result.matches.flatMap((match) =>
      match.references.flatMap((reference) => {
        const key = `${reference.href}::${reference.label}`;
        if (seen.has(key)) return [];
        seen.add(key);

        return [{ matchTitle: match.title, ...reference }];
      })
    );
  }, [result.matches]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_20%,rgba(255,255,255,0.08),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(700px_420px_at_20%_70%,rgba(0,179,255,0.08),transparent_58%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(760px_420px_at_80%_78%,rgba(255,89,31,0.10),transparent_62%)]" />

      <section className="relative mx-auto flex min-h-[calc(100vh-76px)] w-full max-w-5xl items-center justify-center px-6 py-12">
        <div className="w-full max-w-3xl">
          <div className="rounded-[30px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_0_50px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8">
            <div className="mx-auto max-w-2xl text-center">
              <div className="text-[11px] tracking-[0.35em] text-white/45">TLDR</div>
              <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">Ask About Sophya</h1>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                Search the portfolio for concise answers about projects, experience, skills,
                resume highlights, and examples across the site.
              </p>
            </div>

            <form
              className="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmittedQuery(query);
              }}
            >
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Ask anything about Sophya's portfolio..."
                className="h-14 flex-1 rounded-full border border-white/12 bg-black/50 px-6 text-white outline-none transition-all duration-300 placeholder:text-white/35 focus:border-white/30 focus:bg-black/70"
              />
              <button
                type="submit"
                className="h-14 rounded-full border border-white/15 bg-white/[0.06] px-7 text-sm tracking-[0.2em] text-white/90 transition-all duration-300 hover:border-white/30 hover:bg-white/[0.12]"
              >
                SEARCH
              </button>
            </form>

            {!submittedQuery ? (
              <div className="mt-8 flex flex-wrap justify-center gap-2.5">
                {starterPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => {
                      setQuery(prompt);
                      setSubmittedQuery(prompt);
                    }}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/70 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            ) : (
              <div className="mx-auto mt-8 max-w-2xl">
                <div className="rounded-[24px] border border-white/10 bg-black/40 p-5">
                  <div className="text-[11px] tracking-[0.28em] text-white/45">RESPONSE</div>
                  <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
                    {result.answer}
                  </p>
                </div>

                {references.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[11px] tracking-[0.28em] text-white/45">REFERENCES</div>
                    <div className="mt-3 flex flex-wrap gap-3">
                      {references.map((reference) => (
                        <Link
                          key={`${reference.href}-${reference.label}`}
                          href={reference.href}
                          className="group rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/78 transition-all duration-300 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
                        >
                          <span className="block text-[10px] tracking-[0.24em] text-white/40">
                            {reference.matchTitle.toUpperCase()}
                          </span>
                          <span className="mt-1 block">{reference.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
