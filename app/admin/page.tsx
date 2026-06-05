"use client";

import { useState, useEffect, useRef } from "react";

const ADMIN_EMAIL = "info@listwithlew.com";
const ADMIN_PASSWORD = "SLREGadmin2024";

interface Agent {
  id: string;
  name: string;
  title: string;
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

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  review: string;
}

interface BlogPost {
  id: string;
  title: string;
  image: string;
  excerpt: string;
  content: string;
  date: string;
}

function loadStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<"agents" | "testimonials" | "blog">("agents");

  // Agents state
  const [agents, setAgents] = useState<Agent[]>([]);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [agentSuccess, setAgentSuccess] = useState("");
  const agentPhotoFileRef = useRef<HTMLInputElement>(null);

  // Testimonials state
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [testimSuccess, setTestimSuccess] = useState("");

  // Blog state
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [postSuccess, setPostSuccess] = useState("");

  // Agent form
  const [aName, setAName] = useState("");
  const [aTitle, setATitle] = useState("");
  const [aPhone, setAPhone] = useState("");
  const [aEmail, setAEmail] = useState("");
  const [aLicense, setALicense] = useState("");
  const [aSpecialty, setASpecialty] = useState("");
  const [aPhoto, setAPhoto] = useState("");
  const [aInstagram, setAInstagram] = useState("");
  const [aFacebook, setAFacebook] = useState("");
  const [aLinkedin, setALinkedin] = useState("");
  const [aBio, setABio] = useState("");

  // Testimonial form
  const [tName, setTName] = useState("");
  const [tRating, setTRating] = useState(5);
  const [tReview, setTReview] = useState("");

  // Blog form
  const [bTitle, setBTitle] = useState("");
  const [bImage, setBImage] = useState("");
  const [bExcerpt, setBExcerpt] = useState("");
  const [bContent, setBContent] = useState("");

  useEffect(() => {
    const session = sessionStorage.getItem("slreg_admin");
    if (session === "true") setAuthed(true);
  }, []);

  useEffect(() => {
    if (authed) {
      setAgents(loadStorage<Agent[]>("slreg_agents", []));
      setTestimonials(loadStorage<Testimonial[]>("slreg_testimonials", []));
      setPosts(loadStorage<BlogPost[]>("slreg_blog", []));
    }
  }, [authed]);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("slreg_admin", "true");
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Invalid email or password.");
    }
  }

  function logout() {
    sessionStorage.removeItem("slreg_admin");
    setAuthed(false);
  }

  function flash(set: (v: string) => void, msg: string) {
    set(msg);
    setTimeout(() => set(""), 3000);
  }

  // ── AGENTS ──────────────────────────────────────────────
  function loadAgentIntoForm(a: Agent) {
    setEditingAgent(a);
    setAName(a.name); setATitle(a.title); setAPhone(a.phone);
    setAEmail(a.email); setALicense(a.license); setASpecialty(a.specialty);
    setAPhoto(a.photo); setAInstagram(a.instagram); setAFacebook(a.facebook);
    setALinkedin(a.linkedin); setABio(a.bio);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearAgentForm() {
    setEditingAgent(null);
    setAName(""); setATitle(""); setAPhone(""); setAEmail("");
    setALicense(""); setASpecialty(""); setAPhoto("");
    setAInstagram(""); setAFacebook(""); setALinkedin(""); setABio("");
    if (agentPhotoFileRef.current) agentPhotoFileRef.current.value = "";
  }

  function saveAgent() {
    if (!aName.trim()) { alert("Name is required."); return; }
    const updated = editingAgent
      ? agents.map(a => a.id === editingAgent.id
          ? { ...a, name: aName, title: aTitle, phone: aPhone, email: aEmail, license: aLicense, specialty: aSpecialty, photo: aPhoto, instagram: aInstagram, facebook: aFacebook, linkedin: aLinkedin, bio: aBio }
          : a)
      : [...agents, { id: Date.now().toString(), name: aName, title: aTitle, phone: aPhone, email: aEmail, license: aLicense, specialty: aSpecialty, photo: aPhoto, instagram: aInstagram, facebook: aFacebook, linkedin: aLinkedin, bio: aBio }];
    setAgents(updated);
    saveStorage("slreg_agents", updated);
    flash(setAgentSuccess, editingAgent ? "Agent updated!" : "Agent added!");
    clearAgentForm();
  }

  function deleteAgent(id: string) {
    if (!confirm("Delete this agent?")) return;
    const updated = agents.filter(a => a.id !== id);
    setAgents(updated);
    saveStorage("slreg_agents", updated);
  }

  function handlePhotoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAPhoto(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  // ── TESTIMONIALS ────────────────────────────────────────
  function saveTestimonial() {
    if (!tName.trim()) { alert("Name is required."); return; }
    const updated = [...testimonials, { id: Date.now().toString(), name: tName, rating: tRating, review: tReview }];
    setTestimonials(updated);
    saveStorage("slreg_testimonials", updated);
    setTName(""); setTRating(5); setTReview("");
    flash(setTestimSuccess, "Testimonial added!");
  }

  function deleteTestimonial(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    const updated = testimonials.filter(t => t.id !== id);
    setTestimonials(updated);
    saveStorage("slreg_testimonials", updated);
  }

  // ── BLOG ────────────────────────────────────────────────
  function saveBlogPost() {
    if (!bTitle.trim()) { alert("Title is required."); return; }
    const updated = [...posts, { id: Date.now().toString(), title: bTitle, image: bImage, excerpt: bExcerpt, content: bContent, date: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) }];
    setPosts(updated);
    saveStorage("slreg_blog", updated);
    setBTitle(""); setBImage(""); setBExcerpt(""); setBContent("");
    flash(setPostSuccess, "Blog post published!");
  }

  function deleteBlogPost(id: string) {
    if (!confirm("Delete this post?")) return;
    const updated = posts.filter(p => p.id !== id);
    setPosts(updated);
    saveStorage("slreg_blog", updated);
  }

  // ── LOGIN SCREEN ────────────────────────────────────────
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center pt-[72px] px-4">
        <div className="bg-white border border-gray-200 p-10 w-full max-w-[420px]">
          <h1 className="font-serif text-2xl text-gray-900 mb-1">Admin Login</h1>
          <p className="text-xs text-gray-400 mb-8 tracking-wide">Steve Lew Real Estate Group</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600"
            />
            {loginError && <p className="text-red-600 text-xs">{loginError}</p>}
            <button type="submit" className="bg-[#0d0d0d] text-white py-3 text-xs tracking-[0.2em] uppercase hover:bg-gray-800 transition-colors font-semibold">
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── ADMIN PANEL ─────────────────────────────────────────
  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-[72px]">
      {/* Admin bar */}
      <div className="bg-[#0d0d0d] text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-[#e8c47a] font-bold text-sm tracking-wide">⚙ ADMIN MODE</span>
          <span className="text-white/50 text-xs">— {ADMIN_EMAIL}</span>
        </div>
        <button onClick={logout} className="text-white/50 text-xs border border-white/20 px-4 py-1.5 hover:text-white hover:border-white/50 transition-colors">
          LOG OUT
        </button>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-10">
        <h1 className="font-serif text-3xl text-gray-900 mb-8">Dashboard</h1>

        {/* Tabs */}
        <div className="flex border-b border-gray-300 mb-8">
          {(["agents", "testimonials", "blog"] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-3 text-sm font-semibold capitalize tracking-wide border-b-2 -mb-px transition-colors ${
                tab === t ? "border-[#0d0d0d] text-[#0d0d0d]" : "border-transparent text-gray-400 hover:text-gray-700"
              }`}
            >
              {t === "agents" ? "Agents" : t === "testimonials" ? "Testimonials" : "Blog Posts"}
            </button>
          ))}
        </div>

        {/* ── AGENTS TAB ── */}
        {tab === "agents" && (
          <div>
            <div className="bg-white border border-gray-200 p-8 mb-8">
              <h2 className="font-serif text-xl text-gray-900 mb-6">
                {editingAgent ? "Edit Agent" : "Add New Agent"}
              </h2>
              {agentSuccess && <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 text-sm mb-4">{agentSuccess}</div>}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Field label="Full Name *" value={aName} onChange={setAName} placeholder="Jane Smith" />
                <Field label="Title / Role" value={aTitle} onChange={setATitle} placeholder="Buyer's Agent" />
                <Field label="Phone" value={aPhone} onChange={setAPhone} placeholder="(317) 555-0000" />
                <Field label="Email" value={aEmail} onChange={setAEmail} placeholder="jane@listwithlew.com" />
                <Field label="License #" value={aLicense} onChange={setALicense} placeholder="RB12345678" />
                <Field label="Specialty / Area" value={aSpecialty} onChange={setASpecialty} placeholder="First-Time Buyers" />
              </div>

              {/* Photo */}
              <div className="mb-4">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-2 font-semibold">Agent Photo</label>
                <div className="flex gap-4 items-start">
                  <div className="w-20 h-20 border border-gray-200 bg-gray-50 flex-shrink-0 overflow-hidden">
                    {aPhoto
                      ? <img src={aPhoto} alt="preview" className="w-full h-full object-cover" />
                      : <div className="w-full h-full flex items-center justify-center text-gray-300 text-xs">No photo</div>
                    }
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      placeholder="Paste a photo URL, or use Upload Photo"
                      value={aPhoto}
                      onChange={e => setAPhoto(e.target.value)}
                      className="border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-600 w-full"
                    />
                    <div className="flex items-center gap-3">
                      <label className="bg-[#0d0d0d] text-white px-4 py-2 text-xs font-semibold uppercase tracking-wide cursor-pointer hover:bg-gray-800 transition-colors">
                        Upload Photo
                        <input ref={agentPhotoFileRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                      </label>
                      <span className="text-xs text-gray-400">JPG, PNG, WebP</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <Field label="Instagram URL" value={aInstagram} onChange={setAInstagram} placeholder="https://instagram.com/..." />
                <Field label="Facebook URL" value={aFacebook} onChange={setAFacebook} placeholder="https://facebook.com/..." />
                <Field label="LinkedIn URL" value={aLinkedin} onChange={setALinkedin} placeholder="https://linkedin.com/in/..." />
              </div>

              <div className="mb-6">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Bio</label>
                <textarea
                  rows={3}
                  placeholder="Brief bio..."
                  value={aBio}
                  onChange={e => setABio(e.target.value)}
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600 resize-none"
                />
              </div>

              <div className="flex gap-3">
                <button onClick={saveAgent} className="bg-[#0d0d0d] text-white px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-gray-800 transition-colors">
                  {editingAgent ? "Update Agent" : "Save Agent"}
                </button>
                {editingAgent && (
                  <button onClick={clearAgentForm} className="border border-gray-300 px-6 py-3 text-xs tracking-[0.15em] uppercase text-gray-600 hover:bg-gray-50 transition-colors">
                    Cancel
                  </button>
                )}
              </div>
            </div>

            {/* Agents table */}
            {agents.length > 0 && (
              <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0d0d0d] text-white text-xs tracking-wide">
                      <th className="px-4 py-3 text-left">Photo</th>
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Title</th>
                      <th className="px-4 py-3 text-left">Phone</th>
                      <th className="px-4 py-3 text-left">Email</th>
                      <th className="px-4 py-3 text-left">License</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map(a => (
                      <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          {a.photo
                            ? <img src={a.photo} alt={a.name} className="w-10 h-10 object-cover" />
                            : <div className="w-10 h-10 bg-gray-100 flex items-center justify-center text-gray-400 text-xs">—</div>
                          }
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{a.name}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{a.title}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{a.phone}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{a.email}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{a.license}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-3">
                            <button onClick={() => loadAgentIntoForm(a)} className="text-xs text-blue-600 hover:underline font-medium">Edit</button>
                            <button onClick={() => deleteAgent(a.id)} className="text-xs text-red-600 hover:underline font-medium">Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {agents.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No agents yet. Add the first one above.</p>
            )}
          </div>
        )}

        {/* ── TESTIMONIALS TAB ── */}
        {tab === "testimonials" && (
          <div>
            <div className="bg-white border border-gray-200 p-8 mb-8">
              <h2 className="font-serif text-xl text-gray-900 mb-6">Add Testimonial</h2>
              {testimSuccess && <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 text-sm mb-4">{testimSuccess}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Field label="Client Name *" value={tName} onChange={setTName} placeholder="John & Jane Doe" />
                <div>
                  <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Rating (1–5)</label>
                  <input type="number" min={1} max={5} value={tRating} onChange={e => setTRating(Number(e.target.value))}
                    className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-600" />
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Review</label>
                <textarea rows={3} value={tReview} onChange={e => setTReview(e.target.value)} placeholder="Client review text..."
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600 resize-none" />
              </div>
              <button onClick={saveTestimonial} className="bg-[#0d0d0d] text-white px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-gray-800 transition-colors">
                Add Testimonial
              </button>
            </div>
            {testimonials.length > 0 && (
              <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0d0d0d] text-white text-xs tracking-wide">
                      <th className="px-4 py-3 text-left">Name</th>
                      <th className="px-4 py-3 text-left">Rating</th>
                      <th className="px-4 py-3 text-left">Review</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testimonials.map(t => (
                      <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{t.name}</td>
                        <td className="px-4 py-3 text-sm">{"★".repeat(t.rating)}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 max-w-[300px] truncate">{t.review}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteTestimonial(t.id)} className="text-xs text-red-600 hover:underline font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {testimonials.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No testimonials yet.</p>
            )}
          </div>
        )}

        {/* ── BLOG TAB ── */}
        {tab === "blog" && (
          <div>
            <div className="bg-white border border-gray-200 p-8 mb-8">
              <h2 className="font-serif text-xl text-gray-900 mb-6">Add Blog Post</h2>
              {postSuccess && <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-3 text-sm mb-4">{postSuccess}</div>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Field label="Title *" value={bTitle} onChange={setBTitle} placeholder="Post title" />
                <Field label="Image URL" value={bImage} onChange={setBImage} placeholder="https://..." />
              </div>
              <div className="mb-4">
                <Field label="Excerpt" value={bExcerpt} onChange={setBExcerpt} placeholder="Short description..." />
              </div>
              <div className="mb-6">
                <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">Content</label>
                <textarea rows={5} value={bContent} onChange={e => setBContent(e.target.value)} placeholder="Full post content..."
                  className="w-full border border-gray-300 px-4 py-3 text-sm outline-none focus:border-gray-600 resize-none" />
              </div>
              <button onClick={saveBlogPost} className="bg-[#0d0d0d] text-white px-8 py-3 text-xs tracking-[0.15em] uppercase font-semibold hover:bg-gray-800 transition-colors">
                Publish Post
              </button>
            </div>
            {posts.length > 0 && (
              <div className="bg-white border border-gray-200 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#0d0d0d] text-white text-xs tracking-wide">
                      <th className="px-4 py-3 text-left">Title</th>
                      <th className="px-4 py-3 text-left">Date</th>
                      <th className="px-4 py-3 text-left">Excerpt</th>
                      <th className="px-4 py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts.map(p => (
                      <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-semibold text-gray-900">{p.title}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{p.date}</td>
                        <td className="px-4 py-3 text-xs text-gray-500 max-w-[300px] truncate">{p.excerpt}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => deleteBlogPost(p.id)} className="text-xs text-red-600 hover:underline font-medium">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {posts.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">No blog posts yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div>
      <label className="block text-xs text-gray-500 uppercase tracking-wider mb-1.5 font-semibold">{label}</label>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-600"
      />
    </div>
  );
}
