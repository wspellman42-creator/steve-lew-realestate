"use client";

import { useState } from "react";
import Image from "next/image";
import { Home, Search, DollarSign, CheckCircle } from "lucide-react";

const steps = [
  { icon: Home, label: "Step 1", desc: "Enter Property Address" },
  { icon: Search, label: "Step 2", desc: "Property Details" },
  { icon: DollarSign, label: "Step 3", desc: "Property Valuation" },
];

export default function HomeValuationPage() {
  const [step, setStep] = useState(1);
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [sqft, setSqft] = useState("");
  const [year, setYear] = useState("");
  const [condition, setCondition] = useState("Good");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative min-h-[100vh] flex flex-col items-center justify-center px-4">
        <Image
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&h=900&fit=crop&auto=format"
          alt="Home Interior"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />

        {/* Logo strip */}
        <div className="absolute top-4 left-0 right-0 flex justify-center items-center gap-6 z-20">
          <div className="flex items-center gap-3">
            <SLBadge />
            <div className="text-white">
              <p className="text-sm font-medium tracking-wider">Steve Lew Real Estate Group</p>
              <p className="text-[10px] text-white/60 tracking-widest">License ID: RC51800217</p>
            </div>
          </div>
          <div className="text-white/70 text-sm">+1(317) 868-5478</div>
          <div className="text-white/70 text-sm">info@listwithlew.com</div>
        </div>

        {/* Form Card */}
        <div className="relative z-10 w-full max-w-[760px] text-center">
          {!submitted ? (
            <>
              <h1 className="font-serif text-4xl md:text-6xl text-white mb-3 font-light">
                What&apos;s Your Home Really Worth?
              </h1>
              <p className="text-white/80 tracking-[0.2em] uppercase text-sm mb-2">
                FIND OUT FAST AND FREE
              </p>
              <p className="text-white text-xl font-light mb-8">Enter your address below</p>

              {/* Step Indicators */}
              <div className="flex justify-center gap-12 mb-10">
                {steps.map((s, i) => (
                  <div
                    key={s.label}
                    className={`flex flex-col items-center gap-2 transition-all ${step === i + 1 ? "opacity-100" : "opacity-40"}`}
                  >
                    <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${step === i + 1 ? "border-teal-400 bg-teal-400/20" : "border-white/40"}`}>
                      <s.icon size={18} className="text-white" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white tracking-widest">{s.label}</p>
                      <p className="text-[10px] text-white/70">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Step 1 */}
              {step === 1 && (
                <div className="flex gap-0 shadow-2xl">
                  <input
                    type="text"
                    placeholder="Enter your street address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-6 py-5 text-gray-900 text-base outline-none placeholder:text-gray-400"
                  />
                  <button
                    onClick={() => { if (address) setStep(2); }}
                    className="bg-teal-500 text-white px-8 py-5 text-sm font-semibold tracking-wide hover:bg-teal-600 transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="bg-white p-6 shadow-2xl text-left">
                  <h3 className="font-serif text-xl text-gray-900 mb-4">Property Details</h3>
                  <p className="text-sm text-gray-500 mb-5">{address}</p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Bedrooms</label>
                      <select value={beds} onChange={(e) => setBeds(e.target.value)} className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none">
                        <option value="">Select</option>
                        {[1,2,3,4,5,6].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Bathrooms</label>
                      <select value={baths} onChange={(e) => setBaths(e.target.value)} className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none">
                        <option value="">Select</option>
                        {[1,1.5,2,2.5,3,3.5,4].map(n => <option key={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Square Feet</label>
                      <input type="number" placeholder="e.g. 2000" value={sqft} onChange={(e) => setSqft(e.target.value)} className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500 block mb-1">Year Built</label>
                      <input type="number" placeholder="e.g. 2005" value={year} onChange={(e) => setYear(e.target.value)} className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none" />
                    </div>
                    <div className="col-span-2">
                      <label className="text-xs text-gray-500 block mb-1">Condition</label>
                      <select value={condition} onChange={(e) => setCondition(e.target.value)} className="w-full border border-gray-300 px-3 py-3 text-sm text-gray-700 outline-none">
                        {["Excellent","Good","Fair","Needs Work"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(1)} className="border border-gray-300 px-6 py-3 text-sm text-gray-600 hover:bg-gray-50">Back</button>
                    <button onClick={() => setStep(3)} className="flex-1 bg-teal-500 text-white py-3 text-sm font-medium hover:bg-teal-600 transition-colors">Get My Valuation</button>
                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="bg-white p-8 shadow-2xl text-left">
                  <h3 className="font-serif text-2xl text-gray-900 mb-2">Almost There!</h3>
                  <p className="text-sm text-gray-500 mb-6">Enter your contact info to receive your free home valuation report.</p>
                  <div className="flex flex-col gap-4">
                    <input type="text" placeholder="Full Name*" className="border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none" />
                    <input type="email" placeholder="Email*" className="border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none" />
                    <input type="tel" placeholder="Phone*" className="border border-gray-300 px-4 py-3 text-sm text-gray-700 outline-none" />
                    <div className="flex gap-3">
                      <button onClick={() => setStep(2)} className="border border-gray-300 px-6 py-3 text-sm text-gray-600 hover:bg-gray-50">Back</button>
                      <button onClick={() => setSubmitted(true)} className="flex-1 bg-teal-500 text-white py-3 text-sm font-medium hover:bg-teal-600 transition-colors">GET MY VALUATION</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Success */
            <div className="bg-white p-12 shadow-2xl text-center">
              <CheckCircle size={48} className="text-teal-500 mx-auto mb-4" />
              <h2 className="font-serif text-3xl text-gray-900 mb-3">Request Received!</h2>
              <p className="text-gray-600 mb-2">
                Thank you for your interest. A member of our team will reach out to you shortly with
                your personalized home valuation report.
              </p>
              <p className="text-gray-500 text-sm">
                Questions? Call us at{" "}
                <a href="tel:+13178685478" className="text-teal-600 font-medium">
                  +1(317) 868-5478
                </a>
              </p>
            </div>
          )}
        </div>

        {/* Bottom Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 px-6 py-3 flex flex-wrap justify-between gap-4 z-10">
          <p className="text-white/50 text-[11px]">Powered by Steve Lew Real Estate Group. Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
          <div className="flex gap-4">
            <a href="/privacy" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">Terms of service</a>
            <a href="/cookie-policy" className="text-white/40 text-[11px] hover:text-white/70 transition-colors">Privacy policy</a>
          </div>
        </div>
      </section>
    </div>
  );
}

function SLBadge() {
  return (
    <div className="w-10 h-10">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2" />
        <text x="50" y="57" textAnchor="middle" fontSize="34" fontFamily="Cormorant Garamond, Georgia, serif" fontWeight="300" fill="white" letterSpacing="2">SL</text>
      </svg>
    </div>
  );
}
