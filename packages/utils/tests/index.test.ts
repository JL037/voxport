import { assert, nowISO, shortId } from "../src";
import { test, expect } from "vitest";

test("nowISO returns ISO-8601 string", () => {
  const s = nowISO();
  expect(s).toMatch(/^\d{4}-\d{2}-\d{2}T.*Z$/);
});

test("shortId prefixes and has 8 random chars", () => {
  const id = shortId("ep");
  expect(id.startsWith("ep_")).toBe(true);
  expect(id.split("_")[1]).toHaveLength(8);
});

test("assert throws on falsy", () => {
  expect(() => assert(false, "boom")).toThrow("boom");
});

test("assert does not throw on truthy", () => {
  expect(() => assert(1, "nope")).not.toThrow();
});
