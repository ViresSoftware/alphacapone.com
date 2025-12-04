export default function HeroSection() {
  return (
    <section className="hero">
      <div className="heroLeft">
        <div className="heroEyebrow">
          PRIVATE • CONFIDENTIAL • INSTITUTIONAL ONLY
        </div>
        <h1 className="heroTitle">
          Private Access to Digital, Energy & Fine Assets
        </h1>
        <p className="heroSubtitle">
          Bitcoin, petroleum products, and high-value collectibles structured
          quietly between verified principals, law firms, and private offices.
        </p>
        <div className="heroActions">
          <button className="inline-flex items-center justify-center px-[1.8rem] py-[0.8rem] rounded-[4px] bg-accent text-[#040509] text-[0.9rem] font-medium tracking-[0.06em] uppercase hover:bg-[var(--accent-hover)]">Request Introduction</button>
          <button className="buttonGhost">
            <span>View our mandates →</span>
          </button>
        </div>
      </div>
      <div className="heroRight">
        <div className="heroPill">Digital Assets</div>
        <div className="heroPill">Energy & Petroleum</div>
        <div className="heroPill">Fine Art & Luxury</div>
      </div>
    </section>
  );
}