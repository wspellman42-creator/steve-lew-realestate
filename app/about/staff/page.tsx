import Image from "next/image";
import AgentGrid from "@/components/AgentGrid";

export default function StaffPage() {
  return (
    <div className="min-h-screen pt-[72px]">
      <section className="relative h-[50vh] min-h-[352px] flex items-end">
        <Image src="/images/about-team-group.webp" alt="Steve Lew Real Estate Staff" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 px-6 pb-14 max-w-[1200px] mx-auto w-full">
          <p className="text-xs tracking-[0.3em] uppercase text-white/50 mb-3">MEET THE TEAM</p>
          <h1 className="font-serif text-4xl md:text-5xl text-white font-light mb-3">Administrative Staff</h1>
          <p className="text-gray-300 italic">The dedicated support team keeping everything running smoothly.</p>
        </div>
      </section>
      <section className="bg-white py-20 px-6">
        <div className="max-w-[1200px] mx-auto">
          <AgentGrid category="staff" />
        </div>
      </section>
    </div>
  );
}
