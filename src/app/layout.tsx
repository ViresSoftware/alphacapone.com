import Script from "next/script";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Inter, Playfair_Display } from "next/font/google";
import { RestrictionProvider } from "@/context/RestrictionContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // optional for CSS variables
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alphacapone.com"),
  title: "Alpha Capital One",
  description: "Your Partner in Sophisticated Investment Strategies",
  openGraph: {
    title: "Alpha Capital One",
    description: "Your Partner in Sophisticated Investment Strategies",
    images: [{ url: "/logo/logo-metallic-black-bg.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alpha Capital One",
    description: "Your Partner in Sophisticated Investment Strategies",
    images: ["/logo/logo-metallic-black-bg.png"],
  },
  // icons: {
  //   icon: "/favicon.ico",
  // },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black text-white">
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-VCKJB3J6F0" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-VCKJB3J6F0');
          `}
        </Script>
        <RestrictionProvider>
          <Header />
          <main className="font-inter">{children}</main>
          <Footer />
        </RestrictionProvider>
      </body>
    </html>
  );
}
