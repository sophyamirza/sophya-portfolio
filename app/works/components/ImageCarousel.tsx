"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
};

export default function ImageCarousel({
  images,
  alt = "Project image",
  className = "",
}: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [idx, setIdx] = useState(0);

  if (safeImages.length === 0) return null;

  const prev = () => {
    setIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  };

  const next = () => {
    setIdx((i) => (i + 1) % safeImages.length);
  };

  const goTo = (i: number) => {
    setIdx(i);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <div className="relative min-h-[360px] w-full overflow-hidden bg-black sm:min-h-[460px] md:min-h-[560px]">
        <Image
          key={safeImages[idx]}
          src={safeImages[idx]}
          alt={`${alt} ${idx + 1}`}
          fill
          priority={idx === 0}
          className="object-contain"
          sizes="100vw"
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {safeImages.length > 1 ? (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-lg text-white backdrop-blur hover:bg-black/75"
            >
              ←
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-black/60 text-lg text-white backdrop-blur hover:bg-black/75"
            >
              →
            </button>

            <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-3">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/75"
                >
                  Prev
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-sm text-white backdrop-blur hover:bg-black/75"
                >
                  Next
                </button>
              </div>

              <div className="rounded-xl border border-white/15 bg-black/60 px-3 py-2 text-xs text-white backdrop-blur">
                {idx + 1} / {safeImages.length}
              </div>
            </div>

            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === idx ? "bg-white" : "bg-white/35 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}