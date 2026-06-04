import Link from "next/link";
import Image from "next/image";
import { Search, CheckCircle, ArrowRight } from "lucide-react";
import PropertyCard from "@/components/PropertyCard";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import { mockListings, blogPosts } from "@/lib/mockData";
import HomeSearch from "@/components/HomeSearch";

const awards = [
  "Featured in Indy Real Producers Magazine",
  "Named one of the Top 100 Agents for 2024 by Indy Real Producers",
  "Recognized by Veterans United Realty as a Top 1% Network Agent in 2023",
  "Voted Realtor of the Year in 2023 by Indy Real Producers",
  "Recognized as a Peak Performer for selling over $50 Million in volume in 2022 and 2023",
  "Voted by Southside MIBOR for the 2023 Spirit Award",
  "Awarded the Champion Award in 2024 by Indy Real Producers",
  "Named one of the Top 25 Agents for 2025 and 2026 by Indy Real Producers",
];

const whatWeOffer = [
  "Professional Photos",
  "Aerial Drone Photos",
  "Extensive Marketing Campaigns",
  "Free Market Analysis",
  "Experienced Team Of Agents",
  "Free Use Of Our Moving Truck",
];

export default function HomePage() {
  const featured = mockListings.slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] pt-[72px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/30 pointer-events-none" />
        <div className="relative z-10 text-center px-6 max-w-[900px] mx-auto mb-12">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-light text-white leading-tight mb-6">
            Discover Your Dream Home with Steve Lew Real Estate Group
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-[700px] mx-auto">
            Explore exceptional homes for sale in central Indiana with our expert realtors,
            dedicated to finding the perfect property for you.
          </p>
        </div>
        {/* Search Widget */}
        <div className="relative z-10 w-full max-w-[900px] px-4">
          <HomeSearch />
        </div>
      </section>

      {/* Making a Difference */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">MAKING A DIFFERENCE</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-8">
              Award-Winning Real Estate Excellence
            </h2>
            <ul className="space-y-3">
              {awards.map((award) => (
                <li key={award} className="flex items-start gap-3 text-gray-300 text-sm">
                  <CheckCircle size={14} className="text-white/40 mt-0.5 flex-shrink-0" />
                  {award}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-80 md:h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=700&h=500&fit=crop&auto=format"
              alt="Steve Lew Real Estate Group"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        </div>
      </section>

      {/* How Can We Assist You? */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">CENTRAL INDIANA</p>
          <h2 className="font-serif text-3xl md:text-5xl text-white font-light mb-4">
            How can we assist you?
          </h2>
          <p className="text-gray-400 max-w-[600px] mx-auto mb-12">
            We cater to the real estate needs of all of Central Indiana, offering comprehensive services
            for buyers, sellers, and builders alike.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-[700px] mx-auto">
            <Link
              href="/listing"
              className="group border border-white/20 px-8 py-6 text-center hover:bg-white/5 transition-all"
            >
              <p className="font-serif text-2xl text-white mb-2">Buy</p>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                Search 10,000+ listings in central Indiana
              </p>
            </Link>
            <Link
              href="/sell"
              className="group border border-white/20 px-8 py-6 text-center hover:bg-white/5 transition-all"
            >
              <p className="font-serif text-2xl text-white mb-2">Sell</p>
              <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                List your home with a full-service brokerage
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="bg-[#f8f7f4] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-2">MIBOR MLS</p>
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900">FEATURED LISTINGS</h2>
            </div>
            <Link
              href="/listing"
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-600 hover:text-gray-900 transition-colors"
            >
              MORE LISTINGS <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/listing"
              className="inline-block border border-gray-900 px-10 py-3 text-xs tracking-widest uppercase text-gray-900 hover:bg-gray-900 hover:text-white transition-all"
            >
              VIEW ALL LISTINGS
            </Link>
          </div>
        </div>
      </section>

      {/* Full Service Brokerage */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative h-72 md:h-[420px]">
            <Image
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&h=500&fit=crop&auto=format"
              alt="Steve Lew Moving Truck"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-6">
              Full Service Brokerage With Fair Rates
            </h2>
            <p className="text-gray-400 mb-8">
              Our top priority is you! Our team of agents are always ready to assist you in achieving
              your real estate goals. What We Offer:
            </p>
            <ul className="space-y-3 mb-8">
              {whatWeOffer.map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200 text-sm">
                  <span className="w-1.5 h-1.5 bg-white/50 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/sell"
              className="inline-block border border-white px-10 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              SELL MY HOME
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsCarousel />

      {/* Blog */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light">SLREG BLOG</h2>
            <Link
              href="/blog"
              className="flex items-center gap-2 text-xs tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
            >
              MORE ARTICLES <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                <div className="relative h-48 overflow-hidden mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mb-2">{post.date}</p>
                <h3 className="font-serif text-lg text-white mb-2 group-hover:text-gray-300 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{post.excerpt}</p>
                <p className="text-xs tracking-widest uppercase text-white/50 mt-3 group-hover:text-white/80 transition-colors">
                  MORE
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
