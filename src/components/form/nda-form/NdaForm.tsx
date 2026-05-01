"use client"

import { useEffect, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AlertCircle,
  Building2,
  Calendar,
  ChevronRight,
  Mail,
  PenLine,
  Phone,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

import NdaLegalText from "./NdaLegalText"
import { ndaDraftStorage } from "./storage"
import {
  ndaFormSchema,
  roleLabels,
  roleValues,
  type NdaFormValues,
} from "./schema"

const todayFormatted = () =>
  new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date())

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-red-400">{message}</p>
}

function RequiredMark() {
  return <span className="ml-0.5 text-red-400">*</span>
}

function SectionHeader({
  Icon,
  eyebrow,
  title,
}: {
  Icon: typeof ShieldCheck
  eyebrow: string
  title: string
}) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-[#fcd770]" />
        <span className="font-heading text-[0.8rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
          {eyebrow}
        </span>
      </div>
      <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
    </div>
  )
}

interface Props {
  defaultValues?: Partial<NdaFormValues>
  onComplete: (data: NdaFormValues) => void
}

export default function NdaForm({ defaultValues, onComplete }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const initialDate = useMemo(() => defaultValues?.date ?? todayFormatted(), [defaultValues?.date])

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<NdaFormValues>({
    resolver: zodResolver(ndaFormSchema),
    mode: "onTouched",
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      role: undefined,
      referredBy: "",
      date: initialDate,
      signature: "",
      agreedToNda: false as unknown as true,
      agreedToContact: false as unknown as true,
      ...defaultValues,
    },
  })

  // Hydrate from localStorage draft on mount, then persist on every change.
  // `defaultValues` (typically `ndaData` from the parent) takes precedence
  // over any saved draft so a previously-submitted signature isn't replaced
  // by stale autosaved input.
  useEffect(() => {
    const saved = ndaDraftStorage.read()
    if (saved && Object.keys(saved).length > 0) {
      const current = getValues()
      reset({
        ...current,
        ...saved,
        ...(defaultValues ?? {}),
        date: current.date,
      } as NdaFormValues)
    }

    const subscription = watch((values) => {
      ndaDraftStorage.write(values as Partial<NdaFormValues>)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fullName = watch("fullName")
  const email = watch("email")
  const phone = watch("phone")
  const role = watch("role")
  const signature = watch("signature")
  const agreedToNda = watch("agreedToNda")
  const agreedToContact = watch("agreedToContact")

  const signatureMatches =
    !!signature &&
    !!fullName &&
    signature.trim().toLowerCase() === fullName.trim().toLowerCase()

  const canContinue =
    !!agreedToNda &&
    !!agreedToContact &&
    !!fullName?.trim() &&
    !!email?.trim() &&
    !!phone?.trim() &&
    !!role &&
    signatureMatches &&
    !submitting

  const onSubmit = async (data: NdaFormValues) => {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch("/api/nda", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setServerError(json.message || "We couldn't record your signature. Please try again.")
        return
      }
      onComplete(data)
    } catch (err) {
      console.error(err)
      setServerError("Network error — please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-10 py-6">
      {/* NDA text */}
      <section>
        <NdaLegalText />
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Your Information */}
      <section>
        <SectionHeader
          Icon={ShieldCheck}
          eyebrow="Your Information"
          title="Tell us who is signing"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Full name */}
          <div>
            <Label htmlFor="fullName" className="mb-1.5 text-gray-200">
              <UserRound className="h-3.5 w-3.5 text-gray-400" />
              Full Legal Name
              <RequiredMark />
            </Label>
            <Input
              id="fullName"
              placeholder="John Smith"
              autoComplete="name"
              aria-invalid={!!errors.fullName}
              {...register("fullName")}
            />
            <FieldError message={errors.fullName?.message} />
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="mb-1.5 text-gray-200">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              Email Address
              <RequiredMark />
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@company.com"
              autoComplete="email"
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            <FieldError message={errors.email?.message} />
          </div>

          {/* Phone */}
          <div>
            <Label htmlFor="phone" className="mb-1.5 text-gray-200">
              <Phone className="h-3.5 w-3.5 text-gray-400" />
              Phone Number
              <RequiredMark />
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              autoComplete="tel"
              aria-invalid={!!errors.phone}
              {...register("phone")}
            />
            <FieldError message={errors.phone?.message} />
          </div>

          {/* Company */}
          <div>
            <Label htmlFor="company" className="mb-1.5 text-gray-200">
              <Building2 className="h-3.5 w-3.5 text-gray-400" />
              Company Name
            </Label>
            <Input
              id="company"
              placeholder="ABC Investments, LLC"
              autoComplete="organization"
              {...register("company")}
            />
            <FieldError message={errors.company?.message} />
          </div>

          {/* Role */}
          <div>
            <Label className="mb-1.5 text-gray-200">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              Role
              <RequiredMark />
            </Label>
            <Select
              value={role}
              onValueChange={(val) =>
                setValue("role", val as NdaFormValues["role"], {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.role}>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                {roleValues.map((r) => (
                  <SelectItem key={r} value={r}>
                    {roleLabels[r]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.role?.message} />
          </div>

          {/* Referred By */}
          <div>
            <Label htmlFor="referredBy" className="mb-1.5 text-gray-200">
              <Users className="h-3.5 w-3.5 text-gray-400" />
              Referred By / Agent
            </Label>
            <Input
              id="referredBy"
              placeholder="Optional"
              {...register("referredBy")}
            />
            <FieldError message={errors.referredBy?.message} />
          </div>

          {/* Date (readonly) */}
          <div className="md:col-span-2">
            <Label htmlFor="date" className="mb-1.5 text-gray-200">
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
              Date of Agreement
            </Label>
            <Input
              id="date"
              readOnly
              value={watch("date")}
              className="cursor-not-allowed opacity-80"
              {...register("date")}
            />
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Typed Signature */}
      <section>
        <SectionHeader
          Icon={PenLine}
          eyebrow="Electronic Signature"
          title="Sign by typing your full legal name"
        />
        <Label htmlFor="signature" className="mb-1.5 text-gray-200">
          Type Your Full Legal Name to Sign
          <RequiredMark />
        </Label>
        <Input
          id="signature"
          placeholder={fullName ? `Type "${fullName}"` : "Type your full legal name"}
          className={cn(
            "font-serif italic",
            signatureMatches && "border-[#fcd770]/60 text-[#fcd770]"
          )}
          aria-invalid={!!errors.signature}
          {...register("signature")}
        />
        <p className="mt-2 text-xs text-gray-400">
          By typing your name, you agree that this serves as your legal
          electronic signature under the ESIGN Act and UETA.
        </p>
        <FieldError message={errors.signature?.message} />
      </section>

      {/* Checkboxes */}
      <section>
        <SectionHeader
          Icon={ShieldCheck}
          eyebrow="Acknowledgements"
          title="Confirm consent and preferences"
        />

        <div className="space-y-4 rounded-lg border border-gray-700 bg-gray-900/40 p-5">
          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              {...register("agreedToNda")}
              aria-invalid={!!errors.agreedToNda}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-200">
              I have read and agree to the terms of this Mutual Non-Disclosure
              Agreement.
              <RequiredMark />
            </span>
          </label>
          <FieldError message={errors.agreedToNda?.message} />

          <label className="flex cursor-pointer items-start gap-3">
            <Checkbox
              {...register("agreedToContact")}
              aria-invalid={!!errors.agreedToContact}
              className="mt-0.5"
            />
            <span className="text-sm text-gray-200">
              I agree to be contacted by Alpha Capital One via call, email, and
              text regarding investment opportunities.
              <RequiredMark />
            </span>
          </label>
          <FieldError message={errors.agreedToContact?.message} />

        </div>
      </section>

      {serverError && (
        <Alert variant="destructive" className="border-red-500/40 bg-red-500/10">
          <AlertCircle />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      {/* Submit */}
      <Button
        type="submit"
        disabled={!canContinue}
        size="lg"
        className="w-full bg-[#fcd770] font-semibold text-black hover:bg-[#b28f3f]"
      >
        {submitting ? "Recording…" : "Continue to Buyer Profile"}
        <ChevronRight className="h-4 w-4" />
      </Button>
    </form>
  )
}
