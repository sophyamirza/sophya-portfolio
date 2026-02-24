"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

type Props = {
  images: string[];
  alt?: string;

  /**
   * When true, the carousel fills the parent container.
   * Use this inside your hero wrapper (which already sets aspect ratio, border, rounding, etc).
   */
  fillParent?: boolean;
};

export default function ImageCarousel({
  images,
  alt = "Project image",
  fillParent = false,
}: Props) {
  const safeImages = useMemo(() => images?.filter(Boolean) ?? [], [images]);
  const [idx, setIdx] = useState(0);

  if (safeImages.length === 0) return null;

  const prev = () =>
    setIdx((i) => (i - 1 + safeImages.length) % safeImages.length);
  const next = () => setIdx((i) => (i + 1) % safeImages.length);

  // If fillParent, we assume the parent provides: relative + aspect + rounding + border + overflow-hidden
  const wrapperClass = fillParent
    ? "absolute inset-0"
    : "relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5";

  return (
    <div className={fillParent ? "relative h-full w-full" : "w-full"}>
      <div className={wrapperClass}>
        <Image
          key={safeImages[idx]}
          src={safeImages[idx]}
          alt={alt}
          fill
          priority
          className="object-contain"
          sizes="(max-width: 1024px) 100vw, 900px"
        />

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm backdrop-blur hover:bg-black/55"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={next}
              className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-sm backdrop-blur hover:bg-black/55"
            >
              Next
            </button>
          </div>

          <div className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs backdrop-blur">
            {idx + 1} / {safeImages.length}
          </div>
        </div>
      </div>
    </div>
  );
}