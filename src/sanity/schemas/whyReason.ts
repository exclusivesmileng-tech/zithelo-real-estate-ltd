import { defineType, defineField } from "sanity";

export const whyReasonSchema = defineType({
  name: "whyReason",
  title: "Why Zithelo — Reason",
  type: "document",
  fields: [
    defineField({ name: "number", title: "Number Label (e.g. 01)", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "details", title: "Details (shown in italic)", type: "text", rows: 2 }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "number" } },
});
