
import RestrictedContent from "@/components/form/RestrictedContent";
import Hero from "@/components/home/heroVideo";
import Company from "@/components/company";
import Stats from "@/components/stats";
import Commodities from "@/components/commodities";
import Privacy from "@/components/privacy";
import ContactForm from "@/components/form/contact";

export default function HomePage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <Company />
        <Stats />
        <Commodities />
        <Privacy />
        <ContactForm />
      </RestrictedContent>
    </>
  );
}
