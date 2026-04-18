"use client"

import { Fragment } from "react"
import { Check, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export type NdaFlowStep = "nda" | "buyer" | "done"

const steps: { id: NdaFlowStep; label: string; number: number }[] = [
  { id: "nda", label: "Sign NDA", number: 1 },
  { id: "buyer", label: "Buyer Profile", number: 2 },
]

function stepRank(s: NdaFlowStep) {
  return s === "nda" ? 1 : s === "buyer" ? 2 : 3
}

export default function StepNav({ currentStep }: { currentStep: NdaFlowStep }) {
  const rank = stepRank(currentStep)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
      {steps.map((step, i) => {
        const isActive = currentStep === step.id
        const isComplete = rank > step.number
        return (
          <Fragment key={step.id}>
            <div
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors",
                isActive &&
                  "border-[#fcd770]/50 bg-[#fcd770]/10 text-[#fcd770]",
                isComplete &&
                  "border-[#fcd770]/30 bg-[#fcd770]/5 text-[#fcd770]/80",
                !isActive &&
                  !isComplete &&
                  "border-white/10 bg-white/5 text-white/60"
              )}
            >
              <span
                className={cn(
                  "flex h-5 w-5 items-center justify-center rounded-full text-[11px]",
                  isActive && "bg-[#fcd770] text-black",
                  isComplete && "bg-[#fcd770]/80 text-black",
                  !isActive && !isComplete && "bg-white/10 text-white/70"
                )}
              >
                {isComplete ? <Check className="h-3 w-3" /> : step.number}
              </span>
              {step.label}
            </div>
            {i < steps.length - 1 && (
              <ChevronRight
                className="h-4 w-4 text-white/30"
                aria-hidden="true"
              />
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
