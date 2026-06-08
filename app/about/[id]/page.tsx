"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, Linkedin, Instagram, Facebook, ArrowLeft } from "lucide-react";

interface Agent {
  id: string;
  name: string;
  title: string;
  category: string;
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

export default function AgentProfilePage() {
  const params = useParams();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("slreg_agents");
      if (raw) {
        const all: Agent[] = JSON.parse(raw);
        const found = all.find((a) => a.id === params.id);
        setAgent(found ?? null);
      }
    } catch {
      // ignore
    }
    setLoading(false);
  }, [params.id]);

  const backHref = agent?.category ? `/about/${agent.category}` : "/about";

  if (loading) {
    return <div className="min-h-screen pt-[72px]" />;
  }

  if (!agent) {
    return (
      <div className="min-h-screen pt-[72px] flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400 text-sm">Agent not found.</p>
        <Link href="/about" className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 underline transition-colors">
          Back to Meet the Team
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-[72px] bg-white">
      <div className="max-w-[960px] mx-auto px-6 py-16">

        {/* Back link */}
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-900 mb-12 transition-colors"
        >
          <ArrowLeft size={13} />
          Back to Meet the Team
        </Link>

        <div className="grid md:grid-cols-[320px_1fr] gap-12 items-start">

          {/* Left: Photo + contact + social */}
          <div className="sticky top-[96px]">
            <div className="w-full aspect-square overflow-hidden bg-gray-100 mb-6">
              {agent.photo ? (
                <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-100">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                  </svg>
                </div>
              )}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-3 mb-5">
              {agent.phone && (
                <a href={`tel:${agent.phone}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <Phone size={14} />
                  {agent.phone}
                </a>
              )}
              {agent.email && (
                <a href={`mailto:${agent.email}`} className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors">
                  <Mail size={14} />
                  {agent.email}
                </a>
              )}
            </div>

            {/* Social logos */}
            {(agent.linkedin || agent.instagram || agent.facebook) && (
              <div className="flex gap-2">
                {agent.linkedin && (
                  <a
                    href={agent.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-500 hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
                {agent.instagram && (
                  <a
                    href={agent.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-500 hover:bg-[#E1306C] hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                {agent.facebook && (
                  <a
                    href={agent.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-500 hover:bg-[#1877F2] hover:text-white transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Right: Name, title, bio */}
          <div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-2">{agent.name}</h1>
            {agent.title && (
              <p className="text-sm font-semibold tracking-[0.5px] uppercase text-red-600 mb-1">{agent.title}</p>
            )}
            {agent.specialty && (
              <p className="text-sm text-gray-500 mb-4">{agent.specialty}</p>
            )}
            {agent.license && (
              <p className="text-xs text-gray-400 mb-6">License # {agent.license}</p>
            )}

            <div className="w-12 h-0.5 bg-red-600 mb-8" />

            {agent.bio && (
              <>
                <h2 className="font-serif text-2xl text-gray-900 mb-4">
                  About {agent.name.split(" ")[0]}
                </h2>
                <p className="text-gray-600 leading-relaxed text-[15px]">{agent.bio}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
