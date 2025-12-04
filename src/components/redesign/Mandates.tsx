import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Bitcoin, Watch, Car, Fuel } from "lucide-react";

export default function MandatesSection() {
  const mandates = [
    {
      title: "Digital Assets",
      description:
        "Principal-to-principal Bitcoin and stablecoin transactions, structured via escrow, attorney trust, or vetted OTC channels for size.",
      icon: <Bitcoin className="w-6 h-6 text-white" />,
    },
    {
      title: "Energy & Petroleum",
      description:
        "Gas oil and related petroleum products, with a focus on direct counterparties, bank-to-bank coordination, and clean documentation.",
      icon: <Fuel className="w-6 h-6 text-white" />,
    },
    {
      title: "Fine Art & High-Value Assets",
      description:
        "Museum-grade works, rare timepieces, vehicles, and other high-value objects negotiated privately with strict confidentiality.",
      icon: <Watch className="w-6 h-6 text-white" />,
    },
    {
      title: "Lux Market™ Application",
      description:
        "Our private marketplace for curated exotic vehicles, fine art, and other luxury assets—available to verified buyers and sellers only.",
      icon: <Car className="w-6 h-6 text-white" />,
    },
  ];

  return (
    <section className="max-w-7xl px-6 mx-auto py-12">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Mandates
      </div>
      <h2 className="text-[1.4rem] mb-8">Mandates We Structure</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
        {mandates.map((mandate, idx) => (
          <Card
            key={idx}
            className="bg-[var(--bg-secondary)] border-[1px] border-[var(--border-subtle)] rounded-[14px] p-5 gap-4 hover:shadow-lg transition-shadow"
          >
            <CardHeader className="flex items-center gap-3">
              {mandate.icon}
              <CardTitle className="text-[1rem] text-white">{mandate.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-[0.9rem] text-white">
              {mandate.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
