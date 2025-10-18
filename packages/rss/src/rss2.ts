import { buildXml } from "./xml";

export type Enclosure = { url: string; type: string; length?: number };
export type RssItem = {
  id: string;
  title: string;
  link: string;
  description?: string;
  pubDate?: string;
  enclosure?: Enclosure;
};

export type RssFeed = {
  title: string;
  link: string;
  description?: string;
  items: RssItem[];
};

export function buildRss2(feed: RssFeed): string {
  return buildXml("rss", { version: "2.0" }, (doc) => {
    const channel = doc.ele("channel");
    channel.ele("title").txt(feed.title).up();
    channel.ele("link").txt(feed.link).up();
    if (feed.description) channel.ele("description").txt(feed.description).up();

    for (const it of feed.items) {
      const item = channel.ele("item");
      item.ele("guid").txt(it.id).up();
      item.ele("title").txt(it.title).up();
      item.ele("link").txt(it.link).up();
      if (it.description) item.ele("description").txt(it.description).up();
      if (it.pubDate) item.ele("pubDate").txt(it.pubDate).up();
      if (it.enclosure) item.ele("enclosure", it.enclosure as any).up();
      item.up();
    }
  });
}
