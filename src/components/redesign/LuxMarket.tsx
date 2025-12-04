export default function LuxMarketSection() {
  return (
    <section className="max-w-7xl px-6 mx-auto py-16">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Lux Market™
      </div>

      <div className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-16">
        {/* Left Text */}
        <div className="luxText max-w-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Lux Market™ – Private Luxury Marketplace
          </h2>
          <p className="text-gray-300 leading-relaxed">
            An invite-only interface connecting qualified buyers and sellers of exotic vehicles, fine art, watches, and other high-value assets.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Curated listings, not open classifieds. Identity and counterparty screening. Integration with our transaction and escrow workflows.
          </p>
          <button className="inline-flex items-center justify-center px-7 py-3 md:px-8 md:py-3 rounded-lg bg-accent text-black font-semibold text-sm md:text-[0.9rem] tracking-wide uppercase hover:bg-[var(--accent-hover)] shadow-lg transition-all duration-300">
            Request Lux Market Access
          </button>
        </div>

        {/* Right Mockup */}
        <div className="luxMockup w-full ms-auto max-w-sm">
          <div className="mockupPanel bg-gray-800/60 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-700">
            <div className="mockupHeader text-lg font-semibold text-white mb-4">
              Lux Market
            </div>

            <div className="mockupRow flex justify-between py-2 border-b border-gray-700 last:border-none">
              <div className="mockupTag text-gray-300 font-medium">Exotic Vehicle</div>
              <div className="mockupValue text-white font-semibold">Private Listing</div>
            </div>
            <div className="mockupRow flex justify-between py-2 border-b border-gray-700 last:border-none">
              <div className="mockupTag text-gray-300 font-medium">Fine Art</div>
              <div className="mockupValue text-white font-semibold">Gallery Grade</div>
            </div>
            <div className="mockupRow flex justify-between py-2 border-b border-gray-700 last:border-none">
              <div className="mockupTag text-gray-300 font-medium">Timepiece</div>
              <div className="mockupValue text-white font-semibold">Waitlisted</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
