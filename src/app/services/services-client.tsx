"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { servicesData } from "@/lib/data";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { Reveal } from "@/components/shared/reveal";
import { Brain, Globe, Compass, Code, Check, ChevronRight, ArrowRight, Server, Database, Layers, Cpu, Zap } from "lucide-react";
import Link from "next/link";

const serviceColors = [
  { primary: "#8b5cf6", secondary: "#3b82f6", glow: "rgba(139,92,246,0.2)" },
  { primary: "#3b82f6", secondary: "#06b6d4", glow: "rgba(59,130,246,0.2)" },
  { primary: "#06b6d4", secondary: "#8b5cf6", glow: "rgba(6,182,212,0.2)" },
];
const serviceIcons: Record<string, React.ReactNode> = {
  Brain: <Brain className="w-7 h-7" />, Globe: <Globe className="w-7 h-7" />,
  Compass: <Compass className="w-7 h-7" />, Code: <Code className="w-7 h-7" />,
};
const pipelineFlows: Record<string, { name: string; icon: React.ReactNode }[]> = {
  "ai-solutions": [
    { name: "User Prompt",  icon: <Layers className="w-4 h-4" /> },
    { name: "OpenAI API",   icon: <Cpu className="w-4 h-4" /> },
    { name: "Vector DB",    icon: <Database className="w-4 h-4" /> },
    { name: "Output Node",  icon: <Server className="w-4 h-4" /> },
  ],
  "web-dev": [
    { name: "Edge Gateway", icon: <Server className="w-4 h-4" /> },
    { name: "Next.js RSC",  icon: <Cpu className="w-4 h-4" /> },
    { name: "Cache Layer",  icon: <Database className="w-4 h-4" /> },
    { name: "Hydrated UI",  icon: <Layers className="w-4 h-4" /> },
  ],
  "ui-ux-design": [
    { name: "User Flows",   icon: <Layers className="w-4 h-4" /> },
    { name: "Figma Grids",  icon: <Compass className="w-4 h-4" /> },
    { name: "Prototyping",  icon: <Cpu className="w-4 h-4" /> },
    { name: "Hand-off Spec",icon: <Server className="w-4 h-4" /> },
  ],
};
const defaultPipeline = [
  { name: "Concept", icon: <Layers className="w-4 h-4" /> },
  { name: "Build",   icon: <Cpu className="w-4 h-4" /> },
  { name: "Style",   icon: <Server className="w-4 h-4" /> },
  { name: "Deploy",  icon: <Database className="w-4 h-4" /> },
];

export default function ServicesPage() {
  const [activeId, setActiveId] = useState(servicesData[0].id);
  const active = servicesData.find(s => s.id === activeId) || servicesData[0];
  const flow = pipelineFlows[activeId] || defaultPipeline;

  return (
    <PageWrapper>
      {/* ══ HERO ══ */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]" style={{ background: `rgba(59,130,246,var(--orb-opacity))` }} />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: `rgba(139,92,246,calc(var(--orb-opacity)*0.7))` }} />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.span initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-bold tracking-wider"
            style={{ borderColor: "rgba(139,92,246,0.3)", background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
            <Zap className="w-3.5 h-3.5" />What We Do
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-5xl sm:text-7xl font-black tracking-tight mt-8 leading-[1.05]" style={{ color: "var(--text-primary)" }}>
            Our <span className="text-shimmer">Services</span><br />& Capabilities
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
            className="text-lg mt-6 max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Beautiful designs, Next.js development, and AI configurations built to bring your digital ideas to life.
          </motion.p>
        </div>
      </section>

      {/* ══ SERVICE CARDS ══ */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesData.map((service, idx) => {
              const col = serviceColors[idx % serviceColors.length];
              return (
                <motion.div key={service.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.12, type: "spring" }} whileHover={{ y: -8, scale: 1.015 }}
                  className="group relative p-8 rounded-3xl border overflow-hidden cursor-default transition-all duration-400"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${col.glow}`; (e.currentTarget as HTMLElement).style.borderColor = `${col.primary}30`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${col.primary}, ${col.secondary})` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
                    style={{ background: `${col.primary}15`, color: col.primary }}>
                    {serviceIcons[service.icon] || <Code className="w-7 h-7" />}
                  </div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>{service.shortDesc}</p>
                  <p className="text-xs leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>{service.longDesc}</p>
                  <div className="pt-5 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                    <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: "var(--text-muted)" }}>Tools Used</p>
                    <div className="flex flex-wrap gap-2">
                      {service.techStack.map(tech => (
                        <span key={tech} className="text-[10px] px-2.5 py-1 rounded-full border font-semibold"
                          style={{ borderColor: "var(--border-subtle)", background: "var(--bg-surface)", color: "var(--text-secondary)" }}>{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ PIPELINE EXPLORER ══ */}
      <section className="py-24 relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="text-violet-500 text-xs font-bold uppercase tracking-widest mb-3">Interactive Flow</p>
            <h2 className="text-4xl sm:text-5xl font-black" style={{ color: "var(--text-primary)" }}>Project <span className="text-shimmer">Pipelines</span></h2>
          </motion.div>
          <Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Sidebar */}
              <div className="lg:col-span-4 flex flex-col gap-2 p-4 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                {servicesData.map(s => {
                  const isActive = activeId === s.id;
                  return (
                    <button key={s.id} onClick={() => setActiveId(s.id)}
                      className={`w-full flex items-center justify-between text-left px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${isActive ? "text-white" : ""}`}
                      style={isActive
                        ? { background: "linear-gradient(to right, #7c3aed, #2563eb)", color: "white" }
                        : { color: "var(--text-secondary)", background: "transparent" }}>
                      <span className="flex items-center gap-3">
                        <span style={{ color: isActive ? "white" : "var(--text-muted)" }}>{serviceIcons[s.icon]}</span>
                        {s.title}
                      </span>
                      <ChevronRight className={`w-4 h-4 transition-transform ${isActive ? "rotate-90" : ""}`} />
                    </button>
                  );
                })}
              </div>

              {/* Detail panel */}
              <div className="lg:col-span-8">
                <AnimatePresence mode="wait">
                  <motion.div key={activeId} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}
                    className="p-8 rounded-3xl border flex flex-col gap-7" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                    <div>
                      <h3 className="text-2xl font-black mb-2" style={{ color: "var(--text-primary)" }}>{active.title}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{active.longDesc}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Specifications</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {active.features.map(feat => (
                          <div key={feat} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
                            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.2)" }}>
                              <Check className="w-3 h-3 text-emerald-500" />
                            </div>
                            {feat}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-muted)" }}>Data Flow Pipeline</p>
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 rounded-2xl border overflow-x-auto"
                        style={{ background: "var(--bg-surface)", borderColor: "var(--border-subtle)" }}>
                        {flow.map((step, idx) => (
                          <React.Fragment key={step.name}>
                            <div className="flex flex-col items-center gap-2 min-w-max">
                              <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                                style={{ background: "rgba(139,92,246,0.1)", borderColor: "rgba(139,92,246,0.2)", color: "#a78bfa" }}>{step.icon}</div>
                              <span className="text-[10px] font-bold" style={{ color: "var(--text-muted)" }}>{step.name}</span>
                            </div>
                            {idx < flow.length - 1 && <ArrowRight className="w-4 h-4 hidden sm:block flex-shrink-0" style={{ color: "var(--border-subtle)" }} />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                    <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border-subtle)" }}>
                      <span className="text-xs font-medium" style={{ color: "var(--text-muted)" }}>Have a specific project requirement?</span>
                      <Link href="/contact">
                        <button className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                          Discuss Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </Link>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-24 relative z-10 text-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full blur-[130px] animate-pulse-glow" style={{ background: `rgba(59,130,246,var(--orb-opacity))` }} />
        </div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, type: "spring" }}>
            <h3 className="text-4xl sm:text-5xl font-black mb-4" style={{ color: "var(--text-primary)" }}>
              Ready to bring your idea <span className="text-shimmer">to life?</span>
            </h3>
            <p className="mb-10" style={{ color: "var(--text-secondary)" }}>Reach out and let's discuss how we can build it together.</p>
            <Link href="/contact">
              <button className="group px-10 py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-violet-600 to-blue-600 shadow-xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-95 transition-all duration-300">
                <span className="flex items-center gap-2">Start a Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
