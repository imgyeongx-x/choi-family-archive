import { notFound } from "next/navigation";
import type { Video as PrismaVideo } from "@prisma/client";

import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/videos/utils";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function VideoDetailPage({ params }: PageProps) {
  const { id } = await params;

  const idNum = Number(id);
  if (!Number.isFinite(idNum) || !Number.isInteger(idNum) || idNum <= 0) {
    return notFound();
  }

  const video: PrismaVideo | null = await prisma.video.findUnique({
    where: { id: idNum },
  });

  if (!video) return notFound();

  return (
    <div className="py-6">
      <div className="mb-4">
        <p className="text-xs tracking-[0.22em] text-zinc-400">VIDEO</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          {video.title}
        </h2>
        <p className="mt-2 text-sm text-zinc-400">{formatDate(video.shotAt)}</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/20">
        <div className="relative aspect-video">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?rel=0&modestbranding=1&playsinline=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      </div>

      {video.note && (
        <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
          <p className="text-xs tracking-[0.22em] text-zinc-400">NOTE</p>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{video.note}</p>
        </div>
      )}

      {video.eventTags.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {video.eventTags.map((t: string) => (
            <span
              key={t}
              className="rounded-full border border-zinc-800 bg-zinc-900/40 px-3 py-1 text-xs text-zinc-400"
            >
              #{t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
