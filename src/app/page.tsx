"use client";

import { useMemo, useState } from "react";

import FeaturedVideo from "@/components/home/FeaturedVideo";
import FilterBar from "@/components/home/FilterBar";
import VideoResults from "@/components/home/VideoResults";

import { VIDEOS } from "@/lib/videos/mock";
import type { SortMode, Video, ViewMode } from "@/lib/videos/types";
import { yearOf } from "@/lib/videos/utils";

export default function Page() {
  const years = useMemo(() => {
    const ys = Array.from(new Set(VIDEOS.map((v) => yearOf(v.shotAt))));
    ys.sort((a, b) => b - a);
    return ys;
  }, []);

  const tagPool = useMemo(() => {
    const set = new Set<string>();
    VIDEOS.forEach((v) => v.eventTags.forEach((t) => set.add(t)));
    return Array.from(set);
  }, []);

  const featured: Video | undefined = useMemo(
    () => VIDEOS.find((v) => v.featured) ?? VIDEOS[0],
    []
  );

  const [q, setQ] = useState<string>("");
  const [year, setYear] = useState<number | "ALL">("ALL");
  const [tag, setTag] = useState<string | "ALL">("ALL");
  const [sort, setSort] = useState<SortMode>("NEW");
  const [view, setView] = useState<ViewMode>("GRID");

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();

    const base = VIDEOS.filter((v) => {
      const matchesYear = year === "ALL" ? true : yearOf(v.shotAt) === year;
      const matchesTag = tag === "ALL" ? true : v.eventTags.includes(tag);

      const hay = [v.title, v.note ?? "", v.eventTags.join(" "), v.shotAt]
        .join(" ")
        .toLowerCase();
      const matchesQ = keyword.length === 0 ? true : hay.includes(keyword);

      return matchesYear && matchesTag && matchesQ;
    });

    base.sort((a, b) => {
      const at = new Date(a.shotAt).getTime();
      const bt = new Date(b.shotAt).getTime();
      return sort === "NEW" ? bt - at : at - bt;
    });

    return base;
  }, [q, year, tag, sort]);

  return (
    <div className="pt-6">
      {featured && (
        <FeaturedVideo video={featured} onClickSameYear={(y) => setYear(y)} />
      )}

      {/* 메인 컨트롤 패널: 검색/정렬/뷰 */}
      <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
        <p className="mb-2 text-xs tracking-[0.22em] text-zinc-400">
          SEARCH & VIEW
        </p>

        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-lg">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="제목 · 태그 검색"
              className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 px-4 py-2.5 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-zinc-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={sort}
              onChange={(e) =>
                setSort(e.target.value === "NEW" ? "NEW" : "OLD")
              }
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-600"
            >
              <option value="NEW">최신순</option>
              <option value="OLD">오래된순</option>
            </select>

            <button
              type="button"
              onClick={() => setView((vv) => (vv === "GRID" ? "LIST" : "GRID"))}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 px-3 py-2.5 text-sm text-zinc-100 hover:border-zinc-600"
            >
              {view === "GRID" ? "리스트" : "그리드"}
            </button>
          </div>
        </div>
      </section>

      <FilterBar
        years={years}
        tagPool={tagPool}
        year={year}
        tag={tag}
        onChangeYear={setYear}
        onChangeTag={setTag}
      />

      <section className="mb-3 flex items-center justify-between">
        <p className="text-sm text-zinc-300">
          검색 결과 <span className="text-zinc-100">{filtered.length}</span>건
        </p>
        <button
          type="button"
          onClick={() => {
            setQ("");
            setYear("ALL");
            setTag("ALL");
            setSort("NEW");
          }}
          className="text-sm text-zinc-400 hover:text-zinc-200"
        >
          필터 초기화
        </button>
      </section>

      <VideoResults videos={filtered} view={view} />
    </div>
  );
}
