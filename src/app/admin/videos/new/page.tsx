"use client";

import { useState } from "react";
import Link from "next/link";

function pickYoutubeId(input: string): string {
  const s = input.trim();
  if (/^[a-zA-Z0-9_-]{11}$/.test(s)) return s;

  const m1 = s.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (m1?.[1]) return m1[1];

  const m2 = s.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (m2?.[1]) return m2[1];

  const m3 = s.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/);
  if (m3?.[1]) return m3[1];

  return s;
}

export default function NewVideoPage() {
  const [youtube, setYoutube] = useState("");
  const [title, setTitle] = useState("");
  const [shotAt, setShotAt] = useState(""); // YYYY-MM-DD
  const [tags, setTags] = useState(""); // comma separated
  const [note, setNote] = useState("");
  const [featured, setFeatured] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [createdId, setCreatedId] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    setCreatedId(null);

    if (!youtube.trim() || !title.trim() || !shotAt.trim()) {
      setErrorMsg("youtube / title / shotAt(날짜)는 필수입니다.");
      return;
    }

    const eventTags = tags
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    try {
      setLoading(true);

      const res = await fetch("/api/videos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          youtubeId: pickYoutubeId(youtube),
          title,
          shotAt: "2000-01-01T00:00:00.000Z", // 또는 date input 값이면 ISO로 변환해서 보내기
          eventTags: ["가족", "기록"],
          featured: true,
        }),
      });

      if (!res.ok) {
        const j = (await res.json().catch(() => null)) as {
          message?: string;
        } | null;
        throw new Error(j?.message ?? `API Error: ${res.status}`);
      }

      const j = (await res.json()) as { id: string };
      setCreatedId(j.id);

      setYoutube("");
      setTitle("");
      setShotAt("");
      setTags("");
      setNote("");
      setFeatured(false);
    } catch (err) {
      setErrorMsg((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="py-8">
      <div className="mb-6">
        <p className="text-xs tracking-[0.22em] text-zinc-400">ADMIN</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight">
          비디오 등록
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          YouTube 링크(또는 ID)와 메타데이터를 입력해 DB에 저장합니다.
        </p>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-2xl border border-zinc-800 bg-zinc-900/20 p-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.22em] text-zinc-400">
              YOUTUBE
            </span>
            <input
              value={youtube}
              onChange={(e) => setYoutube(e.target.value)}
              placeholder="https://youtu.be/xxxx 또는 youtubeId(11자)"
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-xs tracking-[0.22em] text-zinc-400">
              SHOT AT
            </span>
            <input
              type="date"
              value={shotAt}
              onChange={(e) => setShotAt(e.target.value)}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs tracking-[0.22em] text-zinc-400">
              TITLE
            </span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예) 최나경 태어나다!"
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs tracking-[0.22em] text-zinc-400">
              TAGS
            </span>
            <input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="쉼표로 구분 (예: 가족, 기록)"
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-600"
            />
          </label>

          <label className="flex flex-col gap-2 md:col-span-2">
            <span className="text-xs tracking-[0.22em] text-zinc-400">
              NOTE
            </span>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="간단한 메모(선택)"
              rows={3}
              className="resize-none rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-600"
            />
          </label>

          <label className="flex items-center gap-2 md:mt-6">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="h-4 w-4 accent-zinc-200"
            />
            <span className="text-sm text-zinc-200">Featured로 설정</span>
          </label>
        </div>

        {errorMsg && (
          <p className="mt-4 rounded-xl border border-red-900/40 bg-red-950/30 px-3 py-2 text-sm text-red-200">
            {errorMsg}
          </p>
        )}

        {createdId && (
          <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-900/30 px-3 py-3 text-sm text-zinc-200">
            저장 완료: <span className="text-zinc-100">{createdId}</span>
            <div className="mt-2 flex gap-2">
              <Link
                href={`/videos/${createdId}`}
                className="rounded-lg border border-zinc-700 bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-950 hover:bg-white"
              >
                상세 페이지로 이동
              </Link>
              <Link
                href="/"
                className="rounded-lg border border-zinc-800 bg-zinc-900/40 px-3 py-1.5 text-xs text-zinc-100 hover:border-zinc-600"
              >
                홈으로
              </Link>
            </div>
          </div>
        )}

        <div className="mt-5 flex items-center gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-xl border border-zinc-700 bg-zinc-100 px-4 py-2 text-sm font-medium text-zinc-950 hover:bg-white disabled:opacity-60"
          >
            {loading ? "저장 중..." : "DB에 저장"}
          </button>

          <Link
            href="/"
            className="rounded-xl border border-zinc-800 bg-zinc-900/40 px-4 py-2 text-sm text-zinc-100 hover:border-zinc-600"
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
}
