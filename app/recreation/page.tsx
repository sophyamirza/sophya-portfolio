"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

export default function RecreationPage() {
  const THERMAL_GRADIENT =
    "linear-gradient(90deg,#3b82f6 0%,#06b6d4 18%,#22c55e 40%,#eab308 62%,#f97316 82%,#ef4444 100%)";

  function ImagePlaceholder({ label }: { label: string }) {
    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        <div className="absolute inset-0 bg-[radial-gradient(700px_300px_at_20%_20%,rgba(59,130,246,0.15),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm tracking-wide">
          {label}
        </div>
      </div>
    );
  }

  function ImageCarousel({
    images,
    altBase,
  }: {
    images: { src: string; alt?: string }[];
    altBase: string;
  }) {
    const [idx, setIdx] = useState(0);
    const count = images.length;

    const prev = () => setIdx((i) => (i - 1 + count) % count);
    const next = () => setIdx((i) => (i + 1) % count);

    const current = images[idx];

    return (
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border border-white/10 bg-white/[0.02]">
        {/* subtle background + vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(900px_420px_at_20%_20%,rgba(59,130,246,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent z-10" />

        {/* image */}
        <Image
          src={current.src}
          alt={current.alt ?? `${altBase} (${idx + 1}/${count})`}
          fill
          priority
          className="object-cover"
        />

        {/* controls */}
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-white/85 backdrop-blur hover:bg-black/55"
            >
              <span className="text-lg leading-none">‹</span>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 rounded-full border border-white/15 bg-black/40 px-3 py-2 text-white/85 backdrop-blur hover:bg-black/55"
            >
              <span className="text-lg leading-none">›</span>
            </button>

            {/* dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/35 px-3 py-2 backdrop-blur">
              {images.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2 w-2 rounded-full transition ${
                    i === idx ? "bg-white/90" : "bg-white/35 hover:bg-white/55"
                  }`}
                />
              ))}
            </div>

            {/* counter */}
            <div className="absolute top-3 right-3 z-20 rounded-full border border-white/10 bg-black/35 px-3 py-1.5 text-xs text-white/80 backdrop-blur">
              {idx + 1} / {count}
            </div>
          </>
        )}
      </div>
    );
  }

  // ✅ Images (paths match your /public/community/... folders)
  const sallysNightImages = useMemo(
    () => [
      {
        src: "/community/sallysnight/sallysnight-group.PNG",
        alt: "Sally’s Night group photo",
      },
      {
        src: "/community/sallysnight/sallysnight-panel.PNG",
        alt: "Sally’s Night panel photo",
      },
      {
        src: "/community/sallysnight/sallys-dti.PNG",
        alt: "Sally’s Night sponsorship / partnership",
      },
    ],
    []
  );

  const yurisNightImages = useMemo(
    () => [
      { src: "/community/yurisnight/yuris1.PNG", alt: "Yuri’s Night photo 1" },
      { src: "/community/yurisnight/yuris2.PNG", alt: "Yuri’s Night photo 2" },
    ],
    []
  );

  const frcImages = useMemo(
    () => [
      { src: "/community/frc/frc1.PNG", alt: "FIRST Robotics photo 1" },
      { src: "/community/frc/frc2.png", alt: "FIRST Robotics photo 2" }, // note lowercase .png
    ],
    []
  );

  const techriseImages = useMemo(
    () => [
      { src: "/community/techrise/techrise1.PNG", alt: "NASA TechRise photo 1" },
      { src: "/community/techrise/techrise2.PNG", alt: "NASA TechRise photo 2" },
    ],
    []
  );

  const tmgImages = useMemo(
    () => [{ src: "/community/tmg/tmg1.PNG", alt: "The Mars Generation photo" }],
    []
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 pt-20 pb-28">
        {/* TITLE */}
        <h1 className="text-5xl md:text-6xl tracking-tight">
          Community Building, Industry Engagement and Leadership
        </h1>

        {/* THERMAL UNDERLINE */}
        <div
          className="mt-6 h-px w-full opacity-90"
          style={{ background: THERMAL_GRADIENT }}
        />

        {/* INTRO */}
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-white/80">
          Outside of owning critical hardware systems, I actively facilitate
          discussion and build collaborative spaces where engineers, scientists,
          creatives, and visionaries come together to push ambitious technical
          ideas into real-world impact.
        </p>

        {/* ECOSYSTEM BUILDING */}
        <div className="mt-20">
          <h2 className="text-sm tracking-[0.35em] text-white/55">
            ECOSYSTEM BUILDING
          </h2>

          <div className="mt-10 grid gap-14">
            {/* Sally's Night */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ImageCarousel
                images={sallysNightImages}
                altBase="Sally’s Night event photos"
              />

              <div>
                <h3 className="text-2xl tracking-tight">Sally’s Night</h3>
                <div className="mt-1 text-white/60">
                  Co-host · Organizer · Moderator
                </div>

                <ul className="mt-5 space-y-2 text-white/80">
                  <li>
                    • Led a team of 4+ to organize El Segundo&apos;s SHH Sally&apos;s Night
                    International series
                  </li>
                  <li>
                    • Secured strategic sponsorships and partnerships with Disruptive
                    Technology Index, SpaceWERX, Morpheus Space and Astrolab,
                    supporting local growth and international expansion
                  </li>
                  <li>
                    • Curated and moderated Pioneering Pathways, a panel on building
                    bridges across space, business, and storytelling, convening
                    operators, founders, and creatives (100+ attendees, 32+ companies)
                  </li>
                </ul>
              </div>
            </div>

            {/* Yuri's Night */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ImageCarousel
                images={yurisNightImages}
                altBase="Yuri’s Night event photos"
              />

              <div>
                <h3 className="text-2xl tracking-tight">Yuri’s Night</h3>
                <div className="mt-1 text-white/60">
                  Organizer · Interactives Coordinator · Sponsorship
                </div>

                <ul className="mt-5 space-y-2 text-white/80">
                  <li>• Coordinating interactive technical exhibits and builder showcases</li>
                  <li>• Sponsorship outreach and partnerships development</li>
                  <li>• Supporting large scale aerospace community discussion</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* MENTORSHIP */}
        <div className="mt-24">
          <h2 className="text-sm tracking-[0.35em] text-white/55">
            MENTORSHIP & ADVOCACY
          </h2>

          <div className="mt-10 grid gap-10 md:grid-cols-3">
            <div>
              <ImageCarousel images={frcImages} altBase="FIRST Robotics images" />
              <h3 className="mt-4 text-xl">FIRST Robotics</h3>
              <p className="mt-2 text-white/70 text-sm">
                Mechanical design mentorship and systems integration guidance.
              </p>
            </div>

            <div>
              <ImageCarousel images={techriseImages} altBase="NASA TechRise images" />
              <h3 className="mt-4 text-xl">NASA TechRise</h3>
              <p className="mt-2 text-white/70 text-sm">
                Student payload advising and technical feasibility review.
              </p>
            </div>

            <div>
              <ImageCarousel
                images={tmgImages}
                altBase="The Mars Generation images"
              />
              <h3 className="mt-4 text-xl">The Mars Generation</h3>
              <p className="mt-2 text-white/70 text-sm">
                Ambassador supporting next-generation space advocacy and outreach,
                previous scholarship recipient.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}