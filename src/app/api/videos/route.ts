import { NextResponse } from "next/server";
import { listVideos } from "@/lib/videos/service";
import { prisma } from "@/lib/prisma";
import { toVideoDTO } from "@/lib/videos/dto";

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);

    const q = url.searchParams.get("q")?.trim() ?? "";
    const yearParam = url.searchParams.get("year");
    const tag = url.searchParams.get("tag")?.trim() ?? "";
    const sort = (url.searchParams.get("sort") ?? "NEW") as "NEW" | "OLD";

    const year =
      yearParam && yearParam !== "ALL" ? Number(yearParam) : "ALL";

    const videos = await listVideos({
      q,
      year,
      tag: tag || "ALL",
      sort,
    });

    return NextResponse.json(videos);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "비디오 목록을 불러오는 중 오류가 발생했습니다.";

    return badRequest(message);
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as unknown;

  if (!body || typeof body !== "object") {
    return badRequest("JSON 바디가 필요합니다.");
  }

  const b = body as {
    youtubeId?: string;
    title?: string;
    note?: string | null;
    shotAt?: string;
    eventTags?: string[];
    durationSec?: number | null;
    featured?: boolean;
  };

  if (!b.youtubeId || typeof b.youtubeId !== "string") {
    return badRequest("youtubeId가 필요합니다.");
  }
  if (!b.title || typeof b.title !== "string") {
    return badRequest("title이 필요합니다.");
  }
  if (!b.shotAt || typeof b.shotAt !== "string") {
    return badRequest("shotAt(ISO string)이 필요합니다.");
  }
  if (
    !Array.isArray(b.eventTags) ||
    !b.eventTags.every((t) => typeof t === "string")
  ) {
    return badRequest("eventTags는 문자열 배열이어야 합니다.");
  }

  const shotAt = new Date(b.shotAt);
  if (Number.isNaN(shotAt.getTime())) {
    return badRequest("shotAt 날짜 형식이 올바르지 않습니다.");
  }

  const created = await prisma.video.create({
    data: {
      youtubeId: b.youtubeId,
      title: b.title,
      note: b.note ?? null,
      shotAt,
      eventTags: b.eventTags,
      durationSec: b.durationSec ?? null,
      featured: b.featured ?? false,
    },
  });

  return NextResponse.json(toVideoDTO(created), { status: 201 });
}