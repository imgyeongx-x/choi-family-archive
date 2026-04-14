import "server-only";

import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { toVideoDTO } from "@/lib/videos/dto";
import type { Video } from "@/lib/videos/types";

export type VideoSort = "NEW" | "OLD";

export type GetVideosParams = {
  q?: string;
  year?: number | "ALL";
  tag?: string | "ALL";
  sort?: VideoSort;
};

export async function listVideos(
  params: GetVideosParams = {},
): Promise<Video[]> {
  const q = params.q?.trim() ?? "";
  const tag = params.tag && params.tag !== "ALL" ? params.tag.trim() : "";
  const sort = params.sort ?? "NEW";
  const year = params.year;

  const and: Prisma.VideoWhereInput[] = [];

  if (q.length > 0) {
    and.push({
      OR: [
        { title: { contains: q, mode: "insensitive" } },
        { note: { contains: q, mode: "insensitive" } },
      ],
    });
  }

  if (tag.length > 0) {
    and.push({ eventTags: { has: tag } });
  }

  if (year && year !== "ALL") {
    if (!Number.isFinite(year) || year < 1900 || year > 3000) {
      throw new Error("year 파라미터가 올바르지 않습니다.");
    }

    const start = new Date(`${year}-01-01T00:00:00.000Z`);
    const end = new Date(`${year + 1}-01-01T00:00:00.000Z`);

    and.push({
      shotAt: {
        gte: start,
        lt: end,
      },
    });
  }

  const where: Prisma.VideoWhereInput | undefined =
    and.length > 0 ? { AND: and } : undefined;

  const videos = await prisma.video.findMany({
    where,
    orderBy: { shotAt: sort === "NEW" ? "desc" : "asc" },
  });

  return videos.map(toVideoDTO);
}