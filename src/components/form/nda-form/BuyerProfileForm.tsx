"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AlertCircle,
  ArrowLeft,
  Banknote,
  Building2,
  CalendarClock,
  Coins,
  MapPin,
  NotebookPen,
  Rocket,
  Target,
} from "lucide-react"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { buyerDraftStorage } from "./storage"
import {
  assetTypeValues,
  buyerProfileSchema,
  equityBands,
  financingValues,
  timelineValues,
  type BuyerProfileValues,
  type NdaFormValues,
} from "./schema"

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
  Icon: typeof Target
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
  ndaData: NdaFormValues
  onBack: () => void
  onComplete: (data: BuyerProfileValues) => void
}

export default function BuyerProfileForm({ ndaData, onBack, onComplete }: Props) {
  const [submitting, setSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    getValues,
    formState: { errors },
  } = useForm<BuyerProfileValues>({
    resolver: zodResolver(buyerProfileSchema),
    mode: "onTouched",
    defaultValues: {
      assetTypes: [],
      targetMarkets: "",
      notes: "",
    },
  })

  useEffect(() => {
    const saved = buyerDraftStorage.read()
    if (saved && Object.keys(saved).length > 0) {
      const current = getValues()
      reset({ ...current, ...saved } as BuyerProfileValues)
    }

    const subscription = watch((values) => {
      buyerDraftStorage.write(values as Partial<BuyerProfileValues>)
    })
    return () => subscription.unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const numberSetValueAs = (v: unknown) => {
    if (v === "" || v === null || v === undefined) return undefined
    const n = typeof v === "number" ? v : Number(v)
    return Number.isNaN(n) ? undefined : n
  }

  const assetTypes = watch("assetTypes") ?? []
  const equityAvailable = watch("equityAvailable")
  const timeline = watch("timeline")
  const financing = watch("financing")

  const toggleAsset = (asset: string, checked: boolean) => {
    const current = watch("assetTypes") ?? []
    const next = checked
      ? [...new Set([...current, asset])]
      : current.filter((a) => a !== asset)
    setValue("assetTypes", next, { shouldValidate: true, shouldTouch: true })
  }

  const onSubmit = async (data: BuyerProfileValues) => {
    setSubmitting(true)
    setServerError(null)
    try {
      const res = await fetch("/api/buyer-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nda: ndaData, profile: data }),
      })
      const json = await res.json()
      if (!res.ok || !json.ok) {
        setServerError(json.message || "Submission failed. Please try again.")
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
      {/* Asset types */}
      <section>
        <SectionHeader
          Icon={Building2}
          eyebrow="Asset Types"
          title="What are you looking to acquire?"
        />
        <Label className="sr-only">Asset Types of Interest</Label>
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {assetTypeValues.map((asset) => {
            const checked = assetTypes.includes(asset)
            return (
              <label
                key={asset}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
                  checked
                    ? "border-[#fcd770]/50 bg-[#fcd770]/5"
                    : "border-gray-700 bg-gray-900/40 hover:border-gray-600"
                }`}
              >
                <Checkbox
                  checked={checked}
                  onChange={(e) => toggleAsset(asset, e.target.checked)}
                />
                <span className="text-gray-200">{asset}</span>
              </label>
            )
          })}
        </div>
        <FieldError message={errors.assetTypes?.message} />
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Target markets */}
      <section>
        <SectionHeader
          Icon={MapPin}
          eyebrow="Geography"
          title="Where do you want to deploy capital?"
        />
        <Label htmlFor="targetMarkets" className="mb-1.5 text-gray-200">
          Target Markets<RequiredMark />
        </Label>
        <Input
          id="targetMarkets"
          placeholder="Dallas, Miami, Phoenix"
          aria-invalid={!!errors.targetMarkets}
          {...register("targetMarkets")}
        />
        <p className="mt-2 text-xs text-gray-400">
          Comma-separated list of cities, states, or MSAs.
        </p>
        <FieldError message={errors.targetMarkets?.message} />
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Deal size */}
      <section>
        <SectionHeader
          Icon={Coins}
          eyebrow="Deal Size & Yield"
          title="Define your check size and target returns"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <Label htmlFor="dealSizeMin" className="mb-1.5 text-gray-200">
              Deal Size — Min (USD)<RequiredMark />
            </Label>
            <Input
              id="dealSizeMin"
              type="number"
              min={0}
              step="100000"
              placeholder="1000000"
              aria-invalid={!!errors.dealSizeMin}
              {...register("dealSizeMin", { setValueAs: numberSetValueAs })}
            />
            <FieldError message={errors.dealSizeMin?.message} />
          </div>
          <div>
            <Label htmlFor="dealSizeMax" className="mb-1.5 text-gray-200">
              Deal Size — Max (USD)<RequiredMark />
            </Label>
            <Input
              id="dealSizeMax"
              type="number"
              min={0}
              step="100000"
              placeholder="50000000"
              aria-invalid={!!errors.dealSizeMax}
              {...register("dealSizeMax", { setValueAs: numberSetValueAs })}
            />
            <FieldError message={errors.dealSizeMax?.message} />
          </div>
          <div>
            <Label htmlFor="capRateTarget" className="mb-1.5 text-gray-200">
              Target Cap Rate (%)
            </Label>
            <Input
              id="capRateTarget"
              type="number"
              min={0}
              max={100}
              step="0.1"
              placeholder="6.5"
              aria-invalid={!!errors.capRateTarget}
              {...register("capRateTarget", { setValueAs: numberSetValueAs })}
            />
            <FieldError message={errors.capRateTarget?.message} />
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Equity / Timeline / Financing */}
      <section>
        <SectionHeader
          Icon={Banknote}
          eyebrow="Capital & Timeline"
          title="How are you funding and when do you transact?"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          <div>
            <Label className="mb-1.5 text-gray-200">
              <Coins className="h-3.5 w-3.5 text-gray-400" />
              Equity Available<RequiredMark />
            </Label>
            <Select
              value={equityAvailable}
              onValueChange={(v) =>
                setValue("equityAvailable", v as BuyerProfileValues["equityAvailable"], {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.equityAvailable}>
                <SelectValue placeholder="Select band" />
              </SelectTrigger>
              <SelectContent>
                {equityBands.map((b) => (
                  <SelectItem key={b} value={b}>
                    {b}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.equityAvailable?.message} />
          </div>

          <div>
            <Label className="mb-1.5 text-gray-200">
              <CalendarClock className="h-3.5 w-3.5 text-gray-400" />
              Timeline<RequiredMark />
            </Label>
            <Select
              value={timeline}
              onValueChange={(v) =>
                setValue("timeline", v as BuyerProfileValues["timeline"], {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.timeline}>
                <SelectValue placeholder="Select timeline" />
              </SelectTrigger>
              <SelectContent>
                {timelineValues.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.timeline?.message} />
          </div>

          <div>
            <Label className="mb-1.5 text-gray-200">
              <Banknote className="h-3.5 w-3.5 text-gray-400" />
              Financing Strategy<RequiredMark />
            </Label>
            <Select
              value={financing}
              onValueChange={(v) =>
                setValue("financing", v as BuyerProfileValues["financing"], {
                  shouldValidate: true,
                  shouldTouch: true,
                })
              }
            >
              <SelectTrigger className="w-full" aria-invalid={!!errors.financing}>
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                {financingValues.map((f) => (
                  <SelectItem key={f} value={f}>
                    {f}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError message={errors.financing?.message} />
          </div>
        </div>
      </section>

      <div className="h-px w-full bg-gray-700/60" />

      {/* Notes */}
      <section>
        <SectionHeader
          Icon={NotebookPen}
          eyebrow="Notes"
          title="Anything else we should know?"
        />
        <Label htmlFor="notes" className="mb-1.5 text-gray-200">
          Additional Notes
        </Label>
        <Textarea
          id="notes"
          rows={4}
          placeholder="Anything else we should know about your mandate, preferred sponsors, or deal criteria?"
          {...register("notes")}
        />
      </section>

      {serverError && (
        <Alert variant="destructive" className="border-red-500/40 bg-red-500/10">
          <AlertCircle />
          <AlertDescription>{serverError}</AlertDescription>
        </Alert>
      )}

      <div className="flex flex-col-reverse gap-3 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          size="lg"
          onClick={onBack}
          className="border-gray-600 bg-transparent text-gray-200 hover:bg-gray-800/60 hover:text-white sm:w-auto"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          className="flex-1 bg-[#fcd770] font-semibold text-black hover:bg-[#b28f3f]"
        >
          <Rocket className="h-4 w-4" />
          {submitting ? "Submitting…" : "Complete Registration"}
        </Button>
      </div>
    </form>
  )
}
