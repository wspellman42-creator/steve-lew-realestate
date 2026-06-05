"use client";

import Link from "next/link";
import { Phone, Mail } from "lucide-react";
import { useEffect, useState } from "react";

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
          <div className="flex gap-2 mt-2 flex-wrap">
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
              <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 text-[11px] font-bold transition-colors">IG</a>
            )}
            {member.facebook && (
              <a href={member.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 text-[11px] font-bold transition-colors">FB</a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-700 text-[11px] font-bold transition-colors">in</a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
