import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function LuxMarketSection() {
  return (
    <section className="max-w-7xl px-6 mx-auto py-16">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Lux Market™
      </div>
      <div className="flex flex-col-reverse md:flex-row items-start gap-10 md:gap-16">
        {/* Left Text */}
        <div className="luxText max-w-lg space-y-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
            Lux Market™ – Private Luxury Marketplace
          </h2>
          <p className="text-gray-300 leading-relaxed">
            An invite-only interface connecting qualified buyers and sellers of exotic vehicles, fine art, watches, and other high-value assets.
          </p>
          <p className="text-gray-300 leading-relaxed">
            Curated listings, not open classifieds. Identity and counterparty screening. Integration with our transaction and escrow workflows.
          </p>
          <Link href="https://www.luxmarket.app/" className="inline-flex items-center justify-center px-7 py-3 md:px-8 md:py-3 rounded-lg bg-accent text-black font-semibold text-sm md:text-[0.9rem] tracking-wide uppercase hover:bg-[var(--accent-hover)] shadow-lg transition-all duration-300">
            View Marketpalce
          </Link>
        </div>
        <div className="w-full ms-auto max-w-sm">
          <video src="/bugatti-smoke.mp4" autoPlay muted loop className="rounded-xl w-full mb-4" />
          <div className="flex flex-row justify-center items-center gap-4">
            <Badge asChild>
              <Link href="https://luxmarket.app/vehicles" target="_blank">Exotic Vehicles</Link>
            </Badge>
            <Badge asChild>
              <Link href="https://luxmarket.app/explore" target="_blank">Fine Art Pieces</Link>
            </Badge>
            <Badge asChild>
              <Link href="https://luxmarket.app/watches" target="_blank">Luxury Timepieces</Link>
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
}
