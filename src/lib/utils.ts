export function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 中文阅读时长估算，约 400 字/分钟 */
export function readingTime(body = ''): number {
  const chars = body.replace(/\s+/g, '').length;
  return Math.max(1, Math.round(chars / 400));
}
