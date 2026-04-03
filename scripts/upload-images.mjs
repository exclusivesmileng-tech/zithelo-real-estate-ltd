/**
 * Zithelo Image Upload Script
 * ─────────────────────────────────────────────────────────────────────────────
 * Uploads all local images to Sanity CDN and patches documents to reference them.
 *
 * Usage:  node scripts/upload-images.mjs
 * (reads SANITY_API_TOKEN from .env.local automatically)
 */

import { createClient } from "@sanity/client";
import { readFileSync, createReadStream, existsSync } from "fs";
import { resolve, dirname, extname, basename } from "path";
import { fileURLToPath } from "url";

const __dir = dirname(fileURLToPath(import.meta.url));
const ROOT  = resolve(__dir, "..");

// ── Load .env.local ───────────────────────────────────────────────────────────
if (!process.env.SANITY_API_TOKEN) {
  try {
    const lines = readFileSync(resolve(ROOT, ".env.local"), "utf8").split("\n");
    for (const line of lines) {
      const [key, ...rest] = line.split("=");
      if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
    }
  } catch { /* ok */ }
}

if (!process.env.SANITY_API_TOKEN) {
  console.error("❌  SANITY_API_TOKEN not found in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "16qij170",
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET   ?? "production",
  apiVersion: "2024-01-01",
  token:      process.env.SANITY_API_TOKEN,
  useCdn:     false,
});

// ── Helper: upload a file and return the Sanity image reference ───────────────
async function uploadImage(filePath, label) {
  if (!existsSync(filePath)) {
    console.warn(`  ⚠  Not found, skipping: ${filePath}`);
    return null;
  }
  const ext      = extname(filePath).slice(1).toLowerCase();
  const mimeMap  = { jpg: "image/jpeg", jpeg: "image/jpeg", png: "image/png", gif: "image/gif", webp: "image/webp" };
  const mimeType = mimeMap[ext] ?? "image/jpeg";

  try {
    const asset = await client.assets.upload("image", createReadStream(filePath), {
      filename:    basename(filePath),
      contentType: mimeType,
    });
    console.log(`  ✓  Uploaded ${label}`);
    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (err) {
    console.error(`  ✗  Failed ${label}: ${err.message}`);
    return null;
  }
}

// ── Helper: patch a document field with an image reference ───────────────────
async function patchImage(docId, field, imageRef) {
  if (!imageRef) return;
  await client.patch(docId).set({ [field]: imageRef }).commit();
  console.log(`    → patched ${docId}.${field}`);
}

// ═════════════════════════════════════════════════════════════════════════════
// 1. TEAM MEMBER PHOTOS
// ═════════════════════════════════════════════════════════════════════════════
console.log("\n📸  Uploading team member photos…");

const teamPhotos = [
  {
    docId:    "team-dr-oluwaseun-akinbobola",
    filePath: resolve(ROOT, "public/images/team/Dr. Akinbobola Oluwaseun (Board Executive Chairman).jpg"),
    label:    "Dr. Akinbobola (Chairman)",
  },
  {
    docId:    "team-mrs-ibitayo-akinbobola",
    filePath: resolve(ROOT, "public/images/team/Mrs. Ibitayo Akinbobola (CEO).jpg"),
    label:    "Mrs. Ibitayo Akinbobola (CEO)",
  },
  {
    docId:    "team-arc-odunayo-lawani",
    filePath: resolve(ROOT, "public/images/team/Odunayo Lawani (Board Advisory).jpeg"),
    label:    "Arc. Odunayo Lawani",
  },
  {
    docId:    "team-ibikunle-iwalewa",
    filePath: resolve(ROOT, "public/images/team/Mr Ibikunle Iwalewa.png"),
    label:    "Mr. Ibikunle Iwalewa",
  },
  {
    docId:    "team-filusi-toyin-diya",
    filePath: resolve(ROOT, "public/images/team/toyin-filusi.jpeg"),
    label:    "Builder Filusi Toyin Diya",
  },
  {
    docId:    "team-gabriel-akintayo",
    filePath: resolve(ROOT, "public/images/team/Gabriel Akintayo (Head, Customer Experience).jpeg"),
    label:    "Mr. Gabriel Akintayo",
  },
];

for (const { docId, filePath, label } of teamPhotos) {
  const ref = await uploadImage(filePath, label);
  await patchImage(docId, "photo", ref);
}

// ═════════════════════════════════════════════════════════════════════════════
// 2. ANDOYI HOUSE — hero image + gallery
// ═════════════════════════════════════════════════════════════════════════════
console.log("\n🏗   Uploading Andoyi House images…");

const andoyiHero = await uploadImage(
  resolve(ROOT, "public/images/andoyi/2.png"),
  "Andoyi hero"
);
await patchImage("project-andoyi-house", "heroImage", andoyiHero);

// Gallery
const andoyiGalleryFiles = [
  "2.png", "3.png", "4.png", "5.png",
  "interior1.jpeg", "interior2.jpeg", "interior3.jpeg", "interior4.jpeg", "interior5.jpeg",
];
const andoyiGallery = [];
for (const file of andoyiGalleryFiles) {
  const ref = await uploadImage(resolve(ROOT, `public/images/andoyi/${file}`), `Andoyi gallery: ${file}`);
  if (ref) andoyiGallery.push({ ...ref, _key: file.replace(/[^a-z0-9]/gi, "_") });
}
if (andoyiGallery.length) {
  await client.patch("project-andoyi-house").set({ gallery: andoyiGallery }).commit();
  console.log(`    → patched project-andoyi-house.gallery (${andoyiGallery.length} images)`);
}

// ═════════════════════════════════════════════════════════════════════════════
// 3. SIGNATURE HOMES — hero image + gallery
// ═════════════════════════════════════════════════════════════════════════════
console.log("\n🏠  Uploading Signature Homes images…");

const sigHero = await uploadImage(
  resolve(ROOT, "public/images/signature/zsh1.jpg.jpeg"),
  "Signature Homes hero"
);
await patchImage("project-signature-homes", "heroImage", sigHero);

// Gallery — all signature images
const sigFiles = [
  "zsh1.jpg.jpeg", "zsh2.jpg.jpeg", "zsh3.jpg.jpeg", "zsh4.jpg.jpeg", "zsh5.jpg.jpeg",
  "1.png", "2.jpeg",
  "ZH3.jpg", "ZH4.jpg", "ZH5.jpg", "ZH6.jpg", "ZH7.jpg", "ZH8.jpg",
  "ZH9.jpg", "ZH10.jpg", "ZH11.jpg", "ZH12.jpg", "ZH13.jpg", "ZH14.jpg",
];
const sigGallery = [];
for (const file of sigFiles) {
  const fp = resolve(ROOT, `public/images/signature/${file}`);
  const ref = await uploadImage(fp, `Signature gallery: ${file}`);
  if (ref) sigGallery.push({ ...ref, _key: file.replace(/[^a-z0-9]/gi, "_") });
}
if (sigGallery.length) {
  await client.patch("project-signature-homes").set({ gallery: sigGallery }).commit();
  console.log(`    → patched project-signature-homes.gallery (${sigGallery.length} images)`);
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. SITE SETTINGS — logo + site images
// ═════════════════════════════════════════════════════════════════════════════
console.log("\n⚙️   Uploading site assets…");

const logoWhite    = await uploadImage(resolve(ROOT, "public/images/zithelo-logo-white.png"),   "Logo (white)");
const logoColored  = await uploadImage(resolve(ROOT, "public/images/zithelo-logo-colored.png"), "Logo (colored)");
const logoMain     = await uploadImage(resolve(ROOT, "public/images/zithelo-logo.png"),         "Logo (main)");

if (logoWhite || logoColored || logoMain) {
  const patch = {};
  if (logoWhite)   patch.logoWhite   = logoWhite;
  if (logoColored) patch.logoColored = logoColored;
  if (logoMain)    patch.logo        = logoMain;
  await client.patch("siteSettings").set(patch).commit();
  console.log("    → patched siteSettings logos");
}

// ─────────────────────────────────────────────────────────────────────────────
console.log("\n✨  Image upload complete!\n");
console.log("   Open the Studio at http://localhost:3000/studio to verify.");
console.log("   Team members and projects should now show their photos.\n");
