"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  images: string[];
  alt?: string;
};

export default function ImageCarousel({ images, alt = "Project image" }: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [idx, setIdx] = useState(0);

  if (safeImages.length === 0) return null;

  const prev = () =>
    setIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIdx((i) => (i + 1) % safeImages.length);

  return (
    // IMPORTANT: this component assumes the parent is relative + overflow-hidden + has an aspect ratio
    <div className="absolute inset-0">
      <Image
        key={safeImages[idx]}
        src={safeImages[idx]}
        alt={alt}
        fill
        priority
        className="object-contain"
        sizes="100vw"
      />

      {/* scrim so buttons are always visible */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

      {/* controls */}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-center justify-between p-3 pointer-events-auto">
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
    </div>
  );
}