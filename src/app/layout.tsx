import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { GSAPInit } from "@/components/layout/GSAPInit";
import { StructuredData, generateOrganizationSchema } from "@/components/seo/StructuredData";
import { PromotionBanner } from "@/components/layout/PromotionBanner";

const syne = Syne({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-syne",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://amplios.co.uk'),
  title: {
    template: "%s | Amplios",
    default: "Amplios // Built for the road. Engineered for life."
  },
  description: "The UK's definitive resource hub and online store for serious self-build motorhome and campervan conversions.",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "Amplios",
    description: "Built for the road. Engineered for life.",
    url: 'https://amplios.co.uk',
    siteName: 'Amplios',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Amplios",
    description: "Built for the road. Engineered for life.",
  },
  other: {
    'arwin-verification': 'arwin',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable} font-sans bg-[#0A0A0A] text-[#F5F5F0] antialiased selection:bg-[#FF6B00] selection:text-white`}
      >
        <StructuredData data={generateOrganizationSchema()} />
        <GSAPInit />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}


