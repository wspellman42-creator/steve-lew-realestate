"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ChevronRight } from "lucide-react";

export default function HomeValuationPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Full-bleed background */}
      <Image
        src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1800&h=1200&fit=crop&auto=format"
        alt="Beautiful home"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <Link href="/">
          <Image src="/images/logo.png" alt="Steve Lew Real Estate Group" width={120} height={90} className="h-12 w-auto object-contain" />
        </Link>
        <div className="hidden md:flex items-center gap-8 text-white/70 text-sm">
          <a href="tel:+13178685478" className="hover:text-white transition-colors">+1(317) 868-5478</a>
          <a href="mailto:info@listwithlew.com" className="hover:text-white transition-colors">info@listwithlew.com</a>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 py-16">
        {!submitted ? (
          <div className="w-full max-w-[700px] text-center">
            {/* Step indicator */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <StepDot num={1} active={step >= 1} done={step > 1} label="Your Address" />
              <div className="w-12 h-px bg-white/30" />
              <StepDot num={2} active={step >= 2} done={step > 2} label="Your Info" />
              <div className="w-12 h-px bg-white/30" />
              <StepDot num={3} active={step >= 3} done={false} label="Get Report" />
            </div>

            <h1 className="font-serif text-4xl md:text-6xl text-white font-light mb-3 leading-tight">
              What&apos;s Your Home<br />Really Worth?
            </h1>
            <p className="text-white/70 text-base md:text-lg mb-10 tracking-wide">
              Find out fast and free — no obligation.
            </p>

            {/* Step 1 — Address */}
            {step === 1 && (
              <div className="flex shadow-2xl">
                <input
                  type="text"
                  placeholder="Enter your home address…"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && address.trim() && setStep(2)}
                  className="flex-1 px-6 py-5 text-gray-900 text-base outline-none placeholder:text-gray-400 text-left"
                  autoFocus
                />
                <button
                  onClick={() => address.trim() && setStep(2)}
                  className="bg-red-600 hover:bg-red-700 text-white px-8 py-5 font-semibold text-sm tracking-wide flex items-center gap-2 transition-colors whitespace-nowrap"
                >
                  Get My Value <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* Step 2 — Contact info */}
            {step === 2 && (
              <div className="bg-white p-8 shadow-2xl text-left">
                <div className="flex items-center gap-2 mb-1">
                  <CheckCircle size={16} className="text-green-500" />
                  <p className="text-sm text-gray-500">{address}</p>
                </div>
                <h2 className="font-serif text-2xl text-gray-900 mb-1">Almost There!</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Enter your contact info below and we&apos;ll send you a personalized home valuation report.
                </p>
                <div className="flex flex-col gap-4 mb-6">
                  <input
                    type="text"
                    placeholder="Full Name *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-500"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-500"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="border border-gray-300 px-6 py-3.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => { if (name && email) setSubmitted(true); }}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3.5 text-sm font-semibold tracking-wide transition-colors"
                  >
                    GET MY FREE VALUATION
                  </button>
                </div>
                <p className="text-[11px] text-gray-400 mt-4 text-center">
                  By submitting, you agree to be contacted by Steve Lew Real Estate Group. We respect your privacy.
                </p>
              </div>
            )}
          </div>
        ) : (
          /* Success */
          <div className="bg-white p-12 shadow-2xl text-center max-w-[560px] w-full">
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle size={36} className="text-green-500" />
            </div>
            <h2 className="font-serif text-3xl text-gray-900 mb-3">Request Received!</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Thank you, {name}! A member of our team will reach out within 24 hours with
              your personalized home valuation report for:
            </p>
            <p className="text-gray-800 font-semibold text-sm mb-8 bg-gray-50 border border-gray-100 px-4 py-3">
              {address}
            </p>
            <p className="text-gray-500 text-sm mb-2">Questions? Call or text us:</p>
            <a href="tel:+13178685478" className="text-red-600 font-semibold text-lg hover:underline">
              +1(317) 868-5478
            </a>
            <div className="mt-8">
              <Link href="/" className="text-xs tracking-[0.2em] uppercase text-gray-400 hover:text-gray-700 transition-colors underline">
                Return to Homepage
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 px-6 py-3 flex flex-wrap justify-between gap-3 text-white/40 text-[11px]">
        <p>© {new Date().getFullYear()} Steve Lew Real Estate Group. License ID: RC51800217. All Rights Reserved.</p>
        <div className="flex gap-4">
          <Link href="/" className="hover:text-white/70 transition-colors">Privacy Policy</Link>
          <Link href="/" className="hover:text-white/70 transition-colors">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
}

function StepDot({ num, active, done, label }: { num: number; active: boolean; done: boolean; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all ${
        done ? "border-green-400 bg-green-400 text-white" :
        active ? "border-white bg-white text-gray-900" :
        "border-white/30 text-white/40"
      }`}>
        {done ? <CheckCircle size={16} /> : num}
      </div>
      <p className={`text-[10px] tracking-wider uppercase ${active ? "text-white" : "text-white/40"}`}>{label}</p>
    </div>
  );
}
