import Hero from "@/components/home/heroVideo";
import RestrictedContent from "@/components/form/RestrictedContent";
import ArtificialIntelligence from "@/components/investments/ArtificialIntelligence";

export default function InvestmentsPage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <ArtificialIntelligence />
      </RestrictedContent>
    </>
  );
}
