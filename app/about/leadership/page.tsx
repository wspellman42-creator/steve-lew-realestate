import Image from "next/image";
import AgentGrid from "@/components/AgentGrid";

export default function LeadershipPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      <section className="relative h-[60vh] min-h-[450px] flex items-end">
        <Image src="/images/team-header.jpg" alt="Steve Lew Real Estate Leadership" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 pb-14 max-w-[1200px] mx-auto w-full">
          <p className="text-[0.825rem] tracking-[0.3em] uppercase text-white/50 mb-3">MEET THE TEAM</p>
          <h1 className="font-serif text-[2.475rem] md:text-[3.3rem] text-white font-light mb-3">Leadership</h1>
          <p className="text-[1.1rem] text-gray-300 italic">Managing brokers and team leadership driving our vision.</p>
        </div>
      </section>
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AgentGrid category="leadership" />
        </div>
      </section>
    </div>
  );
}
