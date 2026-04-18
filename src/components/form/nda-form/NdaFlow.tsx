"use client"

import { useState } from "react"

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

  return (
    <section
      id="nda-flow"
      className="mx-auto max-w-4xl scroll-mt-24 px-4 py-12 sm:px-6 md:py-16"
    >
      <div className="mb-6 sm:mb-8">
        <StepNav currentStep={currentStep} />
      </div>

      {currentStep === "nda" && (
        <div className="space-y-8">
          <HowItWorksGrid />
          <div className="rounded-xl border border-white/10 bg-card p-6 shadow-sm sm:p-8">
            <NdaForm onComplete={handleStep1Complete} />
          </div>
        </div>
      )}

      {currentStep === "buyer" && ndaData && (
        <div className="rounded-xl border border-white/10 bg-card p-6 shadow-sm sm:p-8">
          <BuyerProfileForm
            ndaData={ndaData}
            onBack={handleBack}
            onComplete={handleStep2Complete}
          />
        </div>
      )}

      {currentStep === "done" && (
        <div className="rounded-xl border border-white/10 bg-card p-8 shadow-sm sm:p-12">
          <RegistrationSuccess email={ndaData?.email} />
        </div>
      )}
    </section>
  )
}
