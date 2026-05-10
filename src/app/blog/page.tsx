import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowRight, Calendar, User, Clock, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "Amplios Blog | Resident Blogger & Community Stories",
  description: "Real stories from the road. Our resident bloggers share their experiences, build tips, and the reality of full-time van life in the UK.",
  openGraph: {
    title: "Amplios Blog | Resident Blogger & Community Stories",
    description: "The human side of van building. Stories, tips, and inspiration.",
    url: "https://amplios.co.uk/blog",
  },
  alternates: { canonical: "https://amplios.co.uk/blog" },
};

const blogPosts = [
  {
    title: "My First 10,000 Miles in a Self-Build Sprinter",
    slug: "my-first-10000-miles-sprinter",
    excerpt: "From the Scottish Highlands to the Spanish coast. What held up, what broke, and what I'd change if I did it all again.",
    date: "May 12, 2026",
    author: "James Miller",
    category: "Experience",
    readTime: "8 min read",
    image: "/images/bespoke-iveco.png"
  },
  {
    title: "5 Things I Wish I Knew Before Starting My Conversion",
    slug: "5-things-i-wish-i-knew",
    excerpt: "The mistakes that cost me thousands. Learn from my errors in insulation, electrical planning, and weight distribution.",
    date: "May 08, 2026",
    author: "Sarah Hughes",
    category: "Tips",
    readTime: "6 min read",
    image: "/images/cat-windows.png"
  },
  {
    title: "Wild Camping in Italy: A Beginner's Guide",
    slug: "wild-camping-italy-guide",
    excerpt: "Navigating the 'Sosta' system and finding the best hidden spots in the Dolomites. The reality of Italian van life.",
    date: "May 01, 2026",
    author: "James Miller",
    category: "Destinations",
    readTime: "12 min read",
    image: "/images/cat-windows.png"
  }
];

export default function BlogIndex() {
  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 overflow-hidden border-b border-brand-border/20">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <span className="font-mono text-[10px] text-brand-orange uppercase tracking-[0.4em] mb-6 block leading-none">
              // STORIES FROM THE ROAD
            </span>
            <h1 className="font-display text-6xl lg:text-9xl uppercase tracking-tighter text-brand-white leading-[0.85] mb-8">
              RESIDENT<br /><span className="text-brand-orange">BLOGGER</span>
            </h1>
            <p className="font-sans text-brand-grey text-lg lg:text-2xl leading-relaxed max-w-2xl italic border-l-2 border-brand-orange pl-6">
              Technical guides are for the day. Blog stories are for the night. 
              Real experiences from real people living in vans they built themselves.
            </p>
          </div>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="py-20 bg-brand-carbon">
        <div className="container mx-auto px-6">
          <Link href={`/blog/${blogPosts[0].slug}`} className="group relative grid lg:grid-cols-2 gap-0 border border-brand-border bg-brand-obsidian overflow-hidden hover:border-brand-orange transition-colors">
            <div className="relative aspect-video lg:aspect-auto min-h-[400px]">
              <Image
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                fill
                className="object-cover opacity-60 group-hover:opacity-80 transition-opacity grayscale group-hover:grayscale-0"
              />
              <div className="absolute top-8 left-8">
                <span className="bg-brand-orange text-brand-obsidian font-mono text-[9px] uppercase tracking-widest px-3 py-1">Featured Story</span>
              </div>
            </div>
            <div className="p-12 lg:p-20 flex flex-col justify-center">
              <div className="flex items-center gap-6 mb-8 font-mono text-[10px] uppercase text-brand-grey tracking-widest">
                <span className="flex items-center gap-2"><Calendar className="w-3 h-3 text-brand-orange" /> {blogPosts[0].date}</span>
                <span className="flex items-center gap-2"><User className="w-3 h-3 text-brand-orange" /> {blogPosts[0].author}</span>
              </div>
              <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tight text-brand-white leading-none mb-8 group-hover:text-brand-orange transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="font-sans text-brand-grey text-lg leading-relaxed mb-10 italic">
                "{blogPosts[0].excerpt}"
              </p>
              <div className="flex items-center gap-4 text-brand-orange font-display text-xs uppercase tracking-[0.2em]">
                Read full story <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* BLOG GRID */}
      <section className="py-32">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {blogPosts.slice(1).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block space-y-8">
                <div className="relative aspect-video overflow-hidden border border-brand-border group-hover:border-brand-orange transition-colors">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover opacity-40 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0 duration-700"
                  />
                  <div className="absolute bottom-6 left-6 flex gap-2">
                    <span className="bg-brand-carbon/90 text-brand-white font-mono text-[8px] uppercase tracking-widest px-3 py-1 border border-brand-border">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-6 font-mono text-[9px] uppercase text-brand-grey tracking-widest">
                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                  </div>
                  <h3 className="font-display text-2xl lg:text-4xl uppercase tracking-tight text-brand-white group-hover:text-brand-orange transition-colors">
                    {post.title}
                  </h3>
                  <p className="font-sans text-brand-grey text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* LOAD MORE */}
          <div className="mt-24 text-center">
            <button className="border border-brand-border text-brand-grey px-12 py-5 font-display text-[10px] uppercase tracking-[0.3em] hover:bg-brand-orange hover:text-brand-obsidian hover:border-brand-orange transition-all">
              Load More Stories
            </button>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-32 bg-brand-carbon border-y border-brand-border/20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-2xl mx-auto space-y-10">
            <h2 className="font-display text-4xl lg:text-6xl uppercase tracking-tighter text-brand-white leading-none">
              WANT TO BE A<br /><span className="text-brand-orange">RESIDENT BLOGGER?</span>
            </h2>
            <p className="font-sans text-brand-grey text-lg italic">
              Built something amazing? Living the dream? We pay for high-quality 
              community stories. Join the Amplios roster.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-brand-orange text-brand-obsidian px-10 py-5 font-display text-xs uppercase tracking-widest hover:bg-brand-white transition-all">
              Apply Now <MessageSquare className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
