import type { Video as PrismaVideo } from "@prisma/client";
import type { Video } from "@/lib/videos/types";

export function toVideoDTO(v: PrismaVideo): Video {
  return {
    id: v.id,
    youtubeId: v.youtubeId,
    title: v.title,
    note: v.note,
    shotAt: v.shotAt.toISOString(),
    eventTags: v.eventTags,
    durationSec: v.durationSec,
    featured: v.featured,
  };
}