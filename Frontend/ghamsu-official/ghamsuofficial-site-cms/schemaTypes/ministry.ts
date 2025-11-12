import { defineType } from "sanity";

export default defineType({
  name: "ministry",
  title: "Ministries",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Ministry Name",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    },
    {
      name: "description",
      title: "Description",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "leader",
      title: "Ministry Leader",
      type: "reference",
      to: [{ type: "leader" }],
    },
    {
      name: "image",
      title: "Ministry Image",
      type: "image",
      options: { hotspot: true },
    },
  ],
});
