import { defineType, defineField } from "sanity";

export const regionSchema = defineType({
  name: "region",
  title: "Africa Vision — Region",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Region Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "countries", title: "Countries", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["Active", "Expansion", "Research"] },
    }),
    defineField({ name: "description", title: "Description", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "status" } },
});
