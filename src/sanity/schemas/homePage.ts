import { defineType, defineField, defineArrayMember } from "sanity";

export const homePageSchema = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────────
    defineField({ name: "heroEyebrow", title: "Hero Eyebrow Text", type: "string" }),
    defineField({ name: "heroLine1",   title: "Hero Headline — Line 1", type: "string" }),
    defineField({ name: "heroLine2",   title: "Hero Headline — Line 2 (Gold Accent)", type: "string" }),
    defineField({ name: "heroSubtext", title: "Hero Subtext",           type: "text", rows: 3 }),

    // ─── Marquee ─────────────────────────────────────────────────────────────
    defineField({
      name: "marqueeItems",
      title: "Marquee Scrolling Items",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ─── Why Choose Zithelo cards ─────────────────────────────────────────────
    defineField({
      name: "whyCards",
      title: "Why Choose Zithelo — Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "whyCard",
          fields: [
            defineField({ name: "num",    title: "Number (e.g. 01)", type: "string" }),
            defineField({ name: "title",  title: "Title",            type: "string" }),
            defineField({ name: "desc",   title: "Description",      type: "text", rows: 2 }),
            defineField({ name: "detail", title: "Detail Tag",       type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "num" } },
        }),
      ],
    }),

    // ─── Who We Are ──────────────────────────────────────────────────────────
    defineField({ name: "whoWeAreP1", title: "Who We Are — Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "whoWeAreP2", title: "Who We Are — Paragraph 2", type: "text", rows: 4 }),

    // ─── Invest section ──────────────────────────────────────────────────────
    defineField({ name: "investHeadline1", title: "Invest — Headline Line 1",            type: "string" }),
    defineField({ name: "investHeadline2", title: "Invest — Headline Line 2 (Gold)",     type: "string" }),
    defineField({ name: "investSubtext",   title: "Invest — Subtext",                    type: "text", rows: 3 }),
  ],
  preview: { prepare: () => ({ title: "Home Page" }) },
});
