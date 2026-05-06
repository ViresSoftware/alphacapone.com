import type { Metadata } from "next";
import RestrictedContent from "@/components/form/RestrictedContent";
import PageHero from "@/components/page/Hero";
import Services from "@/components/redesign/Services";

export const metadata: Metadata = {
  title: "Services | Alpha Capital One",
  description:
    "Private equity, structured investments, cryptocurrency custody, petroleum, fine art, and tier-one trading services for verified institutional principals.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Services | Alpha Capital One",
    description:
      "Private equity, structured investments, cryptocurrency custody, petroleum, fine art, and tier-one trading services for verified institutional principals.",
    url: "/services",
    type: "website",
    images: [{ url: "/logo/logo-metallic-black-bg.png" }],
  },
};

export default function ServicesPage() {
  return (
    <RestrictedContent>
      <PageHero
        title="Services"
        description="Private equity, structured investments, cryptocurrency custody, petroleum, fine art, and tier-one trading services for verified institutional principals."
        showScrollDown
      />
      <Services />
    </RestrictedContent>
  );
}
