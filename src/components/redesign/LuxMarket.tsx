export default function LuxMarketSection() {
  return (
    <>
      <div className="sectionTitle">Lux Market™</div>
      <div className="luxWrapper">
        <div className="luxText">
          <h2 className="sectionHeading">Lux Market™ – Private Luxury Marketplace</h2>
          <p>
            An invite-only interface connecting qualified buyers and sellers of
            exotic vehicles, fine art, watches, and other high-value assets.
          </p>
          <p>
            Curated listings, not open classifieds. Identity and counterparty
            screening. Integration with our transaction and escrow workflows.
          </p>
          <button className="buttonPrimary">Request Lux Market Access</button>
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