export default function ProcessSection() {
  const steps = [
    {
      number: "01",
      title: "Introduction & Scope",
      description: "Qualify the parties, their mandate, and jurisdiction.",
    },
    {
      number: "02",
      title: "Compliance & Forensics",
      description: "Review wallets, flows, documentation, and counterparties.",
    },
    {
      number: "03",
      title: "Structure & Documentation",
      description: "Align on SPA, LOI, escrow, and professional involvement.",
    },
    {
      number: "04",
      title: "Execution & Settlement",
      description: "Execute tranches and settle per agreed procedures.",
    },
  ];

  return (
    <section
      className="relative bg-cover bg-center"
      style={{
        backgroundImage: "url('/patterns/steel-metal-plate.jpeg')",
        backgroundSize: "20rem",
      }}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-0" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-0" />
      <div className="absolute inset-0 bg-black opacity-80 z-0"></div>      
      <div className="relative max-w-7xl px-6 md:px-20 mx-auto py-16 z-10">
        <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
          Process
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
          How We Operate
        </h2>
        <div className="relative border-l border-gray-700 ml-4 md:ml-12">
          {steps.map((step, idx) => (
            <div key={idx} className="mb-12 relative pl-8 md:pl-12">
              {/* Step Number */}
              <div className="absolute -left-5 md:-left-6 top-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-accent flex items-center justify-center text-black font-bold text-sm md:text-base shadow-lg">
                {step.number}
              </div>
              {/* Step Content */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-5 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-200 text-sm md:text-[0.95rem]">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
