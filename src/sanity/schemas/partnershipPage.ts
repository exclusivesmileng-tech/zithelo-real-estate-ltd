import { defineType, defineField, defineArrayMember } from "sanity";

const partnerItemFields = [
  defineField({
    name: "iconName", title: "Icon",
    type: "string",
    options: { list: ["Users", "Building2", "TrendingUp", "Handshake"] },
  }),
  defineField({ name: "accent",      title: "Accent Label",   type: "string" }),
  defineField({ name: "title",       title: "Title",           type: "string" }),
  defineField({ name: "description", title: "Description",     type: "text",   rows: 4 }),
  defineField({
    name: "points", title: "Bullet Points",
    type: "array", of: [{ type: "string" }],
  }),
  defineField({ name: "cta",     title: "CTA Text",  type: "string" }),
  defineField({ name: "ctaHref", title: "CTA Link",  type: "string" }),
];

export const partnershipPageSchema = defineType({
  name: "partnershipPage",
  title: "Partnership & Investment Page",
  type: "document",
  fields: [
    // ─── Track 1: Partner ────────────────────────────────────────────────────
    defineField({
      name: "partnerTypes",
      title: "Partner Types (Track 1 — Partner)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "partnerType",
          fields: partnerItemFields,
          preview: { select: { title: "title" } },
        }),
      ],
    }),

    // ─── Track 2: Invest ─────────────────────────────────────────────────────
    defineField({
      name: "investorTypes",
      title: "Investor Types (Track 2 — Invest)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "investorType",
          fields: partnerItemFields,
          preview: { select: { title: "title" } },
        }),
      ],
    }),

    // ─── How It Works ────────────────────────────────────────────────────────
    defineField({
      name: "howItWorks",
      title: "How It Works — Steps",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "howItWorksStep",
          fields: [
            defineField({ name: "step",  title: "Step Number (e.g. 01)", type: "string" }),
            defineField({ name: "title", title: "Title",                  type: "string" }),
            defineField({ name: "body",  title: "Body Text",              type: "text", rows: 2 }),
          ],
          preview: { select: { title: "title", subtitle: "step" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Partnership Page" }) },
});
