import { defineType, defineField } from "sanity";

export const teamMemberSchema = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Full Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "role", title: "Role / Title", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string", options: { list: ["Board", "Management"] } }),
    defineField({ name: "photo", title: "Photo", type: "image", options: { hotspot: true } }),
    defineField({ name: "tagline", title: "Tagline (one-sentence teaser for home page)", type: "text", rows: 2 }),
    defineField({ name: "bio", title: "Biography", type: "text", rows: 8 }),
    defineField({
      name: "credentials",
      title: "Credentials / Qualifications",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "featured", title: "Show on Home Page", type: "boolean" }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
