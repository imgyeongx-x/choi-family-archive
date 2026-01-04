import type { Video as PrismaVideo } from "@prisma/client";

export type VideoDTO = {
  id: number;
  youtubeId: string;
  title: string;
  note: string | null;
  shotAt: string; // ISO string
  eventTags: string[];
  durationSec: number | null;
  featured: boolean;
};

export function toVideoDTO(v: PrismaVideo): VideoDTO {
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
