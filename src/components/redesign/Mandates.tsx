import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function MandatesSection() {
  const mandates = [
    {
      title: "Digital Assets",
      description:
        "Principal-to-principal Bitcoin and stablecoin transactions, structured via escrow, attorney trust, or vetted OTC channels for size.",
    },
    {
      title: "Energy & Petroleum",
      description:
        "Gas oil and related petroleum products, with a focus on direct counterparties, bank-to-bank coordination, and clean documentation.",
    },
    {
      title: "Fine Art & High-Value Assets",
      description:
        "Museum-grade works, rare timepieces, vehicles, and other high-value objects negotiated privately with strict confidentiality.",
    },
    {
      title: "Lux Market™ Application",
      description:
        "Our private marketplace for curated exotic vehicles, fine art, and other luxury assets—available to verified buyers and sellers only.",
    },
  ];

  return (
    <section>
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Mandates
      </div>
      <h2 className="text-[1.4rem] mb-4">Mandates We Structure</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-6">
        {mandates.map((mandate, idx) => (
          <Card
            key={idx}
            className="bg-[var(--bg-secondary)] border-[1px] border-[var(--border-subtle)] rounded-[14px] p-5 px-2 gap-0"
          >
            <CardHeader>
              <CardTitle className="text-[1rem] text-white"><h3>{mandate.title}</h3></CardTitle>
            </CardHeader>
            <CardContent className="text-[0.9rem] text-white">{mandate.description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
