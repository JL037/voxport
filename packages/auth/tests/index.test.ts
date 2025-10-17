import { signToken, verifyToken, didFromHandle, issuedAt } from "../src";
import { test, afterAll, expect, beforeEach } from "vitest";

const ENV = process.env;

beforeEach(() => {
  process.env = { ...ENV, JWT_SECRET: "test-secret" };
});
afterAll(() => {
  process.env = ENV;
});

test("signs and verifies JWT roundtrip", () => {
  const token = signToken({ sub: "did:voxport:alice" });
  const decoded = verifyToken(token);
  expect(decoded.sub).toBe("did:voxport:alice");
  expect(typeof decoded.iat).toBe("number");
  expect(typeof decoded.exp).toBe("number");
});

test("didFromHandle formats a placeholder DID", () => {
  expect(didFromHandle("alice")).toBe("did:voxport:alice");
});

test("issuedAt returns ISO string", () => {
  expect(issuedAt()).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
});
