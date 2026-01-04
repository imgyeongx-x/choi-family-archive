import Link from "next/link";
import { Video } from "lucide-react";

export default function ArchiveHeader() {
  return (
    <header className="sticky top-0 z-10 -mx-4 border-b border-zinc-800/70 bg-zinc-950/80 px-4 py-4 backdrop-blur">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Brand (click -> Home) */}
        <Link
          href="/"
          aria-label="홈으로 이동"
          className="flex items-center gap-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-zinc-500/50"
        >
          <Video className="h-10 w-10 shrink-0 text-zinc-300" />

          <div className="min-w-0">
            <p className="text-sm tracking-[0.22em] text-zinc-400">
              CHOI FAMILY ARCHIVE
            </p>
            <h1 className="text-xl font-semibold tracking-tight">
              최가네 앨범
            </h1>
          </div>
        </Link>

        {/* Menu board */}
        <nav className="flex flex-wrap items-center gap-2">
          <span className="text-xs tracking-[0.22em] text-zinc-500">MENU</span>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-200 hover:border-zinc-600"
            >
              홈
            </Link>

            <span className="text-zinc-700">/</span>

            <Link
              href="/videos"
              className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-200 hover:border-zinc-600"
            >
              비디오 목록
            </Link>

            <span className="text-zinc-700">/</span>

            <Link
              href="/about"
              className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-200 hover:border-zinc-600"
            >
              소개
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
