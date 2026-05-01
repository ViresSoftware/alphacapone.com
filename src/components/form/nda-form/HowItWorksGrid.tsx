import { ClipboardSignature, Target, ShieldCheck, Building2 } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"

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
    <div>
      <div className="mb-2 font-heading text-[0.8rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        How it Works
      </div>
      <h3 className="mb-5 text-xl font-semibold text-white">
        From Signature to Off-Market Access
      </h3>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {stages.map(({ Icon, step, title, desc }) => (
          <Card
            key={title}
            className="border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm transition-shadow duration-300 hover:shadow-lg"
          >
            <CardContent className="flex flex-col items-center gap-2 px-4 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#fcd770]/10 text-[#fcd770]">
                <Icon className="h-5 w-5" />
              </div>
              <span className="font-heading text-[0.7rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
                {step}
              </span>
              <h4 className="text-sm font-semibold text-white">{title}</h4>
              <p className="text-xs leading-relaxed text-gray-400">{desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
