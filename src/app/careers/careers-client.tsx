"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { Send, CheckCircle2, User, Mail, Phone, Code, Link2, Sparkles, Star } from "lucide-react";
import { dbSaveApplication } from "@/lib/firebase";

const perks = [
  { icon: "🚀", title: "Real Products",     text: "Work on actual products used by real people — not just college assignments." },
  { icon: "🎓", title: "Learn Fast",        text: "Pair up with seniors, get code reviews, and level up faster than any class." },
  { icon: "🌐", title: "Build Your Portfolio", text: "Ship features, earn credits, and build a project history that stands out." },
  { icon: "🤝", title: "Flexible & Remote", text: "Balance your classes and code. Async-first, no rigid 9-to-5 schedules." },
];
const rolesOpen = [
  { role: "Frontend Developer",   tags: ["React", "Next.js", "CSS"],        color: "#8b5cf6" },
  { role: "UI/UX Designer",       tags: ["Figma", "Framer", "Design Systems"], color: "#3b82f6" },
  { role: "AI / ML Engineer",     tags: ["Python", "LangChain", "OpenAI"],  color: "#06b6d4" },
  { role: "Backend Developer",    tags: ["Node.js", "Firebase", "APIs"],    color: "#ec4899" },
];

export default function CareersPage() {
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "", skills: "", projects: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess]       = useState(false);
  const [error, setError]               = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); setError("");
    if (!formData.name || !formData.email || !formData.mobile || !formData.skills || !formData.projects) { setError("Please fill out all fields."); return; }
    if (!/\S+@\S+\.\S+/.test(formData.email)) { setError("Please enter a valid email address."); return; }
    setIsSubmitting(true);
    try {
      await dbSaveApplication(formData);
      setIsSuccess(true);
      setFormData({ name: "", email: "", mobile: "", skills: "", projects: "" });
    } catch {
      setError("Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = `w-full border rounded-2xl py-3.5 px-4 text-sm focus:outline-none input-glow transition-all duration-300`;
  const inputStyle = { background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" };

  return (
    <PageWrapper>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full blur-[150px]" style={{ background: `rgba(139,92,246,var(--orb-opacity))` }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider"
            style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
            <Sparkles className="w-3.5 h-3.5" />Join Our Studio
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight mt-8 leading-[1.05]" style={{ color: "var(--text-primary)" }}>
            College Students,<br /><span className="text-shimmer">Let's Build Together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Got skills in frontend, backend, UI/UX, or AI? Jump on board and craft the future with us.
          </motion.p>
        </div>
      </section>

      {/* ══ PERKS ══ */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {perks.map((perk, i) => (
              <motion.div key={perk.title}
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring" }} whileHover={{ y: -5 }}
                className="group p-6 rounded-3xl border hover:border-violet-500/25 transition-all duration-400"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                <div className="text-3xl mb-4">{perk.icon}</div>
                <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>{perk.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{perk.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ OPEN ROLES ══ */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-10">
            <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">Open Positions</p>
            <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text-primary)" }}>Roles We're <span className="text-shimmer">Looking For</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {rolesOpen.map((r, i) => (
              <motion.div key={r.role}
                initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group flex items-center justify-between p-5 rounded-2xl border overflow-hidden relative transition-all duration-300"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = `${r.color}30`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(135deg, ${r.color}08, transparent)` }} />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-3.5 h-3.5" style={{ color: r.color }} />
                    <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{r.role}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {r.tags.map(t => (
                      <span key={t} className="text-[10px] px-2.5 py-1 rounded-full border font-semibold"
                        style={{ borderColor: `${r.color}30`, color: r.color, background: `${r.color}10` }}>{t}</span>
                    ))}
                  </div>
                </div>
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-full ml-4 whitespace-nowrap"
                  style={{ color: "#10b981", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}>Open</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ APPLICATION FORM ══ */}
      <section className="py-20 relative z-10 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full blur-[140px] animate-pulse-glow" style={{ background: `rgba(139,92,246,var(--orb-opacity))` }} />
        </div>
        <div className="max-w-xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="p-8 rounded-3xl border shadow-xl" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg shadow-violet-500/30">
                <Send className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>Apply Now</h2>
              <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>We review every application and usually respond within 48 hours.</p>
            </div>

            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }}>
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                      style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)" }}>
                      <CheckCircle2 className="w-10 h-10 text-emerald-500" />
                    </div>
                  </motion.div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Application Received!</h3>
                  <p className="text-sm max-w-sm" style={{ color: "var(--text-secondary)" }}>We're thrilled to see your work. Expect to hear from us within 48 hours!</p>
                  <button onClick={() => setIsSuccess(false)}
                    className="mt-8 px-6 py-3 rounded-xl border text-sm font-semibold transition-all"
                    style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                    Submit Another Application
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="flex flex-col gap-5">
                  {[
                    { label: <><User className="w-3.5 h-3.5 text-violet-400" /> Full Name</>, name: "name", type: "text", placeholder: "John Doe" },
                    { label: <><Mail className="w-3.5 h-3.5 text-violet-400" /> Email ID</>, name: "email", type: "email", placeholder: "you@university.edu" },
                    { label: <><Phone className="w-3.5 h-3.5 text-violet-400" /> Mobile Number</>, name: "mobile", type: "tel", placeholder: "+91 98765 43210" },
                  ].map(f => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.placeholder}
                        value={formData[f.name as keyof typeof formData]} onChange={handleChange}
                        className={inputClass} style={inputStyle} required />
                    </div>
                  ))}
                  {[
                    { label: <><Code className="w-3.5 h-3.5 text-violet-400" /> Your Skills</>, name: "skills", placeholder: "React, Next.js, Figma, Python…" },
                    { label: <><Link2 className="w-3.5 h-3.5 text-violet-400" /> Project Links & Repos</>, name: "projects", placeholder: "Figma files, live websites, project repos…" },
                  ].map(f => (
                    <div key={f.name} className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                      <textarea name={f.name} rows={3} placeholder={f.placeholder}
                        value={formData[f.name as keyof typeof formData]} onChange={handleChange}
                        className={`${inputClass} resize-none`} style={inputStyle} required />
                    </div>
                  ))}
                  {error && (
                    <p className="text-xs font-semibold px-4 py-3 rounded-xl border" style={{ color: "#f87171", background: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.2)" }}>
                      ⚠ {error}
                    </p>
                  )}
                  <button type="submit" disabled={isSubmitting}
                    className="group relative w-full mt-2 py-4 rounded-2xl font-bold text-white text-sm overflow-hidden bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:scale-100">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <><div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />Submitting…</>
                      ) : (
                        <>Submit Application <Send className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" /></>
                      )}
                    </span>
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
