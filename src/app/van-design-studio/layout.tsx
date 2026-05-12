import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Amplios Van Design Studio | Professional Campervan Planner",
  description: "A standalone, high-end automotive design studio for DIY campervan builders and professional converters.",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} font-sans bg-[#F9F8F6] text-[#1A1917] antialiased selection:bg-blue-100 h-screen overflow-hidden studio-theme`}>
      {children}
    </div>
  );
}
