import Link from "next/link";
import { Download, Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card";

interface LegalDoc {
  name: string;
  file: string;
  description: string;
}

const documents: LegalDoc[] = [
  {
    name: "2026 Applicant's CIS",
    file: "/legal-docs/2026-APPLICANTS-CIS.docx",
    description:
      "Client Letterhead, Client Information, Signature, Passport, Company Registration",
  },
  {
    name: "Alpha Capital One",
    file: "/legal-docs/Alpha-Capital-Group-2.0-2-2.pdf",
    description:
      "Focus, Capabilities, Previous Metals Custody, Compliance Intelligence, Transaction Process & more",
  },
  {
    name: "Non-QM Loan Services Securitization",
    file: "/legal-docs/Non-QM-Loan-Services-Solutions.pdf",
    description:
      "Optimize Balance Sheet, Why Partner, Contact Info, Getting Started, Transaction Execution Timeline, Financial Impact & more",
  },
];

function fileNameFromPath(path: string) {
  return path.split("/").pop() ?? path;
}

export default function LegalDocsPageContent() {
  return (
    <section className="max-w-7xl mx-auto px-6 md:px-20 py-16">
      <div className="font-heading tracking-[0.08em] uppercase text-[0.9rem] text-[var(--text-secondary)] mb-2">
        Legal Docs
      </div>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
        Documents & Downloads
      </h2>
      <p className="text-gray-300 mb-12 max-w-2xl">
        Review and download the documents required for onboarding, due
        diligence, and transaction engagement with Alpha Capital One.
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => {
          const fileName = fileNameFromPath(doc.file);
          return (
            <Card
              key={doc.file}
              className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-white"
            >
              <CardHeader>
                <div className="flex items-start gap-3">
                  <FileText className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                  <div className="flex flex-col gap-1">
                    <CardTitle className="text-lg md:text-xl">
                      {doc.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 break-all">
                      {fileName}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-gray-300 text-[0.95rem] leading-relaxed">
                  {doc.description}
                </p>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-3">
                <Button
                  asChild
                  className="w-full sm:w-auto text-black bg-white hover:bg-gray-300"
                >
                  <Link href={doc.file} target="_blank" rel="noopener noreferrer">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button
                  asChild
                  className="w-full sm:w-auto text-black bg-white hover:bg-gray-300"
                >
                  <a href={doc.file} download={fileName}>
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
