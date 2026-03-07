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

        @media (prefers-reduced-motion: reduce) {
          .haloTitle {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
