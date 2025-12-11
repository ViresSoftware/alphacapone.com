import Counterpartiesdiv from "@/components/redesign/Counterparties";
import Herodiv from "@/components/redesign/Hero";
import Intelligencediv from "@/components/redesign/Intelligence";
import LuxMarketdiv from "@/components/redesign/LuxMarket";
import Mandatesdiv from "@/components/redesign/Mandates";
import Processdiv from "@/components/redesign/Process";
import Accessdiv from "@/components/redesign/Access";
import "./redesign.css";

export default function RedesignPage() {
  return (
    <main className="mx-auto pb-12">
      <div>
        <Herodiv />
      </div>
      <div>
        <Mandatesdiv />
      </div>
      <div>
        <LuxMarketdiv />
      </div>
      <div>
        <Intelligencediv />
      </div>
      <div>
        <Processdiv />
      </div>
      <div>
        <Counterpartiesdiv />
      </div>
      <div>
        <Accessdiv />
      </div>
    </main>
  );
}
