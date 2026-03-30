import { defineType, defineField } from "sanity";

export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Single instance — only create one document of this type in the studio
  fields: [
    // ─── Contact ────────────────────────────────────────────────────────────
    defineField({ name: "address", title: "Office Address", type: "string" }),
    defineField({ name: "email", title: "General Email", type: "string" }),
    defineField({ name: "phone", title: "Phone", type: "string" }),
    defineField({ name: "partnershipEmail", title: "Partnership Email", type: "string" }),

    // ─── About page ─────────────────────────────────────────────────────────
    defineField({ name: "aboutIntro1", title: "About — Intro Paragraph 1", type: "text", rows: 4 }),
    defineField({ name: "aboutIntro2", title: "About — Intro Paragraph 2", type: "text", rows: 4 }),
    defineField({ name: "aboutVision", title: "About — Vision", type: "text", rows: 4 }),
    defineField({ name: "aboutMission", title: "About — Mission", type: "text", rows: 4 }),
    defineField({ name: "aboutPhilosophy", title: "About — Philosophy", type: "text", rows: 4 }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
