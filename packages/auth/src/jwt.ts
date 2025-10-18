import { SignJWT, jwtVerify } from "jose";

export type JwtPayload = { sub: string; role?: "user" | "admin" };

const enc = (s: string) => new TextEncoder().encode(s);

export async function signJwt(payload: JwtPayload, secret: string, ttlSec = 3600) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(`${ttlSec}s`)
    .sign(enc(secret));
}

export async function verifyJwt<T extends JwtPayload = JwtPayload>(token: string, secret: string): Promise<T> {
  const { payload } = await jwtVerify(token, enc(secret));
  return payload as T;
}
