# Mutual NCNDA Sign & Registration Flow — Alpha Capital One

**Target repo:** `alphacapone.com` (Next.js 16, App Router, React 19, Tailwind v4)
**Route:** `/mutual-ncnda/sign`
**Source of pattern:** `radcre.com/off-market/register` (gated 2-step: Sign NDA → Buyer Profile → Get Approved → Full Board)
**Companion strategy doc:** `docs/Alpha-Capital-One-NDA-Form-Dev-Strategy-Claude-Cowork.md`

This plan is the implementation contract *adapted to this repo's actual stack, conventions, and existing UI kit*. Where the strategy doc assumes fresh install (shadcn add, Supabase, etc.), this plan maps to what already exists here and explicitly flags what is stubbed vs. wired.

---

## 1. Decisions made (for this implementation)

| Decision | Value | Rationale |
|---|---|---|
| Route | `/mutual-ncnda/sign` | Sub-route under the existing `/mutual-ncnda` page; preserves the PDF link at `/mutual-ncnda` and adds the interactive flow under `/sign`. |
| Submission | Stubbed Next.js API routes | Build UI first; wire real DB/email later. `/api/nda` + `/api/buyer-profile` return `{ok: true}` and `console.log` the payload. |
| Signature | Typed signature + checkbox | ESIGN/UETA-compliant lightweight approach. User types full legal name; app captures timestamp on submit. |
| Styling | Existing shadcn UI + Tailwind v4 dark theme | Match site's dark palette (`bg-black text-white`, `bg-card #171717`, gold accents from `neon-gold-btn`). No new brand tokens. |
| Form lib | `react-hook-form` + `zod` + `@hookform/resolvers/zod` | Already installed and used by the CIS form. |
| Step nav | Custom pill component | Matches radcre visual intent; no new dependency. |

---

## 2. File & folder plan

All paths relative to repo root. **New files** are marked `NEW`, **edits** marked `EDIT`.

```
src/
  app/
    mutual-ncnda/
      page.tsx                              ← existing (PDF link page — leave as-is)
      sign/
        page.tsx                            NEW — server component; metadata + hero + client flow
    api/
      nda/
        route.ts                            NEW — stubbed POST handler
      buyer-profile/
        route.ts                            NEW — stubbed POST handler
  components/
    form/
      nda-form/
        NdaFlow.tsx                         NEW — "use client" orchestrator (current step, stepData, scroll-to-top)
        StepNav.tsx                         NEW — pill indicator (Sign NDA › Buyer Profile)
        HowItWorksGrid.tsx                  NEW — 4-stage explainer (Step 1 only)
        NdaLegalText.tsx                    NEW — scrollable legal text block
        NdaForm.tsx                         NEW — Step 1 form (personal info, checkboxes, typed signature)
        BuyerProfileForm.tsx                NEW — Step 2 form (acquisition criteria)
        RegistrationSuccess.tsx             NEW — post-submit confirmation
        schema.ts                           NEW — Zod schemas + exported types
    ui/
      checkbox.tsx                          NEW — native styled checkbox (no new dep)
docs/
  mutual-ncnda-sign-flow.md                 ← this doc
  Alpha-Capital-One-NDA-Form-Dev-Strategy-Claude-Cowork.md   ← strategy source
```

---

## 3. Stack alignment (already present in repo)

| Need | Already in repo? | Path / note |
|---|---|---|
| `react-hook-form` | yes | `package.json` |
| `zod` + `@hookform/resolvers` | yes | used by `src/components/form/cis-form/schema.ts` |
| `@radix-ui/react-label`, `-select`, `-dialog`, `-slot` | yes | `package.json` |
| `@radix-ui/react-checkbox` | **no** | Building a native HTML checkbox component instead — no install needed. |
| `framer-motion` | yes | used in `src/components/page/Hero.tsx` |
| `lucide-react` | yes | icons throughout |
| shadcn-style UI: Button, Input, Label, Select, Textarea, Card | yes | `src/components/ui/*` |
| Dark theme tokens (`bg-card`, `border`, `muted`, `destructive`) | yes | `src/app/globals.css` (oklch vars + forced `text-white` in body) |
| Existing NDA PDF | yes | `/public/pdfs/Mutual-NCNDA.pdf` (linked from `app/mutual-ncnda/page.tsx`) |
| `PageHeader` component | yes | `src/components/page/header.tsx` (used by existing `/mutual-ncnda`) |

**No new npm dependencies required.**

---

## 4. Route composition

### `src/app/mutual-ncnda/sign/page.tsx` (server component)

```tsx
import type { Metadata } from "next";
import PageHeader from "@/components/page/header";
import NdaFlow from "@/components/form/nda-form/NdaFlow";

export const metadata: Metadata = {
  title: "Sign Mutual NCNDA | Alpha Capital One",
  description:
    "Sign the Mutual Non-Circumvention, Non-Disclosure and Confidentiality Agreement and request access to Alpha Capital One's off-market deal board.",
  alternates: { canonical: "/mutual-ncnda/sign" },
};

export default function MutualNcndaSignPage() {
  return (
    <>
      <PageHeader
        title="Request Private Access"
        description="Sign the Mutual NCNDA to unlock off-market opportunities."
        backgroundImage="/signed-paperwork.jpg"
      />
      <NdaFlow />
    </>
  );
}
```

Leaves the existing `PageHeader` visual language intact; the hero is familiar to the rest of the site.

### `NdaFlow.tsx` (client)

Holds: `currentStep` (`"nda" | "buyer" | "done"`), `ndaData` (Step-1 payload carried forward), scroll-to-top on step change. Renders `StepNav`, then either `<HowItWorksGrid /> + <NdaForm />`, `<BuyerProfileForm />`, or `<RegistrationSuccess />`.

---

## 5. Step 1 — NDA form (`NdaForm.tsx`)

### Layout (inside the existing dark site chrome)

```
┌──────────────────────────────────────────────┐
│ StepNav  [① Sign NDA ›  ② Buyer Profile]     │
├──────────────────────────────────────────────┤
│ HowItWorksGrid  (4 stages)                   │
├──────────────────────────────────────────────┤
│ Card (bg-card = #171717)                     │
│  ▸ Agreement  (scrollable NDA legal text)    │
│  ▸ Your Information  (2-col grid)            │
│     • Full Legal Name *  • Email *           │
│     • Phone *            • Company           │
│     • Role *             • Referred By       │
│     • Date  (readonly, today's date)         │
│  ▸ Typed Signature       (single input)      │
│  ▸ Checkboxes (4)                            │
│  ▸ Continue to Buyer Profile  [gold CTA]     │
└──────────────────────────────────────────────┘
```

### Fields

| Name | Type | Required | Notes |
|---|---|---|---|
| `fullName` | text | ✓ | "John Smith" |
| `email` | email | ✓ | Zod `.email()` |
| `phone` | tel | ✓ | min 10 chars |
| `company` | text | ✗ | optional |
| `role` | select | ✓ | `principal \| agent_broker \| fund_manager \| family_office \| other` |
| `referredBy` | text | ✗ | free text (can upgrade to agent list later) |
| `date` | text (readonly) | ✓ | today's date via `Intl.DateTimeFormat` |
| `signature` | text | ✓ | must match `fullName` (enforced via zod `refine`) |
| `agreedToNda` | checkbox | ✓ | `literal(true)` |
| `agreedToContact` | checkbox | ✓ | `literal(true)` |
| `subscribeInsights` | checkbox | — | default **true** (opt-out) |
| `subscribeOffMarket` | checkbox | — | default **false** |

**Gate logic** for the Continue button:

```ts
const isValid = watch("agreedToNda")
  && watch("agreedToContact")
  && watch("signature")?.trim().toLowerCase() === watch("fullName")?.trim().toLowerCase()
  && !!watch("fullName") && !!watch("email") && !!watch("phone") && !!watch("role");
```

Button uses existing shadcn `<Button size="lg">` with the neon gold class stacked on top or a gold bg override:

```tsx
<Button
  type="submit"
  disabled={!isValid || submitting}
  size="lg"
  className="w-full bg-[#fcd770] text-black hover:bg-[#b28f3f] font-semibold"
>
  Continue to Buyer Profile <ChevronRight className="h-4 w-4" />
</Button>
```

### NDA text source

Keep the canonical legal text at `public/pdfs/Mutual-NCNDA.pdf` as the binding document. Inside the form, render a **summary / mirrored text** in a scrollable `<div className="bg-white/5 border border-white/10 rounded-md p-4 max-h-64 overflow-y-auto text-sm text-white/80 leading-relaxed">`, plus an "Open full PDF" link that opens `/pdfs/Mutual-NCNDA.pdf` in a new tab. This matches the radcre pattern while keeping this repo's existing PDF canonical.

The static text block should preserve the NDA's 10-section structure (Purpose, Scope, Definition of Confidential Information, Obligations, Non-Circumvention, Exclusions, Term, Remedies, Governing Law, Entire Agreement) with "Alpha Capital One" as the disclosing/receiving party. First iteration can extract the sections from the PDF manually into `NdaLegalText.tsx`.

---

## 6. Step 2 — Buyer Profile (`BuyerProfileForm.tsx`)

Rendered after `NdaFlow` advances past Step 1. Does not repeat personal info — uses `ndaData` carried from Step 1 for submission payload.

| Field | Type | Notes |
|---|---|---|
| `assetTypes` | multi-checkbox | Multifamily, Office, Retail, Industrial, Mixed-Use, Hotel/Hospitality, Land |
| `targetMarkets` | text input (comma-sep) or multi-select | Start with text input for simplicity; upgrade to tag input later |
| `dealSizeMin` / `dealSizeMax` | number | USD, `min: 0` |
| `capRateTarget` | number | optional, 0–20% |
| `equityAvailable` | select | `<$1M / $1-5M / $5-25M / $25M+` |
| `timeline` | select | `0-3 mo / 3-6 mo / 6-12 mo / 12+ mo` |
| `financing` | select | `Cash / Conventional / Bridge / DSCR / Syndication` |
| `notes` | textarea | free-form |

Submit button: `Complete Registration` → POST `/api/buyer-profile` with `{ ndaData, buyerProfileData }` → swap to `<RegistrationSuccess />`.

---

## 7. Zod schemas (`schema.ts`)

```ts
import { z } from "zod";

export const roleValues = [
  "principal", "agent_broker", "fund_manager", "family_office", "other",
] as const;

export const ndaFormSchema = z.object({
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
  subscribeInsights: z.boolean().default(true),
  subscribeOffMarket: z.boolean().default(false),
}).refine(
  (d) => d.signature.trim().toLowerCase() === d.fullName.trim().toLowerCase(),
  { path: ["signature"], message: "Signature must match your full legal name" },
);

export const buyerProfileSchema = z.object({
  assetTypes: z.array(z.string()).min(1, "Select at least one asset type"),
  targetMarkets: z.string().min(1, "Enter one or more target markets"),
  dealSizeMin: z.coerce.number().min(0),
  dealSizeMax: z.coerce.number().min(0),
  capRateTarget: z.coerce.number().min(0).max(100).optional(),
  equityAvailable: z.string().min(1),
  timeline: z.string().min(1),
  financing: z.string().min(1),
  notes: z.string().optional(),
}).refine((d) => d.dealSizeMax >= d.dealSizeMin, {
  path: ["dealSizeMax"],
  message: "Max must be ≥ Min",
});

export type NdaFormValues = z.infer<typeof ndaFormSchema>;
export type BuyerProfileValues = z.infer<typeof buyerProfileSchema>;
```

---

## 8. Stubbed API routes

### `src/app/api/nda/route.ts`

```ts
import { NextResponse } from "next/server";
import { ndaFormSchema } from "@/components/form/nda-form/schema";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ndaFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten() }, { status: 400 });
  }
  console.log("[stub] NDA received:", parsed.data);
  // TODO: persist to DB + send notification emails
  return NextResponse.json({ ok: true, signedAt: new Date().toISOString() });
}
```

### `src/app/api/buyer-profile/route.ts`

Same shape, validates with `buyerProfileSchema`, logs payload, returns `{ok: true}`.

Both routes exist to make the front-end network flow realistic today; wiring to Neon/Supabase + Nodemailer is a follow-up (both deps are already in `package.json`).

---

## 9. Checkbox component (`src/components/ui/checkbox.tsx`)

Native checkbox, styled to match `Input`/`Button` (Tailwind `focus-visible:ring-*`, `border-input`, `bg-transparent`, `accent-[#fcd770]`). Exposes a `React.ComponentProps<"input">`-compatible API so it plays with `register()` from `react-hook-form`.

No `@radix-ui/react-checkbox` install required.

---

## 10. Accessibility & UX details

- All inputs paired with `<Label htmlFor>`.
- Required fields marked with a trailing `*` in red in the label.
- Inline error below field: `text-destructive text-xs mt-1`.
- `aria-invalid` flows naturally from zod → react-hook-form.
- Button disabled state uses `disabled:opacity-50 disabled:pointer-events-none` (already in shadcn Button cva).
- Scroll-to-top on step change: `window.scrollTo({ top: 0, behavior: "smooth" })`.
- Read-only date field uses `disabled` on the input.
- NDA scroll box: `max-h-64 overflow-y-auto` so the user can see there's more.

---

## 11. Implementation order

1. `ui/checkbox.tsx`
2. `nda-form/schema.ts`
3. `nda-form/StepNav.tsx`, `HowItWorksGrid.tsx`, `NdaLegalText.tsx`
4. `nda-form/NdaForm.tsx` (Step 1)
5. `nda-form/BuyerProfileForm.tsx` (Step 2)
6. `nda-form/RegistrationSuccess.tsx`
7. `nda-form/NdaFlow.tsx` (orchestrator)
8. `app/mutual-ncnda/sign/page.tsx`
9. `app/api/nda/route.ts`, `app/api/buyer-profile/route.ts`
10. `next build` + `tsc --noEmit` verification

---

## 12. Deferred / explicitly out of scope for this pass

- Supabase / Neon persistence (deps are installed; wire later).
- Transactional email via Nodemailer (dep installed; wire later).
- IP + user-agent capture for signature audit trail.
- Hashing the NDA text + storing the hash per submission (tamper-evident audit trail).
- Agent/Referral dropdown populated from backend.
- FRED API or similar ticker at top of page (optional from strategy doc).
- Multi-market tag input UI (starts as plain text).
- Framer Motion step transitions (add later in a polish pass).
- i18n / multi-language.

---

## 13. Mapping back to the upstream strategy doc

| Strategy doc section | This repo's equivalent |
|---|---|
| §1 Route `/register` | `/mutual-ncnda/sign` |
| §2 StepNav | `nda-form/StepNav.tsx` (pill indicator) |
| §3 How It Works 4-up | `nda-form/HowItWorksGrid.tsx` (shown only on Step 1) |
| §4 NDA legal text block | `nda-form/NdaLegalText.tsx` + link to existing `/pdfs/Mutual-NCNDA.pdf` |
| §4.3 Checkbox group (4) | Same; wired via `ui/checkbox.tsx` |
| §5 Buyer Profile | `nda-form/BuyerProfileForm.tsx` |
| §6 Zod schemas | `nda-form/schema.ts` |
| §7 API routes + DB | Stubbed in `/api/nda` + `/api/buyer-profile`; DB/email deferred |
| §8 Brand tokens / shadcn | Repo already has shadcn-style UI + dark tokens; no new install |
| §10 Folder structure | Mapped above in §2 of this doc |
| §11 Success state | `nda-form/RegistrationSuccess.tsx` |

---

*This is the live build contract. The strategy doc is the reference; this doc is what's actually happening in this repo.*
