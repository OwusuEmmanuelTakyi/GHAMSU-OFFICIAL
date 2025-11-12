import { defineType } from "sanity";

export default defineType({
  name: "announcement",
  title: "Announcements",
  type: "document",
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "date",
      title: "Date",
      type: "datetime",
    },
    {
      name: "image",
      title: "Banner Image",
      type: "image",
    },
  ],
});
