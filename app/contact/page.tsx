"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const cardIn = {
  hidden: { opacity: 0, y: 18, scale: 0.99 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease },
  },
};

function ContactCard({
  icon,
  label,
  href,
  display,
  hint,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  display: string;
  hint?: string;
}) {
  const isMail = href.startsWith("mailto:");
  const isExternal = !isMail;

  return (
    <motion.div variants={cardIn}>
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="
          group relative block rounded-2xl
          bg-white/[0.03] p-7 backdrop-blur-md
          transition-all duration-300
          hover:bg-white/[0.05]
        "
      >
        {/* subtle hover glow */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100
                        bg-[radial-gradient(700px_300px_at_30%_20%,rgba(57,255,20,0.12),transparent_55%)]" />

        <div className="relative flex items-start gap-5">
          
          {/* FLOATING ICON — NO BOX */}
          <div className="mt-1 text-[#39ff14] drop-shadow-[0_0_18px_rgba(57,255,20,0.35)]">
            {icon}
          </div>

          <div className="min-w-0">
            <div className="text-[11px] tracking-[0.22em] text-white/55">
              {label.toUpperCase()}
            </div>

            <div className="mt-2 text-base md:text-lg text-white/85 break-words">
              {display} <span className="text-white/45">→</span>
            </div>

            {hint && <div className="mt-2 text-sm text-white/55">{hint}</div>}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ContactPage() {
  const EMAIL = "sophyamirza@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/sophya-mirza-4947981b7/";
  const GITHUB = "https://github.com/Sophyamirza";
  const RESUME = "/S__MIRZA_Resume_LaTeX.pdf";


  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      
      {/* atmosphere layers */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(1200px_700px_at_50%_0%,rgba(255,255,255,0.05),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(900px_500px_at_40%_55%,rgba(57,255,20,0.06),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.9)_85%)]" />

      <section className="mx-auto max-w-6xl px-6 md:px-16 pt-20 pb-20">
        <motion.div variants={container} initial="hidden" animate="show">
          
          {/* TITLE */}
          <motion.h1
            variants={fadeUp}
            className="
              text-center leading-[0.9]
              text-6xl md:text-8xl
              font-['Playfair_Display']
              text-white
            "
          >
          
            <span className="block italic text-[#39ff14] drop-shadow-[0_0_35px_rgba(57,255,20,0.25)]">
         
            </span>
          </motion.h1>

          {/* GRID */}
          <motion.div
            variants={container}
            className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto"
          >
            <ContactCard
              icon={<Mail size={22} />}
              label="Email"
              href={`mailto:${EMAIL}`}
              display={EMAIL}
              hint="Fastest way to reach me."
            />

            <ContactCard
              icon={<Linkedin size={22} />}
              label="LinkedIn"
              href={LINKEDIN}
              display="linkedin.com/in/sophya-mirza-4947981b7"
              hint="Let's connect!"
            />

            <ContactCard
              icon={<Github size={22} />}
              label="GitHub"
              href={GITHUB}
              display="github.com/Sophyamirza"
              hint="Code + hardware projects."
            />

            <ContactCard
              icon={<FileText size={22} />}
              label="Resume"
              href={RESUME}
              display="View Resume"
              hint="Detailed experience."
            />
          </motion.div>

          {/* Footer line */}
          <motion.p
            variants={fadeUp}
            className="mt-20 text-center text-sm md:text-base text-white/60 max-w-2xl mx-auto"
          >
            Open to prop, mech, design engineering roles.
            Let’s build something ambitious.
          </motion.p>
        </motion.div>
      </section>
    </main>
  );
}
