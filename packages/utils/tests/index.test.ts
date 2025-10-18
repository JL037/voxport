import { assert, nowISO, shortId, isNonEmptyString, toRfc2822 } from "../src";
import { test, expect } from "vitest";


test("nowISO returns ISO string", () => {
  const s = nowISO();
  expect(s).toMatch(/^\d{4}-\d{2}-\d{2}T/);
});

test("shortId has prefix and non-empty", () => {
  const id = shortId("vp");
  expect(id.startsWith("vp_")).toBe(true);
  expect(id.length).toBeGreaterThan(5);
});

test("assert throws on falsy", () => {
  expect(() => assert(false, "nope")).toThrow("nope");
  expect(() => assert(true, "ok")).not.toThrow();
});

test("isNonEmptyString", () => {
  expect(isNonEmptyString(" hi ")).toBe(true);
  expect(isNonEmptyString("   ")).toBe(false);
  expect(isNonEmptyString(42)).toBe(false);
});

test("toRfc2822 looks like RFC 2822", () => {
  const s = toRfc2822("2025-10-17T00:00:00Z");
  expect(s).toMatch(/GMT$/);
});
