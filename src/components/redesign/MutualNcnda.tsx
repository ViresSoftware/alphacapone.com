import { SteelButton } from "@/components/SteelButton";

export default function MutualNcndaSection() {
  return (
    <section className="max-w-7xl px-6 md:px-20 mx-auto py-16">
      <div className="bg-gray-800/50 backdrop-blur-sm p-8 md:p-12 rounded-xl border border-gray-700 shadow-md text-center">
        <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
          Mutual NCNDA
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Sign Mutual NCNDA
        </h2>
        <p className="text-gray-200 text-[0.95rem] md:text-base leading-relaxed max-w-2xl mx-auto mb-8">
          Sign the Mutual NCNDA to unlock off-market opportunities with Alpha Capital One.
        </p>
        <div className="flex justify-center">
          <SteelButton href="https://www.alphacapone.com/mutual-ncnda/sign">
            Sign Mutual NCNDA
          </SteelButton>
        </div>
      </div>
    </section>
  );
}
