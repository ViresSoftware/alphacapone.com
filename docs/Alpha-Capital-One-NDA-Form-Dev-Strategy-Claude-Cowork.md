# Alpha Capital One — Multi-Step NDA + Registration Form: Development Strategy for Claude Cowork

**Source analyzed:** `radcre.com/off-market/register`
**Target:** Alpha Capital One (Next.js)
**Prepared for:** Claude Cowork

---

## Overview

The RAD CRE form is a 2-step gated registration flow where users must sign a Mutual Non-Disclosure Agreement (Step 1) before completing a Buyer Profile (Step 2). There are 4 conceptual stages visible to users (Sign NDA → Buyer Profile → Get Approved → Full Board), but only 2 are interactive form steps — the others are status states handled server-side or via manual approval. The entire page is a single-page React app (Vite-built, not Next.js), using Tailwind CSS with CSS custom properties for brand tokens.

For Alpha Capital One on Next.js, we replicate this pattern using Next.js App Router, React Hook Form, Zod, Tailwind CSS, and a Supabase (or similar) backend.

---

## Section 1: Page Architecture

### 1.1 Route Structure

Create a dedicated route at `/register` (or `/deal-board/register`):

```
app/
  register/
    page.tsx           ← The main multi-step form page
    layout.tsx         ← Optional shared layout (no sidebar, clean)
  api/
    register/
      route.ts         ← POST handler for NDA step submission
    buyer-profile/
      route.ts         ← POST handler for Buyer Profile step
```

### 1.2 Page Layout

The page has three distinct vertical zones:

1. **Hero Banner** — Dark navy full-width section with an eyebrow label (e.g., "EXCLUSIVE ACCESS"), an H1 heading, and a subtitle. The RAD CRE version uses `bg-navy text-white` with large serif typography.
2. **Step Navigation Bar** — A pill-shaped tab indicator rendered above the form card, showing the current step as active (gold/amber background) and future steps as muted gray. The `>` chevron separator between pills is a plain text character.
3. **Form Card** — A white card with rounded corners, padding, and a light box shadow containing the full form content for the current step.

---

## Section 2: Step Navigation Component

### 2.1 Visual Design

The step nav is not a traditional progress bar — it is a row of pill buttons:

```tsx
// components/StepNav.tsx
type Step = { id: number; label: string };
const steps: Step[] = [
  { id: 1, label: "Sign NDA" },
  { id: 2, label: "Buyer Profile" },
];

export function StepNav({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center gap-3 mb-8">
      {steps.map((step, i) => (
        <>
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
              currentStep === step.id
                ? "bg-gold/10 text-gold border border-gold/30"
                : "bg-muted text-muted-foreground"
            )}
          >
            <span className="w-5 h-5 rounded-full bg-current/20 flex items-center justify-center text-xs">
              {step.id}
            </span>
            {step.label}
          </div>
          {i < steps.length - 1 && (
            <span className="text-muted-foreground text-sm">›</span>
          )}
        </>
      ))}
    </div>
  );
}
```

**Active step styling:** `bg-gold/10 text-gold` (warm amber tint with amber text). **Inactive step:** `bg-muted text-muted-foreground` (light gray). No click navigation — users cannot jump steps.

### 2.2 State Management

Use `useState` at the page level to track `currentStep` (1 or 2). Pass form data forward via a shared state object so Step 2 can reference Step 1 data (e.g., the user's name for the NDA signature).

```tsx
// app/register/page.tsx
"use client";
const [currentStep, setCurrentStep] = useState(1);
const [step1Data, setStep1Data] = useState<NDAFormData | null>(null);

const handleStep1Complete = (data: NDAFormData) => {
  setStep1Data(data);
  setCurrentStep(2);
  window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top on step change
};
```

---

## Section 3: "How It Works" Explainer Block

This section lives **inside the form card**, above the actual form fields. It shows all 4 pipeline stages, giving the user context for what signing the NDA gates them into.

### 3.1 Structure

```tsx
// 4-column icon grid (stacks to 2x2 on mobile)
const howItWorks = [
  { emoji: "✍️", step: "Step 1", title: "Sign NDA", desc: "Review and sign the mutual NDA." },
  { emoji: "🎯", step: "Step 2", title: "Buyer Profile", desc: "Tell us your acquisition criteria." },
  { emoji: "✅", step: "Step 3", title: "Get Approved", desc: "Our team reviews and grants access." },
  { emoji: "🏢", step: "Step 4", title: "Full Board", desc: "Access all off-market deals & DD." },
];
```

Layout: `grid grid-cols-2 md:grid-cols-4 gap-6 text-center`. Each item is a flex-col with emoji icon, uppercase step label, bold title, and small description text. This block is **only shown on Step 1** and hidden on Step 2.

---

## Section 4: Step 1 — Sign NDA Form

### 4.1 NDA Legal Text Block

The NDA text is displayed in a **scrollable box** (fixed height, overflow-y scroll) with a light gray background inside the white card. The text is formatted with numbered section headings in bold and paragraph body text. This is a **read-only display** — the user cannot edit it.

```tsx
<div className="bg-muted rounded-lg p-4 max-h-64 overflow-y-auto text-sm text-foreground/80 leading-relaxed mb-6">
  {/* Full NDA legal text as static content */}
</div>
```

For Alpha Capital One, replace "RAD Commercial Realty, LLC" with "Alpha Capital One" throughout the NDA text. Update the address, governing law state, and entity name accordingly. The NDA structure (10 sections) should be preserved: Purpose, Scope of Coverage, Definition of Confidential Information, Obligations, Non-Circumvention, Exclusions, Term, Remedies, Governing Law, Entire Agreement.

### 4.2 "Your Information" Form Fields

This subsection has a shield icon (🛡) beside the heading "Your Information". Layout is a **2-column grid** for wide screens, single column on mobile (`grid grid-cols-1 md:grid-cols-2 gap-4`).

**Fields (in order):**

| Field | Type | Required | Placeholder | Icon |
|---|---|---|---|---|
| Full Legal Name | text input | Yes (`*`) | "John Smith" | Person icon |
| Email Address | email input | Yes (`*`) | "john@company.com" | Mail icon |
| Phone Number | tel input | Yes (`*`) | "(555) 123-4567" | Phone icon |
| Company Name | text input | No | "ABC Investments, LLC" | Building icon |
| Role | select/combobox | Yes (`*`) | "Principal / Direct Buyer" | Person group icon |
| Referred By / Agent | select/combobox | No (optional) | "Select agent or referral source" | Person group icon |
| Date | text input | No (read-only) | Auto-populated today's date | Calendar icon |

**Role Options:** Principal / Direct Buyer, Agent / Broker, Fund Manager / Family Office, Other. For Alpha Capital One, update these to match your investor types (e.g., Family Office, Institutional Investor, HNWI, Syndicator, etc.).

**Referred By Options:** Dynamically pulled from a list of team members/agents. Populate this from your CRM or a static config array.

**Date field behavior:** Auto-populated with today's date formatted as `"April 18, 2026"` using `new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date())`. The field is read-only (disabled, not editable). This serves as the execution date of the agreement.

### 4.3 Checkbox Group

Four checkboxes appear below the form fields. Each is a custom-styled checkbox using a shadcn/ui `Checkbox` component with a `label` to the right. They are NOT inside a grid — they are full-width stacked vertically with `space-y-3`.

**Checkbox 1:** "I have read and agree to the terms of this Mutual Non-Disclosure Agreement." — **Required to enable the submit button.** Default: unchecked.

**Checkbox 2:** "I agree to be contacted by Alpha Capital One via call, email, and text regarding investment opportunities." — Required for compliance (TCPA). Default: unchecked.

**Checkbox 3:** "Subscribe to weekly market insights & deal alerts" — Default: **pre-checked** (opt-out, not opt-in). This is a marketing consent pre-check.

**Checkbox 4:** "I'd like access to Off-Market Deals & Market Newsletter" — Default: unchecked.

**Gate logic:** The "Continue to Buyer Profile" button starts as `disabled={true}` with `opacity-50`. It becomes enabled only when Checkbox 1 AND Checkbox 2 are both checked AND the required fields (Full Legal Name, Email, Phone, Role) are non-empty and valid.

```tsx
const isStep1Valid = watch("agreedToNDA") && watch("agreedToContact")
  && !!watch("fullName") && !!watch("email") && !!watch("phone") && !!watch("role");
```

### 4.4 Submit Button (Step 1)

```tsx
<Button
  type="button"
  disabled={!isStep1Valid}
  onClick={handleStep1Submit}
  className="w-full h-11 bg-gold text-navy hover:bg-gold-light font-bold"
>
  Continue to Buyer Profile <ChevronRight className="ml-2 w-4 h-4" />
</Button>
```

**Styling:** Full width, gold background, navy text, bold, with a right-pointing chevron icon. The `disabled` state uses Tailwind's `disabled:opacity-50 disabled:pointer-events-none`. No loading spinner on this step — submission is local state only until the API call.

---

## Section 5: Step 2 — Buyer Profile Form

Step 2 is not visible from Step 1, so it must be inferred from the site's overall UX intent. Based on the "Tell us your acquisition criteria" description, build Step 2 with the following fields. You will need to define these for Alpha Capital One specifically, but a strong baseline is:

**Buyer Profile Fields:**

| Field | Type | Notes |
|---|---|---|
| Asset Types of Interest | Multi-select checkboxes | e.g., Multifamily, Office, Retail, Industrial, Mixed-Use, Hotel/Hospitality |
| Target Markets / States | Multi-select or tag input | Geographic focus |
| Deal Size (Min) | Number/currency input | Minimum acquisition size |
| Deal Size (Max) | Number/currency input | Maximum acquisition size |
| Cap Rate Target | Number input | Target cap rate range |
| Equity Available | Select or number | Amount of equity ready to deploy |
| Investment Timeline | Select | e.g., 0-3 months, 3-6 months, 6-12 months |
| Financing Strategy | Select | Cash, Conventional, Bridge, DSCR, Syndication |
| Additional Notes | Textarea | Free-form investment criteria notes |

**Submit Button (Step 2):** "Complete Registration" or "Submit & Request Access" — This triggers the actual API POST, sends an email notification to the Alpha Capital One team, writes the record to the database, and redirects to a success/confirmation page.

---

## Section 6: Form Validation (Zod + React Hook Form)

### 6.1 Schema Design

```typescript
// lib/schemas/register.ts
import { z } from "zod";

export const ndaFormSchema = z.object({
  fullName: z.string().min(2, "Full legal name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  companyName: z.string().optional(),
  role: z.enum(["principal", "agent_broker", "fund_manager", "family_office", "other"]),
  referredBy: z.string().optional(),
  date: z.string(), // auto-populated, not user-editable
  agreedToNDA: z.literal(true, { errorMap: () => ({ message: "You must agree to the NDA" }) }),
  agreedToContact: z.literal(true, { errorMap: () => ({ message: "Contact consent required" }) }),
  subscribeInsights: z.boolean().default(true),
  subscribeNewsletter: z.boolean().default(false),
});

export const buyerProfileSchema = z.object({
  assetTypes: z.array(z.string()).min(1, "Select at least one asset type"),
  targetMarkets: z.array(z.string()).min(1, "Select at least one market"),
  dealSizeMin: z.number().min(0),
  dealSizeMax: z.number().min(0),
  equityAvailable: z.number().optional(),
  investmentTimeline: z.string(),
  financingStrategy: z.string(),
  additionalNotes: z.string().optional(),
});
```

### 6.2 Error Display

Use inline error messages below each field: `<p className="text-destructive text-xs mt-1">{error.message}</p>`. Required field labels show a red `*` suffix using `after:content-['*'] after:text-destructive after:ml-0.5`.

---

## Section 7: API & Backend

### 7.1 API Route — Step 1 NDA

```typescript
// app/api/register/route.ts
export async function POST(req: Request) {
  const body = await req.json();
  const parsed = ndaFormSchema.safeParse(body);
  if (!parsed.success) return Response.json({ error: parsed.error }, { status: 400 });

  // 1. Save to database (Supabase, PlanetScale, or your chosen DB)
  await db.registrations.create({ data: { ...parsed.data, step: 1, status: "nda_signed" } });

  // 2. Send email notification to Alpha Capital One team
  await sendEmail({ to: "team@alphacapitalone.com", subject: "New NDA Signed", ... });

  // 3. Send confirmation email to registrant
  await sendEmail({ to: parsed.data.email, subject: "NDA Received - Alpha Capital One", ... });

  return Response.json({ success: true, message: "NDA recorded" });
}
```

### 7.2 Database Schema

```sql
CREATE TABLE registrations (
  id                   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name            TEXT NOT NULL,
  email                TEXT NOT NULL UNIQUE,
  phone                TEXT,
  company              TEXT,
  role                 TEXT,
  referred_by          TEXT,
  nda_signed_at        TIMESTAMP DEFAULT NOW(),
  agreed_to_nda        BOOLEAN DEFAULT FALSE,
  agreed_to_contact    BOOLEAN DEFAULT FALSE,
  subscribe_insights   BOOLEAN DEFAULT TRUE,
  subscribe_newsletter BOOLEAN DEFAULT FALSE,
  -- Buyer Profile fields
  asset_types          TEXT[],
  target_markets       TEXT[],
  deal_size_min        NUMERIC,
  deal_size_max        NUMERIC,
  equity_available     NUMERIC,
  investment_timeline  TEXT,
  financing_strategy   TEXT,
  notes                TEXT,
  -- Status tracking
  status               TEXT DEFAULT 'pending_review',
  step_completed       INTEGER DEFAULT 1,
  created_at           TIMESTAMP DEFAULT NOW(),
  updated_at           TIMESTAMP DEFAULT NOW()
);
```

---

## Section 8: UI Component Library & Styling

### 8.1 Brand Token Setup (Tailwind CSS)

Based on the RAD CRE CSS variables, replicate the Alpha Capital One brand by defining tokens in `tailwind.config.ts`:

```typescript
extend: {
  colors: {
    navy: "hsl(var(--navy))",
    gold: "hsl(var(--gold))",
    "gold-light": "hsl(var(--gold-light))",
    background: "hsl(var(--background))",
    foreground: "hsl(var(--foreground))",
    muted: "hsl(var(--muted))",
    border: "hsl(var(--border))",
  },
}
```

Set Alpha Capital One's specific hex values for `--navy` and `--gold` in `globals.css`. The RAD CRE palette uses navy `hsl(216 28% 17%)` and gold `hsl(40 30% 59%)` — update these to match Alpha Capital One's brand guide.

### 8.2 Component Stack

Use **shadcn/ui** as the base component library. Required components: `Button`, `Input`, `Label`, `Checkbox`, `Select` (for combobox/dropdown), `Textarea`, `Card`, `Form` (React Hook Form wrapper). These are all available via `npx shadcn@latest add`.

### 8.3 Ticker Bar (Optional)

The RAD CRE site has an animated financial data ticker at the top of the page (Fed Funds, Prime Rate, Treasury, SOFR). For Alpha Capital One, build a similar marquee bar if relevant — use CSS `@keyframes marquee` with a duplicated inner content div to create infinite scroll. Populate with relevant financial metrics via a server-side fetch or a financial data API (e.g., FRED API for Fed Funds rate).

---

## Section 9: UX Patterns & Micro-interactions

**Scroll to top on step change:** When advancing from Step 1 to Step 2, call `window.scrollTo({ top: 0, behavior: "smooth" })`.

**Button disabled state as form completion feedback:** The submit button being visually disabled (opacity-50) until all required fields are filled is a key UX signal — users understand what is blocking them without needing an error toast.

**Pre-checked marketing checkbox:** The "Subscribe to weekly insights" checkbox should default to `true` in both the Zod schema and the `useForm` defaults. This is a common pattern for newsletter opt-in — legal in most jurisdictions if clearly labeled. Consult Alpha Capital One's legal team.

**Read-only date field:** The date field uses `disabled` styling but visually looks like an input — this communicates "the agreement date is today" without confusion.

**Scrollable NDA box:** The NDA text should be in a container with `max-h-64 overflow-y-auto` — long enough that the user sees there is more content, encouraging scrolling, but not so tall it dominates the page.

**Field icons:** Each label has a small inline icon (shadcn Lucide icons recommended): `UserRound` for name, `Mail` for email, `Phone` for phone, `Building2` for company, `Users` for role, `Calendar` for date, `Shield` for the "Your Information" heading. These add visual hierarchy and professionalism.

---

## Section 10: File & Folder Structure

```
app/
  register/
    page.tsx                    ← Multi-step form page (client component)
    layout.tsx                  ← Clean layout (no sidebar)
  api/
    register/route.ts
    buyer-profile/route.ts
components/
  register/
    StepNav.tsx                 ← Step indicator pills
    HowItWorksGrid.tsx          ← 4-step explainer grid
    NDAText.tsx                 ← Static scrollable NDA content
    NDAForm.tsx                 ← Step 1 form (React Hook Form)
    BuyerProfileForm.tsx        ← Step 2 form
    RegistrationSuccess.tsx     ← Post-submit confirmation state
lib/
  schemas/
    register.ts                 ← Zod schemas for both steps
  db/
    registrations.ts            ← DB query functions
  email/
    templates/
      nda-confirmation.tsx      ← Email template for user
      nda-alert.tsx             ← Internal team alert email
```

---

## Section 11: Success State

After Step 2 submission, replace the form card content (don't navigate away) with a confirmation message:

- Heading: "Registration Submitted" or "You're on the List"
- Body: "Our team will review your profile and grant access within 24–48 hours. You'll receive a confirmation email at [email]."
- CTA: Link back to the main site or a "View Off-Market Listings (Preview)" page
- Email: Trigger a transactional email to the registrant confirming receipt

---

## Section 12: Implementation Order

**Phase 1 — Static Shell:** Build the page layout, hero banner, `StepNav`, and `HowItWorksGrid` with static/mock data. No form logic yet.

**Phase 2 — Step 1 Form:** Wire up `NDAForm` with React Hook Form + Zod. Implement all fields, checkbox gate logic, and the disabled/enabled button state. All local state — no API yet.

**Phase 3 — Step 2 Form:** Build `BuyerProfileForm` with all buyer criteria fields. Connect `setCurrentStep` from the parent page.

**Phase 4 — API Routes:** Build the `/api/register` and `/api/buyer-profile` POST routes. Connect the forms to submit to these endpoints. Add loading states to the submit buttons.

**Phase 5 — Database & Emails:** Connect Supabase (or chosen DB). Set up Resend or Postmark for transactional emails. Test full end-to-end flow.

**Phase 6 — Polish:** Animate step transitions (Framer Motion fade-in), add toast notifications on errors, mobile test all layouts, add the success state component.

---

*This strategy gives the Claude Cowork team a complete, copy-ready blueprint to build the Alpha Capital One NDA registration flow in Next.js. The core pattern — gated access behind a signed NDA, then a structured buyer profile, then manual approval — maps directly to how any private deal or investment board access flow should work.*
