"use client";

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
}: {
  title: string;
  subtitle: string;
  tags: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 hover:border-white/35 hover:bg-white/[0.04] transition-all duration-300">
      <h3 className="text-2xl md:text-3xl mb-2 text-white">{title}</h3>
      <p className="text-white/70 mb-5">{subtitle}</p>
      <p className="text-[11px] tracking-[0.18em] text-white/50">{tags}</p>
    </div>
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

        <div className="absolute z-10 bottom-14 right-14 text-right md:bottom-16 md:right-16">
          <div className="text-xs tracking-[0.35em] text-white/60">
            UC BERKELEY
          </div>
          <div className="mt-2 text-3xl md:text-4xl italic leading-tight text-white/90">
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
          transform: `translate3d(0, ${Math.round(
            (1 - philOpacity) * 10
          )}px, 0)`,
        }}
      >
        <div className="mx-auto max-w-6xl px-6 py-28 min-h-[92vh]">
          <div className="flex flex-col md:flex-row md:gap-12">
            <div className="max-w-3xl pt-10">
              <div className="text-xs tracking-[0.35em] text-white/60">
                PHILOSOPHY
              </div>

              <PhilosophyTitle />

              <p className="mt-14 text-lg md:text-xl leading-relaxed text-white/75">
  I take ambiguous problems and turn them into clear
  requirements and scope. I move fast from first principles
  hand calcs to trades and designs, prototyping early, and closing
  loops through test and iteration.
</p>


             
            </div>

            <div className="flex-1 mt-20 md:mt-28">
              <p className="text-right text-3xl md:text-5xl italic text-white/20 tracking-wide select-none pointer-events-none">
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
          <h2 className="mt-3 text-4xl md:text-5xl tracking-wide text-white">
            PROJECT HIGHLIGHTS
          </h2>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
            <HighlightCard
              title="ALULA"
              subtitle="Liquid Bi-Prop Engine"
              tags="PROPULSION · VALVES · FEED SYSTEM"
            />
            <HighlightCard
              title="KITTA"
              subtitle="Drone Delivery Platform"
              tags="UAV · AUTONOMY"
            />
            <HighlightCard
              title="RescueBot"
              subtitle="Quadruped Robot"
              tags="ROBOTICS · CONTROL"
            />
            <HighlightCard
              title="XLDsl + SQUIDs"
              subtitle="Cryogenic Systems"
              tags="CRYOGENICS · INSTRUMENTATION"
            />
          </div>

          <div className="mt-20 flex flex-col items-center gap-5">
            <p className="text-white/60 text-sm tracking-wide text-center max-w-2xl">
              Projects spanning propulsion, robotics, autonomy,
              cryogenics, and product design.
            </p>

            <Link
              href="/works"
              className="inline-flex items-center justify-center px-10 py-3 rounded-full border border-white/20 text-white text-xs tracking-[0.22em] uppercase hover:border-white/60 hover:bg-white/5 transition-all duration-300"
            >
              View All Works →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
