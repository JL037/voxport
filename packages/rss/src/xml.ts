import { create } from "xmlbuilder2";

export type XmlInput = Record<string, unknown>;

export const buildXml = (root: string, attrs: Record<string, string> = {}, children?: (doc: any) => void) => {
  const doc = create({ version: "1.0", encoding: "UTF-8" }).ele(root, attrs);
  if (children) children(doc);
  return doc.end({ prettyPrint: true });
};
