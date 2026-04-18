import Link from "next/link"
import { ExternalLink } from "lucide-react"

export default function NdaLegalText() {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-white/70">
          Mutual Non-Circumvention, Non-Disclosure &amp; Confidentiality Agreement
        </h3>
        <Link
          href="/pdfs/Mutual-NCNDA.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#fcd770] hover:underline"
        >
          Open full PDF <ExternalLink className="h-3 w-3" />
        </Link>
      </div>
      <div className="max-h-64 overflow-y-auto rounded-md border border-white/10 bg-white/[0.03] p-4 text-sm leading-relaxed text-white/80">
        <p className="mb-3">
          This Mutual Non-Circumvention, Non-Disclosure and Confidentiality
          Agreement (this &ldquo;Agreement&rdquo;) is entered into as of the date below
          by and between <strong>Alpha Capital One</strong> and the undersigned
          party (each a &ldquo;Party&rdquo; and together the &ldquo;Parties&rdquo;).
        </p>

        <p className="mt-4 font-semibold text-white">1. Purpose.</p>
        <p>
          The Parties wish to explore a potential business relationship involving
          the disclosure of confidential information related to off-market real
          estate, private placements, investment vehicles, and related
          transactions (the &ldquo;Purpose&rdquo;).
        </p>

        <p className="mt-4 font-semibold text-white">2. Scope of Coverage.</p>
        <p>
          This Agreement covers all information exchanged in furtherance of the
          Purpose, whether disclosed in writing, orally, or by inspection of
          tangible or electronic materials.
        </p>

        <p className="mt-4 font-semibold text-white">
          3. Definition of Confidential Information.
        </p>
        <p>
          &ldquo;Confidential Information&rdquo; means any non-public information
          disclosed by either Party, including but not limited to property
          identities, ownership, pricing, financial statements, tenant rolls,
          buyer / seller identities, capital structures, trade secrets, and
          proprietary methods.
        </p>

        <p className="mt-4 font-semibold text-white">4. Obligations.</p>
        <p>
          Each Party shall hold the other Party&apos;s Confidential Information in
          strict confidence, use it solely for the Purpose, and not disclose it
          to any third party without prior written consent.
        </p>

        <p className="mt-4 font-semibold text-white">5. Non-Circumvention.</p>
        <p>
          Neither Party shall directly or indirectly circumvent, avoid, bypass,
          or obviate the other Party with respect to any introduced principal,
          asset, transaction, or opportunity, nor attempt to pursue any such
          opportunity without the other Party&apos;s written participation for a
          period of two (2) years.
        </p>

        <p className="mt-4 font-semibold text-white">6. Exclusions.</p>
        <p>
          Confidential Information does not include information that is or
          becomes publicly known through no fault of the receiving Party, was
          lawfully in the receiving Party&apos;s possession prior to disclosure, or
          is independently developed without use of the disclosing Party&apos;s
          information.
        </p>

        <p className="mt-4 font-semibold text-white">7. Term.</p>
        <p>
          This Agreement shall remain in effect for two (2) years from the date
          of execution and shall survive the termination of any discussions
          between the Parties.
        </p>

        <p className="mt-4 font-semibold text-white">8. Remedies.</p>
        <p>
          The Parties acknowledge that monetary damages may be inadequate for a
          breach of this Agreement and that the non-breaching Party shall be
          entitled to seek injunctive relief and recovery of reasonable attorney
          fees in addition to any other remedies available at law or in equity.
        </p>

        <p className="mt-4 font-semibold text-white">9. Governing Law.</p>
        <p>
          This Agreement shall be governed by and construed in accordance with
          the laws of the State of Delaware, without regard to its conflict of
          law principles.
        </p>

        <p className="mt-4 font-semibold text-white">10. Entire Agreement.</p>
        <p>
          This Agreement constitutes the entire agreement between the Parties
          regarding its subject matter and supersedes all prior understandings,
          whether written or oral.
        </p>

        <p className="mt-4 text-xs italic text-white/50">
          The PDF version linked above is the binding document. By signing
          below, you acknowledge having had the opportunity to review the full
          PDF and accept its terms.
        </p>
      </div>
    </div>
  )
}
