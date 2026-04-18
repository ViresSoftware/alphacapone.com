"use client"

import { useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Building2,
  Calendar,
  ChevronRight,
  Mail,
  Phone,
  ShieldCheck,
  Users,
  UserRound,
} from "lucide-react"

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
  return <p className="mt-1 text-xs text-red-400">{message}</p>
}

function RequiredMark() {
  return <span className="ml-0.5 text-red-400">*</span>
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
      subscribeInsights: true,
      subscribeOffMarket: false,
      ...defaultValues,
    },
  })

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
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-8">
      {/* NDA text */}
      <NdaLegalText />

      {/* Your Information */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-[#fcd770]" />
          <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white/70">
            Your Information
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Full name */}
          <div>
            <Label htmlFor="fullName" className="mb-1.5 text-white/80">
              <UserRound className="h-3.5 w-3.5 text-white/50" />
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
            <Label htmlFor="email" className="mb-1.5 text-white/80">
              <Mail className="h-3.5 w-3.5 text-white/50" />
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
            <Label htmlFor="phone" className="mb-1.5 text-white/80">
              <Phone className="h-3.5 w-3.5 text-white/50" />
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
            <Label htmlFor="company" className="mb-1.5 text-white/80">
              <Building2 className="h-3.5 w-3.5 text-white/50" />
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
            <Label className="mb-1.5 text-white/80">
              <Users className="h-3.5 w-3.5 text-white/50" />
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
            <Label htmlFor="referredBy" className="mb-1.5 text-white/80">
              <Users className="h-3.5 w-3.5 text-white/50" />
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
            <Label htmlFor="date" className="mb-1.5 text-white/80">
              <Calendar className="h-3.5 w-3.5 text-white/50" />
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
      </div>

      {/* Typed Signature */}
      <div>
        <Label htmlFor="signature" className="mb-1.5 text-white/80">
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
        <p className="mt-1.5 text-xs text-white/50">
          By typing your name, you agree that this serves as your legal
          electronic signature under the ESIGN Act and UETA.
        </p>
        <FieldError message={errors.signature?.message} />
      </div>

      {/* Checkboxes */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            {...register("agreedToNda")}
            aria-invalid={!!errors.agreedToNda}
            className="mt-0.5"
          />
          <span className="text-sm text-white/85">
            I have read and agree to the terms of this Mutual Non-Disclosure
            Agreement.
            <RequiredMark />
          </span>
        </label>
        <FieldError message={errors.agreedToNda?.message} />

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox
            {...register("agreedToContact")}
            aria-invalid={!!errors.agreedToContact}
            className="mt-0.5"
          />
          <span className="text-sm text-white/85">
            I agree to be contacted by Alpha Capital One via call, email, and
            text regarding investment opportunities.
            <RequiredMark />
          </span>
        </label>
        <FieldError message={errors.agreedToContact?.message} />

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox {...register("subscribeInsights")} className="mt-0.5" />
          <span className="text-sm text-white/85">
            Subscribe to weekly market insights &amp; deal alerts.
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <Checkbox {...register("subscribeOffMarket")} className="mt-0.5" />
          <span className="text-sm text-white/85">
            I&apos;d like early access to off-market deals and the market newsletter.
          </span>
        </label>
      </div>

      {serverError && (
        <p className="rounded-md border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {serverError}
        </p>
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
