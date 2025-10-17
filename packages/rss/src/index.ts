import { escape } from "entities";

interface Episode {
  id: string;
  title: string;
  description?: string;
  audioUrl: string;
  pubDate: string;
}

interface Series {
  id: string;
  title: string;
  description?: string;
  link: string;
  language?: string;
}

export function buildFeed(series: Series, episodes: Episode[]): string {
  const items = episodes
    .map(
      (ep) => `
    <item>
      <title>${escape(ep.title)}</title>
      <description>${escape(ep.description ?? "")}</description>
      <enclosure url="${escape(ep.audioUrl)}" type="audio/mpeg" />
      <pubDate>${new Date(ep.pubDate).toUTCString()}</pubDate>
      <guid>${escape(ep.id)}</guid>
    </item>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>${escape(series.title)}</title>
  <link>${escape(series.link)}</link>
  <description>${escape(series.description ?? "")}</description>
  <language>${escape(series.language ?? "en")}</language>
  ${items}
</channel>
</rss>`;
}
