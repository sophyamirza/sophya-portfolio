"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PORTFOLIO_KNOWLEDGE, type PortfolioKnowledgeEntry } from "@/lib/portfolioKnowledge";

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
  battery: ["battery", "batteries", "cell", "4680", "thermal", "proterra"],
  cryogenic: ["cryo", "cryogenic", "lox", "liquid", "bluefors", "dunk", "helium"],
  propulsion: ["propulsion", "rocket", "engine", "valve", "feed", "rqd", "astranis", "alula"],
  resume: ["resume", "experience", "background", "work", "roles"],
  cad: ["solidworks", "catia", "nx", "fusion", "onshape", "PDM", "PLM"],
  analysis: ["analysis", "", "fea", "cfd", "ansys", "matlab", "python"],
  community: ["community", "leadership", "mentor", "mentorship", "outreach", "advocacy"],
};

type SearchResult = {
  answer: string;
  matches: PortfolioKnowledgeEntry[];
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

function scoreEntry(entry: PortfolioKnowledgeEntry, tokens: string[]) {
  const title = entry.title.toLowerCase();
  const summary = entry.summary.toLowerCase();
  const keywords = new Set(entry.keywords.map((keyword) => keyword.toLowerCase()));
  const detailBlob = entry.details.join(" ").toLowerCase();

  let score = 0;

  for (const token of tokens) {
    if (keywords.has(token)) score += 10;
    if (title.includes(token)) score += 7;
    if (summary.includes(token)) score += 5;
    if (detailBlob.includes(token)) score += 3;
  }

  return score;
}

function trimSentence(text: string, maxLength = 190) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trimEnd()}…`;
}

function buildAnswer(query: string, matches: PortfolioKnowledgeEntry[]) {
  if (!query.trim()) {
    return "Ask about Sophya’s experience, projects, skills, awards, or resume highlights and I’ll point you to the strongest matches on the site.";
  }

  if (matches.length === 0) {
    return "I couldn’t find a strong match for that in the current portfolio content, but I can help with projects, experience, skills, awards, or bio details if you try a more specific prompt.";
  }

  const [first, second, third] = matches;

  if (!second) {
    return `${first.title} is the clearest match: ${trimSentence(first.summary, 170)} See the references below for examples and more detail.`;
  }

  if (first.type === "project") {
    return `${first.title} is the strongest match, and ${second.title} is a closely related example. Together they highlight ${trimSentence(`${first.summary} ${second.summary}`, 170)}`;
  }

  const titles = [first.title, second.title, third?.title].filter(Boolean).join(", ");
  return `${trimSentence(first.summary, 160)} Strong matching sections include ${titles}. Use the references below to jump into examples on the site.`;
}

function searchPortfolio(query: string): SearchResult {
  const expanded = expandTokens(tokenize(query));

  const ranked = PORTFOLIO_KNOWLEDGE.map((entry) => ({
    entry,
    score: scoreEntry(entry, expanded),
  }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .map(({ entry }) => entry);

  return {
    answer: buildAnswer(query, ranked.slice(0, 3)),
    matches: ranked.slice(0, 3),
  };
}

const starterPrompts = [
  "What propulsion systems has she worked on?",
  "What CAD sotware is Sophya fluent in?",
  "Which projects show cryogenic experience?",
  "Show me examples of Sophya's experience with batteries?",
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
              <h1 className="mt-4 text-4xl tracking-tight sm:text-5xl">
                Ask About Sophya
              </h1>
              <p className="mt-4 text-sm leading-relaxed text-white/60 sm:text-base">
                Search the portfolio for concise answers about projects, experience,
                skills, resume highlights, and examples across the site.
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
                placeholder="Ask anything about Sophya’s portfolio..."
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
                  <div className="text-[11px] tracking-[0.28em] text-white/45">
                    RESPONSE
                  </div>
                  <p className="mt-3 text-base leading-relaxed text-white/85 sm:text-lg">
                    {result.answer}
                  </p>
                </div>

                {references.length > 0 && (
                  <div className="mt-5">
                    <div className="text-[11px] tracking-[0.28em] text-white/45">
                      REFERENCES
                    </div>
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
