import { buildFeed } from "../src";
import { test, expect} from "vitest";

test("buildFeed emits minimal valid RSS and escapes entities", () => {
  const xml = buildFeed(
    { id: "s1", title: "My & Show", link: "https://example.com", description: "A <great> show" },
    [
      {
        id: "ep&1",
        title: "Hello <World>",
        description: "A&B",
        audioUrl: "https://cdn.example.com/a.mp3",
        pubDate: new Date().toISOString(),
      },
    ]
  );

  expect(xml).toContain("<rss");
  expect(xml).toContain("<channel>");
  // escape checks
  expect(xml).toContain("My &amp; Show");
  expect(xml).toContain("<title>Hello &lt;World&gt;</title>");
  expect(xml).toContain("<description>A&amp;B</description>");
  expect(xml).toContain("<enclosure url=\"https://cdn.example.com/a.mp3\"");
});
