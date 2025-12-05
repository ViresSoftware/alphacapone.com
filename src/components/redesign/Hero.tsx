"use client";
import { motion } from "framer-motion";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full object-cover brightness-75"
          style={{ transform: "translate(-50%, -50%)" }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/silver-sphere.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-[1]" />
        {/* Optional subtle metallic overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30 z-[2] mix-blend-overlay" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between h-full px-6 md:px-24 py-16">
        <div className="heroLeft max-w-xl space-y-6">
          <div className="heroEyebrow text-[0.85rem] tracking-[0.1em] uppercase text-gray-400 mb-2">
            PRIVATE • CONFIDENTIAL • INSTITUTIONAL ONLY
          </div>
          <h1 className="heroTitle text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Private Access to Digital, Energy & Fine Assets
          </h1>
          <p className="heroSubtitle text-lg md:text-xl text-gray-300 leading-relaxed">
            Bitcoin, petroleum products, and high-value collectibles structured quietly between verified principals, law firms, and private offices.
          </p>
          <div className="heroActions flex flex-wrap gap-4 mt-4">
            <button className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-accent text-black font-semibold text-sm tracking-wide uppercase hover:bg-[var(--accent-hover)] transition-all duration-300 shadow-lg">
              Request Introduction
            </button>
            <button className="inline-flex items-center justify-center px-7 py-3 rounded-lg border border-gray-500 text-gray-200 font-medium text-sm uppercase hover:bg-gray-800/50 transition-colors duration-300">
              View our mandates →
            </button>
          </div>
        </div>
        <div className="heroRight flex flex-col gap-4 mt-10 md:mt-0">
          <div className="heroPill flex items-center gap-2 bg-gray-700/40 backdrop-blur-sm px-5 py-2 rounded-full text-white font-medium uppercase text-sm tracking-wide shadow-md hover:scale-105 hover:bg-gray-700/60 transition-all duration-300 cursor-pointer">
            <span className="w-3 h-3 rounded-full bg-accent" /> Digital Assets
          </div>
          <div className="heroPill flex items-center gap-2 bg-gray-700/40 backdrop-blur-sm px-5 py-2 rounded-full text-white font-medium uppercase text-sm tracking-wide shadow-md hover:scale-105 hover:bg-gray-700/60 transition-all duration-300 cursor-pointer">
            <span className="w-3 h-3 rounded-full bg-accent" /> Energy & Petroleum
          </div>
          <div className="heroPill flex items-center gap-2 bg-gray-700/40 backdrop-blur-sm px-5 py-2 rounded-full text-white font-medium uppercase text-sm tracking-wide shadow-md hover:scale-105 hover:bg-gray-700/60 transition-all duration-300">
            <span className="w-3 h-3 rounded-full bg-accent" /> Fine Art & Luxury
          </div>
        </div>
      </div>

      {/* Optional Floating Metallic Sphere Accent */}
      <div className="absolute right-10 bottom-10 w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-tr from-gray-500/40 via-gray-300/30 to-gray-400/40 blur-3xl animate-pulse opacity-70 pointer-events-none z-[1]" />
    </motion.section>
  );
}
