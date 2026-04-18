import type { Metadata } from "next";
import RestrictedContent from "@/components/form/RestrictedContent";
import PageHero from "@/components/page/Hero";
import LegalDocsPageContent from "@/components/legal-docs/PageContent";

export const metadata: Metadata = {
  title: "Legal Docs | Alpha Capital One",
  description:
    "View and download Alpha Capital One legal documents including the Applicant CIS, capabilities brief, and Non-QM loan services overview.",
  alternates: { canonical: "/legal-docs" },
  openGraph: {
    title: "Legal Docs | Alpha Capital One",
    description:
      "View and download Alpha Capital One legal documents including the Applicant CIS, capabilities brief, and Non-QM loan services overview.",
    url: "/legal-docs",
    type: "website",
  },
};

export default function LegalDocsPage() {
  return (
    <RestrictedContent>
      <PageHero
        title="Legal Docs"
        description="View and download Alpha Capital One legal documents including the Applicant CIS, capabilities brief, Mutual NCNDA, and Non-QM loan services overview."
        showScrollDown
      />
      <LegalDocsPageContent />
    </RestrictedContent>
  );
}
