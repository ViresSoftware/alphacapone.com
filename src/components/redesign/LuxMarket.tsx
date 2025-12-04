export default function LuxMarketSection() {
  return (
    <>
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">Lux Market™</div>
      <div className="luxWrapper">
        <div className="luxText">
          <h2 className="text-[1.4rem] mb-4">Lux Market™ – Private Luxury Marketplace</h2>
          <p>
            An invite-only interface connecting qualified buyers and sellers of
            exotic vehicles, fine art, watches, and other high-value assets.
          </p>
          <p>
            Curated listings, not open classifieds. Identity and counterparty
            screening. Integration with our transaction and escrow workflows.
          </p>
          <button className="w-full md:w-fit px-5 py-3 md:px-[1.8rem] md:py-[0.8rem] rounded-[4px] bg-accent text-[#040509] text-sm md:text-[0.9rem] font-medium tracking-[0.06em] hover:bg-[var(--accent-hover)]">Request Lux Market Access</button>
        </div>
        <div className="luxMockup">
          <div className="mockupPanel">
            <div className="mockupHeader">Lux Market</div>
            <div className="mockupRow">
              <div className="mockupTag">Exotic Vehicle</div>
              <div className="mockupValue">Private Listing</div>
            </div>
            <div className="mockupRow">
              <div className="mockupTag">Fine Art</div>
              <div className="mockupValue">Gallery Grade</div>
            </div>
            <div className="mockupRow">
              <div className="mockupTag">Timepiece</div>
              <div className="mockupValue">Waitlisted</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}