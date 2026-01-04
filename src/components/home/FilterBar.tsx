"use client";

type Props = {
  years: number[];
  tagPool: string[];
  year: number | "ALL";
  tag: string | "ALL";
  onChangeYear: (v: number | "ALL") => void;
  onChangeTag: (v: string | "ALL") => void;
};

export default function FilterBar({
  years,
  tagPool,
  year,
  tag,
  onChangeYear,
  onChangeTag,
}: Props) {
  return (
    <section className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/20 p-4">
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.22em] text-zinc-400">YEAR</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onChangeYear("ALL")}
              className={[
                "rounded-full border px-3 py-1 text-xs",
                year === "ALL"
                  ? "border-zinc-500 bg-zinc-100 text-zinc-950"
                  : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-600",
              ].join(" ")}
            >
              전체
            </button>

            {years.map((y) => (
              <button
                key={y}
                type="button"
                onClick={() => onChangeYear(y)}
                className={[
                  "rounded-full border px-3 py-1 text-xs",
                  year === y
                    ? "border-zinc-500 bg-zinc-100 text-zinc-950"
                    : "border-zinc-800 bg-zinc-900/40 text-zinc-300 hover:border-zinc-600",
                ].join(" ")}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs tracking-[0.22em] text-zinc-400">TAG</p>
          <select
            value={tag}
            onChange={(e) => onChangeTag(e.target.value)}
            className="w-full rounded-xl border border-zinc-800 bg-zinc-900/40 px-3 py-2.5 text-sm text-zinc-100 outline-none focus:border-zinc-600"
          >
            <option value="ALL">전체</option>
            {tagPool.map((t) => (
              <option key={t} value={t}>
                #{t}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
