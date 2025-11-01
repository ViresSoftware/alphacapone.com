import Hero from "@/components/home/heroVideo";
import RestrictedContent from "@/components/form/RestrictedContent";
import GoldInvestments from "@/components/investments/Gold";

export default function CryptocurrenciesPage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <GoldInvestments />
      </RestrictedContent>
    </>
  );
}
