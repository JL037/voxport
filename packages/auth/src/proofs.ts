import { webcrypto } from "node:crypto"; // Node's WebCrypto
const { subtle } = webcrypto;

export type Proof = { alg: "sha256"; digest: string };

/**
 * Accepts ArrayBufferView (e.g., Uint8Array) or ArrayBuffer.
 * Works in Node 18+.
 */
export async function makeSha256Proof(
  data: ArrayBufferView | ArrayBuffer
): Promise<Proof> {
  const buf = await subtle.digest("SHA-256", data);
  const hex = Buffer.from(buf).toString("hex");
  return { alg: "sha256", digest: hex };
}
