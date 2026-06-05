"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";

const googleReviews = [
  { name: "Jennifer M.", rating: 5, date: "March 2025", text: "Steve and his team made selling our home an absolute breeze. From listing to closing in under 3 weeks — we couldn't be happier. Their marketing was top-notch and they got us above asking price!" },
  { name: "Brian & Carla T.", rating: 5, date: "February 2025", text: "We were first-time homebuyers and had no idea what we were doing. Steve's team walked us through every single step. So patient and knowledgeable. We love our new home in Greenwood!" },
  { name: "Marcus R.", rating: 5, date: "January 2025", text: "Highly recommend Steve Lew Real Estate Group. Professional, responsive, and they truly care about their clients. Erica was our main point of contact and she was fantastic throughout the entire process." },
  { name: "Donna F.", rating: 5, date: "December 2024", text: "After sitting on the market with another agent for months, we switched to Steve Lew Real Estate Group and had an offer in 11 days. Wish we had called them first!" },
  { name: "Chris & Amy W.", rating: 5, date: "November 2024", text: "The free moving truck alone is worth it — but on top of that you get an amazing, hard-working team that actually listens to what you want. Five stars without hesitation." },
  { name: "Tanya K.", rating: 5, date: "October 2024", text: "Steve was honest with us from day one about pricing and expectations. That transparency is rare in real estate. Closed on time, no surprises. Will absolutely use them again." },
  { name: "David & Lisa P.", rating: 5, date: "September 2024", text: "The professional photos they provided were incredible — our home looked like it was in a magazine. Got multiple offers over asking price within 48 hours of listing." },
  { name: "Nicole B.", rating: 5, date: "August 2024", text: "As a veteran, I really appreciated their partnership with Veterans United Realty. They understood our unique situation and made the VA loan process completely seamless." },
  { name: "Robert H.", rating: 5, date: "July 2024", text: "Outstanding service from start to finish. The whole team is incredibly communicative — I always knew exactly where we were in the process. Closed in 30 days!" },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "#FBBC04" : "#e0e0e0"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

function GoogleLogo() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
  );
}

export default function ReviewsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[38vh] min-h-[260px] flex items-end">
        <Image src="/images/about-team-group.webp" alt="Reviews" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="relative z-10 px-6 pb-12 max-w-[1200px] mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">WHAT CLIENTS SAY</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Google Reviews</h1>
        </div>
      </section>

      {/* Rating summary */}
      <section className="bg-white border-b border-gray-100 py-10 px-6">
        <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <GoogleLogo />
              <span className="text-xs font-semibold text-gray-500 tracking-wide">Google Reviews</span>
            </div>
            <p className="font-serif text-6xl text-gray-900 leading-none mb-2">5.0</p>
            <Stars count={5} />
            <p className="text-xs text-gray-400 mt-1">Based on 100+ reviews</p>
          </div>
          <div className="flex-1 w-full max-w-[400px]">
            {[5,4,3,2,1].map(n => (
              <div key={n} className="flex items-center gap-3 mb-1.5">
                <span className="text-xs text-gray-500 w-3">{n}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="#FBBC04"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                <div className="flex-1 bg-gray-100 rounded-full h-2">
                  <div className="bg-[#FBBC04] h-2 rounded-full" style={{ width: n === 5 ? "97%" : n === 4 ? "3%" : "0%" }} />
                </div>
                <span className="text-xs text-gray-400 w-6 text-right">{n === 5 ? "97%" : n === 4 ? "3%" : "0%"}</span>
              </div>
            ))}
          </div>
          <a
            href="https://www.google.com/maps/search/Steve+Lew+Real+Estate+Group"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-gray-300 px-8 py-3 text-xs tracking-[0.2em] uppercase text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all font-semibold whitespace-nowrap"
          >
            LEAVE A REVIEW
          </a>
        </div>
      </section>

      {/* Review cards */}
      <section className="bg-[#fafafa] py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {googleReviews.map((r) => (
              <div key={r.name} className="bg-white border border-gray-100 p-6 flex flex-col gap-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0">
                      {r.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 leading-snug">{r.name}</p>
                      <p className="text-[11px] text-gray-400">{r.date}</p>
                    </div>
                  </div>
                  <GoogleLogo />
                </div>
                <Stars count={r.rating} />
                <p className="text-sm text-gray-600 leading-relaxed">&ldquo;{r.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact form */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[800px] mx-auto">
          <div className="text-center mb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3">READY TO GET STARTED?</p>
            <h2 className="font-serif text-3xl md:text-4xl text-white font-light">Contact Our Team</h2>
          </div>
          {submitted ? (
            <div className="bg-white/5 border border-white/10 p-10 text-center">
              <CheckCircle size={36} className="text-green-400 mx-auto mb-4" />
              <h3 className="font-serif text-2xl text-white mb-2">Message Received!</h3>
              <p className="text-gray-400 text-sm">Thank you, {name}. We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="Full Name *" required value={name} onChange={e => setName(e.target.value)}
                className="bg-white/5 border border-white/20 px-4 py-3.5 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/50 transition-colors" />
              <input type="email" placeholder="Email Address *" required value={email} onChange={e => setEmail(e.target.value)}
                className="bg-white/5 border border-white/20 px-4 py-3.5 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/50 transition-colors" />
              <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)}
                className="bg-white/5 border border-white/20 px-4 py-3.5 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/50 transition-colors" />
              <textarea placeholder="Message" rows={4} value={message} onChange={e => setMessage(e.target.value)}
                className="md:col-span-2 bg-white/5 border border-white/20 px-4 py-3.5 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/50 transition-colors resize-none" />
              <button type="submit"
                className="md:col-span-2 bg-white text-black py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gray-100 transition-colors">
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
