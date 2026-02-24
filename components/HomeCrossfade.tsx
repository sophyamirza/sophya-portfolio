"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeroScene from "@/components/HeroScene";
import HeroCopy from "@/components/HeroCopy";
import ScrollIndicator from "@/components/ScrollIndicator";
import PhilosophyTitle from "@/components/PhilosophyTitle";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

function HighlightCard({
  title,
  subtitle,
  tags,
  href,
}: {
  title: string;
  subtitle: string;
  tags: string;
  href: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.04]">
        <h3 className="mb-2 text-2xl text-white md:text-3xl">{title}</h3>
        <p className="mb-5 text-white/70">{subtitle}</p>
        <p className="text-[11px] tracking-[0.18em] text-white/50">{tags}</p>

        <div className="mt-6 text-xs tracking-[0.22em] uppercase text-white/55 transition-colors duration-300 group-hover:text-white/80">
          View project →
        </div>
      </div>
    </Link>
  );
}

export default function HomeCrossfade() {
  const heroRef = useRef<HTMLElement | null>(null);
  const philRef = useRef<HTMLElement | null>(null);

  const [t, setT] = useState(0);

  useEffect(() => {
    let raf: number | null = null;
    let smoothT = 0;

    const update = () => {
      raf = null;
      const hero = heroRef.current;
      const phil = philRef.current;
      if (!hero || !phil) return;

      const vh = window.innerHeight || 1;
      const heroTop = hero.offsetTop;
      const heroH = hero.offsetHeight;

      const start = heroTop + heroH - vh * 0.95;
      const end = heroTop + heroH - vh * 0.35;

      const raw = clamp((window.scrollY - start) / (end - start), 0, 1);
      smoothT += (raw - smoothT) * 0.14;
      setT(smoothT);
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const heroOpacity = 1 - t;
  const philOpacity = t;

  return (
    <div className="bg-black overflow-x-clip">
      {/* HERO */}
      <section
        ref={(n) => {
          heroRef.current = n;
        }}
        className="relative min-h-[92vh] w-full overflow-hidden bg-black"
        style={{
          opacity: heroOpacity,
          transform: `translate3d(0, ${Math.round(t * -12)}px, 0)`,
        }}
      >
        <HeroScene />

        <div className="relative z-10 w-full pl-12 pr-6">
          <div className="pt-16 md:pt-20">
            <HeroCopy />
          </div>
        </div>

        <div className="absolute bottom-14 right-14 z-10 text-right md:bottom-16 md:right-16">
          <div className="text-xs tracking-[0.35em] text-white/60">
            UC BERKELEY
          </div>
          <div className="mt-2 text-3xl italic leading-tight text-white/90 md:text-4xl">
            MECHANICAL ENGINEER
          </div>
        </div>

        <ScrollIndicator targetId="philosophy" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </section>

      {/* PHILOSOPHY */}
      <section
        id="philosophy"
        ref={(n) => {
          philRef.current = n;
        }}
        className="relative w-full bg-black"
        style={{
          opacity: philOpacity,
          transform: `translate3d(0, ${Math.round((1 - philOpacity) * 10)}px, 0)`,
        }}
      >
        <div className="mx-auto min-h-[92vh] max-w-6xl px-6 py-28">
          <div className="flex flex-col md:flex-row md:gap-12">
            <div className="max-w-3xl pt-20">
              <div className="text-xs tracking-[0.35em] text-white/50">
                PHILOSOPHY
              </div>

              <div className="mt-6">
                <PhilosophyTitle />
              </div>

              <div className="mt-10 h-px w-24 bg-gradient-to-r from-white/10 via-white/25 to-transparent" />

              <motion.ul
                className="mt-12 space-y-4 text-xl md:text-2xl leading-[1.6] text-white/80"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-80px" }}
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.12 } },
                }}
              >
                {[
                  "AMBIGUITY INTO CLEAR REQUIREMENTS",
                  "MOVE FAST FROM 1ST PRINCIPLES + HAND CALCS TO DESIGNS AND TRADES",
                  "PROTOYPE EARLY, TEST OFTEN, CLOSE LOOPS",
                ].map((text, i) => (
                  <motion.li
                    key={i}
                    className="flex items-start gap-3"
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <span className="mt-[2px] h-2 w-2 rounded-full bg-[rgba(255,59,31,0.55)] shadow-[0_0_18px_rgba(255,59,31,0.18)]" />
                    <span>{text}</span>
                  </motion.li>
                ))}
              </motion.ul>

              <div className="pointer-events-none mt-10 h-10 w-full rounded-3xl bg-[radial-gradient(500px_60px_at_15%_40%,rgba(255,59,31,0.10),transparent_70%)]" />
            </div>

            <div className="mt-20 flex-1 md:mt-28">
              <p className="select-none pointer-events-none text-right text-3xl italic tracking-wide text-white/20 md:text-5xl">
                Turning science fiction into engineered systems.
              </p>
            </div>
          </div>
        </div>

        {/* PORTFOLIO */}
        <div className="mx-auto max-w-6xl px-6 pb-28">
          <div className="text-xs tracking-[0.35em] text-white/60">
            PORTFOLIO
          </div>

          <div className="mt-3 flex items-end justify-between gap-6">
            <h2 className="text-4xl tracking-wide text-white md:text-5xl">
              PROJECT HIGHLIGHTS
            </h2>

            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent via-white/15 to-[rgba(255,59,31,0.22)] md:block" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
            <HighlightCard
              title="ALULA"
              subtitle="Liquid Bi-Prop Engine"
              tags="PROPULSION · VALVES · FEED SYSTEM"
              href="/works/alula"
            />
            <HighlightCard
              title="KITTA"
              subtitle="DARPA Challenge ~ Drone Delivery Platform"
              tags="UAV · AUTONOMY"
              href="/works/kitta"
            />
            <HighlightCard
              title="RescueBot"
              subtitle="Quadruped Robot"
              tags="ROBOTICS · CONTROL"
              href="/works/rescuebot"
            />
            <HighlightCard
              title="XLDsl + SQUIDs"
              subtitle="Cryogenic Systems"
              tags="CRYOGENICS · INSTRUMENTATION"
              href="/works/bluefors-dr1-cryostat"
            />
          </div>

          <div className="mt-20 flex flex-col items-center gap-5">
            <p className="max-w-2xl text-center text-sm tracking-wide text-white/60">
              Projects spanning propulsion, robotics, autonomy, cryogenics, and
              product design.
            </p>

            <Link
              href="/works"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-10 py-3 text-xs tracking-[0.22em] uppercase text-white transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
            >
              View All Works →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}