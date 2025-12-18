'use client';

import { Activity, PieChart, Cpu, Droplet, Feather, TrendingUp } from "lucide-react";

const services = [
  {
    name: "Private Equity",
    icon: Activity,
    description:
      "Sourcing, investing, and divesting in private companies with rigorous due diligence for qualified principals.",
  },
  {
    name: "Investments",
    icon: PieChart,
    description:
      "Structured investment opportunities across multiple asset classes tailored to institutional and high-net-worth clients.",
  },
  {
    name: "Cryptocurrency",
    icon: Cpu,
    description:
      "Acquisition, sale, and custody of digital assets, ensuring secure transactions and regulatory compliance.",
  },
  {
    name: "Petroleum",
    icon: Droplet,
    description:
      "Facilitating purchases and sales of energy commodities, including crude oil, gas, and related derivatives.",
  },
  {
    name: "Fine Art",
    icon: Feather,
    description:
      "Advisory and brokerage for high-value art, collectibles, and luxury assets, maintaining confidentiality and provenance.",
  },
  {
    name: "Tier-One Trading",
    icon: TrendingUp,
    description:
      "Execution of large-scale trades in equities, commodities, and alternative assets with institutional-grade risk management.",
  },
];

export default function Services() {
  return (
    <section className="max-w-7xl px-6 md:px-20 mx-auto py-16">
      {/* Section label */}
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Services
      </div>

      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-12">
        What We Offer
      </h2>

      {/* Services Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service, idx) => {
          const Icon = service.icon;
          return (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col gap-4"
            >
              <div className="flex items-center gap-3">
                <Icon className="w-6 h-6 text-accent flex-shrink-0" />
                <h3 className="text-xl font-semibold text-white">{service.name}</h3>
              </div>
              <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                {service.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
