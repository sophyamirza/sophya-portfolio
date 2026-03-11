"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroScene from "@/components/HeroScene";
import HeroCopy from "@/components/HeroCopy";
import ScrollIndicator from "@/components/ScrollIndicator";

const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

function HighlightCard({
  title,
  subtitle,
  tags,
  href,
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  tags: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <Link href={href} className="group block">
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-8 md:p-10 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.04]">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <h3 className="mb-2 text-2xl text-white md:text-3xl">{title}</h3>
            <p className="mb-5 text-white/70">{subtitle}</p>
            <p className="text-[11px] tracking-[0.18em] text-white/50">{tags}</p>
          </div>

          <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:h-32 md:w-32">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="mt-6 text-xs tracking-[0.22em] uppercase text-white/55 transition-colors duration-300 group-hover:text-white/80">
          View project →
        </div>
      </div>
    </Link>
  );
}

function PhotoCollage() {
  const images = [
    {
      src: "/images/collage/collage1.jpg",
      alt: "Portfolio collage image 1",
      className: "col-span-12 row-span-2 md:col-span-5 md:row-span-2",
    },
    {
      src: "/images/collage/collage2.jpg",
      alt: "Portfolio collage image 2",
      className: "col-span-6 row-span-1 md:col-span-3 md:row-span-1",
    },
    {
      src: "/images/collage/collage3.jpg",
      alt: "Portfolio collage image 3",
      className: "col-span-6 row-span-1 md:col-span-4 md:row-span-1",
    },
    {
      src: "/images/collage/collage4.jpg",
      alt: "Portfolio collage image 4",
      className: "col-span-7 row-span-1 md:col-span-4 md:row-span-1",
    },
    {
      src: "/images/collage/collage5.jpg",
      alt: "Portfolio collage image 5",
      className: "col-span-5 row-span-1 md:col-span-3 md:row-span-1",
    },
    {
      src: "/images/collage/collage6.jpg",
      alt: "Portfolio collage image 6",
      className: "col-span-12 row-span-1 md:col-span-5 md:row-span-1",
    },
  ];

  return (
    <div className="mt-20">
      <div className="mb-6 text-xs tracking-[0.35em] text-white/50">
        BEYOND THE WORK
      </div>

      <div className="grid auto-rows-[140px] grid-cols-12 gap-4 md:auto-rows-[180px]">
        {images.map((image, i) => (
          <motion.div
            key={image.src}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: i * 0.06 }}
            className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] ${image.className}`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href="/bio"
          className="inline-flex items-center justify-center rounded-full border border-white/20 px-10 py-3 text-xs tracking-[0.22em] uppercase text-white transition-all duration-300 hover:border-[rgba(255,59,31,0.45)] hover:bg-[rgba(255,59,31,0.06)]"
        >
          Read Bio →
        </Link>
      </div>
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

        <div className="absolute bottom-14 right-14 z-10 text-right md:bottom-16 md:right-16">
          <div className="text-xs tracking-[0.35em] text-white/60">
            UC BERKELEY
          </div>
          <div className="mt-2 text-3xl italic leading-tight text-white/90 md:text-4xl">
            MECHANICAL ENGINEERING PORTFOLIO
          </div>
        </div>

        <ScrollIndicator targetId="philosophy" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </section>

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
            imageSrc="/projects/ALULA/cover.PNG"
            imageAlt="ALULA project preview"
          />
          <HighlightCard
            title="KITTA"
            subtitle="DARPA Challenge ~ Drone Delivery Platform"
            tags="UAV · AUTONOMY"
            href="/works/kitta"
            imageSrc="/projects/KITTA/KITTA.PNG"
            imageAlt="KITTA project preview"
          />
          <HighlightCard
            title="Blunt Body Analysis"
            subtitle="Supersonic Flow Over a Blunt Body"
            tags="ANALYSIS · SIMULATION · MESH REFINEMENT"
            href="/works/blunt-body-analysis"
            imageSrc="/projects/BLUNTBODY/blunt1.PNG"
            imageAlt="blunt body analysis project preview"
          />
          <HighlightCard
            title="XLDsl + SQUIDs"
            subtitle="Cryogenic Systems"
            tags="CRYOGENICS · INSTRUMENTATION"
            href="/works/bluefors-dr1-cryostat"
            imageSrc="/projects/BLUEFORS/instrument9.PNG"
            imageAlt="Cryogenic systems project preview"
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

        <PhotoCollage />
      </div>
    </div>
  );
}