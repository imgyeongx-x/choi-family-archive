"use client";

import type { Video } from "@/lib/videos/types";
import { formatDate, toMinSec, yearOf } from "@/lib/videos/utils";

type Props = {
  video: Video;
  onClickSameYear: (y: number) => void;
};

export default function FeaturedVideo({ video, onClickSameYear }: Props) {
  return (
    <section className="mb-6 overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/40 to-zinc-950/40 shadow-sm">
      <div className="grid gap-0 md:grid-cols-[1.35fr_1fr]">
        <div className="p-5 md:p-7">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-zinc-700 bg-zinc-900/60 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300">
              FEATURED VIDEO
            </span>
            <span className="text-xs text-zinc-400">
              {formatDate(video.shotAt)}
            </span>
          </div>

          <h2 className="mb-2 text-2xl font-semibold tracking-tight md:text-3xl">
            {video.title}
          </h2>

          {video.note && (
            <p className="mb-4 max-w-xl text-sm leading-6 text-zinc-300">
              {video.note}
            </p>
          )}

          <div className="mb-5 flex flex-wrap gap-2">
            {video.eventTags.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-400"
              >
                #{t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            <a
              href={`/videos/${video.id}`}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white"
            >
              재생
            </a>
            <button
              type="button"
              onClick={() => onClickSameYear(yearOf(video.shotAt))}
              className="inline-flex items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-100 hover:border-zinc-600"
            >
              같은 연도 보기
            </button>
          </div>
        </div>

        <div className="relative min-h-[220px] border-t border-zinc-800 md:min-h-full md:border-l md:border-t-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-90"
            style={{
              backgroundImage: `url(https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
            <span className="rounded-lg border border-zinc-700 bg-zinc-950/60 px-3 py-1 text-xs text-zinc-200">
              {toMinSec(video.durationSec) ?? "—:—"}
            </span>
            <span className="tracking-[0.18em]">VIDEO #{video.id}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
