import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutPageSchema = defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    // ─── Intro section ───────────────────────────────────────────────────────
    defineField({ name: "introHeadline", title: "Intro Headline", type: "string" }),
    defineField({ name: "introP1",       title: "Intro Paragraph", type: "text", rows: 4 }),
    defineField({
      name: "chips", title: "Intro Chips (tags)",
      type: "array", of: [{ type: "string" }],
    }),

    // ─── What / Who / How boxes ──────────────────────────────────────────────
    defineField({ name: "whatWeBuild",    title: "What We Build",    type: "text", rows: 2 }),
    defineField({ name: "whoWeBuildFor",  title: "Who We Build For", type: "text", rows: 2 }),
    defineField({ name: "howWeWin",       title: "How We Win",       type: "text", rows: 2 }),

    // ─── Foundation pillars ──────────────────────────────────────────────────
    defineField({
      name: "foundationPillars",
      title: "Foundation Pillars",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "pillar",
          fields: [
            defineField({
              name: "iconName", title: "Icon",
              type: "string",
              options: { list: ["Globe", "Building2", "Shield", "TrendingUp"] },
            }),
            defineField({ name: "label",  title: "Label",       type: "string" }),
            defineField({ name: "title",  title: "Title",       type: "string" }),
            defineField({ name: "text",   title: "Description", type: "text", rows: 3 }),
            defineField({ name: "detail", title: "Detail Tag",  type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        }),
      ],
    }),

    // ─── Key metrics ─────────────────────────────────────────────────────────
    defineField({
      name: "keyMetrics",
      title: "Key Metrics",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "metric",
          fields: [
            defineField({ name: "value", title: "Value", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "value" } },
        }),
      ],
    }),

    // ─── Operating model ─────────────────────────────────────────────────────
    defineField({
      name: "operatingModelPoints",
      title: "Operating Model Points",
      type: "array",
      of: [{ type: "string" }],
    }),

    // ─── Principles (Vision / Mission / Philosophy) ───────────────────────────
    defineField({
      name: "principles",
      title: "Vision / Mission / Philosophy",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "principle",
          fields: [
            defineField({ name: "key",   title: "Key (e.g. 01)",                     type: "string" }),
            defineField({ name: "label", title: "Label (Vision / Mission / Philosophy)", type: "string" }),
            defineField({ name: "title", title: "Title",                              type: "string" }),
            defineField({ name: "text",  title: "Description",                        type: "text", rows: 3 }),
            defineField({ name: "focus", title: "Focus Tag",                          type: "string" }),
          ],
          preview: { select: { title: "title", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "About Page" }) },
});
