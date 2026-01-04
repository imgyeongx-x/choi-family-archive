"use client";

import type { Video, ViewMode } from "@/lib/videos/types";
import { formatDate, toMinSec } from "@/lib/videos/utils";
import Link from "next/link";

type Props = {
  videos: Video[];
  view: ViewMode;
};

export default function VideoResults({ videos, view }: Props) {
  if (view === "GRID") {
    return (
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((v) => (
          <Link
            key={v.id}
            href={`/videos/${v.id}`}
            className="group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20 shadow-sm transition hover:border-zinc-600"
          >
            <div className="relative aspect-[16/10] overflow-hidden border-b border-zinc-800">
              <img
                src={`https://img.youtube.com/vi/${v.youtubeId}/hqdefault.jpg`}
                alt={v.title}
                className="h-full w-full object-cover opacity-90 transition duration-300 group-hover:scale-[1.02]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/10 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <span className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-2.5 py-1 text-[11px] text-zinc-200">
                  {formatDate(v.shotAt)}
                </span>
                <span className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-2.5 py-1 text-[11px] text-zinc-300">
                  {toMinSec(v.durationSec) ?? "—:—"}
                </span>
              </div>
            </div>

            <div className="p-4">
              <div className="mb-2 flex items-center gap-2 text-xs text-zinc-400">
                <span className="tracking-[0.18em]">VIDEO #{v.id}</span>
                <span className="text-zinc-600">·</span>
              </div>

              <h3 className="mb-3 line-clamp-1 text-base font-semibold text-zinc-100">
                {v.title}
              </h3>

              <div className="flex flex-wrap gap-2">
                {v.eventTags.slice(0, 6).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-zinc-800 bg-zinc-900/40 px-2.5 py-1 text-xs text-zinc-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    );
  }

  return (
    <section className="divide-y divide-zinc-800 overflow-hidden rounded-2xl border border-zinc-800">
      {videos.map((v) => (
        <a
          key={v.id}
          href={`/videos/${v.id}`}
          className="flex gap-4 bg-zinc-900/20 p-4 transition hover:bg-zinc-900/35"
        >
          <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-zinc-800">
            <img
              src={`https://img.youtube.com/vi/${v.youtubeId}/mqdefault.jpg`}
              alt={v.title}
              className="h-full w-full object-cover opacity-90"
              loading="lazy"
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-zinc-400">
              <span className="tracking-[0.18em]">
                VIDEO #{v.id.replace("video-", "")}
              </span>
              <span className="text-zinc-600">·</span>
              <span>{formatDate(v.shotAt)}</span>
              <span className="text-zinc-600">·</span>
              <span className="text-zinc-600">·</span>
              <span>{toMinSec(v.durationSec) ?? "—:—"}</span>
            </div>

            <p className="line-clamp-1 text-base font-semibold text-zinc-100">
              {v.title}
            </p>
          </div>
        </a>
      ))}
    </section>
  );
}
