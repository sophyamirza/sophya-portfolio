"use client";

export default function PhilosophyTitle() {
  return (
    <>
      {/* TITLE */}
      <h2
        className="haloTitle mt-4 text-4xl md:text-6xl font-semibold tracking-tight"
        style={{
          color: "rgba(255,255,255,0.98)",
          textShadow: `
            0 0 2px rgba(255,255,255,0.95),
            0 0 10px rgba(255,255,255,0.55),
            0 0 22px rgba(255,255,255,0.30),
            0 0 46px rgba(255,255,255,0.18),
            0 0 70px rgba(255,59,31,0.22)
          `,
          filter: `
            drop-shadow(0 0 10px rgba(255,255,255,0.28))
            drop-shadow(0 0 30px rgba(255,59,31,0.16))
          `,
        }}
      >
        EXTREME OWNERSHIP
      </h2>

      {/* PROCESS MARQUEE */}
      <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen mt-8 overflow-hidden border-y border-white/10 bg-black">
        <div
          className="flex w-[200%] whitespace-nowrap py-4"
          style={{ animation: "marqueeX 18s linear infinite" }}
        >
          {[0, 1].map((i) => (
            <div key={i} className="flex w-1/2 items-center gap-8 px-10">
              <span className="text-xs md:text-sm tracking-[0.28em] text-white/75">
                DESIGN <span className="text-white/35">→</span> MANUFACTURE{" "}
                <span className="text-white/35">→</span> BUILD{" "}
                <span className="text-white/35">→</span> TEST{" "}
                <span className="text-white/35">→</span> LEARN{" "}
                <span className="text-white/35">→</span>
              </span>

              <span className="text-xs md:text-sm tracking-[0.28em] text-white/75">
                DESIGN <span className="text-white/35">→</span> MANUFACTURE{" "}
                <span className="text-white/35">→</span> BUILD{" "}
                <span className="text-white/35">→</span> TEST{" "}
                <span className="text-white/35">→</span> LEARN{" "}
                <span className="text-white/35">→</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GLOBAL STYLES */}
      <style jsx global>{`
        @keyframes haloBreath {
          0% {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.22))
              drop-shadow(0 0 28px rgba(255, 59, 31, 0.12));
            opacity: 0.96;
          }
          50% {
            filter: drop-shadow(0 0 14px rgba(255, 255, 255, 0.32))
              drop-shadow(0 0 40px rgba(255, 59, 31, 0.18));
            opacity: 1;
          }
          100% {
            filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.22))
              drop-shadow(0 0 28px rgba(255, 59, 31, 0.12));
            opacity: 0.96;
          }
        }

        .haloTitle {
          animation: haloBreath 2.8s ease-in-out infinite;
        }

        @keyframes marqueeX {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .haloTitle {
            animation: none;
          }

          div[style*="marqueeX"] {
            animation: none !important;
          }
        }
      `}</style>
    </>
  );
}
