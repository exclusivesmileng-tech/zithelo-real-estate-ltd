import type { Metadata } from "next";
import AboutPageClient from "./AboutPageClient";

export const metadata: Metadata = {
  title: "About | Africa's Premium Urban Development Company",
  description:
    "Zithelo Real Estate is a pan-African urban development company building premium, fibre-ready apartments for modern professionals and diaspora investors. Verified title. 25-year lease.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Zithelo Real Estate | Pan-African Urban Development",
    description:
      "Building premium, fibre-ready real estate across Africa's fastest-growing cities for modern professionals and diaspora investors.",
  },
};

export default function Page() {
  return <AboutPageClient />;
}
