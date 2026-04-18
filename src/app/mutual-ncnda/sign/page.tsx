import type { Metadata } from "next"

import PageHeader from "@/components/page/header"
import NdaFlow from "@/components/form/nda-form/NdaFlow"

export const metadata: Metadata = {
  title: "Sign Mutual NCNDA | Alpha Capital One",
  description:
    "Sign the Mutual Non-Circumvention, Non-Disclosure and Confidentiality Agreement and request private access to Alpha Capital One's off-market deal board.",
  alternates: { canonical: "/mutual-ncnda/sign" },
  openGraph: {
    title: "Sign Mutual NCNDA | Alpha Capital One",
    description:
      "Sign the Mutual Non-Circumvention, Non-Disclosure and Confidentiality Agreement and request private access.",
    url: "/mutual-ncnda/sign",
    type: "website",
  },
}

export default function MutualNcndaSignPage() {
  return (
    <>
      <PageHeader
        title="Request Private Access"
        description="Sign the Mutual NCNDA to unlock off-market opportunities with Alpha Capital One."
        backgroundImage="/signed-paperwork.jpg"
      />
      <NdaFlow />
    </>
  )
}
