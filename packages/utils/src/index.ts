// packages/utils/src/index.ts
export function nowISO(): string {
  return new Date().toISOString();
}

export function shortId(prefix = "vp"): string {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
}

export function assert(condition: any, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
