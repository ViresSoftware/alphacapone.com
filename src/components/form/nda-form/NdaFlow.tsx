"use client"

import { useState } from "react"

import { Card, CardContent } from "@/components/ui/card"

import StepNav, { type NdaFlowStep } from "./StepNav"
import HowItWorksGrid from "./HowItWorksGrid"
import NdaForm from "./NdaForm"
import BuyerProfileForm from "./BuyerProfileForm"
import RegistrationSuccess from "./RegistrationSuccess"
import type { BuyerProfileValues, NdaFormValues } from "./schema"

function scrollToTopOfFlow() {
  if (typeof window === "undefined") return
  const el = document.getElementById("nda-flow")
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }
}

const stepCopy: Record<
  NdaFlowStep,
  { eyebrow: string; title: string; description: string }
> = {
  nda: {
    eyebrow: "Step 1 of 2",
    title: "Sign the Mutual NCNDA",
    description:
      "Review the mutual confidentiality terms, then sign electronically to begin the access request.",
  },
  buyer: {
    eyebrow: "Step 2 of 2",
    title: "Tell Us About Your Mandate",
    description:
      "Share your acquisition criteria so our team can match you with off-market opportunities that fit.",
  },
  done: {
    eyebrow: "Submitted",
    title: "Request Received",
    description:
      "Your registration is in our queue. We'll be in touch within 24–48 hours.",
  },
}

export default function NdaFlow() {
  const [currentStep, setCurrentStep] = useState<NdaFlowStep>("nda")
  const [ndaData, setNdaData] = useState<NdaFormValues | null>(null)

  const handleStep1Complete = (data: NdaFormValues) => {
    setNdaData(data)
    setCurrentStep("buyer")
    scrollToTopOfFlow()
  }

  const handleStep2Complete = (_data: BuyerProfileValues) => {
    setCurrentStep("done")
    scrollToTopOfFlow()
  }

  const handleBack = () => {
    setCurrentStep("nda")
    scrollToTopOfFlow()
  }

  const copy = stepCopy[currentStep]

  return (
    <section
      id="nda-flow"
      className="mx-auto max-w-5xl scroll-mt-24 px-6 py-16 md:px-10 md:py-20"
    >
      <div className="mb-2 font-heading text-[0.9rem] uppercase tracking-[0.08em] text-[var(--text-secondary)]">
        {copy.eyebrow}
      </div>
      <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
        {copy.title}
      </h2>
      <p className="mb-10 max-w-2xl text-gray-300">{copy.description}</p>

      <div className="mb-10">
        <StepNav currentStep={currentStep} />
      </div>

      {currentStep === "nda" && (
        <div className="space-y-10">
          <HowItWorksGrid />
          <Card className="border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm">
            <CardContent className="px-6 py-2 sm:px-8">
              <NdaForm onComplete={handleStep1Complete} />
            </CardContent>
          </Card>
        </div>
      )}

      {currentStep === "buyer" && ndaData && (
        <Card className="border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm">
          <CardContent className="px-6 py-2 sm:px-8">
            <BuyerProfileForm
              ndaData={ndaData}
              onBack={handleBack}
              onComplete={handleStep2Complete}
            />
          </CardContent>
        </Card>
      )}

      {currentStep === "done" && (
        <Card className="border-gray-700 bg-gray-800/50 text-white backdrop-blur-sm">
          <CardContent className="px-6 py-8 sm:px-12 sm:py-12">
            <RegistrationSuccess email={ndaData?.email} />
          </CardContent>
        </Card>
      )}
    </section>
  )
}
