import series from "./app.voxport.series";
import episode from "./app.voxport.episode";

export const lexicons = {
  "app.voxport.series": series,
  "app.voxport.episode": episode
};

// Convenience helpers
export type LexiconDoc = typeof series | typeof episode;

export function getLexicon(nsid: keyof typeof lexicons) {
  return lexicons[nsid];
}
