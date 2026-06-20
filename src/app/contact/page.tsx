"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { Reveal } from "@/components/shared/reveal";
import { useTheme } from "@/context/theme-context";
import { Mail, Phone, ChevronDown, CheckCircle, ArrowRight, Clock, MessageSquare, Sparkles } from "lucide-react";

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b py-5 last:border-b-0" style={{ borderColor: "var(--border-subtle)" }}>
      <button onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-left text-sm font-bold transition-colors focus:outline-none"
        style={{ color: "var(--text-primary)" }}>
        <span>{question}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 ml-4 flex-shrink-0" style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }} className="overflow-hidden">
            <p className="text-sm leading-relaxed pt-3 pb-1" style={{ color: "var(--text-secondary)" }}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqs = [
  { question: "Who runs Viyora Technologies?",        answer: "We are a passionate team of college students and developers who design, build, and ship modern software, web apps, and AI integrations." },
  { question: "What kind of projects do you build?", answer: "From portfolio websites and business pages to complex SaaS MVPs, mobile apps, and AI agent workflows." },
  { question: "How do you handle pricing?",        answer: "Since we're student-led, our pricing is competitive and friendly to early startups and small businesses. Contact us for a custom quote." },
  { question: "How can I join the team?",          answer: "If you're a college student with dev, design, or writing skills — head to our Careers page and submit your project links!" },
];

export default function ContactPage() {
  const { settings } = useTheme();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim())    errs.name    = "Full name is required.";
    if (!form.email.trim())   errs.email   = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email address.";
    if (!form.subject.trim()) errs.subject = "Subject is required.";
    if (!form.message.trim()) errs.message = "Message is required.";
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    const msgs = JSON.parse(localStorage.getItem("contact_messages") || "[]");
    msgs.push({ id: Date.now().toString(), ...form, createdAt: new Date().toISOString() });
    localStorage.setItem("contact_messages", JSON.stringify(msgs));
    setSubmitted(true); setErrors({});
  };

  const handleChange = (field: string, val: string) => {
    setForm(p => ({ ...p, [field]: val }));
    if (errors[field]) setErrors(p => { const n = { ...p }; delete n[field]; return n; });
  };

  const inputBase = `w-full rounded-2xl py-3.5 px-4 text-sm border focus:outline-none input-glow transition-all duration-300`;
  const inputStyle = (field: string) => ({
    background: "var(--input-bg)",
    borderColor: errors[field] ? "rgba(239,68,68,0.5)" : "var(--input-border)",
    color: "var(--text-primary)",
  });

  return (
    <PageWrapper>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[400px] rounded-full blur-[140px]" style={{ background: `rgba(59,130,246,var(--orb-opacity))` }} />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: `rgba(139,92,246,calc(var(--orb-opacity)*0.7))` }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider"
            style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
            <MessageSquare className="w-3.5 h-3.5" />Get In Touch
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight mt-8 leading-[1.05]" style={{ color: "var(--text-primary)" }}>
            Let's Start a <span className="text-shimmer">Project</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg mt-6 max-w-xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Have an idea? Reach out and we'll discuss the details and craft a plan together.
          </motion.p>
        </div>
      </section>

      {/* ══ FORM + INFO ══ */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Form */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form key="form" onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="p-8 rounded-3xl border shadow-xl flex flex-col gap-5"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                    <h3 className="text-xl font-black mb-2" style={{ color: "var(--text-primary)" }}>Send a Message</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        { field: "name",  label: "Full Name",      type: "text",  placeholder: "Your name" },
                        { field: "email", label: "Email Address",  type: "email", placeholder: "you@email.com" },
                      ].map(({ field, label, type, placeholder }) => (
                        <div key={field} className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>{label}</label>
                          <input type={type} placeholder={placeholder} value={form[field as keyof typeof form]}
                            onChange={e => handleChange(field, e.target.value)}
                            className={inputBase} style={inputStyle(field)} />
                          {errors[field] && <span className="text-xs text-red-400">{errors[field]}</span>}
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Subject</label>
                      <input type="text" placeholder="e.g. Website development request" value={form.subject}
                        onChange={e => handleChange("subject", e.target.value)}
                        className={inputBase} style={inputStyle("subject")} />
                      {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Message / Requirements</label>
                      <textarea rows={5} placeholder="Tell us about your project, timeline, and features…" value={form.message}
                        onChange={e => handleChange("message", e.target.value)}
                        className={`${inputBase} resize-none`} style={inputStyle("message")} />
                      {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                    </div>
                    <button type="submit"
                      className="group mt-2 py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-95 transition-all duration-300">
                      <span className="flex items-center justify-center gap-2">
                        Send Message <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </motion.form>
                ) : (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    className="p-10 rounded-3xl border flex flex-col items-center text-center py-20"
                    style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 180, damping: 12 }}>
                      <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)" }}>
                        <CheckCircle className="w-10 h-10 text-emerald-500" />
                      </div>
                    </motion.div>
                    <h3 className="text-3xl font-black mb-3" style={{ color: "var(--text-primary)" }}>Message Sent! 🎉</h3>
                    <p className="text-sm max-w-sm mb-8" style={{ color: "var(--text-secondary)" }}>
                      Thanks, <span className="font-bold">{form.name || "friend"}</span>! We'll get back to you within 24 hours.
                    </p>
                    <button onClick={() => setSubmitted(false)}
                      className="px-6 py-3 rounded-xl border text-sm font-semibold transition-all"
                      style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-5 flex flex-col gap-5">
              <Reveal>
                <div className="p-6 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                  <h3 className="text-lg font-bold mb-5 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Sparkles className="w-5 h-5 text-violet-400" />Direct Contact
                  </h3>
                  <div className="flex flex-col gap-5">
                    {[
                      { icon: <Mail className="w-5 h-5" />, label: "Email Address",  value: settings.email, href: `mailto:${settings.email}`, color: "#8b5cf6" },
                      { icon: <Phone className="w-5 h-5" />, label: "Phone / Mobile", value: settings.phone, href: `tel:${settings.phone}`,    color: "#06b6d4" },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10"
                          style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider block" style={{ color: "var(--text-muted)" }}>{item.label}</span>
                          <a href={item.href} className="text-sm font-semibold hover:text-violet-500 transition-colors break-all" style={{ color: "var(--text-primary)" }}>
                            {item.value}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="p-6 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                  <h3 className="text-lg font-bold mb-3 flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <Clock className="w-5 h-5 text-blue-400" />Response Times
                  </h3>
                  <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                    <p><span className="font-bold" style={{ color: "var(--text-primary)" }}>Weekdays:</span> 24–48 hours (we have classes! 📚)</p>
                    <p><span className="font-bold" style={{ color: "var(--text-primary)" }}>Weekends:</span> Usually within a few hours (we are free! 🚀)</p>
                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Weekends are our most active development times.</p>
                  </div>
                </div>
              </Reveal>
              <Reveal>
                <div className="p-5 rounded-2xl border" style={{ borderColor: "rgba(139,92,246,0.2)", background: "rgba(139,92,246,0.05)" }}>
                  <p className="text-sm font-semibold text-violet-500">💡 Pro tip</p>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>
                    Include your timeline, rough budget, and reference websites — we'll come to the first call fully prepared.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FAQ ══ */}
      <section className="py-20 relative z-10 max-w-3xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl font-black" style={{ color: "var(--text-primary)" }}>Common Questions</h2>
        </motion.div>
        <Reveal>
          <div className="rounded-3xl border p-6 sm:p-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
            {faqs.map(faq => <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />)}
          </div>
        </Reveal>
      </section>
    </PageWrapper>
  );
}
