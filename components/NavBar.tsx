"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/bio", label: "BIO" },
  { href: "/works", label: "WORKS" },
  { href: "/industry", label: "INDUSTRY" },
  { href: "/recreation", label: "COMMUNITY" },
  { href: "/contact", label: "CONTACT" },
];

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black">
      <div className="flex w-full items-center justify-between pl-12 pr-6 py-3">
        <Link
  href="/"
  className="group relative px-1 py-2 text-sm font-semibold tracking-[0.18em] text-white/90"
>
  <span className={`relative z-10 transition-all duration-300 group-hover:text-white ${
  pathname === "/" ? "drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]" : ""
}`}>
    SOPHYA MIRZA
  </span>

  {/* THERMAL UNDERLINE */}
  <span
    className={[
      "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full",
      "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]",
      "origin-left transition-all duration-300 ease-out",
      pathname === "/" ? "scale-x-100 opacity-60" : "scale-x-0 opacity-0",
      "group-hover:scale-x-100 group-hover:opacity-90",
    ].join(" ")}
  />
</Link>

        <nav className="flex items-center gap-6">
          {nav.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative px-1 py-2 text-sm tracking-[0.18em] text-white/80 transition-all duration-300"
              >
                {/* TEXT */}
                <span
                  className={[
                    "relative z-10 transition-all duration-300",
                    "group-hover:text-white",
                    "group-hover:drop-shadow-[0_0_14px_rgba(255,255,255,0.45)]",
                    active
                      ? "text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.35)]"
                      : "",
                  ].join(" ")}
                >
                  {item.label}
                </span>

                {/* THERMAL UNDERLINE */}
                <span
                  className={[
                    "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full",
                    "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]",
                    "origin-left transition-all duration-300 ease-out",
                    "scale-x-0 opacity-0",
                    "group-hover:scale-x-100 group-hover:opacity-90",
                    active ? "scale-x-100 opacity-60" : "",
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
