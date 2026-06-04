"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

const navLinks = [
  { label: "HOME", href: "/" },
  {
    label: "BUY",
    href: "/listing",
    children: [
      { label: "Search All Listings", href: "/listing" },
      { label: "Featured Listings", href: "/listing?status=featured" },
      { label: "New Construction", href: "/listing?type=new" },
    ],
  },
  {
    label: "SELL",
    href: "/sell",
    children: [
      { label: "Sell Your Home", href: "/sell" },
      { label: "Home Valuation", href: "/home-valuation" },
    ],
  },
  {
    label: "MEET THE TEAM",
    href: "/about",
    children: [
      { label: "Our Team", href: "/about" },
      { label: "Lew Crew Gives Back", href: "/about#gives-back" },
    ],
  },
  { label: "MARKET SNAPSHOT", href: "/snapshot" },
  { label: "MORTGAGE CALCULATOR", href: "/mortgage-calculator" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#0d0d0d] shadow-lg" : "bg-[#0d0d0d]"
      }`}
    >
      <nav className="max-w-[1500px] mx-auto px-4 xl:px-8 flex items-center h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-8">
          <SLLogo />
        </Link>

        {/* Desktop Nav — matches original: show all links */}
        <ul className="hidden lg:flex items-center flex-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.children ? (
                <div
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-5 text-white text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors relative ${
                      isActive(link.href) ? "text-white" : "hover:text-white/70"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={11} className="mt-0.5" />
                    {isActive(link.href) && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white" />
                    )}
                  </button>
                  {openDropdown === link.label && (
                    <div className="absolute top-full left-0 bg-[#0d0d0d] border-t border-white/10 min-w-[200px] py-2 shadow-2xl z-50">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-5 py-2.5 text-[11px] text-white/70 hover:text-white hover:bg-white/5 tracking-[0.12em] uppercase transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={link.href}
                  className={`block px-3 py-5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors relative ${
                    isActive(link.href) ? "text-white" : "text-white hover:text-white/70"
                  }`}
                >
                  {link.label}
                  {isActive(link.href) && (
                    <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-white" />
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Right: Register + Sign In + Hamburger (always visible) */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="hidden lg:flex items-center">
            <button className="text-white text-[11px] tracking-[0.15em] uppercase px-4 py-2 hover:text-white/70 transition-colors font-semibold">
              REGISTER
            </button>
            <button className="text-white text-[11px] tracking-[0.15em] uppercase px-4 py-2 hover:text-white/70 transition-colors font-semibold">
              SIGN IN
            </button>
          </div>
          <button
            className="text-white p-2 hover:text-white/70 transition-colors ml-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile/Overflow Menu */}
      {mobileOpen && (
        <div className="bg-[#0d0d0d] border-t border-white/10">
          <ul className="px-6 py-4 flex flex-col">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className={`block py-3 text-[11px] tracking-[0.2em] uppercase border-b border-white/5 transition-colors font-semibold ${
                    isActive(link.href) ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex gap-6">
              <button className="text-white/70 text-[11px] tracking-[0.2em] uppercase hover:text-white">
                REGISTER
              </button>
              <button className="text-white/70 text-[11px] tracking-[0.2em] uppercase hover:text-white">
                SIGN IN
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

function SLLogo() {
  return (
    <div className="flex items-center gap-2.5">
      {/* Circular SL badge — matches original exactly */}
      <div className="w-[56px] h-[56px] flex-shrink-0">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="47" fill="none" stroke="white" strokeWidth="1.5" />
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="38"
            fontFamily="Cormorant Garamond, Georgia, serif"
            fontWeight="400"
            fill="white"
          >
            SL
          </text>
        </svg>
      </div>
      <div className="flex flex-col leading-none gap-0.5">
        <span className="text-white text-[13px] font-semibold tracking-[0.18em] uppercase">
          STEVE LEW
        </span>
        <div className="w-full h-px bg-white/30" />
        <span className="text-white/60 text-[8px] tracking-[0.35em] uppercase">
          REAL ESTATE GROUP
        </span>
      </div>
    </div>
  );
}
