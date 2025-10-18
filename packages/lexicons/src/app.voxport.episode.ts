// ATProto lexicon: app.voxport.episode
const episode = {
  lexicon: 1,
  id: "app.voxport.episode",
  defs: {
    main: {
      type: "record",
      key: "tid",
      record: {
        type: "object",
        required: ["series", "title", "createdAt"],
        properties: {
          series: { type: "ref", ref: "strongRef", description: "Strong ref to parent series" },
          title: { type: "string", maxLength: 180 },
          description: { type: "string", maxLength: 8000 },
          audio: { type: "blob", accept: ["audio/*"], maxSize: 300 * 1024 * 1024 },
          durationSec: { type: "integer", minimum: 0 },
          explicit: { type: "boolean" },
          publishedAt: { type: "string", format: "datetime" },
          createdAt: { type: "string", format: "datetime" },
          updatedAt: { type: "string", format: "datetime" }
        }
      }
    }
  }
} as const;

export default episode;

