import Link from "next/link"
import { CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function RegistrationSuccess({ email }: { email?: string }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#fcd770]/15 text-[#fcd770]">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-semibold text-white sm:text-3xl">
        Registration Submitted
      </h2>
      <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
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
      <div className="mt-6 flex flex-col gap-2 sm:flex-row">
        <Button asChild variant="outline" size="lg">
          <Link href="/">Return Home</Link>
        </Button>
        <Button
          asChild
          size="lg"
          className="bg-[#fcd770] font-semibold text-black hover:bg-[#b28f3f]"
        >
          <Link href="/legal-docs">View Legal Docs</Link>
        </Button>
      </div>
    </div>
  )
}
