import { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Authorise Access | Amplios",
  description: "Secure access to your Amplios build plans and technical documentation.",
};

export default function LoginPage() {
  return (
    <main className="bg-brand-obsidian min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-1 pt-48 pb-32 flex items-center justify-center">
        <div className="container mx-auto px-6 flex flex-col items-center">
          <div className="text-center mb-12">
            <p className="font-mono text-[10px] text-brand-orange uppercase tracking-[.4em] mb-4">// RESTRICTED ACCESS</p>
            <h1 className="font-display text-5xl lg:text-7xl uppercase">
              BUILDER <span className="text-brand-orange">LOGIN</span>
            </h1>
          </div>
          
          <AuthForm mode="login" />
        </div>
      </section>

      <Footer />
    </main>
  );
}
