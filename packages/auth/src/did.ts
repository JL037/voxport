// Minimal DID helpers (no network calls here)
export type Did = `did:${string}:${string}`;

export const isDid = (value: unknown): value is Did =>
  typeof value === "string" && value.startsWith("did:") && value.split(":").length >= 3;

export function toHandleFromDid(did: Did): string {
  // purely illustrative – real mapping requires directory/appview
  return did.replace(/:/g, "_");
}
