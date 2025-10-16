import jwt from "jsonwebtoken";
import { nowISO } from "@voxport/utils";

const DEFAULT_SECRET = process.env.JWT_SECRET ?? "dev-insecure";

export interface TokenPayload {
  sub: string;  // user DID or ID
  iat?: number;
  exp?: number;
}

export function signToken(payload: TokenPayload, secret = DEFAULT_SECRET): string {
  return jwt.sign(payload, secret, { expiresIn: "7d" });
}

export function verifyToken(token: string, secret = DEFAULT_SECRET): TokenPayload {
  return jwt.verify(token, secret) as TokenPayload;
}

// placeholder for DID operations (to integrate with @atproto/identity later)
export function didFromHandle(handle: string): string {
  return `did:voxport:${handle}`;
}

export function issuedAt(): string {
  return nowISO();
}
