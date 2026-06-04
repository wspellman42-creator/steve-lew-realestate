import Image from "next/image";
import Link from "next/link";
import { teamMembers, testimonials } from "@/lib/mockData";
import { Star } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image
          src="/images/about-team-group.webp"
          alt="Steve Lew Real Estate Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 px-6 pb-16 max-w-[1200px] mx-auto w-full">
          <h1 className="font-serif text-4xl md:text-6xl text-white font-light mb-4">
            Experienced and Professional Team of Agents
          </h1>
          <p className="text-gray-300 text-lg italic">
            We are here to help you with all of your real estate needs from start to finish.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {teamMembers.map((member) => (
              <div key={member.name} className="text-center group">
                <div className="relative w-full aspect-square mb-4 overflow-hidden bg-gray-100">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="font-semibold text-gray-900 text-sm leading-snug">{member.name}</p>
                <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lew Crew Gives Back */}
      <section id="gives-back" className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">COMMUNITY</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-6">
              Lew Crew Gives Back
            </h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              Steve Lew Real Estate Group is deeply committed to giving back to the communities we
              serve throughout central Indiana. From volunteering at local organizations to sponsoring
              community events, we believe in making a difference beyond real estate.
            </p>
            <Link
              href="/blog"
              className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              READ MORE
            </Link>
          </div>
          <div className="relative h-72 md:h-[400px]">
            <Image
              src="/images/about-community-2.webp"
              alt="Lew Crew Gives Back — Community Giving"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 text-center mb-12">
            What Our Past Clients Say About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.name + t.date} className="bg-gray-50 border border-gray-100 p-6">
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{t.review}&rdquo;</p>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{t.name}</p>
                  <p className="text-[11px] text-gray-400">{t.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer / Seller CTA */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-8">
          <div className="border border-white/10 p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">FOR BUYERS</p>
            <h3 className="font-serif text-3xl text-white font-light mb-4">BUYER SERVICES</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We are here to help you find your dream home. Our team of experts will guide you through
              every step of the process with their extensive knowledge and experience to ensure you have
              the best possible home buying experience.
            </p>
            <Link
              href="/listing"
              className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              HOW IT WORKS
            </Link>
          </div>
          <div className="border border-white/10 p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">FOR SELLERS</p>
            <h3 className="font-serif text-3xl text-white font-light mb-4">SELLER SERVICES</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We make selling your home stress-free by providing a seamless experience that puts you in
              the best position to market your home and sell it for the highest possible price.
            </p>
            <Link
              href="/sell"
              className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
            >
              GET OUR SERVICE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
