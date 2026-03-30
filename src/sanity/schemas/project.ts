import { defineType, defineField, defineArrayMember } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "type", title: "Property Type", type: "string" }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["Under Construction", "Complete", "Pipeline"] } }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "year", title: "Year Range", type: "string" }),
    defineField({ name: "units", title: "Number of Units", type: "string" }),
    defineField({ name: "leaseTerm", title: "Lease Term", type: "string" }),
    defineField({ name: "leaseNote", title: "Lease Note", type: "string" }),
    defineField({ name: "badge",       title: "Badge Label (e.g. Smart Living)",             type: "string" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle (below title on card)",          type: "string" }),
    defineField({ name: "shortDesc", title: "Short Description", type: "text", rows: 2 }),
    defineField({ name: "description", title: "Full Description", type: "array", of: [{ type: "block" }] }),
    defineField({
      name: "features",
      title: "Feature Checklist (shown on home page card)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "heroVideo", title: "Hero Video URL", type: "url" }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoClips",
      title: "Video Clips",
      type: "array",
      of: [
        defineArrayMember({
          name: "clip",
          title: "Clip",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "src", title: "Video URL", type: "url" }),
            defineField({ name: "thumb", title: "Thumbnail", type: "image", options: { hotspot: true } }),
          ],
        }),
      ],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          name: "stat",
          title: "Stat",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "value", title: "Value", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "heroImage" },
  },
});
