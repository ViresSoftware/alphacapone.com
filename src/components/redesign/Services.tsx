'use client';

import { Activity, PieChart, Cpu, Droplet, Feather, TrendingUp } from "lucide-react";

const services = [
  { name: "Private Equity", icon: Activity },
  { name: "Investments", icon: PieChart },
  { name: "Cryptocurrency", icon: Cpu },
  { name: "Petroleum", icon: Droplet },
  { name: "Fine Art", icon: Feather },
  { name: "Tier-One Trading", icon: TrendingUp },
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
                We are buyers and/or sellers in {service.name.toLowerCase()}, providing professional services tailored to qualified counterparties.
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
