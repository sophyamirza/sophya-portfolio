"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/bio", label: "BIO" },
  { href: "/works", label: "WORKS" },
  { href: "/industry", label: "INDUSTRY" },
  { href: "/recreation", label: "RECREATION" },
  { href: "/contact", label: "CONTACT" },
];

// ROYGBIV-ish thermal colors (matches your underline palette vibe)
const hoverColorByHref: Record<string, string> = {
  "/bio": "group-hover:text-[#ff0033]", // Red
  "/works": "group-hover:text-[#ff7a00]", // Orange
  "/industry": "group-hover:text-[#ffe600]", // Yellow
  "/recreation": "group-hover:text-[#39ff14]", // Green
  "/contact": "group-hover:text-[#00b3ff]", // Blue (thermal-cyan)
};

const glowByHref: Record<string, string> = {
  "/bio": "group-hover:drop-shadow-[0_0_18px_rgba(255,0,51,0.45)]",
  "/works": "group-hover:drop-shadow-[0_0_18px_rgba(255,122,0,0.45)]",
  "/industry": "group-hover:drop-shadow-[0_0_18px_rgba(255,230,0,0.45)]",
  "/recreation": "group-hover:drop-shadow-[0_0_18px_rgba(57,255,20,0.45)]",
  "/contact": "group-hover:drop-shadow-[0_0_18px_rgba(0,179,255,0.45)]",
};

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="flex w-full items-center justify-between pl-12 pr-6 py-3">
        <Link href="/" className="tracking-wide text-sm font-semibold text-white/90">
          SOPHYA MIRZA
        </Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "group relative px-1 py-2 text-sm tracking-[0.18em] transition-colors duration-300",
                  active ? "text-white" : "text-white/80",
                ].join(" ")}
              >
                <span
                  className={[
                    "relative z-10 transition-all duration-300",
                    hoverColorByHref[item.href] ?? "group-hover:text-white",
                    glowByHref[item.href] ?? "group-hover:drop-shadow-[0_0_18px_rgba(255,255,255,0.35)]",
                  ].join(" ")}
                >
                  {item.label}
                </span>

                {/* Thermal underline (fade + slide in) */}
                <span
                  className={[
                    "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full",
                    "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]",
                    "origin-left transition-all duration-300 ease-out",
                    "scale-x-0 opacity-0",
                    "group-hover:scale-x-100 group-hover:opacity-90",
                    active ? "scale-x-100 opacity-65" : "",
                  ].join(" ")}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
