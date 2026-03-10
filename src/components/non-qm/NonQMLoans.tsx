"use client";

import { motion } from "framer-motion";
import {
  FileText,
  BarChart3,
  ClipboardList,
  ArrowRightLeft,
  CheckCircle,
  Mail,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const services = [
  {
    icon: ArrowRightLeft,
    title: "Portfolio Acquisitions",
    description:
      "Direct acquisition of performing residential Non-QM loan pools from lenders, originators, and portfolio holders.",
    gradient: "from-zinc-700/40 to-zinc-800/40",
    border: "border-zinc-600/30",
  },
  {
    icon: BarChart3,
    title: "Loan Tape Analysis",
    description:
      "Review of collateral profile, borrower characteristics, concentration, and performance across submitted portfolios.",
    gradient: "from-zinc-700/40 to-zinc-800/40",
    border: "border-zinc-600/30",
  },
  {
    icon: ClipboardList,
    title: "Structured Transactions",
    description:
      "Clear coordination from initial review through diligence, documentation, and closing with disciplined execution.",
    gradient: "from-zinc-700/40 to-zinc-800/40",
    border: "border-zinc-600/30",
  },
  {
    icon: FileText,
    title: "Seller Liquidity",
    description:
      "Execution for lenders, originators, and portfolio holders seeking a credible counterparty and efficient sale process.",
    gradient: "from-zinc-700/40 to-zinc-800/40",
    border: "border-zinc-600/30",
  },
];

const steps = [
  {
    number: "01",
    title: "Introduction & Scope",
    description:
      "Assess portfolio size, composition, and transaction fit to determine alignment with our acquisition criteria.",
  },
  {
    number: "02",
    title: "Underwriting & Analysis",
    description:
      "Review tape, collateral, and performance characteristics through a disciplined, data-driven underwriting process.",
  },
  {
    number: "03",
    title: "Structure & Documentation",
    description:
      "Align on pricing, diligence scope, and transaction terms with clear documentation requirements and timelines.",
  },
  {
    number: "04",
    title: "Execution & Settlement",
    description:
      "Coordinate closing, transfer mechanics, and settlement with precise attention to documentation and timing.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function NonQMLoans() {
  return (
    <>
      {/* ── Main Section ── */}
      <section className="relative py-24 lg:py-32 px-4 overflow-hidden bg-black">
        {/* Background gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#b28f3f]/8 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-zinc-700/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1.2s" }}
          />
          <div
            className="absolute top-3/4 left-1/2 w-64 h-64 bg-[#b28f3f]/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2.4s" }}
          />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-[#b28f3f] text-sm font-medium uppercase tracking-widest mb-4">
              Private Access
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair font-semibold mb-6 bg-gradient-to-r from-white via-[#fcd770] to-white bg-clip-text text-transparent leading-tight">
              Non-QM Portfolio Liquidity
            </h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Alpha Capital One acquires performing residential Non-QM loan
              portfolios for qualified sellers seeking a credible counterparty,
              disciplined review, and efficient execution.
            </p>
            <div className="mt-8 flex items-center justify-center gap-2">
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b28f3f] to-transparent" />
              <div className="w-2 h-2 bg-[#b28f3f] rounded-full animate-pulse" />
              <div className="h-px w-20 bg-gradient-to-r from-transparent via-[#b28f3f] to-transparent" />
            </div>
          </motion.div>

          {/* Services Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-24"
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  variants={itemVariants}
                  whileHover={{ y: -6, transition: { duration: 0.3 } }}
                  className="group relative"
                >
                  <div
                    className={`
                    relative h-full p-8 rounded-2xl backdrop-blur-xl
                    bg-gradient-to-br ${service.gradient}
                    border ${service.border}
                    hover:border-[#b28f3f]/40 transition-all duration-500
                    overflow-hidden
                    before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/5 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-500
                  `}
                  >
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-5">
                      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
                    </div>
                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-5 inline-flex p-3 rounded-xl bg-black/40 backdrop-blur-sm border border-white/10 group-hover:border-[#b28f3f]/50 transition-colors duration-300">
                        <Icon className="w-6 h-6 text-[#b28f3f] group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <h3 className="text-xl font-playfair font-semibold mb-3 text-white group-hover:text-[#fcd770] transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* How We Operate */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-24"
          >
            <div className="text-center mb-14">
              <p className="text-[#b28f3f] text-sm font-medium uppercase tracking-widest mb-3">
                Process
              </p>
              <h3 className="text-3xl md:text-4xl font-playfair font-semibold text-white">
                How We Operate
              </h3>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  variants={itemVariants}
                  className="relative group"
                >
                  {/* Connector line (hidden on last item) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[calc(100%+12px)] w-6 h-px bg-gradient-to-r from-[#b28f3f]/40 to-transparent z-20" />
                  )}
                  <div className="relative p-7 rounded-2xl bg-zinc-900/60 border border-zinc-700/40 hover:border-[#b28f3f]/40 transition-all duration-400 h-full">
                    <span className="text-4xl font-playfair font-bold text-[#b28f3f]/30 group-hover:text-[#b28f3f]/50 transition-colors duration-300 block mb-4 leading-none">
                      {step.number}
                    </span>
                    <h4 className="text-base font-playfair font-semibold text-white mb-3">
                      {step.title}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Who We Work With */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-20"
          >
            <div className="max-w-4xl mx-auto p-10 rounded-2xl bg-zinc-900/50 border border-zinc-700/40 text-center">
              <p className="text-[#b28f3f] text-sm font-medium uppercase tracking-widest mb-4">
                Counterparties
              </p>
              <h3 className="text-2xl md:text-3xl font-playfair font-semibold text-white mb-5">
                Who We Work With
              </h3>
              <p className="text-gray-300 leading-relaxed text-base md:text-lg max-w-2xl mx-auto">
                We work with lenders and originators holding performing Non-QM
                portfolios who require a credible, experienced counterparty and a
                structured, efficient process from introduction through close.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                {["Lenders", "Originators", "Portfolio Holders"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 text-xs font-medium text-[#b28f3f] border border-[#b28f3f]/30 rounded-full bg-[#b28f3f]/5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Closing CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-5">
              <CheckCircle className="w-5 h-5 text-[#b28f3f]" />
              <p className="text-sm text-gray-400 uppercase tracking-widest font-medium">
                Confidential Review
              </p>
            </div>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Confidential review for performing Non-QM opportunities presented
              by qualified sellers. All submissions are handled with strict
              discretion.
            </p>
            <Button
              variant="outline"
              className="bg-black border-gray-600 hover:bg-green-500 hover:border-green-500 flex items-center gap-2 w-[fit-content] mx-auto"
              asChild
            >
              <Link href="/contact">
                <Mail size={18} />
                <span>Submit an Opportunity</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}
