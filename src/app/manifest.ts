import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zithelo Real Estate Limited",
    short_name: "Zithelo",
    description:
      "Premium urban development across Africa's fastest-growing cities. Invest in structured real estate with verified title and 25-year lease security.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a0906",
    theme_color: "#c9a84c",
    orientation: "portrait-primary",
    categories: ["finance", "business", "lifestyle"],
    icons: [
      {
        src: "/images/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/images/favicon.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    shortcuts: [
      {
        name: "View Projects",
        short_name: "Projects",
        description: "Browse our active developments",
        url: "/projects",
        icons: [{ src: "/images/favicon.png", sizes: "96x96" }],
      },
      {
        name: "Invest With Us",
        short_name: "Invest",
        description: "Become a Zithelo investor",
        url: "/become-an-investor",
        icons: [{ src: "/images/favicon.png", sizes: "96x96" }],
      },
      {
        name: "Contact Us",
        short_name: "Contact",
        description: "Get in touch with our team",
        url: "/contact",
        icons: [{ src: "/images/favicon.png", sizes: "96x96" }],
      },
    ],
    screenshots: [],
  };
}
