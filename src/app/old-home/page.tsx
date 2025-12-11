import Hero from "@/components/home/heroVideo";
import RestrictedContent from "@/components/form/RestrictedContent";
import ArtificialIntelligence from "@/components/investments/ArtificialIntelligence";
import FeaturedCrypto from "@/components/home/FeaturedCrypto";
import CryptoCurrencyInvestments from "@/components/investments/Cryptocurrencies";
import GoldInvestments from "@/components/investments/Gold";
import LUXMarket from "@/components/home/LUXMarket";

export default function OldHomePage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <ArtificialIntelligence showFeatures={false}/>
        <FeaturedCrypto/>
        <CryptoCurrencyInvestments showFeatures={false}/>
        <LUXMarket/>
        <GoldInvestments showFeatures={false}/>
      </RestrictedContent>
    </>
  );
}
