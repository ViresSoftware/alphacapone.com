import RestrictedContent from "@/components/form/RestrictedContent";
import PageHeader from "@/components/page/header";
import NonQMLoans from "@/components/non-qm/NonQMLoans";

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
        <NonQMLoans />
      </RestrictedContent>
    </>
  );
}
