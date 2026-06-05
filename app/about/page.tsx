import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/mockData";

const communityPhotos = [
  { src: "/images/about-community-1.webp", alt: "Lew Crew volunteers at community mural project" },
  { src: "/images/about-community-2.webp", alt: "Steve Lew Real Estate booth at community event" },
  { src: "/images/about-team-group.webp", alt: "Lew Crew volunteers at animal rescue event" },
  { src: "/images/about-community-1.webp", alt: "Lew Crew at Johnson County Senior Services" },
  { src: "/images/about-community-2.webp", alt: "Lew Crew Greenwood Fire Department partnership" },
  { src: "/images/about-team-group.webp", alt: "Lew Crew holiday party giving event" },
  { src: "/images/about-community-1.webp", alt: "Lew Crew Christmas community event" },
  { src: "/images/about-community-2.webp", alt: "Lew Crew builds community playground" },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[400px] flex items-end">
        <Image src="/images/about-team-group.webp" alt="Steve Lew Real Estate Team" fill className="object-cover" priority />
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

      {/* Three Team Category Cards */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">OUR PEOPLE</p>
            <h2 className="font-serif text-3xl md:text-4xl text-gray-900">Meet the Team</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { href: "/about/leadership", label: "Leadership", desc: "Managing brokers and team leadership", img: "/images/steve-headshot.webp" },
              { href: "/about/agents", label: "Sales Agents", desc: "Licensed agents ready to help you buy or sell", img: "/images/about-team-group.webp" },
              { href: "/about/staff", label: "Administrative Staff", desc: "The support team keeping everything running smoothly", img: "/images/about-community-1.webp" },
            ].map((card) => (
              <Link key={card.href} href={card.href} className="group relative overflow-hidden block">
                <div className="relative h-72">
                  <Image src={card.img} alt={card.label} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                    <h3 className="font-serif text-2xl text-white mb-2">{card.label}</h3>
                    <p className="text-white/70 text-sm mb-4">{card.desc}</p>
                    <span className="border border-white text-white text-[11px] tracking-[0.2em] uppercase px-6 py-2 group-hover:bg-white group-hover:text-black transition-all">
                      VIEW TEAM
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Lew Crew Gives Back */}
      <section id="gives-back" className="bg-white py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 text-center mb-10">
            Lew Crew <span className="text-red-600 font-bold">Gives Back</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
            {communityPhotos.map((photo, i) => (
              <div key={i} className="relative aspect-square overflow-hidden group">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block border border-gray-800 px-10 py-3 text-xs tracking-[0.2em] uppercase text-gray-800 hover:bg-gray-900 hover:text-white transition-all font-semibold"
            >
              READ MORE
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-50 py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-gray-900 text-center mb-12">
            What Our Past Clients Say About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.slice(0, 6).map((t) => (
              <div key={t.name + t.date} className="bg-white border border-gray-100 p-6">
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
              every step of the process with their extensive knowledge and experience.
            </p>
            <Link href="/listing" className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all">
              HOW IT WORKS
            </Link>
          </div>
          <div className="border border-white/10 p-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">FOR SELLERS</p>
            <h3 className="font-serif text-3xl text-white font-light mb-4">SELLER SERVICES</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-6">
              We make selling your home stress-free by providing a seamless experience that puts you in
              the best position to sell for the highest possible price.
            </p>
            <Link href="/sell" className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all">
              GET OUR SERVICE
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
