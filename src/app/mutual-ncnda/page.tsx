import Link from "next/link";

import PageHeader from "@/components/page/header";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Mutual NCNDA | Alpha Capital One",
  description:
    "Access the Mutual Non-Circumvention, Non-Disclosure and Confidentiality Agreement.",
};

export default function MutualNCNDAPage() {
  return (
    <>
      <PageHeader
        title="Mutual Non-Circumvention, Non-Disclosure and Confidentiality Agreement"
        backgroundImage="/signed-paperwork.jpg"
      />
      <section className="mx-auto max-w-4xl px-6 py-12 text-center md:px-20 md:py-16">
        <Button asChild size="lg">
          <Link
            href="https://www.alphacapone.com/pdfs/Mutual-NCNDA.pdf"
            target="_blank"
            rel="noreferrer"
          >
            Open PDF
          </Link>
        </Button>
      </section>
    </>
  );
}
