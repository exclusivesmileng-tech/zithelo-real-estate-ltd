import { defineType, defineField } from "sanity";

export const insightSchema = defineType({
  name: "insight",
  title: "Insight / Blog Post",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Market Intelligence", "Project Update", "Investment", "Company News"] } }),
    defineField({ name: "date", title: "Date", type: "date" }),
    defineField({ name: "excerpt", title: "Excerpt", type: "text", rows: 3 }),
    defineField({ name: "coverImage", title: "Cover Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", title: "Body", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
  ],
  orderings: [{ title: "Date, New", name: "dateDesc", by: [{ field: "date", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "category", media: "coverImage" },
  },
});
