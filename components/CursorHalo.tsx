"use client";

import { useEffect, useRef } from "react";

export default function CursorHalo() {
  const pos = useRef({ x: -9999, y: -9999 });
  const smooth = useRef({ x: -9999, y: -9999 });
  const halo = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    window.addEventListener("pointermove", onMove, { passive: true });

    const tick = () => {
      smooth.current.x += (pos.current.x - smooth.current.x) * 0.18;
      smooth.current.y += (pos.current.y - smooth.current.y) * 0.18;

      if (halo.current) {
        halo.current.style.transform = `translate3d(${smooth.current.x - 40}px, ${
          smooth.current.y - 40
        }px, 0)`;
      }

      requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);

    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={halo}
        className="h-[80px] w-[80px] rounded-full mix-blend-difference"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.25) 35%, rgba(255,255,255,0) 70%)",
            filter: "blur(2px)",
          }}
        />
      </div>
    </div>
  );
}
