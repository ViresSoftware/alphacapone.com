import { ClipboardSignature, Target, ShieldCheck, Building2 } from "lucide-react"

const stages = [
  {
    Icon: ClipboardSignature,
    step: "Step 1",
    title: "Sign NDA",
    desc: "Review and sign the mutual NCNDA.",
  },
  {
    Icon: Target,
    step: "Step 2",
    title: "Buyer Profile",
    desc: "Tell us your acquisition criteria.",
  },
  {
    Icon: ShieldCheck,
    step: "Step 3",
    title: "Get Approved",
    desc: "Our team reviews and grants access.",
  },
  {
    Icon: Building2,
    step: "Step 4",
    title: "Full Access",
    desc: "Review all off-market deals & diligence.",
  },
]

export default function HowItWorksGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
      {stages.map(({ Icon, step, title, desc }) => (
        <div
          key={title}
          className="flex flex-col items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-center"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcd770]/10 text-[#fcd770]">
            <Icon className="h-5 w-5" />
          </div>
          <span className="text-[0.7rem] uppercase tracking-[0.12em] text-white/50">
            {step}
          </span>
          <h3 className="text-sm font-semibold text-white">{title}</h3>
          <p className="text-xs leading-relaxed text-white/60">{desc}</p>
        </div>
      ))}
    </div>
  )
}
