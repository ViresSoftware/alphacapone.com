import { NextResponse } from "next/server"

import {
  buyerProfileSchema,
  ndaFormSchema,
} from "@/components/form/nda-form/schema"

// POST /api/buyer-profile  — stubbed endpoint
// Expects { nda: NdaFormValues, profile: BuyerProfileValues }
// TODO: persist full registration record + trigger review-team notification.
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

  const shape =
    body && typeof body === "object" && body !== null
      ? (body as { nda?: unknown; profile?: unknown })
      : { nda: undefined, profile: undefined }

  const ndaParsed = ndaFormSchema.safeParse(shape.nda)
  const profileParsed = buyerProfileSchema.safeParse(shape.profile)

  if (!ndaParsed.success || !profileParsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Validation failed",
        errors: {
          nda: ndaParsed.success ? null : ndaParsed.error.flatten(),
          profile: profileParsed.success
            ? null
            : profileParsed.error.flatten(),
        },
      },
      { status: 400 }
    )
  }

  const submittedAt = new Date().toISOString()

  console.log("[stub] /api/buyer-profile received:", {
    email: ndaParsed.data.email,
    assetTypes: profileParsed.data.assetTypes,
    dealSize: [profileParsed.data.dealSizeMin, profileParsed.data.dealSizeMax],
    timeline: profileParsed.data.timeline,
    submittedAt,
  })

  return NextResponse.json({
    ok: true,
    submittedAt,
    status: "pending_review",
    message: "Registration received (stub).",
  })
}
