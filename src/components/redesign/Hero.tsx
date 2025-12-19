"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SteelButton } from "../SteelButton";

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative w-full lg:h-screen bg-black"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 lg:overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 w-auto min-w-full min-h-full object-cover brightness-75"
          style={{ transform: "translate(-50%, -50%)" }}
          autoPlay
          muted
          loop
          playsInline
        >
          {/* <source src="/silver-sphere.mp4" type="video/mp4" /> */}
          <source src="/globe.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60 z-[1]" />
        {/* Optional subtle metallic overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30 z-[2] mix-blend-overlay" />
        {/* Bottom gradient overlay for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black via-black/80 to-transparent z-[3]" />
      </div>
      {/* Hero Content */}
      <div className="flex items-center justify-center max-w-7xl mx-auto h-full">
        <div className="relative flex flex-col lg:flex-row items-center md:justify-between px-6 md:px-24 pt-24 lg::py-16 space-y-12 z-10">
          <div className="heroLeft max-w-xl space-y-6">
            <div className="text-xs md:text-[0.85rem] tracking-[0.1em] uppercase text-gray-400 mb-2">
              PRIVATE • CONFIDENTIAL • INSTITUTIONAL ONLY
            </div>
            <h1 className="text-3xl md:text-6xl font-extrabold text-white leading-tight">
              Private Access to Digital, Energy & Fine Assets
            </h1>
            <p className="md:text-xl text-gray-300 leading-relaxed">
              Bitcoin, petroleum products, and high-value collectibles structured quietly between verified principals, law firms, and private offices.
            </p>
            <div className="heroActions flex flex-wrap gap-4 mt-4">
            <SteelButton
              href="/contact"
              className="w-full md:w-auto"
            >
              Request Introduction
            </SteelButton>
              <Button className="w-full sm:w-fit h-auto inline-flex items-center justify-center px-7 py-3 rounded-lg border border-gray-500 text-gray-200 font-medium text-sm uppercase hover:bg-gray-800/50 transition-colors duration-300">
                View Services
              </Button>
            </div>
          </div>
          <div className="heroRight flex flex-col gap-4 p-6 py-8 lg:rounded-2xl">
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
      </div>
      <div className="absolute inset-0 bg-black/50 z-[1]" />
    </motion.section>
  );
}
