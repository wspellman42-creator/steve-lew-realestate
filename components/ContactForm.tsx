"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";

type Variant = "dark" | "light";

export default function ContactForm({
  source,
  variant = "dark",
  defaultMessage = "",
  buttonLabel = "SUBMIT",
}: {
  source: string;
  variant?: Variant;
  defaultMessage?: string;
  buttonLabel?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState(defaultMessage);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email) return;
    setSending(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "contact", name, email, phone, message, source }),
      });
    } catch {}
    setSending(false);
    setSubmitted(true);
  }

  const input =
    variant === "dark"
      ? "bg-white/5 border border-white/20 px-4 py-3 text-white text-sm placeholder:text-gray-500 outline-none focus:border-white/40 transition-colors"
      : "border border-gray-300 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none focus:border-gray-600";

  const button =
    variant === "dark"
      ? "bg-white text-black py-3 text-xs tracking-widest uppercase hover:bg-gray-100 transition-colors disabled:opacity-60"
      : "bg-[#0d0d0d] text-white py-3 text-xs tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-60";

  if (submitted) {
    return (
      <div
        className={
          variant === "dark"
            ? "bg-white/5 border border-white/10 p-8 text-center"
            : "bg-gray-50 border border-gray-200 p-8 text-center"
        }
      >
        <CheckCircle size={32} className="text-green-500 mx-auto mb-3" />
        <h3
          className={
            variant === "dark"
              ? "font-serif text-xl text-white mb-1"
              : "font-serif text-xl text-gray-900 mb-1"
          }
        >
          Message Received!
        </h3>
        <p className={variant === "dark" ? "text-gray-400 text-sm" : "text-gray-500 text-sm"}>
          Thank you, {name}. We&apos;ll be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <input type="text" placeholder="Full Name*" required value={name} onChange={(e) => setName(e.target.value)} className={input} />
      <input type="email" placeholder="Email*" required value={email} onChange={(e) => setEmail(e.target.value)} className={input} />
      <input type="tel" placeholder="Phone*" value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
      <textarea placeholder="Message" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className={`${input} resize-none`} />
      <button type="submit" disabled={sending} className={button}>
        {sending ? "SENDING…" : buttonLabel}
      </button>
    </form>
  );
}
