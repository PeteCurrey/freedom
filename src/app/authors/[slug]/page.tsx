import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, MapPin, Globe, Twitter, Instagram, Linkedin, Calendar } from "lucide-react";

interface Author {
  name: string;
  slug: string;
  role: string;
  bio: string;
  location: string;
  joinedDate: string;
  posts: { title: string; slug: string; date: string; category: string }[];
}

const authors: Record<string, Author> = {
  "james-miller": {
    name: "James Miller",
    slug: "james-miller",
    role: "Resident Blogger & Tech Reviewer",
    bio: "James is a full-time van lifer, software engineer, and adventure photographer. Since converting his LWB Sprinter in early 2024, he has covered over 15,000 miles across the UK and Europe. He specializes in off-grid electrical systems and digital nomad connectivity.",
    location: "Nomadic (Currently UK)",
    joinedDate: "January 2026",
    posts: [
      {
        title: "My First 10,000 Miles in a Self-Build Sprinter",
        slug: "my-first-10000-miles-sprinter",
        date: "May 12, 2026",
        category: "Experience"
      },
      {
        title: "Wild Camping in Italy: A Beginner's Guide",
        slug: "wild-camping-italy-guide",
        date: "May 01, 2026",
        category: "Destinations"
      }
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = authors[params.slug];
  if (!author) return { title: "Author Not Found" };

  return {
    title: `${author.name} | Resident Blogger | Amplios`,
    description: author.bio.substring(0, 160),
  };
}

export default function AuthorPage({ params }: { params: { slug: string } }) {
  const author = authors[params.slug];
  if (!author) notFound();

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* AUTHOR HERO */}
      <section className="pt-40 pb-20 bg-brand-carbon/30 border-b border-brand-border/10">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-center md:items-start text-center md:text-left">
            <div className="w-48 h-48 bg-brand-obsidian rounded-full border-4 border-brand-orange flex items-center justify-center text-brand-orange text-6xl font-display uppercase shadow-2xl shrink-0">
              {author.name[0]}
            </div>
            <div className="space-y-6 flex-1">
              <div className="space-y-2">
                <span className="bg-brand-orange text-brand-obsidian font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-1 font-bold">Resident Blogger</span>
                <h1 className="font-display text-5xl lg:text-7xl uppercase tracking-tighter text-brand-white leading-none">
                  {author.name}
                </h1>
                <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{author.role}</p>
              </div>
              
              <p className="font-sans text-brand-grey text-lg leading-relaxed max-w-3xl italic">
                "{author.bio}"
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-8 pt-4 border-t border-brand-border/20 font-mono text-[9px] uppercase tracking-widest text-brand-grey">
                <span className="flex items-center gap-2"><MapPin className="w-3 h-3 text-brand-orange" /> {author.location}</span>
                <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-brand-orange" /> Joined {author.joinedDate}</span>
              </div>

              <div className="flex justify-center md:justify-start gap-4 pt-4">
                {[Twitter, Instagram, Linkedin, Globe].map((Icon, i) => (
                  <button key={i} className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all">
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUTHOR POSTS */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl uppercase tracking-tight text-brand-white mb-16 border-b border-brand-orange/30 pb-4 inline-block">
              Latest from {author.name.split(' ')[0]}
            </h2>
            
            <div className="grid gap-12">
              {author.posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="group grid md:grid-cols-[1fr_auto] gap-8 items-center border border-brand-border p-8 bg-brand-carbon hover:border-brand-orange transition-colors">
                  <div className="space-y-3">
                    <span className="font-mono text-[9px] text-brand-orange uppercase tracking-widest">{post.category}</span>
                    <h3 className="font-display text-2xl lg:text-4xl uppercase tracking-tight text-brand-white group-hover:text-brand-orange transition-colors leading-none">
                      {post.title}
                    </h3>
                    <p className="font-mono text-[10px] text-brand-grey uppercase tracking-widest">{post.date}</p>
                  </div>
                  <div className="w-12 h-12 border border-brand-border flex items-center justify-center text-brand-grey group-hover:text-brand-orange group-hover:border-brand-orange transition-all group-hover:translate-x-2">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
