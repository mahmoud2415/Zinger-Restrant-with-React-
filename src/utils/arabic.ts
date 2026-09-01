/**
 * Normalizes Arabic text for flexible search and comparison
 */
export function normalizeArabic(str: string): string {
  if (!str) return "";
  return str
    .replace(/[أإآ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .toLowerCase()
    .trim();
}

export function normalizeForImageMatching(str: string): string {
  return normalizeArabic(str)
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[_\-().]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
