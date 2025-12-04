export default function IntelligenceSection() {
  return (
    <section>
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Intelligence Layer
      </div>
      <h2 className="text-[1.4rem] mb-4">Intelligence & Risk for Real Transactions</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-7">
        <ul className="m-0 pl-4">
          <li className="mb-2 text-[0.9rem] text-[var(--text-secondary)]">
            On-chain and transaction flow analysis.
          </li>
          <li className="mb-2 text-[0.9rem] text-[var(--text-secondary)]">
            Counterparty and jurisdictional screening.
          </li>
        </ul>
        <ul className="m-0 pl-4">
          <li className="mb-2 text-[0.9rem] text-[var(--text-secondary)]">
            Pattern detection for fraud and wash activity.
          </li>
          <li className="mb-2 text-[0.9rem] text-[var(--text-secondary)]">
            Secure data operations tailored to private mandates.
          </li>
        </ul>
      </div>
    </section>
  );
}
