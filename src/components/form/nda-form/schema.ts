import { z } from "zod"

export const roleValues = [
  "principal",
  "agent_broker",
  "fund_manager",
  "family_office",
  "other",
] as const

export const roleLabels: Record<(typeof roleValues)[number], string> = {
  principal: "Principal / Direct Buyer",
  agent_broker: "Agent / Broker",
  fund_manager: "Fund Manager",
  family_office: "Family Office",
  other: "Other",
}

export const assetTypeValues = [
  "Multifamily",
  "Office",
  "Retail",
  "Industrial",
  "Mixed-Use",
  "Hotel / Hospitality",
  "Land",
] as const

export const equityBands = [
  "Under $1M",
  "$1M – $5M",
  "$5M – $25M",
  "$25M – $100M",
  "$100M+",
] as const

export const timelineValues = [
  "0 – 3 months",
  "3 – 6 months",
  "6 – 12 months",
  "12+ months",
] as const

export const financingValues = [
  "Cash",
  "Conventional",
  "Bridge",
  "DSCR",
  "Syndication",
  "Agency (Fannie/Freddie)",
] as const

// --- Step 1: NDA + Personal Info ---
// NOTE: no `.default()` on schema fields — defaults are set in useForm to keep
// zod input/output types symmetric and play nicely with zodResolver.
export const ndaFormSchema = z
  .object({
    fullName: z.string().min(2, "Full legal name is required"),
    email: z.string().email("Valid email required"),
    phone: z.string().min(10, "Valid phone number required"),
    company: z.string().optional(),
    role: z.enum(roleValues, { message: "Please select a role" }),
    referredBy: z.string().optional(),
    date: z.string(),
    signature: z.string().min(2, "Please type your name to sign"),
    agreedToNda: z.literal(true, { message: "You must agree to the NDA" }),
    agreedToContact: z.literal(true, { message: "Contact consent is required" }),
  })
  .refine(
    (d) => d.signature.trim().toLowerCase() === d.fullName.trim().toLowerCase(),
    { path: ["signature"], message: "Signature must match your full legal name exactly" }
  )

// --- Step 2: Buyer Profile ---
// Numeric fields expect already-coerced numbers from the form layer
// (register() uses setValueAs to convert empty → undefined, strings → Number).
export const buyerProfileSchema = z
  .object({
    assetTypes: z
      .array(z.string())
      .min(1, "Select at least one asset type"),
    targetMarkets: z
      .string()
      .min(2, "Enter one or more target markets (e.g., Dallas, Miami, Phoenix)"),
    dealSizeMin: z.number({ message: "Enter a minimum deal size" }).min(0, "Must be ≥ 0"),
    dealSizeMax: z.number({ message: "Enter a maximum deal size" }).min(0, "Must be ≥ 0"),
    capRateTarget: z.number().min(0).max(100).optional(),
    equityAvailable: z.enum(equityBands, { message: "Select an equity band" }),
    timeline: z.enum(timelineValues, { message: "Select a timeline" }),
    financing: z.enum(financingValues, { message: "Select a financing strategy" }),
    notes: z.string().optional(),
  })
  .refine((d) => d.dealSizeMax >= d.dealSizeMin, {
    path: ["dealSizeMax"],
    message: "Max must be greater than or equal to Min",
  })

export type NdaFormValues = z.infer<typeof ndaFormSchema>
export type BuyerProfileValues = z.infer<typeof buyerProfileSchema>
