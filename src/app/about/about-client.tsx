"use client";

import React from "react";
import { motion } from "framer-motion";
import { Timeline } from "@/components/custom/timeline";
import { Target, Eye, Users, Laptop, Sparkles, Heart, ArrowRight } from "lucide-react";
import { PageWrapper } from "@/components/shared/page-wrapper";
import Link from "next/link";

const coreValues = [
  { title: "Passion for Tech",       description: "We live and breathe frontend, backend, and AI. Building is what we love.",                               icon: <Sparkles className="w-6 h-6" />, color: "#8b5cf6" },
  { title: "Rapid Prototyping",      description: "From idea to MVP in weeks, not months. Speed is our superpower.",                                        icon: <Laptop className="w-6 h-6" />,   color: "#3b82f6" },
  { title: "Peer Collaboration",     description: "Tight-knit teams, dynamic pair programming, and shared design vision.",                                  icon: <Users className="w-6 h-6" />,    color: "#06b6d4" },
  { title: "Continuous Growth",      description: "We share knowledge, write OSS, and help each other level up.",                                           icon: <Heart className="w-6 h-6" />,    color: "#ec4899" },
];

export default function AboutPage() {
  return (
    <PageWrapper>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: `rgba(139,92,246,var(--orb-opacity))` }} />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: `rgba(59,130,246,calc(var(--orb-opacity)*0.7))` }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border backdrop-blur-md text-xs font-bold tracking-wider"
              style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
              About Our Studio
            </span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight mt-8 leading-[1.05]" style={{ color: "var(--text-primary)" }}>
            Our Story & <span className="text-shimmer">Vision</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="text-lg mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            A group of college students pushing the boundaries of web development, AI integration, and modern design — one project at a time.
          </motion.p>
        </div>
      </section>

      {/* ══ MISSION & VISION ══ */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex flex-col gap-5">
              {[
                { icon: <Target className="w-5 h-5" />, color: "#8b5cf6", title: "Our Mission", text: "To design and develop clean, high-performance digital products while giving students real engineering experience that no classroom can provide." },
                { icon: <Eye className="w-5 h-5" />,    color: "#06b6d4", title: "Our Vision",  text: "To become an elite student-led studio known globally for delivering industry-grade visual design and engineering quality — without the corporate price tag." },
              ].map(item => (
                <div key={item.title} className="group p-7 rounded-3xl border overflow-hidden relative transition-all duration-400"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                  <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, transparent, ${item.color}60, transparent)` }} />
                  <div className="flex items-start gap-5">
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 border border-white/10"
                      style={{ background: `${item.color}15`, color: item.color }}>{item.icon}</div>
                    <div>
                      <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
              className="flex flex-col gap-6 p-8 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
              <p className="text-violet-500 text-xs font-bold uppercase tracking-widest">Our Background</p>
              <h3 className="text-3xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>
                From dorm rooms to <span className="text-shimmer">production deployments</span>
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                Viyora Technologies started in a college dorm room in 2025. We realized that theory was only half the journey — the real magic happens when you build actual products for actual people.
              </p>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                We specialize in sleek responsive websites, multi-device landing pages, SaaS MVPs, and AI-powered workflows. Everything ships with high visual standards, smooth transitions, and clean code.
              </p>
              <Link href="/contact">
                <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                  Work With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══ CORE VALUES ══ */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">Core Principles</p>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "var(--text-primary)" }}>Values That <span className="text-shimmer">Drive Us</span></h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {coreValues.map((val, i) => (
              <motion.div key={val.title}
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.12, type: "spring" }} whileHover={{ y: -8, scale: 1.02 }}
                className="group p-7 rounded-3xl border overflow-hidden relative cursor-default transition-all duration-400"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${val.color}30`; (e.currentTarget as HTMLElement).style.borderColor = `${val.color}30`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                <div className="absolute top-0 left-0 w-full h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to right, transparent, ${val.color}80, transparent)` }} />
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 border border-white/10"
                  style={{ background: `${val.color}15`, color: val.color }}>{val.icon}</div>
                <h3 className="text-lg font-bold mb-3" style={{ color: "var(--text-primary)" }}>{val.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{val.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TIMELINE ══ */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">Our Journey</p>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "var(--text-primary)" }}>How We <span className="text-shimmer">Got Here</span></h2>
          </motion.div>
          <Timeline />
        </div>
      </section>

      {/* ══ TEAM ══ */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] pointer-events-none"
          style={{ background: `rgba(59,130,246,calc(var(--orb-opacity)*0.5))` }} />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">Our Team</p>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "var(--text-primary)" }}>Who We <span className="text-shimmer">Are</span></h2>
          </motion.div>
          <div className="max-w-3xl mx-auto text-center" style={{ color: "var(--text-secondary)" }}>
            <p className="text-base leading-relaxed mb-6">
              We are a close-knit collective of college student builders, designers, and AI hobbyists. By combining our academic learning with real-world product development, we design and build premium web applications, SaaS MVPs, and automated workflows.
            </p>
            <p className="text-base leading-relaxed">
              Every member of our team is a skilled builder who values aesthetics, clean code, and rapid delivery. Rather than working under rigid corporate structures, we operate as a flat, highly collaborative studio to turn ambitious ideas into reality.
            </p>
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 relative z-10 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow" style={{ background: `rgba(139,92,246,var(--orb-opacity))` }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, type: "spring" }}>
            <h3 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>Let's Collaborate</h3>
            <p className="text-base mb-10" style={{ color: "var(--text-secondary)" }}>Whether you're a startup, a local org, or a student wanting to join — we'd love to connect.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/contact">
                <button className="group px-8 py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-violet-600 to-blue-600 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all duration-300">
                  <span className="flex items-center gap-2">Get In Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </Link>
              <Link href="/careers">
                <button className="px-8 py-4 rounded-2xl font-bold text-sm border hover:border-violet-500/40 active:scale-95 transition-all duration-300"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                  Join Our Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
