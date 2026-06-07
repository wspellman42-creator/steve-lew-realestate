"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { blogPosts as staticPosts } from "@/lib/mockData";

interface AdminBlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
}

export default function HomeBlogSection() {
  const [adminPosts, setAdminPosts] = useState<AdminBlogPost[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("slreg_blog");
      if (raw) setAdminPosts(JSON.parse(raw));
    } catch {}
  }, []);

  const allPosts = [
    ...adminPosts.map(p => ({
      slug: `admin-${p.id}`,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt,
      image: p.image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop&auto=format",
      isAdmin: true,
    })),
    ...staticPosts.map(p => ({ ...p, isAdmin: false })),
  ].slice(0, 3);

  return (
    <section className="bg-[#0d0d0d] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-end justify-between mb-12">
          <h2
            className="font-serif text-3xl md:text-4xl text-white"
            style={{ fontWeight: 600 }}
          >
            SLREG BLOG
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors font-semibold"
          >
            MORE BLOG ARTICLES <ArrowRight size={13} />
          </Link>
        </div>

        {allPosts.length === 0 ? (
          <p className="text-white/30 text-sm text-center py-8">No blog posts yet. Add some from the admin panel.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {allPosts.map(post => (
              <div key={post.slug} className="group">
                <div className="relative h-52 overflow-hidden mb-5">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="text-[11px] text-white/40 mb-2 tracking-wider">{post.date}</p>
                <h3
                  className="font-serif text-xl text-white mb-3 group-hover:text-white/80 transition-colors"
                  style={{ fontWeight: 600 }}
                >
                  {post.title}
                </h3>
                <p className="text-xs text-white/50 leading-relaxed line-clamp-3">{post.excerpt}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
