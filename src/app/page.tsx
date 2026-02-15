
import RestrictedContent from "@/components/form/RestrictedContent";
import Hero from "@/components/redesign/Hero";
// import Mandates from "@/components/redesign/Mandates";
import LuxMarket from "@/components/redesign/LuxMarket";
import Intelligence from "@/components/redesign/Intelligence";
import Process from "@/components/redesign/Process";
import Counterparties from "@/components/redesign/Counterparties";
import Access from "@/components/redesign/Access";
import HomeFeaturedCrypto from "@/components/home/FeaturedCrypto";
import Services from "@/components/redesign/Services";
// import TrustBadge from "@/components/TrustBadge";
import "./redesign/redesign.css";

export default function IndexPage() {
  return (
    <RestrictedContent>
      <div className="mx-auto pb-12">
        <div>
          <Hero />
        </div>
        {/* <div>
          <Mandates />
        </div> */}
        <div>
          <Services />
        </div>
        <div>
          <Intelligence />
        </div>
        <div>
          <HomeFeaturedCrypto />
        </div>
        <div>
          <LuxMarket />
        </div>
        <div>
          <Process />
        </div>
        <div>
          <Counterparties />
        </div>
        <div>
          <Access />
        </div>
        {/* <div>
          <TrustBadge />
        </div> */}
      </div>
    </RestrictedContent>
  );
}
