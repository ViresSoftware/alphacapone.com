export default function AccessSection() {
  return (
    <>
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">Access</div>
      <h2 className="text-[1.4rem] mb-4">Confidential, Vetted Access Only</h2>
      <div className="accessWrapper">
        <div className="accessText">
          <p>
            We do not offer retail services or public trading. Every engagement
            is vetted and led by professionals. If you represent a qualified
            counterparty and wish to discuss a mandate in digital assets,
            energy, or luxury assets, request a secure introduction.
          </p>
        </div>
        <form className="accessForm">
          <div className="formRow">
            <label>Name</label>
            <input type="text" placeholder="Your name" />
          </div>
          <div className="formRow">
            <label>Entity / Role</label>
            <input type="text" placeholder="Family office, principal, etc." />
          </div>
          <div className="formRow">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="formRow">
            <label>Area of Interest</label>
            <select>
              <option>Digital Assets</option>
              <option>Energy & Petroleum</option>
              <option>Fine Art & Luxury</option>
              <option>Lux Market Application</option>
            </select>
          </div>
          <div className="formRow">
            <label>Mandate (one line)</label>
            <input type="text" placeholder="e.g. BTC acquisition, gas oil, art sale" />
          </div>
          <button type="submit" className="w-full md:w-fit px-5 py-3 md:px-[1.8rem] md:py-[0.8rem] rounded-[4px] bg-accent text-[#040509] text-sm md:text-[0.9rem] font-medium tracking-[0.06em] hover:bg-[var(--accent-hover)]">
            Request Introduction
          </button>
        </form>
      </div>
    </>
  );
}