"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Star, Phone, Mail } from "lucide-react";
import { testimonials } from "@/lib/mockData";

interface Agent {
  id: string;
  name: string;
  title: string;
  phone: string;
  email: string;
  license: string;
  specialty: string;
  photo: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  bio: string;
}

export default function AboutPage() {
  const [agents, setAgents] = useState<Agent[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("slreg_agents");
      if (raw) setAgents(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

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
          {agents.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {agents.map((member) => (
                <div key={member.id} className="group">
                  <div className="relative w-full aspect-square mb-4 overflow-hidden bg-gray-100">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                          <circle cx="12" cy="8" r="4" />
                          <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <p className="font-semibold text-gray-900 text-sm leading-snug">{member.name}</p>
                  {member.title && <p className="text-xs text-gray-500 mt-0.5">{member.title}</p>}
                  {member.specialty && <p className="text-xs text-gray-400 mt-0.5">{member.specialty}</p>}
                  <div className="flex gap-2 mt-2">
                    {member.phone && (
                      <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <Phone size={13} />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-gray-700 transition-colors">
                        <Mail size={13} />
                      </a>
                    )}
                    {member.instagram && (
                      <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors text-[11px] font-bold">
                        IG
                      </a>
                    )}
                    {member.facebook && (
                      <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors text-[11px] font-bold">
                        FB
                      </a>
                    )}
                    {member.linkedin && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 transition-colors text-[11px] font-bold">
                        in
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-gray-400 text-sm mb-4">No agents have been added yet.</p>
              <Link href="/admin" className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-800 underline transition-colors">
                Go to Admin Panel
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Lew Crew Gives Back */}
      <section id="gives-back" className="bg-[#111111] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">COMMUNITY</p>
              <h2 className="font-serif text-3xl md:text-4xl text-white font-light mb-6">
                Lew Crew Gives Back
              </h2>
              <p className="text-gray-400 leading-relaxed mb-4">
                At Steve Lew Real Estate Group, community isn&apos;t just a word — it&apos;s who we are.
                Our team actively volunteers, donates, and advocates for the people and neighborhoods
                we call home throughout Central Indiana.
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Whether it&apos;s supporting local food banks, sponsoring youth sports leagues,
                or partnering with veterans&apos; organizations, the Lew Crew is committed to making
                a lasting difference that goes far beyond real estate.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Food Bank Drives", desc: "Annual holiday food & coat drives benefiting Gleaners Food Bank" },
                  { label: "Veterans Support", desc: "Partnering with Veterans United Realty to serve those who served" },
                  { label: "Youth Sports", desc: "Sponsoring local little leagues and youth soccer programs" },
                  { label: "School Supplies", desc: "Back-to-school drives for students across Greenwood & surrounding districts" },
                ].map(item => (
                  <div key={item.label} className="border border-white/10 p-4">
                    <p className="text-white text-sm font-semibold mb-1">{item.label}</p>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Link
                href="/blog"
                className="inline-block border border-white px-8 py-3 text-xs tracking-widest uppercase text-white hover:bg-white hover:text-black transition-all"
              >
                READ MORE
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="relative h-52 overflow-hidden">
                <Image src="/images/about-community-1.webp" alt="Community giving" fill className="object-cover" />
              </div>
              <div className="relative h-52 overflow-hidden mt-6">
                <Image src="/images/about-community-2.webp" alt="Lew Crew community event" fill className="object-cover" />
              </div>
              <div className="col-span-2 relative h-48 overflow-hidden">
                <Image src="/images/about-team-group.webp" alt="Steve Lew Real Estate team" fill className="object-cover object-top" />
              </div>
            </div>
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
