"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/bio", label: "BIO" },
  { href: "/works", label: "WORKS" },
  { href: "/industry", label: "EXPERIENCE" },
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

        <nav className="flex items-center gap-1">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={[
                  "rounded-full px-3 py-1.5 text-sm transition",
                  "hover:bg-white/10",
                  active ? "bg-white/12 ring-1 ring-white/20" : "text-white/80",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
