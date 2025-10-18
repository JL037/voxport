// ATProto lexicon: app.voxport.series
const series = {
  lexicon: 1,
  id: "app.voxport.series",
  defs: {
    main: {
      type: "record",
      key: "tid",
      record: {
        type: "object",
        required: ["title", "createdAt"],
        properties: {
          title: { type: "string", maxLength: 120 },
          description: { type: "string", maxLength: 4000 },
          authorDid: { type: "string", format: "did" },
          language: { type: "string", maxLength: 16, description: "BCP-47 tag, e.g. en or en-US" },
          category: { type: "string", maxLength: 64 },
          explicit: { type: "boolean" },
          cover: { type: "blob", accept: ["image/*"], maxSize: 5 * 1024 * 1024 },
          siteUrl: { type: "string", format: "uri" },
          createdAt: { type: "string", format: "datetime" },
          updatedAt: { type: "string", format: "datetime" }
        }
      }
    }
  }
} as const;

export default series;

