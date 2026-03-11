'use client';

const items = [
  {
    name: "Portfolio Acquisitions",
    description:
      "Acquisition of performing residential Non-QM loan pools across a range of product types.",
  },
  {
    name: "Loan Tape Review",
    description:
      "Analysis of collateral, borrower profile, product mix, concentration, and performance.",
  },
  {
    name: "Structured Execution",
    description:
      "A professional process from initial review through diligence, documentation, and closing.",
  },
  {
    name: "Who We Work With",
    description:
      "Banks, lenders, originators, capital partners, and private portfolio sellers seeking liquidity or balance sheet optimization.",
  },
];

export default function NonQMLoanAcquisitionsWhatWeDo() {
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
        {/* Heading */}
        <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-12">
          What We Do
        </h2>
        {/* Items Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4"
            >
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
