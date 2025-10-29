"use client";
import { motion } from "framer-motion";

export default function Company() {
  return (
    <motion.section
      id="company"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="py-10 lg:py-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-playfair mb-4">Who We Are</h2>
        <p className="text-center max-w-3xl mx-auto">Your Partner in Sophisticated Investment Strategies</p>
      </div>
    </motion.section>
  );
}
