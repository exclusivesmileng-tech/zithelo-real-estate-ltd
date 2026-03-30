import { defineType, defineField } from "sanity";

export const serviceSchema = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "iconName",
      title: "Icon",
      type: "string",
      description: "Lucide icon name — choose one of: Building2, Globe, Users, TrendingUp",
      options: { list: ["Building2", "Globe", "Users", "TrendingUp"] },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({ name: "points", title: "Bullet Points", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title" } },
});
