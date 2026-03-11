'use client';

const items = [
  {
    name: "Portfolio Acquisitions",
    description:
      "Direct acquisition of performing residential Non-QM assets.",
  },
  {
    name: "Loan Tape Analysis",
    description:
      "Review of loan characteristics, collateral profile, and portfolio composition.",
  },
  {
    name: "Disciplined Process",
    description:
      "Clear execution from initial review through diligence and closing.",
  },
  {
    name: "Seller-Focused Approach",
    description:
      "Designed for institutions and portfolio holders seeking timely, professional execution.",
  },
];

export default function NonQMLoanAcquisitionsCapabilities() {
  return (
    <section
      className="relative bg-cover bg-center bg-black"
      // style={{
      //   backgroundImage: "url('/patterns/steel-metal-plate.jpeg')",
      //   backgroundSize: "20rem",
      // }}
    >
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-black to-transparent z-1" />
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent z-1" />
      <div className="absolute inset-0 bg-black opacity-80 z-1"></div>
      <div className="relative max-w-7xl px-6 md:px-20 mx-auto py-16 z-10">
        {/* Heading */}
        <h2 className="relative text-3xl md:text-4xl font-bold text-white mb-12">
          Our Capabilities
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
