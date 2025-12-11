"use client";

export default function IntelligenceSection() {
  const intelligencePoints = [
    "On-chain and transaction flow analysis.",
    "Counterparty and jurisdictional screening.",
    "Pattern detection for fraud and wash activity.",
    "Secure data operations tailored to private mandates.",
  ];

  return (
    <section className="max-w-7xl px-6 mx-auto py-16">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Intelligence Layer
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Intelligence & Risk for Real Transactions
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Cards */}
        <div className="space-y-4">
          {intelligencePoints.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <span className="w-3 h-3 mt-1 rounded-full bg-accent flex-shrink-0" />
              <p className="text-gray-200 text-[0.95rem] leading-relaxed">{point}</p>
            </div>
          ))}
        </div>
        {/* Right: Video */}
        <div className="relative w-full flex justify-center md:justify-end">
          <div className="rounded-xl overflow-hidden shadow-xl border border-gray-700">
            <video
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
            >
              <source src="/globe.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
