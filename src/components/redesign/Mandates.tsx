export default function MandatesSection() {
  return (
    <>
      <div className="sectionTitle">Mandates</div>
      <h2 className="sectionHeading">Mandates We Structure</h2>
      <div className="cardGrid">
        <div className="card">
          <h3>Digital Assets</h3>
          <p>
            Principal-to-principal Bitcoin and stablecoin transactions,
            structured via escrow, attorney trust, or vetted OTC channels for
            size.
          </p>
        </div>
        <div className="card">
          <h3>Energy & Petroleum</h3>
          <p>
            Gas oil and related petroleum products, with a focus on direct
            counterparties, bank-to-bank coordination, and clean documentation.
          </p>
        </div>
        <div className="card">
          <h3>Fine Art & High-Value Assets</h3>
          <p>
            Museum-grade works, rare timepieces, vehicles, and other
            high-value objects negotiated privately with strict confidentiality.
          </p>
        </div>
        <div className="card">
          <h3>Lux Market™ Application</h3>
          <p>
            Our private marketplace for curated exotic vehicles, fine art, and
            other luxury assets—available to verified buyers and sellers only.
          </p>
        </div>
      </div>
    </>
  );
}