"use client";

import { useState, useEffect } from "react";
import { X, Heart, LogIn, UserPlus } from "lucide-react";
import { useUser } from "@/lib/userContext";
import { mockListings } from "@/lib/mockData";
import Link from "next/link";
import Image from "next/image";

export default function AuthModal() {
  const { user, authModalOpen, authModalTab, closeAuth, login, register, openAuth } = useUser();
  const [tab, setTab] = useState<"signin" | "register" | "favorites">(authModalTab);

  const [siEmail, setSiEmail] = useState("");
  const [siPassword, setSiPassword] = useState("");
  const [siError, setSiError] = useState("");

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");
  const [regError, setRegError] = useState("");

  useEffect(() => {
    setTab(authModalTab);
  }, [authModalTab]);

  useEffect(() => {
    if (authModalOpen) {
      setSiError("");
      setRegError("");
    }
  }, [authModalOpen]);

  if (!authModalOpen) return null;

  const favListings = user
    ? mockListings.filter(l => user.favorites.includes(l.id))
    : [];

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    const err = login(siEmail, siPassword);
    if (err) setSiError(err);
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (!regName.trim()) { setRegError("Name is required."); return; }
    if (regPassword !== regConfirm) { setRegError("Passwords do not match."); return; }
    if (regPassword.length < 6) { setRegError("Password must be at least 6 characters."); return; }
    const err = register(regName, regEmail, regPassword);
    if (err) setRegError(err);
  }

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={closeAuth} />
      <div className="relative bg-white w-full max-w-[460px] shadow-2xl z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <div className="flex gap-1">
            {!user && (
              <>
                <button
                  onClick={() => setTab("signin")}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                    tab === "signin" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setTab("register")}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase transition-colors ${
                    tab === "register" ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-400 hover:text-gray-700"
                  }`}
                >
                  Register
                </button>
              </>
            )}
            {user && (
              <button
                onClick={() => setTab("favorites")}
                className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-[0.15em] uppercase text-gray-900"
              >
                <Heart size={13} /> My Favorites ({favListings.length})
              </button>
            )}
          </div>
          <button onClick={closeAuth} className="text-gray-400 hover:text-gray-700 transition-colors">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-6">
          {/* ── SIGN IN ── */}
          {!user && tab === "signin" && (
            <form onSubmit={handleSignIn} className="flex flex-col gap-4">
              <div>
                <p className="font-serif text-2xl text-gray-900 mb-1">Welcome back</p>
                <p className="text-xs text-gray-400">Sign in to access your saved listings.</p>
              </div>
              <input
                type="email"
                placeholder="Email address"
                value={siEmail}
                onChange={e => setSiEmail(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              <input
                type="password"
                placeholder="Password"
                value={siPassword}
                onChange={e => setSiPassword(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              {siError && <p className="text-red-600 text-xs">{siError}</p>}
              <button
                type="submit"
                className="bg-[#0d0d0d] text-white py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={13} /> Sign In
              </button>
              <p className="text-center text-xs text-gray-400">
                Don&apos;t have an account?{" "}
                <button type="button" onClick={() => setTab("register")} className="text-gray-700 underline hover:text-gray-900">
                  Register free
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER ── */}
          {!user && tab === "register" && (
            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <p className="font-serif text-2xl text-gray-900 mb-1">Create an account</p>
                <p className="text-xs text-gray-400">Save listings and get personalized updates.</p>
              </div>
              <input
                type="text"
                placeholder="Full name"
                value={regName}
                onChange={e => setRegName(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              <input
                type="email"
                placeholder="Email address"
                value={regEmail}
                onChange={e => setRegEmail(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              <input
                type="password"
                placeholder="Password (min 6 characters)"
                value={regPassword}
                onChange={e => setRegPassword(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={regConfirm}
                onChange={e => setRegConfirm(e.target.value)}
                required
                className="border border-gray-300 px-4 py-3 text-sm text-gray-900 outline-none focus:border-gray-600 placeholder:text-gray-400"
              />
              {regError && <p className="text-red-600 text-xs">{regError}</p>}
              <button
                type="submit"
                className="bg-[#0d0d0d] text-white py-3 text-xs tracking-[0.2em] uppercase font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <UserPlus size={13} /> Create Account
              </button>
              <p className="text-center text-xs text-gray-400">
                Already have an account?{" "}
                <button type="button" onClick={() => setTab("signin")} className="text-gray-700 underline hover:text-gray-900">
                  Sign in
                </button>
              </p>
            </form>
          )}

          {/* ── FAVORITES ── */}
          {user && tab === "favorites" && (
            <div>
              {favListings.length === 0 ? (
                <div className="text-center py-8">
                  <Heart size={32} className="mx-auto mb-3 text-gray-200" />
                  <p className="text-gray-500 text-sm">No saved listings yet.</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Click the <Heart size={10} className="inline" /> on any listing to save it here.
                  </p>
                  <Link
                    href="/listing"
                    onClick={closeAuth}
                    className="inline-block mt-4 text-xs tracking-[0.15em] uppercase text-gray-700 underline hover:text-gray-900"
                  >
                    Browse Listings
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                  {favListings.map(listing => (
                    <Link
                      key={listing.id}
                      href={`/listing/${listing.id}`}
                      onClick={closeAuth}
                      className="flex gap-3 border border-gray-100 hover:border-gray-300 transition-colors p-2"
                    >
                      <div className="relative w-20 h-16 flex-shrink-0">
                        <Image src={listing.image} alt={listing.address} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900">
                          {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(listing.price)}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{listing.address}</p>
                        <p className="text-xs text-gray-400">{listing.city}, {listing.state}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
