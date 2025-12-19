import Image from "next/image";

export default function CounterpartiesSection() {
  return (
    <section className="max-w-7xl px-6 md:px-20 mx-auto py-16">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Counterparties
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        Who We Work With
      </h2>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className="flex justify-center md:justify-start h-[400px]">
          {/* <video
            className="object-cover w-full"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src="/geometric-shape.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video> */}
          <Image
            src="/images/geometric-shape.jpg"
            width={500}
            height={500}
            alt="Counterparties"
            className="rounded-xl shadow-xl border border-gray-700 object-cover"
          />
        </div>
        {/* Right: Text */}
        <div className="space-y-6">
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-md">
            <p className="text-gray-200 text-[0.95rem] leading-relaxed">
              We typically engage with family offices, private investment companies,
              principals with verifiable holdings in digital assets, energy, or fine assets,
              licensed law firms, and regulated entities.
            </p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-md">
            <p className="text-gray-200 text-[0.95rem] leading-relaxed">
              Jurisdictions of focus include the United States, the United Arab Emirates,
              Hong Kong, Switzerland, and the United Kingdom.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
