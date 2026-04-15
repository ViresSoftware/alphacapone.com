import type { Metadata } from "next";
import RestrictedContent from "@/components/form/RestrictedContent";
import Hero from "@/components/redesign/Hero";
import LuxMarket from "@/components/redesign/LuxMarket";
import Intelligence from "@/components/redesign/Intelligence";
import Process from "@/components/redesign/Process";
import Counterparties from "@/components/redesign/Counterparties";
import Access from "@/components/redesign/Access";
import HomeFeaturedCrypto from "@/components/home/FeaturedCrypto";
import Services from "@/components/redesign/Services";
import "./redesign/redesign.css";

export const metadata: Metadata = {
  title: "Alpha Capital One — Private Access to Digital, Energy & Fine Assets",
  description:
    "Invite-only access for verified principals, family offices, and law firms to structured transactions in digital assets, petroleum, and high-value luxury assets.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Alpha Capital One — Private Access to Digital, Energy & Fine Assets",
    description:
      "Invite-only access for verified principals, family offices, and law firms to structured transactions in digital assets, petroleum, and high-value luxury assets.",
    url: "/",
    type: "website",
  },
};

export default function IndexPage() {
  return (
    <RestrictedContent>
      <div className="mx-auto pb-12">
        <Hero />
        <Services />
        <Intelligence />
        <HomeFeaturedCrypto />
        <LuxMarket />
        <Process />
        <Counterparties />
        <Access />
      </div>
    </RestrictedContent>
  );
}
