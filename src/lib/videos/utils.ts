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

export function toMinSec(sec?: number): string | null {
  if (!sec || sec <= 0) return null;
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
}
