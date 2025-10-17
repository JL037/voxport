import * as lex from "../src";
import { test, expect } from "vitest";

test("lexicon package exports an object (placeholder ok)", () => {
  expect(typeof lex).toBe("object");
});
