import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";
import PageTransition from "@/components/PageTransition";
import CursorHalo from "@/components/CursorHalo";
import { SpeedInsights } from "@vercel/speed-insights/next"

export const metadata: Metadata = {
  title: "Sophya Mirza",
  description: "Portfolio",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white cursor-none">
        <CursorHalo />
        <NavBar />
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
