import { SteelButton } from "../SteelButton";

export default function AccessSection() {
  return (
    <section className="relative py-16 px-6 md:px-20 max-w-7xl mx-auto">
      {/* Content wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="mb-6 text-center md:text-left">
            <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
              Access
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">
              Confidential, Vetted Access Only
            </h2>
            <div className="flex-1 text-[0.95rem] text-gray-300 flex items-start">
              <p className="leading-relaxed">
                We do not offer retail services or public trading. Every engagement
                is vetted and led by professionals. If you represent a qualified
                counterparty and wish to discuss a mandate in digital assets,
                energy, or luxury assets, request a secure introduction.
              </p>
            </div>
          </div>
        </div>
        {/* Form */}
        <form className="w-full flex flex-col gap-5 bg-gray-800/50 backdrop-blur-sm p-6 md:p-8 rounded-xl border border-gray-700 shadow-md">
          {[
            { label: "Name", placeholder: "Your name", type: "text" },
            { label: "Entity / Role", placeholder: "Family office, principal, etc.", type: "text" },
            { label: "Email", placeholder: "you@example.com", type: "email" },
            { label: "Mandate (one line)", placeholder: "e.g. BTC acquisition, gas oil, art sale", type: "text" },
          ].map((field, i) => (
            <div className="flex flex-col" key={i}>
              <label className="mb-1 font-medium text-gray-200">{field.label}</label>
              <input
                type={field.type}
                placeholder={field.placeholder}
                className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
              />
            </div>
          ))}

          <div className="flex flex-col">
            <label className="mb-1 font-medium text-gray-200">Area of Interest</label>
            <select className="border border-gray-700 rounded-xl px-4 py-3 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent shadow-sm">
              <option>Digital Assets</option>
              <option>Energy & Petroleum</option>
              <option>Fine Art & Luxury</option>
              <option>Lux Market Application</option>
            </select>
          </div>
          <SteelButton
            type="submit"
            className="mt-4 w-full md:w-auto"
          >
            Request Introduction
          </SteelButton>
        </form>
      </div>
    </section>
  );
}
