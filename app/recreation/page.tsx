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
          Outside of owning critical hardware systems, I actively facilitate discussion
          and build collaborative spaces where engineers, scientists, creatives, and
          visionaries come together to push ambitious technical ideas into real-world
          impact.
        </p>

        {/* ECOSYSTEM BUILDING */}
        <div className="mt-20">
          <h2 className="text-sm tracking-[0.35em] text-white/55">
            ECOSYSTEM BUILDING
          </h2>

          <div className="mt-10 grid gap-14">
            {/* Sally's Night */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ImagePlaceholder label="{insert Sally’s Night images here}" />

              <div>
                <h3 className="text-2xl tracking-tight">Sally’s Night</h3>
                <div className="mt-1 text-white/60">
                  Co-host · Organizer · Moderator
                </div>

                <ul className="mt-5 space-y-2 text-white/80">
                  <li>• Co-led Space Happy Hour’s Sally’s Night aerospace networking platform</li>
                  <li>• Secured sponsorship for inaugural international expansion</li>
                  <li>• Curated and hosted Los Angeles event in El Segundo (100+ attendees)</li>
                </ul>
              </div>
            </div>

            {/* Yuri's Night */}
            <div className="grid md:grid-cols-2 gap-8 items-start">
              <ImagePlaceholder label="{insert Yuri’s Night images here}" />

              <div>
                <h3 className="text-2xl tracking-tight">Yuri’s Night</h3>
                <div className="mt-1 text-white/60">
                  Organizer · Interactives Coordinator · Sponsorship Lead
                </div>

                <ul className="mt-5 space-y-2 text-white/80">
                  <li>• Coordinated interactive technical exhibits and builder showcases</li>
                  <li>• Led sponsor outreach and partnership development</li>
                  <li>• Supported large-scale aerospace community activation</li>
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
              <ImagePlaceholder label="{FIRST Robotics images}" />
              <h3 className="mt-4 text-xl">FIRST Robotics</h3>
              <p className="mt-2 text-white/70 text-sm">
                Mechanical design mentorship and systems integration guidance.
              </p>
            </div>

            <div>
              <ImagePlaceholder label="{NASA TechRise images}" />
              <h3 className="mt-4 text-xl">NASA TechRise</h3>
              <p className="mt-2 text-white/70 text-sm">
                Student payload advising and technical feasibility review.
              </p>
            </div>

            <div>
              <ImagePlaceholder label="{Mars Generation images}" />
              <h3 className="mt-4 text-xl">The Mars Generation</h3>
              <p className="mt-2 text-white/70 text-sm">
                Ambassador supporting next-generation space advocacy and outreach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}