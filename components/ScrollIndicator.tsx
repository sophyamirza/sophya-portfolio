"use client";

export default function ScrollIndicator({ targetId = "about" }: { targetId?: string }) {
  const scrollToSection = () => {
    document.getElementById(targetId)?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div
      onClick={scrollToSection}
      className="absolute bottom-45 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center cursor-pointer text-white/70 hover:text-white transition duration-300"
      role="button"
      aria-label="Scroll to next section"
    >
      <span className="text-[10px] tracking-[0.4em] mb-3 opacity-70">
        SCROLL
      </span>

      <svg
        className="w-5 h-5 animate-bounce"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 5v14" />
        <path d="M19 12l-7 7-7-7" />
      </svg>
    </div>
  );
}
