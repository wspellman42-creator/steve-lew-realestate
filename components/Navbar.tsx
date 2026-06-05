"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
      { label: "Sold Listings", href: "/listing?status=sold" },
    ],
  },
  {
    label: "SELL",
    href: "/sell",
    children: [
      { label: "Sell My Home", href: "/sell" },
      { label: "Home Valuation", href: "/home-valuation" },
    ],
  },
  {
    label: "MEET THE TEAM",
    href: "/about",
    children: [
      { label: "About Us", href: "/about" },
      { label: "Contact Us", href: "/contact" },
      { label: "Reviews", href: "/reviews" },
    ],
  },
  { label: "HOME VALUATION", href: "/home-valuation" },
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
        {/* Real logo from listwithlew.com */}
        <Link href="/" className="flex items-center flex-shrink-0 mr-8">
          <Image
            src="/images/logo.png"
            alt="Steve Lew Real Estate Group"
            width={140}
            height={105}
            className="h-[58px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center flex-1">
          {navLinks.map((link) => (
            <li key={link.label} className="relative">
              {link.children ? (
                <div
                  onMouseEnter={() => setOpenDropdown(link.label)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    className={`flex items-center gap-1 px-3 py-5 text-[11px] font-semibold tracking-[0.15em] uppercase transition-colors relative ${
                      isActive(link.href) ? "text-white" : "text-white hover:text-white/70"
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

        {/* Register + Sign In + Hamburger */}
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

      {/* Mobile Menu */}
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
