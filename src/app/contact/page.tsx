import type { Metadata } from "next";
import ContactPageClient from "./ContactPageClient";

export const metadata: Metadata = {
  title: "Contact | Get in Touch With Zithelo",
  description:
    "Contact Zithelo Real Estate for investment enquiries, site visits, partnership opportunities, or general questions. Our team is available to help.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Zithelo Real Estate",
    description:
      "Get in touch for investment enquiries, site visits, or partnership opportunities.",
  },
};

export default function Page() {
  return <ContactPageClient />;
}
