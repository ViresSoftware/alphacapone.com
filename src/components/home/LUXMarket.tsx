"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const bugattiVideo = "/bugatti-smoke.mp4";

export default function LUXMarket() {
  const [isVideoReady, setIsVideoReady] = useState(false);

  return (
    <section className="relative bg-black text-white py-16 lg:py-24 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 items-center gap-12 max-w-7xl">
        {/* Left Section - Video/Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] overflow-hidden rounded-2xl shadow-2xl"
        >
          {!isVideoReady && (
            <Image
              src="/bugatti-smoke.jpg"
              alt="LUX Market"
              fill
              className="object-cover"
              priority
            />
          )}
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setIsVideoReady(true)}
          >
            <source src={bugattiVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>
        {/* Right Section - Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-6 text-center md:text-left"
        >
          <h2 className="text-4xl lg:text-5xl font-playfair font-semibold">
            LUX Market
          </h2>
          <p className="text-gray-300 text-base lg:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0">
            Step into a global exchange for elite digital and tangible assets.
            LUX Market connects investors, collectors, and institutions through
            verified, confidential blockchain-secured trades.
          </p>
          <Button
            asChild
            className="bg-transparent border border-gray-700 hover:border-yellow-500 hover:bg-yellow-500/10 text-white hover:text-yellow-400 transition-colors px-12 py-6 rounded-xl w-full max-w-[200px]"
          >
            <Link href="https://luxmarket.app" target="_blank">Explore LUX Market <ArrowRight/></Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}