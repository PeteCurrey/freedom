import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Create Builder Account | DIY Motorhomes",
  description: "Join the community to save build plans, access premium blueprints, and track your engineering progress.",
};

export default function SignupPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-48 pb-32 flex items-center justify-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// NEW IDENTITY DETECTED</p>
            <h1 className="font-display text-5xl lg:text-7xl uppercase">
              REGISTER <span className="text-brand-orange">ACCOUNT</span>
            </h1>
          </div>
          
          <AuthForm mode="signup" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
