import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { toVideoDTO } from "@/lib/videos/dto";

function badRequest(message: string) {
  return NextResponse.json({ message }, { status: 400 });
}

function parseId(id: string): number | null {
  const n = Number(id);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n <= 0) return null;
  return n;
}

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> } // ✅ string이 맞음
) {
  const { id } = await ctx.params;

  const idNum = parseId(id);
  if (!idNum) return badRequest("id가 올바르지 않습니다.");

  const video = await prisma.video.findUnique({ where: { id: idNum } });
  if (!video) {
    return NextResponse.json({ message: "Not Found" }, { status: 404 });
  }

  return NextResponse.json(toVideoDTO(video));
}

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> } // ✅ string
) {
  const { id } = await ctx.params;

  const idNum = parseId(id);
  if (!idNum) return badRequest("id가 올바르지 않습니다.");

  const body = (await req.json().catch(() => null)) as unknown;
  if (!body || typeof body !== "object") return badRequest("JSON 바디가 필요합니다.");

  const b = body as {
    youtubeId?: string;
    title?: string;
    note?: string | null;
    shotAt?: string; // ISO
    eventTags?: string[];
    durationSec?: number | null;
    featured?: boolean;
  };

  const data: {
    youtubeId?: string;
    title?: string;
    note?: string | null;
    shotAt?: Date;
    eventTags?: string[];
    durationSec?: number | null;
    featured?: boolean;
  } = {};

  if (typeof b.youtubeId === "string") data.youtubeId = b.youtubeId;
  if (typeof b.title === "string") data.title = b.title;
  if (typeof b.note === "string" || b.note === null) data.note = b.note;

  if (typeof b.shotAt === "string") {
    const d = new Date(b.shotAt);
    if (Number.isNaN(d.getTime())) return badRequest("shotAt 형식이 올바르지 않습니다.");
    data.shotAt = d;
  }

  if (Array.isArray(b.eventTags)) {
    if (!b.eventTags.every((t) => typeof t === "string")) {
      return badRequest("eventTags는 문자열 배열이어야 합니다.");
    }
    data.eventTags = b.eventTags;
  }

  if (typeof b.durationSec === "number" || b.durationSec === null) data.durationSec = b.durationSec;
  if (typeof b.featured === "boolean") data.featured = b.featured;

  const updated = await prisma.video.update({
    where: { id: idNum },
    data,
  });

  return NextResponse.json(toVideoDTO(updated));
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> } // ✅ string
) {
  const { id } = await ctx.params;

  const idNum = parseId(id);
  if (!idNum) return badRequest("id가 올바르지 않습니다.");

  await prisma.video.delete({ where: { id: idNum } });
  return NextResponse.json({ ok: true });
}
