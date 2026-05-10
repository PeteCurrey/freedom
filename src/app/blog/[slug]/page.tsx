import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ArrowLeft, Calendar, User, Clock, Share2, MessageCircle } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  date: string;
  author: string;
  authorSlug: string;
  category: string;
  readTime: string;
  image: string;
  content: string[];
}

const blogPosts: Record<string, BlogPost> = {
  "my-first-10000-miles-sprinter": {
    title: "My First 10,000 Miles in a Self-Build Sprinter",
    slug: "my-first-10000-miles-sprinter",
    date: "May 12, 2026",
    author: "James Miller",
    authorSlug: "james-miller",
    category: "Experience",
    readTime: "8 min read",
    image: "/images/bespoke-iveco.png",
    content: [
      "Ten thousand miles is a long way. It's roughly the distance from London to Darwin, Australia. In my self-build Mercedes Sprinter, it's the distance between the 'dreaming' phase and the 'reality' phase.",
      "When I finished my build in early 2024, I thought I had created the perfect mobile home. I had the Victron electrical system, the Truma Combi heating, and a layout that looked great on Pinterest. But as any van-lifer will tell you, the road has a way of testing every screw, every joint, and every design decision you ever made.",
      "In this post, I want to share the honest truth about what 10,000 miles does to a self-build. The parts that exceeded my expectations, the parts that failed spectacularly, and the one thing I would change if I were starting again tomorrow.",
      "First, let's talk about the weight. I built on a LWB Sprinter, and like most DIY builders, I was obsessed with payload. I weighed every piece of timber, every battery, and every tank. At 10,000 miles, the van is still within its 3.5t limit, but only just. The lesson? You will always add more gear than you think.",
      "The electrical system has been the MVP. Using the Fogstar Drift 280Ah battery was the best decision I made. Even in the depths of a Scottish winter, I never ran out of power. The ability to charge at 100A via the DC-DC charger meant that even short drives between locations kept me topped up.",
      "However, the plumbing... that was a different story. 2,000 miles in, I developed a leak behind the shower wall. It was a classic 'beginner' mistake—I hadn't accounted for the vibration of the road on push-fit connectors. If you're building now, use jubilee clips on everything."
    ]
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts[params.slug];
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.title} | Amplios Blog`,
    description: post.content[0].substring(0, 160),
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts[params.slug];
  if (!post) notFound();

  return (
    <main className="bg-brand-obsidian min-h-screen">
      <Navbar />

      {/* ARTICLE HERO */}
      <article className="pt-32 pb-32">
        <header className="container mx-auto px-6 mb-20 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <Link href="/blog" className="inline-flex items-center gap-2 text-brand-orange font-mono text-[9px] uppercase tracking-[0.3em] hover:text-brand-white transition-colors mb-4">
              <ArrowLeft className="w-3 h-3" /> Back to Blog
            </Link>
            <div className="flex justify-center gap-4 font-mono text-[10px] uppercase text-brand-grey tracking-widest">
              <span className="bg-brand-carbon px-3 py-1 border border-brand-border">{post.category}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-8xl uppercase tracking-tighter text-brand-white leading-[0.9]">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-4 pt-4 border-t border-brand-border/20 max-w-xs mx-auto">
              <div className="w-10 h-10 bg-brand-carbon rounded-full flex items-center justify-center border border-brand-border text-brand-orange uppercase font-display text-xs">
                {post.author[0]}
              </div>
              <div className="text-left">
                <Link href={`/authors/${post.authorSlug}`} className="block font-display text-xs uppercase text-brand-white hover:text-brand-orange transition-colors">
                  {post.author}
                </Link>
                <span className="block font-mono text-[9px] text-brand-grey uppercase tracking-widest">{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* MAIN IMAGE */}
        <div className="container mx-auto px-6 mb-24">
          <div className="relative aspect-[21/9] border border-brand-border overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover opacity-60 grayscale shadow-2xl"
              priority
            />
          </div>
        </div>

        {/* ARTICLE CONTENT */}
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto relative">
            
            {/* FLOATING SOCIAL SHARE */}
            <div className="absolute -left-24 top-0 hidden xl:flex flex-col gap-6">
              <button className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 border border-brand-border flex items-center justify-center text-brand-grey hover:text-brand-orange hover:border-brand-orange transition-all">
                <MessageCircle className="w-4 h-4" />
              </button>
            </div>

            <div className="prose prose-invert max-w-none font-sans text-brand-grey text-xl leading-relaxed space-y-10">
              {post.content.map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-2xl text-brand-white first-letter:text-7xl first-letter:font-display first-letter:mr-3 first-letter:float-left first-letter:text-brand-orange" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* AUTHOR BOX */}
            <div className="mt-32 p-12 bg-brand-carbon border border-brand-border flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
              <div className="w-24 h-24 bg-brand-obsidian rounded-full flex items-center justify-center border-2 border-brand-orange text-brand-orange text-3xl font-display uppercase">
                {post.author[0]}
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h4 className="font-display text-2xl uppercase text-brand-white">{post.author}</h4>
                  <span className="bg-brand-orange text-brand-obsidian font-mono text-[8px] uppercase tracking-widest px-2 py-0.5">Resident Blogger</span>
                </div>
                <p className="font-sans text-brand-grey text-sm italic">
                  James Miller is a full-time van lifer and software engineer. He built 
                  his LWB Sprinter in 2024 and has been exploring Europe ever since.
                </p>
                <Link href={`/authors/${post.authorSlug}`} className="inline-block font-mono text-[10px] text-brand-orange uppercase tracking-widest hover:text-brand-white transition-colors">
                  View all posts by James →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
