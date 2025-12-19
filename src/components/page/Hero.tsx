"use client";

import { motion } from "framer-motion";
import { Badge } from "../ui/badge";

export default function PageHero() {
  return (
    <motion.section
      id="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative min-h-[100vh] lg:min-h-screen flex items-center justify-center text-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          className="absolute top-1/2 left-1/2 w-full h-full object-cover"
          style={{
            transform: "translate(-50%, -50%)",
          }}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/globe.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 z-[1]" />
      </div>
      {/* Overlay Content */}
      <div className="text-white relative z-10 px-6 max-w-xl lg:max-w-2xl text-white">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-playfair font-semibold mb-4">Alpha Capital One</h1>
        <p className="md:text-lg md:text-xl mb-6">
          Private Access to the World&apos;s Most Valuable Assets
        </p>
        <div className="flex flex-row gap-2 justify-center items-center">
          <Badge variant="outline" className="text-white">Secured</Badge>
          <Badge variant="outline" className="text-white">Verified</Badge>
          <Badge variant="outline" className="text-white">Confidential</Badge>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/50 z-[1]" />
    </motion.section>
  );
}
