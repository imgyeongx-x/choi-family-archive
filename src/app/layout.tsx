import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import ArchiveHeader from "@/components/header/Header";
import ArchiveFooter from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Family Film Archive",
  description: "Private family video archive",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-dvh bg-zinc-950 text-zinc-100 selection:bg-zinc-100 selection:text-zinc-950">
          <div className="pointer-events-none fixed inset-0 opacity-[0.10] mix-blend-overlay [background-image:url('/grain.png')] bg-repeat" />

          <div className="mx-auto w-full max-w-6xl px-4 pb-16">
            <ArchiveHeader />

            {/* page content */}
            {children}

            <ArchiveFooter />
          </div>
        </div>
      </body>
    </html>
  );
}
