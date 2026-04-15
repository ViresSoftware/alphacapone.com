import type { Metadata } from "next";
import RestrictedContent from "@/components/form/RestrictedContent";
import PageHero from "@/components/page/Hero";
import ContactForm from "@/components/contact/Form";

export const metadata: Metadata = {
  title: "Contact | Alpha Capital One",
  description:
    "Submit a confidential inquiry to Alpha Capital One. We respond only to verified principals, family offices, and regulated entities.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Alpha Capital One",
    description:
      "Submit a confidential inquiry to Alpha Capital One. We respond only to verified principals, family offices, and regulated entities.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <RestrictedContent>
      <PageHero />
      <ContactForm />
    </RestrictedContent>
  );
}
