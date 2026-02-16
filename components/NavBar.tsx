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
                {/* TEXT: invert + glow on hover */}
                <span
                  className={[
                    "relative z-10 transition-all duration-300",
                    "group-hover:text-black",
                    // glow (inverted look): dark text + bright halo
                    "group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.55)]",
                    "group-hover:drop-shadow-[0_0_26px_rgba(57,255,20,0.18)]",
                    active ? "text-white" : "",
                  ].join(" ")}
                >
                  {item.label}
                </span>

                {/* THERMAL UNDERLINE: fade + slide in, then fade out */}
                <span
                  className={[
                    "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full",
                    "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]",
                    "origin-left transition-all duration-300 ease-out",
                    // default hidden
                    "scale-x-0 opacity-0",
                    // hover shown
                    "group-hover:scale-x-100 group-hover:opacity-90",
                    // active page underline stays subtle
                    active ? "scale-x-100 opacity-70" : "",
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
