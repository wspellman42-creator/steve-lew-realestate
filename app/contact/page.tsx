"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle, MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, phone, message }),
      });
    } catch {}
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen pt-[72px]">
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[280px] flex items-end">
        <Image src="/images/about-team-group.webp" alt="Contact Steve Lew Real Estate" fill className="object-cover object-top" priority />
        <div className="absolute inset-0 bg-black/55 pointer-events-none" />
        <div className="relative z-10 px-6 pb-12 max-w-[1200px] mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">GET IN TOUCH</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light">Contact Us</h1>
        </div>
      </section>

      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-16 items-start">

          {/* Info side */}
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-gray-400 mb-3">STEVE LEW REAL ESTATE GROUP</p>
            <h2 className="font-serif text-3xl text-gray-900 mb-6">We&apos;re Here to Help</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-10">
              Whether you&apos;re buying, selling, or just have a question about the Central Indiana market,
              our team is ready to assist. Reach out anytime — we&apos;d love to hear from you.
            </p>

            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <MapPin size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Office</p>
                  <p className="text-sm text-gray-700">550 US 31 S., Greenwood, Indiana 46142</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Phone size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Phone</p>
                  <a href="tel:+13178685478" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    +1 (317) 868-5478
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Mail size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Email</p>
                  <a href="mailto:info@listwithlew.com" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">
                    info@listwithlew.com
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-9 h-9 bg-gray-100 flex items-center justify-center flex-shrink-0">
                  <Clock size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-gray-400 mb-0.5">Hours</p>
                  <p className="text-sm text-gray-700">Mon – Fri: 9am – 6pm</p>
                  <p className="text-sm text-gray-700">Sat – Sun: By Appointment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div>
            {submitted ? (
              <div className="border border-gray-100 bg-gray-50 p-10 text-center">
                <CheckCircle size={40} className="text-green-500 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-gray-900 mb-2">Message Sent!</h3>
                <p className="text-gray-500 text-sm">
                  Thank you, {name}. A member of our team will be in touch with you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <h3 className="font-serif text-2xl text-gray-900 mb-2">Send Us a Message</h3>
                <input
                  type="text"
                  placeholder="Full Name *"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-600 transition-colors"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-600 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-600 transition-colors"
                />
                <textarea
                  placeholder="How can we help you?"
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  className="border border-gray-300 px-4 py-3.5 text-sm text-gray-700 outline-none focus:border-gray-600 transition-colors resize-none"
                />
                <button
                  type="submit"
                  className="bg-[#0d0d0d] text-white py-4 text-xs tracking-[0.25em] uppercase font-semibold hover:bg-gray-800 transition-colors"
                >
                  SEND MESSAGE
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
