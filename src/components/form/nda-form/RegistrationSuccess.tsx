import Link from "next/link"
import { CheckCircle2, FileText, Home } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function RegistrationSuccess({ email }: { email?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#fcd770]/15 text-[#fcd770] ring-1 ring-[#fcd770]/30">
        <CheckCircle2 className="h-8 w-8" />
      </div>
      <div className="mb-2 font-heading text-[0.8rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
        Registration Submitted
      </div>
      <h2 className="text-3xl font-bold text-white md:text-4xl">
        You&apos;re on the list
      </h2>
      <p className="mt-4 max-w-md text-gray-300">
        Our team will review your profile and grant access within 24&ndash;48
        hours.
        {email ? (
          <>
            {" "}
            A confirmation has been sent to{" "}
            <span className="font-medium text-white">{email}</span>.
          </>
        ) : null}
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          asChild
          variant="outline"
          size="lg"
          className="border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800/60 hover:text-white"
        >
          <Link href="/">
            <Home className="h-4 w-4" />
            Return Home
          </Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-[#fcd770] font-semibold text-black hover:bg-[#b28f3f]"
        >
          <Link href="/legal-docs">
            <FileText className="h-4 w-4" />
            View Legal Docs
          </Link>
        </Button>
      </div>
    </div>
  )
}
