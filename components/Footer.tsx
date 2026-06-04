import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

const siteMap = [
  { label: "HOME", href: "/" },
  { label: "BUY", href: "/listing" },
  { label: "SELL", href: "/sell" },
  { label: "MEET THE TEAM", href: "/about" },
  { label: "MARKET SNAPSHOT", href: "/snapshot" },
  { label: "MORTGAGE CALCULATOR", href: "/mortgage-calculator" },
  { label: "HOME VALUATION", href: "/home-valuation" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-white">
      {/* IDX Disclaimer */}
      <div className="border-t border-white/10 px-6 py-6 max-w-[1400px] mx-auto">
        <p className="text-[11px] text-gray-400 leading-relaxed">
          <span className="font-medium">Digital Millennium Copyright Act – DMCA Notice</span> Based on information
          submitted to the MLS GRID. All data is obtained from various sources and may not have been verified by broker
          or MLS GRID. Supplied Open House Information is subject to change without notice. All information should be
          independently reviewed and verified for accuracy. Properties may or may not be listed by the office/agent
          presenting the information.
        </p>
        <p className="text-[11px] text-gray-400 leading-relaxed mt-2">
          IDX information is provided exclusively for consumers&apos; personal, non-commercial use and that it may not
          be used for any purpose other than to identify prospective properties consumers may be interested in
          purchasing. Information deemed reliable but not guaranteed to be accurate. Listing information updated daily.
        </p>
      </div>

      {/* Main Footer */}
      <div className="border-t border-white/10 px-6 py-12 max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Site Map */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-4">
              SITE MAP
            </h4>
            <ul className="flex flex-col gap-2">
              {siteMap.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[12px] text-gray-300 hover:text-white tracking-widest uppercase transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <SLLogoSmall />
              <div>
                <p className="text-sm font-medium tracking-wider">Steve Lew Real Estate Group</p>
                <p className="text-[10px] text-gray-400 tracking-widest">License ID: RC51800217</p>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <a
                href="tel:+13178685478"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Phone size={13} className="text-gray-500" />
                +1(317) 868-5478
              </a>
              <a
                href="mailto:info@listwithlew.com"
                className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
              >
                <Mail size={13} className="text-gray-500" />
                info@listwithlew.com
              </a>
              <div className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin size={13} className="text-gray-500 mt-0.5 flex-shrink-0" />
                <span>550 US 31 S., Greenwood, Indiana, 46142, USA</span>
              </div>
            </div>
            <div className="mt-3">
              <p className="text-[11px] text-gray-500">Additional Contact Phone Numbers:</p>
              <p className="text-[12px] text-gray-400">317-800-6200</p>
              <p className="text-[12px] text-gray-400">317-805-0202</p>
            </div>
          </div>

          {/* Social + Logos */}
          <div>
            <h4 className="text-[11px] font-semibold tracking-[0.25em] uppercase text-white/50 mb-4">
              FOLLOW US
            </h4>
            <div className="flex gap-3 mb-6">
              {[
                { href: "https://www.facebook.com/Steve-Lew-Real-Estate-Group-320616445387280", label: "Facebook", icon: <FbIcon /> },
                { href: "https://twitter.com/SteveLewREGroup", label: "Twitter/X", icon: <XIcon /> },
                { href: "https://www.instagram.com/stevelewrealestate", label: "Instagram", icon: <IgIcon /> },
                { href: "https://www.youtube.com/channel/UCeU8w7kmg8GBojoMzCJnWLQ", label: "YouTube", icon: <YtIcon /> },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center border border-white/20 text-gray-400 hover:text-white hover:border-white/50 transition-colors"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
            {/* Industry Logos */}
            <div className="flex flex-wrap gap-3 items-center">
              <MiborBadge label="REALTOR®" />
              <MiborBadge label="MLS" />
              <MiborBadge label="Equal Housing" />
              <MiborBadge label="MIBOR" />
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer + Legal */}
      <div className="border-t border-white/10 px-6 py-6 max-w-[1400px] mx-auto">
        <p className="text-[10px] text-gray-500 leading-relaxed mb-4">
          Steve Lew Real Estate assumes no responsibility for the accuracy and completeness of the information provided.
          The information provided is for educational and information purposes only. Use discretion and use due diligence
          when making property related decisions. While we strive to provide valuable information various factors can
          influence the accuracy of the information such as market fluctuations, changes in regulations, and human
          error. Therefore, it is always recommended to consult with an actual real estate, legal, or lending
          professional for specific clarifications.
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[10px] text-gray-500">
          <span>Copyright {new Date().getFullYear()}. All Rights Reserved.</span>
          <Link href="/privacy" className="hover:text-gray-300 transition-colors">
            Terms of Service &amp; Privacy Policy
          </Link>
          <Link href="/cookie-policy" className="hover:text-gray-300 transition-colors">
            Cookie Policy
          </Link>
          <Link href="/listing" className="hover:text-gray-300 transition-colors">
            Property Listings
          </Link>
          <Link href="/accessibility" className="hover:text-gray-300 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  );
}

function SLLogoSmall() {
  return (
    <div className="w-9 h-9 flex-shrink-0">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="2" />
        <text
          x="50"
          y="57"
          textAnchor="middle"
          fontSize="36"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="300"
          fill="white"
          letterSpacing="2"
        >
          SL
        </text>
      </svg>
    </div>
  );
}

function FbIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>;
}
function XIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>;
}
function IgIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/></svg>;
}
function YtIcon() {
  return <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 1.96C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12z"/></svg>;
}

function MiborBadge({ label }: { label: string }) {
  return (
    <div className="border border-white/20 px-2 py-1 text-[9px] text-gray-400 tracking-widest uppercase">
      {label}
    </div>
  );
}
