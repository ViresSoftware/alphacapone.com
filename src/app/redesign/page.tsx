import Counterpartiesdiv from "@/components/redesign/Counterparties";
import "./redesign.css";
import Herodiv from "@/components/redesign/Hero";
import Intelligencediv from "@/components/redesign/Intelligence";
import LuxMarketdiv from "@/components/redesign/LuxMarket";
import Mandatesdiv from "@/components/redesign/Mandates";
import Processdiv from "@/components/redesign/Process";
import Accessdiv from "@/components/redesign/Access";

export default function RedesignPage() {
  return (
    <main className="max-w-7xl mx-auto pt-24 pb-12 space-y-10">
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
