"use client";

export default function ArchiveFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-10 pt-6 text-xs text-zinc-500">
      <div className="mt-4 flex flex-col gap-2 border-t border-zinc-600 pt-4">
        <p className="tracking-[0.18em] text-zinc-400">
          DEVELOPED BY{" "}
          <a
            href="https://github.com/imgyeongx-x"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:text-zinc-100 hover:decoration-zinc-400"
          >
            imgyeongx-x
          </a>
        </p>

        <p className="tracking-[0.18em] text-zinc-400">
          CONTACT{" "}
          <a
            href="mailto:imgyeong00@gmail.com"
            className="text-zinc-300 underline underline-offset-4 decoration-zinc-700 hover:text-zinc-100 hover:decoration-zinc-400"
          >
            imgyeong00@gmail.com
          </a>
        </p>

        <p className="text-zinc-600">
          © {year} imgyeongx-x. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
