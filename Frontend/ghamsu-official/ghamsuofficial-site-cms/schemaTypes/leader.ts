import { defineType } from "sanity";

export default defineType({
  name: "leader",
  title: "Leaders",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "position",
      title: "Position",
      type: "string",
    },
    {
      name: "bio",
      title: "Biography",
      type: "text",
    },
    {
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    },
  ],
});
