import Hero from "@/components/home/heroVideo";
import RestrictedContent from "@/components/form/RestrictedContent";
import CryptoCurrencyInvestments from "@/components/investments/Cryptocurrencies";

export default function CryptocurrenciesPage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <CryptoCurrencyInvestments />
      </RestrictedContent>
    </>
  );
}
