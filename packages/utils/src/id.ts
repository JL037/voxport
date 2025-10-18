export function shortId(prefix = "vp"): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  try {
    // Node fallback
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { randomBytes } = require("node:crypto") as typeof import("node:crypto");
    return `${prefix}_${randomBytes(8).toString("hex")}`;
  } catch {
    return `${prefix}_${Math.random().toString(36).slice(2, 10)}`;
  }
}
