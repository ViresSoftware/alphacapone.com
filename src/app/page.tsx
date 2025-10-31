import Hero from "@/components/home/heroVideo";
import RestrictedContent from "@/components/form/RestrictedContent";
import ArtificialIntelligence from "@/components/investments/ArtificialIntelligence";
import CryptoCurrencyInvestments from "@/components/investments/CryptoCurrency";
import GoldInvestments from "@/components/investments/GoldInvestments";
import CommoditiesInvestments from "@/components/investments/Commodities";

export default function IndexPage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <ArtificialIntelligence />
        <CryptoCurrencyInvestments />
        <GoldInvestments />
        <CommoditiesInvestments />
      </RestrictedContent>
    </>
  );
}
