'use client';

const steps = [
  {
    number: "01",
    name: "Initial Review",
    description:
      "Preliminary assessment of portfolio size, composition, and performance.",
  },
  {
    number: "02",
    name: "Underwriting",
    description:
      "Detailed review of loan tape, collateral characteristics, and risk profile.",
  },
  {
    number: "03",
    name: "Transaction Structuring",
    description:
      "Alignment on pricing, diligence items, and purchase terms.",
  },
  {
    number: "04",
    name: "Closing",
    description:
      "Final documentation, transfer coordination, and settlement.",
  },
];

export default function NonQMLoanAcquisitionsOurProcess() {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/patterns/steel-metal-plate.jpeg')",
        backgroundSize: "20rem",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-1" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-1" />
      <div className="absolute inset-0 bg-black opacity-80 z-1"></div>
      <div className="relative max-w-7xl px-6 md:px-20 mx-auto py-16 z-10">
        {/* Section label */}
        <div className="relative font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
          Our Process
        </div>
        {/* Heading */}
        <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-12">
          How We Work
        </h2>
        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-lg bg-accent/20 text-accent font-bold text-sm flex-shrink-0">
                  {step.number}
                </span>
                <h3 className="text-xl font-semibold text-white">{step.name}</h3>
              </div>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
