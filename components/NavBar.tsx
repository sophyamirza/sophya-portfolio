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
                  active ? "text-white" : "text-white/80 hover:text-black",
                ].join(" ")}
              >
                {/* label */}
                <span className="relative z-10">{item.label}</span>

                {/* inverted thermal wash on hover (behind text) */}
                <span
                  className={[
                    "pointer-events-none absolute inset-x-0 bottom-1 h-[1.25em] -z-0",
                    "origin-bottom scale-y-0 transition-transform duration-300 ease-out",
                    "group-hover:scale-y-100",
                    "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)] opacity-90",
                  ].join(" ")}
                />

                {/* thermal underline */}
                <span
                  className={[
                    "pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full",
                    "origin-left scale-x-0 transition-transform duration-300 ease-out",
                    "bg-[linear-gradient(90deg,#00b3ff,#39ff14,#ffe600,#ff7a00,#ff0033)]",
                    "group-hover:scale-x-100",
                    active ? "scale-x-100 opacity-95" : "opacity-85",
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
