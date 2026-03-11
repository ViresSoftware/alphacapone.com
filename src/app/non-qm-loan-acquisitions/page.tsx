import RestrictedContent from "@/components/form/RestrictedContent";
import PageHeader from "@/components/page/header";
import { SteelButton } from "@/components/SteelButton";
import NonQMLoanAcquisitionsCapabilities from "@/components/non-qm-loan-acquisitions/Capabilities";
import NonQMLoanAcquisitionsWhatWeDo from "@/components/non-qm-loan-acquisitions/WhatWeDo";
import OurProcess from "@/components/non-qm-loan-acquisitions/OurProcess";

export const metadata = {
  title: "Non-QM Loan Acquisitions | Alpha Capital One",
  description:
    "Alpha Capital One acquires performing residential Non-QM loan portfolios for qualified sellers seeking a credible counterparty, disciplined review, and efficient execution.",
};

export default function NonQMLoanAcquisitionsPage() {
  return (
    <>
      <RestrictedContent>
        <PageHeader
          title="Non-QM Loan Acquisitions"
          description="Private access to Non-QM portfolio liquidity for qualified sellers."
          backgroundImage="/signed-paperwork.jpg"
        />
        <section className="max-w-4xl px-6 md:px-20 mx-auto py-12 md:py-16">
          <p className="text-[var(--text-primary)] text-lg md:text-xl leading-relaxed">
            Alpha Capital One acquires performing residential Non-QM loan portfolios through a confidential and disciplined transaction process. We work with lenders, originators, portfolio managers, and note holders seeking a credible buyer capable of efficient review, clear communication, and reliable execution.
          </p>
        </section>
        <NonQMLoanAcquisitionsWhatWeDo />
        <NonQMLoanAcquisitionsCapabilities />
        <OurProcess />
        <section
          className="relative bg-cover bg-center"
          // style={{
          //   backgroundImage: "url('/patterns/steel-metal-plate.jpeg')",
          //   backgroundSize: "20rem",
          // }}
        >
          <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-1" />
          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-1" />
          <div className="absolute inset-0 bg-black opacity-80 z-1" />
          <div className="relative max-w-3xl px-6 md:px-20 mx-auto py-16 z-10 text-center">
            <p className="text-xl md:text-2xl text-white font-medium mb-8 leading-relaxed">
              For confidential review of a performing Non-QM opportunity, contact Alpha Capital One.
            </p>
            <div className="text-center flex justify-center">
              <SteelButton href="/contact">Contact Us</SteelButton>
            </div>
          </div>
        </section>
      </RestrictedContent>
    </>
  );
}
