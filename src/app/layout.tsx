import type { Metadata } from "next";
import { Syne, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { GSAPInit } from "@/components/layout/GSAPInit";

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
  title: "DIY MOTORHOMES // Built for the road. Engineered for life.",
  description: "The UK's definitive resource hub and online store for serious self-build motorhome and campervan conversions.",
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
        <GSAPInit />
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}


