"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Phone, Mail, ArrowLeft } from "lucide-react";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M24 12.073C24 5.446 18.627 0 12 0S0 5.446 0 12.073c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

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
                    <LinkedInIcon />
                  </a>
                )}
                {agent.instagram && (
                  <a
                    href={agent.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-500 hover:bg-[#E1306C] hover:text-white transition-colors"
                  >
                    <InstagramIcon />
                  </a>
                )}
                {agent.facebook && (
                  <a
                    href={agent.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center h-11 bg-gray-100 text-gray-500 hover:bg-[#1877F2] hover:text-white transition-colors"
                  >
                    <FacebookIcon />
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
