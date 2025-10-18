// Recommend object keys & ACL strategy for podcasts

export const defaultAudioKey = (seriesId: string, episodeId: string, ext = "mp3") =>
  `audio/${seriesId}/${episodeId}.${ext}`;

export const defaultCoverKey = (seriesId: string, size: "full" | "thumb" = "full", ext = "jpg") =>
  `images/${seriesId}/cover-${size}.${ext}`;
