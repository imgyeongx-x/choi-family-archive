export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;

  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");

  return `${yyyy}.${mm}.${dd}`;
}


export function yearOf(iso: string): number {
  return new Date(iso).getFullYear();
}

export function toMinSec(value: number | null | undefined): string | undefined {
  if (value == null) return undefined;

  const min = Math.floor(value / 60);
  const sec = value % 60;

  return `${min}:${String(sec).padStart(2, "0")}`;
}