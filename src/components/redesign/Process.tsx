export default function ProcessSection() {
  return (
    <>
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">Process</div>
      <h2 className="text-[1.4rem] mb-4">How We Operate</h2>
      <div className="timeline">
        <div className="timelineStep">
          <span className="stepNumber">01</span>
          <h3>Introduction & Scope</h3>
          <p>Qualify the parties, their mandate, and jurisdiction.</p>
        </div>
        <div className="timelineStep">
          <span className="stepNumber">02</span>
          <h3>Compliance & Forensics</h3>
          <p>Review wallets, flows, documentation, and counterparties.</p>
        </div>
        <div className="timelineStep">
          <span className="stepNumber">03</span>
          <h3>Structure & Documentation</h3>
          <p>Align on SPA, LOI, escrow, and professional involvement.</p>
        </div>
        <div className="timelineStep">
          <span className="stepNumber">04</span>
          <h3>Execution & Settlement</h3>
          <p>Execute tranches and settle per agreed procedures.</p>
        </div>
      </div>
    </>
  );
}