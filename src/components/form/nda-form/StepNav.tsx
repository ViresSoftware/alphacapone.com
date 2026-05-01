"use client"

import { Fragment } from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export type NdaFlowStep = "nda" | "buyer" | "done"

const steps: { id: NdaFlowStep; label: string; number: number }[] = [
  { id: "nda", label: "Sign NDA", number: 1 },
  { id: "buyer", label: "Buyer Profile", number: 2 },
  { id: "done", label: "Approval", number: 3 },
]

function stepRank(s: NdaFlowStep) {
  return s === "nda" ? 1 : s === "buyer" ? 2 : 3
}

interface StepNavProps {
  currentStep: NdaFlowStep
  availableSteps?: ReadonlySet<NdaFlowStep>
  onNavigate?: (step: NdaFlowStep) => void
}

export default function StepNav({
  currentStep,
  availableSteps,
  onNavigate,
}: StepNavProps) {
  const rank = stepRank(currentStep)

  return (
    <ol className="flex flex-wrap items-center gap-x-3 gap-y-2 sm:gap-x-4">
      {steps.map((step, i) => {
        const isActive = currentStep === step.id
        const isComplete = rank > step.number
        const canNavigate =
          !isActive && !!onNavigate && !!availableSteps?.has(step.id)

        const itemClass = cn(
          "flex items-center gap-2.5 rounded-md text-xs font-medium uppercase tracking-[0.08em] sm:text-sm",
          isActive && "text-[#fcd770]",
          isComplete && "text-[#fcd770]/80",
          !isActive && !isComplete && "text-gray-400",
          canNavigate && "cursor-pointer transition-colors hover:text-[#fcd770]"
        )
        const circleClass = cn(
          "flex h-7 w-7 items-center justify-center rounded-full border text-[12px] transition-colors",
          isActive && "border-[#fcd770] bg-[#fcd770] text-black",
          isComplete && "border-[#fcd770]/60 bg-[#fcd770]/15 text-[#fcd770]",
          !isActive &&
            !isComplete &&
            "border-gray-700 bg-gray-800/60 text-gray-400"
        )

        const inner = (
          <>
            <span className={circleClass}>
              {isComplete ? <Check className="h-3.5 w-3.5" /> : step.number}
            </span>
            <span className="hidden sm:inline">{step.label}</span>
          </>
        )

        return (
          <Fragment key={step.id}>
            <li>
              {canNavigate ? (
                <button
                  type="button"
                  onClick={() => onNavigate?.(step.id)}
                  aria-label={`Go to ${step.label}`}
                  className={itemClass}
                >
                  {inner}
                </button>
              ) : (
                <div
                  className={itemClass}
                  aria-current={isActive ? "step" : undefined}
                >
                  {inner}
                </div>
              )}
            </li>
            {i < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={cn(
                  "h-px w-8 sm:w-12",
                  isComplete ? "bg-[#fcd770]/40" : "bg-gray-700"
                )}
              />
            )}
          </Fragment>
        )
      })}
    </ol>
  )
}
