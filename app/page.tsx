import Link from "next/link";
import Image from "next/image";
import { CheckCircle, ArrowRight } from "lucide-react";
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
      {/* ─── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-[#0d0d0d] pt-[72px] pb-16">
        <div className="relative z-10 text-center px-6 max-w-[960px] mx-auto mb-10">
          {/* Main headline — bold serif, matching original */}
          <h1
            className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6"
            style={{ fontWeight: 700 }}
          >
            Discover Your Dream Home with Steve Lew Real Estate Group
          </h1>
          <p className="text-white/70 text-lg md:text-xl leading-relaxed max-w-[750px] mx-auto">
            Explore exceptional homes for sale in central Indiana with our expert realtors,
            dedicated to finding the perfect property for you.
          </p>
        </div>

        {/* Search widget — matches original layout */}
        <div className="relative z-10 w-full max-w-[960px] px-6">
          <HomeSearch />
        </div>
      </section>

      {/* ─── MAKING A DIFFERENCE ─────────────────────────────── */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 mb-4 font-semibold">
              MAKING A DIFFERENCE
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white mb-10" style={{ fontWeight: 600 }}>
              Award-Winning Real Estate Excellence
            </h2>
            <ul className="space-y-4">
              {awards.map((award) => (
                <li key={award} className="flex items-start gap-3 text-white/70 text-sm leading-relaxed">
                  <CheckCircle size={14} className="text-white/30 mt-0.5 flex-shrink-0" />
                  {award}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] md:h-[500px]">
            <Image
              src="/images/awards-collage.jpg"
              alt="Steve Lew Real Estate Group — Awards & Recognition"
              fill
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* ─── SERVING CENTRAL INDIANA ──────────────────────────── */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-80 md:h-[440px]">
            <Image
              src="/images/steve-headshot.webp"
              alt="Steve Lew — Managing Broker"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <p className="text-[11px] tracking-[0.35em] uppercase text-white/40 mb-4 font-semibold">
              CENTRAL INDIANA
            </p>
            <p className="text-white/70 text-base leading-relaxed mb-8">
              We cater to the real estate needs of all of Central Indiana, offering comprehensive
              services for buyers, sellers, and builders. Our experienced team is committed to
              delivering exceptional results for every client.
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-white" style={{ fontWeight: 600 }}>
              How can we assist you?
            </h2>
          </div>
        </div>
      </section>

      {/* ─── FEATURED LISTINGS ────────────────────────────────── */}
      <section className="bg-[#f8f7f4] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2
                className="font-serif text-3xl md:text-4xl text-gray-900"
                style={{ fontWeight: 700 }}
              >
                FEATURED LISTINGS
              </h2>
            </div>
            <Link
              href="/listing"
              className="flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 transition-colors font-semibold"
            >
              MORE LISTINGS <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((listing) => (
              <PropertyCard key={listing.id} listing={listing} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/listing"
              className="inline-block border border-gray-800 px-12 py-3.5 text-[11px] tracking-[0.2em] uppercase text-gray-800 hover:bg-gray-900 hover:text-white transition-all font-semibold"
            >
              MORE LISTINGS
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FULL SERVICE BROKERAGE ───────────────────────────── */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-14 items-center">
          <div className="relative h-[420px]">
            <Image
              src="/images/truck.webp"
              alt="Steve Lew Real Estate Group moving truck"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <h2
              className="font-serif text-3xl md:text-4xl text-white mb-6"
              style={{ fontWeight: 600 }}
            >
              Full Service Brokerage With Fair Rates
            </h2>
            <p className="text-white/60 mb-6 text-sm leading-relaxed">
              Our top priority is you! Our team of agents are always ready to assist you in achieving
              your real estate goals.
            </p>
            <p className="text-[11px] tracking-[0.2em] uppercase text-white/40 mb-4 font-semibold">
              What We Offer:
            </p>
            <ul className="space-y-3 mb-8">
              {whatWeOffer.map((item) => (
                <li key={item} className="flex items-center gap-3 text-white/80 text-sm">
                  <span className="w-1.5 h-1.5 bg-white/40 rounded-full flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/sell"
              className="inline-block border border-white px-10 py-3.5 text-[11px] tracking-[0.2em] uppercase text-white hover:bg-white hover:text-black transition-all font-semibold"
            >
              SELL MY HOME
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────── */}
      <TestimonialsCarousel />

      {/* ─── BLOG ─────────────────────────────────────────────── */}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
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
                <p className="text-[11px] tracking-[0.2em] uppercase text-white/30 mt-4 group-hover:text-white/60 transition-colors font-semibold">
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
