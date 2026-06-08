"use client";

import Link from "next/link";
import { Phone, Mail, Linkedin, Instagram, Facebook } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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

export default function AgentGrid({ category }: { category?: string }) {
  const [agents, setAgents] = useState<Agent[]>([]);
  const router = useRouter();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("slreg_agents");
      if (raw) {
        const all: Agent[] = JSON.parse(raw);
        setAgents(category ? all.filter(a => a.category === category) : all);
      }
    } catch { /* ignore */ }
  }, [category]);

  if (agents.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-400 text-sm mb-4">No team members have been added to this section yet.</p>
        <Link href="/admin" className="text-xs tracking-[0.2em] uppercase text-gray-500 hover:text-gray-800 underline transition-colors">
          Go to Admin Panel
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {agents.map((member) => (
        <div
          key={member.id}
          className="border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-[0_8px_40px_rgba(0,0,0,0.15)] hover:-translate-y-1 cursor-pointer"
          onClick={() => router.push(`/about/${member.id}`)}
        >
          {/* Photo */}
          <div className="h-[260px] bg-gradient-to-br from-gray-200 to-gray-100 flex items-center justify-center overflow-hidden">
            {member.photo ? (
              <img src={member.photo} alt={member.name} className="w-full h-full object-cover" />
            ) : (
              <div className="text-center text-gray-300">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-40">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-5">
            <p className="font-serif text-xl font-bold text-gray-900 mb-1">{member.name}</p>
            {member.title && (
              <p className="text-[13px] font-semibold tracking-[0.5px] uppercase text-red-600 mb-2">{member.title}</p>
            )}
            {member.specialty && (
              <p className="text-sm text-gray-400 mb-3">{member.specialty}</p>
            )}

            {/* Contact */}
            <div className="flex flex-col gap-1.5 mb-4">
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Phone size={13} />
                  {member.phone}
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[13px] text-gray-500 hover:text-red-600 transition-colors"
                >
                  <Mail size={13} />
                  {member.email}
                </a>
              )}
            </div>

            {/* Social logos */}
            {(member.linkedin || member.instagram || member.facebook) && (
              <div className="flex gap-2 border-t border-gray-100 pt-4">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center h-10 bg-gray-50 text-gray-400 hover:bg-[#0077B5] hover:text-white transition-colors"
                  >
                    <Linkedin size={18} />
                  </a>
                )}
                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center h-10 bg-gray-50 text-gray-400 hover:bg-[#E1306C] hover:text-white transition-colors"
                  >
                    <Instagram size={18} />
                  </a>
                )}
                {member.facebook && (
                  <a
                    href={member.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center h-10 bg-gray-50 text-gray-400 hover:bg-[#1877F2] hover:text-white transition-colors"
                  >
                    <Facebook size={18} />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
