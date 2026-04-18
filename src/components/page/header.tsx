"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

interface PageHeaderProps {
  backgroundImage?: string;
  title?: string;
  description?: string;
  showScrollDown?: boolean;
}

export default function PageHeader({
  backgroundImage,
  title,
  description,
  showScrollDown = false,
}: PageHeaderProps) {
  const scrollToNextSection = () => {
    const headerSection = document.getElementById("page-header");
    const nextSection = headerSection?.nextElementSibling;

    if (nextSection instanceof HTMLElement) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="page-header"
      className="relative w-full h-[60vh] flex items-center justify-center text-center overflow-hidden"
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={title || ""}
          fill
          className="object-cover z-0"
          priority
        />
      )}
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="relative z-20 text-white px-4">
        {title && <h1 className="text-4xl font-bold mb-4">{title}</h1>}
        {description && <p className="text-lg max-w-2xl mx-auto">{description}</p>}
      </div>
      {showScrollDown && (
        <button
          type="button"
          onClick={scrollToNextSection}
          aria-label="Scroll to next section"
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/30 bg-black/25 p-3 text-white backdrop-blur-sm transition hover:border-white/70 hover:bg-black/40"
        >
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="flex items-center justify-center"
          >
            <ChevronsDown className="h-7 w-7" />
          </motion.span>
        </button>
      )}
    </section>
  );
}
