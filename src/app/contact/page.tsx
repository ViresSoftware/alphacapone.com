
import RestrictedContent from "@/components/form/RestrictedContent";
import Hero from "@/components/home/heroVideo";
import ContactForm from "@/components/form/contact";

export default function ContactPage() {
  return (
    <>
      <RestrictedContent>
        <Hero />
        <ContactForm />
      </RestrictedContent>
    </>
  );
}
