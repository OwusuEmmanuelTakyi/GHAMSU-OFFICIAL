 import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero Scriptures",
  type: "document",
  fields: [
    defineField({
      name: "text",
      title: "Scripture Text",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
});
 