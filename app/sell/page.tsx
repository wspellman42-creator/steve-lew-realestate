import Image from "next/image";
import { CheckCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";

const offerings = [
  "A large and experienced team of professionals",
  "A free moving truck",
  "A 3% listing rate for non-Hero Rate members, or just 2% for Hero Rate qualifiers - saving you thousands",
  "Over 240 Five-Star Google reviews",
  "200+ homes sold in 2023",
  "A team that consistently sells over $60 million in gross sales every year",
];

const steps = [
  { title: "Marketing Analysis\n& Pricing", icon: "📊" },
  { title: "Home Preparation\n& Staging", icon: "🏠" },
  { title: "Marketing\n& Showings", icon: "📸" },
  { title: "Offers\n& Negotiation", icon: "🤝" },
  { title: "Contract\n& Paperwork", icon: "📋" },
  { title: "Closing\n& Beyond", icon: "🔑" },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-[#0d0d0d] pt-[72px]">
      {/* Hero Split */}
      <section className="grid md:grid-cols-2 min-h-[75vh]">
        {/* Image Side */}
        <div className="relative min-h-[50vh] md:min-h-0">
          <Image
            src="/images/truck.webp"
            alt="Steve Lew Real Estate Group Moving Truck"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* Content Side */}
        <div className="bg-[#1a1a1a] flex flex-col justify-center px-8 md:px-16 py-16">
          <h1 className="font-serif text-3xl md:text-4xl text-white font-bold mb-8">
            WE HAVE SO MUCH<br />TO OFFER YOU!
          </h1>
          <ul className="space-y-4 mb-10">
            {offerings.map((item) => (
              <li key={item} className="flex items-start gap-3 text-gray-200">
                <CheckCircle size={16} className="text-white/40 mt-0.5 flex-shrink-0" />
                <span className="text-sm leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-[#111111] py-20 px-6">
        <div className="max-w-[900px] mx-auto grid md:grid-cols-2 gap-12 items-start">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl text-white font-semibold mb-4">
              Sell My Home
            </h2>
            <p className="text-gray-400 mb-6">
              We look forward to creating a customized plan for the sale of your home!
            </p>
            <div className="border border-white/10 p-6 mb-6">
              <p className="font-semibold text-white mb-1">Steve Lew Real Estate Group</p>
              <p className="text-sm text-gray-400">+1(317) 868-5478</p>
              <p className="text-sm text-gray-400">info@listwithlew.com</p>
            </div>
          </div>
          <ContactForm source="Sell My Home · /sell" variant="dark" />
        </div>
      </section>

      {/* Our Process */}
      <section className="bg-[#0d0d0d] py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-xs tracking-[0.3em] uppercase text-gray-500 mb-3 text-center">OUR PROCESS</p>
          <h2 className="font-serif text-2xl md:text-3xl text-white text-center font-semibold mb-14">
            Our team of experts will guide you through the entire process
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                  {step.icon}
                </div>
                <div className="w-px h-6 bg-white/10 mx-auto mb-4 hidden lg:block" />
                <p className="text-[11px] text-gray-300 leading-snug tracking-wide uppercase whitespace-pre-line">
                  {step.title}
                </p>
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
