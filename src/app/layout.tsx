import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SavedPropertiesProvider } from "@/contexts/SavedPropertiesContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import SavedDrawer from "@/components/SavedDrawer";

export const metadata: Metadata = {
  title: "Zithelo Real Estate Limited | Premium Urban Development",
  description: "Zithelo is a pan-African urban development and real estate investment company building premium connected spaces for modern professionals and diaspora investors.",
  icons: {
    icon: "/images/favicon.png",
    apple: "/images/favicon.png",
  },
  openGraph: {
    title: "Zithelo Real Estate Limited",
    description: "Premium urban development across Africa's fastest-growing cities.",
    type: "website",
    images: [
      {
        url: "/images/zithelo-logo-colored.png",
        width: 1200,
        height: 630,
        alt: "Zithelo Real Estate Limited",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zithelo Real Estate Limited",
    description: "Premium urban development across Africa's fastest-growing cities.",
    images: ["/images/zithelo-logo-colored.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col antialiased">
        <ThemeProvider>
          <SavedPropertiesProvider>
            <Navbar />
            <main className="flex-1 pb-16 lg:pb-0">{children}</main>
            <Footer />
            <FloatingActions />
            <ExitIntentPopup />
            <SavedDrawer />
          </SavedPropertiesProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
