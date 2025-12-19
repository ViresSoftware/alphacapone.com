
import RestrictedContent from "@/components/form/RestrictedContent";
import PageHero from "@/components/page/Hero";
import ContactForm from "@/components/contact/Form";

export default function ContactPage() {
  return (
    <>
      <RestrictedContent>
        <PageHero />
        <ContactForm />
      </RestrictedContent>
    </>
  );
}
