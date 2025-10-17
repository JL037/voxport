import { vi, beforeEach, afterAll, test, expect } from "vitest";


// Mock AWS SDK v3 pieces we use
vi.mock("@aws-sdk/client-s3", () => {
  return {
    S3Client: vi.fn().mockImplementation(() => ({})),
    PutObjectCommand: vi.fn().mockImplementation((args) => ({ __cmd: "PutObject", args })),
  };
});

vi.mock("@aws-sdk/s3-request-presigner", () => {
  return {
    getSignedUrl: vi.fn().mockResolvedValue("https://signed.example/put?sig=abc"),
  };
});

import { presignPut } from "../src";

const ENV = process.env;

beforeEach(() => {
  process.env = {
    ...ENV,
    R2_ACCOUNT_ID: "accid",
    R2_BUCKET: "voxport-media",
    R2_ACCESS_KEY_ID: "key",
    R2_SECRET_ACCESS_KEY: "secret",
  };
});

afterAll(() => {
  process.env = ENV;
});

test("presignPut returns url and key", async () => {
  const { url, key } = await presignPut("audio/ep_123.mp3", "audio/mpeg");
  expect(url).toContain("https://signed.example/put");
  expect(key).toBe("audio/ep_123.mp3");
});
