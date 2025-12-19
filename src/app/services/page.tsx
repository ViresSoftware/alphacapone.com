
import RestrictedContent from "@/components/form/RestrictedContent";
import PageHero from "@/components/page/Hero";
import Services from "@/components/redesign/Services";

export default function ServicesPage() {
  return (
    <>
      <RestrictedContent>
        <PageHero />
        <Services />
      </RestrictedContent>
    </>
  );
}
