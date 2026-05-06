import Link from "next/link"
import { ExternalLink, FileText } from "lucide-react"

export default function MutualNCNDAAgreementText() {
  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-[#fcd770]" />
          <h3 className="font-heading text-[0.8rem] uppercase tracking-[0.12em] text-[var(--text-secondary)]">
            Mutual NCNDA — Agreement Text
          </h3>
        </div>
        <Link
          href="/pdfs/Mutual-NCNDA.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-[#fcd770] hover:underline"
        >
          Open full PDF <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      <div className="max-h-72 overflow-y-auto rounded-lg border border-gray-700 bg-gray-900/40 p-5 text-sm leading-relaxed text-gray-300">
        <h4 className="text-center text-base font-bold text-white">
          MUTUAL NON-CIRCUMVENTION, NON-DISCLOSURE
          <br />
          AND CONFIDENTIALITY AGREEMENT
        </h4>
        <p className="mt-1 text-center text-xs italic text-gray-400">
          (Global Transactions &mdash; Montana Arbitration Seat)
        </p>

        <div className="mt-5 grid grid-cols-1 gap-4 rounded-md border border-gray-700/60 bg-black/20 p-4 text-xs sm:grid-cols-2">
          <div>
            <p className="font-semibold text-white">PARTY A</p>
            <p className="mt-1">Alpha Capital 1</p>
            <p>2877 Stacia Ave</p>
            <p>Helena, MT 59601, USA</p>
            <p>Phone: 934 222 1366</p>
            <p>Email: ceo@alphacapital1.com</p>
            <p>EIN: 93-2876510</p>
          </div>
          <div>
            <p className="font-semibold text-white">PARTY B</p>
            <p className="mt-1 text-gray-400">
              Name / Company: ____________________
            </p>
            <p className="text-gray-400">Address: ____________________</p>
            <p className="text-gray-400">Phone: ____________________</p>
            <p className="text-gray-400">Email: ____________________</p>
            <p className="text-gray-400">
              ID / Registration: ____________________
            </p>
          </div>
        </div>

        <p className="mt-5">
          This Mutual Non-Circumvention, Non-Disclosure and Confidentiality
          Agreement (the &ldquo;Agreement&rdquo;) is entered into as of the date
          of the last signature below by and between Party A and Party B. The
          Parties acknowledge that they may, directly or indirectly, disclose,
          receive, review, discuss, transmit, introduce, or otherwise exchange
          confidential or sensitive information in connection with actual or
          proposed transactions anywhere in the world.
        </p>

        <p className="mt-5 font-semibold text-white">
          1. Purpose and Covered Transactions
        </p>
        <p>
          This Agreement applies to all lawful commodity sales, real estate
          transactions, public or private placement or trade programs,
          cryptocurrency transactions, financial instrument transactions,
          finance-related transactions, and any other actual or proposed
          transaction, relationship, structure, or opportunity in which either
          Party gives, receives, reviews, or relies upon sensitive, proprietary,
          non-public, commercial, operational, strategic, financial, technical,
          transactional, identity, source, contact, wallet, account, routing, or
          counterparty information. The Agreement is intended to operate
          globally and shall apply without geographic limitation to
          communications, introductions, negotiations, due diligence, and
          closings conducted across borders.
        </p>

        <p className="mt-4 font-semibold text-white">2. Confidential Information</p>
        <p>
          For purposes of this Agreement, &ldquo;Confidential Information&rdquo;
          means all non-public information disclosed by or on behalf of either
          Party in any form, whether written, oral, digital, visual,
          documentary, electronic, blockchain-related, or otherwise recorded or
          observed. Confidential Information includes the existence of
          discussions; transaction terms; pricing; proof-of-funds; bank,
          exchange, wallet, payment, and settlement information; identities of
          buyers, sellers, owners, brokers, introducers, principals, mandate
          holders, agents, affiliates, investors, lenders, tenants, operators,
          attorneys, consultants, and counterparties; documents; records;
          know-how; methods; deal structures; and all notes, summaries,
          analyses, screenshots, extracts, and derivatives prepared from such
          information. The receiving Party shall treat all such information as
          strictly confidential whether or not specifically marked confidential.
        </p>

        <p className="mt-4 font-semibold text-white">
          3. Use and Disclosure Restrictions
        </p>
        <p>
          Each receiving Party shall use Confidential Information solely for
          evaluating, structuring, negotiating, performing, or lawfully
          monitoring a Covered Transaction with the disclosing Party. No
          receiving Party shall disclose, copy, summarize, forward, transmit,
          publish, replicate, commercialize, reverse engineer, exploit, or
          permit access to Confidential Information except to its bona fide
          officers, employees, attorneys, accountants, compliance personnel,
          financing sources, or advisors who have a strict need to know for the
          Covered Transaction and who are bound by confidentiality obligations
          at least as protective as those contained herein. Each Party remains
          fully responsible for any breach by its representatives, affiliates,
          subsidiaries, parents, holding companies, related entities, nominees,
          trustees, designees, family offices, or controlled persons.
        </p>

        <p className="mt-4 font-semibold text-white">4. Mutual Non-Circumvention</p>
        <p>
          Neither Party shall, directly or indirectly, bypass, avoid,
          circumvent, disintermediate, or attempt to do so with respect to any
          contact, source, lead, principal, beneficial owner, broker, exchange,
          desk, introducer, investor, lender, seller, buyer, landlord, tenant,
          operator, manager, service provider, issuer, wallet holder, or other
          relationship introduced, identified, or made known by the other Party.
          Without the prior written consent of the introducing Party, neither
          Party may contact, solicit, negotiate with, transact with, accept
          business from, transfer to, or otherwise deal with such relationship
          outside the introducing Party or in a manner intended to reduce,
          eliminate, or impair the introducing Party&apos;s role, control,
          leverage, or business expectation.
        </p>

        <p className="mt-4 font-semibold text-white">
          5. Anti-Evasion; Alternate Channels and Related Persons
        </p>
        <p>
          Circumvention is prohibited whether attempted through alternate phone
          numbers, alternate email addresses, messaging applications, social
          media accounts, new domains, wallet addresses, exchanges, bank
          accounts, intermediaries, nominees, affiliates, subsidiaries, parent
          companies, colleagues, employees, relatives, consultants, agents,
          brokers, introducers, shell companies, trusts, funds, joint ventures,
          special purpose vehicles, assignees, successors, or any person or
          entity acting in concert with, under the direction of, or for the
          benefit of a Party. A Party may not evade this Agreement by changing
          identity, form, channel, corporate structure, jurisdiction, beneficial
          ownership, title, or communication method. Any transaction
          substantially derived from a relationship or Confidential Information
          furnished by the other Party shall be deemed covered by this
          Agreement.
        </p>

        <p className="mt-4 font-semibold text-white">
          6. Pre-Existing Relationships; Burden of Proof
        </p>
        <p>
          If a Party claims that a contact, source, counterparty, wallet,
          account, project, property, or opportunity was already known or
          independently sourced before disclosure by the other Party, that Party
          bears the burden of proving such prior knowledge by clear
          contemporaneous written records dated before the first disclosure
          under this Agreement. General market familiarity, hearsay, informal
          conversations, undocumented databases, or later-created notes shall
          not be sufficient proof. Absent such proof, the relationship or
          opportunity shall be presumed to have been introduced or protected by
          the disclosing Party for purposes of this Agreement.
        </p>

        <p className="mt-4 font-semibold text-white">7. Exclusions</p>
        <p>
          Confidential Information does not include information that the
          receiving Party can prove by written records: (a) was already lawfully
          known to it without restriction before disclosure; (b) became publicly
          available through no breach of this Agreement; (c) was lawfully
          received from a third party not under a duty of confidentiality; or
          (d) was independently developed without use of or reference to the
          disclosing Party&apos;s Confidential Information. These exclusions
          shall be interpreted narrowly, and the receiving Party bears the
          burden of proof for each claimed exclusion.
        </p>

        <p className="mt-4 font-semibold text-white">
          8. Compelled Disclosure and Protective Measures
        </p>
        <p>
          If a receiving Party is required by law, court order, regulator,
          subpoena, governmental authority, exchange, or compliance obligation
          to disclose Confidential Information, it shall, to the maximum extent
          legally permitted, provide prompt written notice to the disclosing
          Party before disclosure, disclose only the minimum portion legally
          required, and cooperate in seeking confidential treatment, protective
          orders, redactions, or equivalent safeguards. Confidential Information
          that is compelled to be disclosed shall remain subject to this
          Agreement to the fullest extent permitted by law.
        </p>

        <p className="mt-4 font-semibold text-white">
          9. No Fee Agreement; No Partnership; No Obligation to Close
        </p>
        <p>
          This Agreement is not, and shall not be construed as, a brokerage
          agreement, finder&apos;s fee agreement, commission agreement, referral
          agreement, joint venture agreement, partnership agreement, agency
          appointment, or commitment to proceed with any transaction. No fee,
          compensation, success fee, retainer, or commission is created,
          promised, waived, admitted, or implied by this Agreement alone. Each
          Party retains the sole discretion to approve, reject, suspend, or
          terminate any discussion or transaction unless and until a separate
          definitive written agreement is executed.
        </p>

        <p className="mt-4 font-semibold text-white">10. Term and Survival</p>
        <p>
          This Agreement shall begin on the Effective Date and remain in force
          for one (1) year. The confidentiality, non-use, non-circumvention,
          anti-evasion, remedy, dispute-resolution, and protective provisions of
          this Agreement shall survive expiration or termination with respect to
          any Confidential Information disclosed, relationship identified, or
          opportunity introduced during the Term, and shall continue for the
          maximum period enforceable under applicable law.
        </p>

        <p className="mt-4 font-semibold text-white">
          11. Force Majeure; War; Sanctions; Government Action
        </p>
        <p>
          No Party shall be liable for delay or failure in performance to the
          extent caused by events beyond that Party&apos;s reasonable control,
          including war, armed conflict, invasion, terrorism, civil unrest,
          embargo, sanctions, government order, exchange suspension, banking
          interruption, cyberattack, utility outage, natural disaster, or
          comparable force majeure event; provided, however, that force majeure
          shall not excuse unauthorized use, misappropriation, disclosure,
          diversion, circumvention, or misuse of Confidential Information. The
          affected Party shall promptly notify the other Party, use diligent
          efforts to mitigate the impact, and resume performance as soon as
          reasonably possible.
        </p>

        <p className="mt-4 font-semibold text-white">
          12. Equitable Relief and Remedies
        </p>
        <p>
          Each Party acknowledges that a breach of this Agreement may cause
          immediate and irreparable harm not fully compensable by money damages
          alone. Accordingly, in addition to any other rights or remedies
          available at law or in equity, the non-breaching Party shall be
          entitled to temporary, preliminary, and permanent injunctive relief,
          specific performance, restraining orders, tracing relief, and other
          equitable remedies without the necessity of posting bond except to the
          extent mandatory law expressly requires otherwise. No exercise or
          omission of one remedy shall limit any other remedy.
        </p>

        <p className="mt-4 font-semibold text-white">
          13. Governing Law and Arbitration
        </p>
        <p>
          This Agreement shall be governed by and construed in accordance with
          the laws of the State of Montana, USA, without regard to
          conflict-of-laws principles that would require application of another
          jurisdiction&apos;s law. Any dispute, claim, or controversy arising
          out of or relating to this Agreement shall be finally resolved by
          binding arbitration. The legal seat and place of arbitration shall be
          Helena, Montana, USA, unless the Parties later agree in writing to
          another location within Montana. The arbitration may be administered
          by the American Arbitration Association, or if the dispute is
          international in character, by its international division or a
          comparable agreed provider, before one arbitrator experienced in
          cross-border commercial matters. The arbitral award may be enforced
          in any court of competent jurisdiction.
        </p>

        <p className="mt-4 font-semibold text-white">14. Miscellaneous</p>
        <p>
          This Agreement contains the entire understanding between the Parties
          concerning its subject matter and supersedes prior oral or written
          confidentiality or non-circumvention understandings relating to the
          same subject matter, except for any later written agreement expressly
          stating otherwise. No amendment, waiver, or consent shall be valid
          unless in writing and signed by the Party to be bound. If any
          provision is held unenforceable, it shall be reformed or enforced to
          the maximum extent permitted so as to preserve the Parties&apos;
          intent, and the remaining provisions shall remain in full force and
          effect. This Agreement may be executed in counterparts, including
          electronic or PDF signatures, each of which shall be deemed an
          original and all of which together shall constitute one instrument.
        </p>

        <p className="mt-5 text-xs italic text-gray-500">
          The PDF version linked above is the binding document. By signing
          below, you acknowledge having had the opportunity to review the full
          PDF and accept its terms.
        </p>
      </div>
    </div>
  )
}
