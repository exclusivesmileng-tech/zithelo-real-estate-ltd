import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "@/sanity/schemas";

export default defineConfig({
  name: "zithelo",
  title: "Zithelo CMS",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "16qij170",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // ─ Singletons ───────────────────────────────────────────────────────────────
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.listItem()
              .title("🏠 Home Page")
              .id("homePage")
              .child(S.document().schemaType("homePage").documentId("homePage")),
            S.listItem()
              .title("ℹ️ About Page")
              .id("aboutPage")
              .child(S.document().schemaType("aboutPage").documentId("aboutPage")),
            S.listItem()
              .title("🤝 Partnership Page")
              .id("partnershipPage")
              .child(S.document().schemaType("partnershipPage").documentId("partnershipPage")),
            S.divider(),
            // ─ Collections ───────────────────────────────────────────────────────────
            S.documentTypeListItem("project").title("🏗 Projects"),
            S.documentTypeListItem("insight").title("💡 Insights"),
            S.divider(),
            S.documentTypeListItem("teamMember").title("👥 Team Members"),
            S.documentTypeListItem("service").title("⚙️ Services"),
            S.documentTypeListItem("whyReason").title("✔️ Why Zithelo"),
            S.documentTypeListItem("region").title("🌍 Africa Vision — Regions"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  basePath: "/studio",
});

