import { NextResponse } from "next/server"

import { ndaFormSchema } from "@/components/form/nda-form/schema"

// POST /api/nda  — stubbed endpoint
// TODO: persist to Neon/Supabase, send confirmation + internal alert emails via nodemailer.
export async function POST(req: Request) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { ok: false, message: "Invalid JSON body" },
      { status: 400 }
    )
  }

  const parsed = ndaFormSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed",
        errors: parsed.error.flatten(),
      },
      { status: 400 }
    )
  }

  const signedAt = new Date().toISOString()

  // Minimal dev visibility — strip signature-adjacent fields from log.
  console.log("[stub] /api/nda received:", {
    email: parsed.data.email,
    fullName: parsed.data.fullName,
    role: parsed.data.role,
    signedAt,
  })

  return NextResponse.json({
    ok: true,
    signedAt,
    message: "NDA recorded (stub).",
  })
}
