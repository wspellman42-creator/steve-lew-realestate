"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 shadow-lg backdrop-blur-sm" : "bg-black/80"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-4 lg:px-8 flex items-center justify-between h-[72px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <SLLogo />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative group">
              {link.children ? (
                <>
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-white text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
                    onMouseEnter={() => setOpenDropdown(link.label)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {link.label}
                    <ChevronDown size={12} />
                  </button>
                  {openDropdown === link.label && (
                    <div
                      className="absolute top-full left-0 bg-black border border-white/10 min-w-[200px] py-2 shadow-xl"
                      onMouseEnter={() => setOpenDropdown(link.label)}
                      onMouseLeave={() => setOpenDropdown(null)}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-xs text-gray-300 hover:text-white hover:bg-white/5 tracking-wide uppercase transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={link.href}
                  className="block px-3 py-2 text-white text-xs font-medium tracking-widest uppercase hover:text-gray-300 transition-colors"
                >
                  {link.label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Auth + Hamburger */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2">
            <button className="text-white text-xs tracking-widest uppercase px-3 py-1.5 hover:text-gray-300 transition-colors">
              REGISTER
            </button>
            <button className="text-white text-xs tracking-widest uppercase px-3 py-1.5 hover:text-gray-300 transition-colors">
              SIGN IN
            </button>
          </div>
          <button
            className="text-white p-2 hover:text-gray-300 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-black/98 border-t border-white/10">
          <ul className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="block py-3 text-white text-sm tracking-widest uppercase border-b border-white/5 hover:text-gray-300 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-4 flex gap-4">
              <button className="text-white text-xs tracking-widest uppercase">
                REGISTER
              </button>
              <button className="text-white text-xs tracking-widest uppercase">
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
    <div className="flex items-center gap-2">
      <div className="relative w-[52px] h-[52px]">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          <circle cx="50" cy="50" r="48" fill="none" stroke="white" strokeWidth="1.5" />
          <text
            x="50"
            y="56"
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
      <div className="flex flex-col leading-tight">
        <span className="text-white text-sm font-medium tracking-[0.2em] uppercase">
          Steve Lew
        </span>
        <span className="text-white/60 text-[9px] tracking-[0.3em] uppercase">
          Real Estate Group
        </span>
      </div>
    </div>
  );
}
