"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Brain, Globe, Compass, Code, Sparkles, Zap } from "lucide-react";
import { servicesData } from "@/lib/data";
import { PageWrapper } from "@/components/shared/page-wrapper";
import { useTheme } from "@/context/theme-context";
import { GoogleFlow } from "@/components/custom/google-flow";

function CountUp({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let frame = 0; const total = 90;
    const timer = setInterval(() => {
      frame++; setCount(Math.round((frame / total) * end));
      if (frame >= total) { setCount(end); clearInterval(timer); }
    }, 16);
    return () => clearInterval(timer);
  }, [started, end]);
  return <span ref={ref}>{count}{suffix}</span>;
}

function Typewriter({ words }: { words: string[] }) {
  const [idx, setIdx] = useState(0);
  const [display, setDisplay] = useState("");
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const word = words[idx % words.length];
    const speed = deleting ? 40 : 80;
    const timer = setTimeout(() => {
      if (!deleting && display === word) setTimeout(() => setDeleting(true), 1800);
      else if (deleting && display === "") { setDeleting(false); setIdx(i => i + 1); }
      else setDisplay(deleting ? word.slice(0, display.length - 1) : word.slice(0, display.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [display, deleting, idx, words]);
  return (
    <span className="animated-gradient-text">
      {display}<span className="typing-cursor text-amber-500 ml-0.5">|</span>
    </span>
  );
}

export default function HomePage() {
  const { settings, projects } = useTheme();

  const typewriterWords = ["Bespoke Designs", "SaaS Products", "Tailored Web Apps", "Brand Portfolios", "Creative Studios"];

  const serviceColors = [
    { from: "#fbbf24", to: "#d97706", glow: "rgba(251,191,36,0.15)" },
    { from: "#701a75", to: "#d97706", glow: "rgba(112,26,117,0.15)" },
    { from: "#fbbf24", to: "#701a75", glow: "rgba(251,191,36,0.12)" },
  ];
  const icons = {
    Brain: <Brain className="w-7 h-7" />, Globe: <Globe className="w-7 h-7" />, Compass: <Compass className="w-7 h-7" />,
  };
  const stats = [
    { end: 15,  suffix: "+",   label: "Projects Crafted",       icon: "✨" },
    { end: 60,  suffix: "k+",  label: "Lines of Code",        icon: "💻" },
    { end: 100, suffix: "%",   label: "Client Delight",       icon: "🏆" },
  ];

  return (
    <PageWrapper>
      {/* ══ HERO ══ */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center overflow-hidden hero-grid">
        {/* Google Flow vector gradient background */}
        <GoogleFlow />

        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[15%] left-[8%] w-[500px] h-[500px] rounded-full blur-[120px] animate-mesh-1" style={{ background: `rgba(217,119,6,var(--orb-opacity))` }} />
          <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full blur-[120px] animate-mesh-2" style={{ background: `rgba(112,26,117,var(--orb-opacity))` }} />
        </div>
        {/* Rings */}
        <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-[600px] h-[600px] rounded-full animate-spin-slow" style={{ border: "1px solid rgba(217,119,6,0.06)" }} />
          <div className="absolute w-[800px] h-[800px] rounded-full animate-spin-reverse" style={{ border: "1px solid rgba(112,26,117,0.04)" }} />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center pt-24 pb-12 md:pt-32 md:pb-20">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: -20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-10 border backdrop-blur-md text-xs font-bold tracking-wider"
            style={{ borderColor: "rgba(217,119,6,0.3)", background: "rgba(217,119,6,0.1)", color: "#fbbf24" }}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse-glow-fast" />
            {settings.announcement}
            <Sparkles className="w-3.5 h-3.5 animate-pulse-glow-fast delay-300" />
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight leading-[1.05] max-w-5xl" style={{ color: "var(--text-primary)" }}>
            Aesthetic Code &<br />
            <span className="relative inline-block">Premium<span className="absolute -inset-1 bg-amber-500/10 blur-2xl rounded-2xl" /></span>{" "}
            <Typewriter words={typewriterWords} />
          </motion.h1>

          {/* Sub */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 text-lg sm:text-xl max-w-2xl leading-relaxed font-medium" style={{ color: "var(--text-secondary)" }}>
            A boutique digital studio blending high-end visual design with advanced engineering to craft{" "}
            <span className="text-amber-400 font-semibold font-display">premium digital assets</span>.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 mt-12">
            <Link href="/contact">
              <button className="group relative px-8 py-4 rounded-2xl font-bold text-black text-sm overflow-hidden bg-gradient-to-r from-yellow-500 to-amber-500 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                <span className="relative z-10 flex items-center gap-2">Craft With Us <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 to-yellow-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>
            </Link>
            <Link href="/services">
              <button className="group px-8 py-4 rounded-2xl font-bold text-sm border backdrop-blur-sm hover:scale-105 active:scale-95 transition-all duration-300"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "rgba(217,119,6,0.05)" }}>
                <span className="flex items-center gap-2 hover:text-amber-400">View Services <Zap className="w-4 h-4 text-amber-400" /></span>
              </button>
            </Link>
          </motion.div>

          {/* Centered Stats Boxes */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-10 md:mt-16 w-full max-w-4xl px-2 sm:px-0"
          >
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className="relative group p-3 sm:p-5 md:p-6 rounded-2xl md:rounded-3xl border overflow-hidden flex flex-col items-center text-center w-full transition-all duration-300 hover:border-amber-500/30"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-1 sm:mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-3xl md:text-4xl font-black text-shimmer">
                  <CountUp end={stat.end} suffix={stat.suffix} />
                </div>
                <div className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest mt-1 sm:mt-2" style={{ color: "var(--text-muted)" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ══ Featured Projects Showcase ══ */}
      <section className="py-20 md:py-32 relative z-10 overflow-hidden border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none" style={{ background: `rgba(217,119,6,calc(var(--orb-opacity)*0.15))` }} />
        
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center mb-16 md:mb-24">
            <p className="text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3">Our Creations</p>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>Featured <span className="text-shimmer">Projects</span></h2>
          </motion.div>

          <div className="flex flex-col gap-20 md:gap-32">
            {projects.map((project, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className={`flex flex-col lg:flex-row gap-8 lg:gap-16 items-center ${isEven ? "" : "lg:flex-row-reverse"}`}
                >
                  {/* Project Info */}
                  <div className="w-full lg:w-1/2 flex flex-col items-start">
                    <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 mb-3 px-3 py-1 rounded-full border border-amber-500/20 bg-amber-500/5">
                      {project.category}
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-black mb-4 leading-tight" style={{ color: "var(--text-primary)" }}>
                      {project.title}
                    </h3>
                    <p className="text-sm sm:text-base leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                      {project.techUsed.map((tech) => (
                        <span key={tech} className="text-[10px] px-3 py-1 rounded-full border font-semibold"
                          style={{ borderColor: "var(--border-subtle)", background: "rgba(251,191,36,0.03)", color: "var(--text-secondary)" }}>
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm border hover:bg-amber-500 hover:text-black transition-all duration-300"
                      style={{ borderColor: "rgba(217,119,6,0.3)", color: "var(--text-primary)" }}
                    >
                      Visit Live Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>

                  {/* Project Visual / Screenshot */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      whileHover={{ scale: 1.025 }}
                      transition={{ duration: 0.4 }}
                      className="relative overflow-hidden rounded-3xl border shadow-2xl group cursor-pointer"
                      style={{ borderColor: "var(--border-card)", background: "rgba(20,10,30,0.5)" }}
                    >
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-auto object-cover max-h-[350px] sm:max-h-[400px] transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <div className="aspect-video w-full flex items-center justify-center bg-gradient-to-br from-amber-950/40 via-purple-950/20 to-black p-8">
                          <Code className="w-16 h-16 text-amber-500/30" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white text-xs font-bold uppercase tracking-wider">Explore Live ↗</span>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ══ */}
      <section className="py-12 md:py-24 relative z-10 overflow-hidden border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none" style={{ background: `rgba(217,119,6,calc(var(--orb-opacity)*0.15))` }} />
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-16">
            <div>
              <p className="text-amber-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 sm:mb-3">Capabilities</p>
              <h2 className="text-3xl sm:text-5xl font-black leading-tight" style={{ color: "var(--text-primary)" }}>What We <span className="text-shimmer">Build</span></h2>
            </div>
            <Link href="/services">
              <button className="mt-6 md:mt-0 group flex items-center gap-2 px-5 py-2.5 rounded-xl border text-sm font-semibold hover:text-amber-400 transition-all"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesData.map((service, idx) => {
              const color = serviceColors[idx % serviceColors.length];
              const icon = icons[service.icon as keyof typeof icons] || <Code className="w-7 h-7" />;
              return (
                <motion.div key={service.id}
                  initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.6, type: "spring" }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative p-6 sm:p-8 rounded-3xl border overflow-hidden cursor-default transition-all duration-400"
                  style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px ${color.glow}`; (e.currentTarget as HTMLElement).style.borderColor = `${color.from}30`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = "none"; (e.currentTarget as HTMLElement).style.borderColor = ""; }}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(to right, ${color.from}, ${color.to})` }} />
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-white/10"
                    style={{ background: `${color.from}15`, color: color.from }}>{icon}</div>
                  <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{service.title}</h3>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-secondary)" }}>{service.shortDesc}</p>
                  <ul className="flex flex-col gap-2.5">
                    {service.features.slice(0, 3).map(f => (
                      <li key={f} className="flex items-center gap-2.5 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: color.from }} />{f}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══ CTA ══ */}
      <section className="py-28 relative z-10 overflow-hidden border-t" style={{ borderColor: "var(--border-subtle)" }}>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full blur-[150px] animate-pulse-glow" style={{ background: `rgba(217,119,6,var(--orb-opacity))` }} />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, type: "spring" }}>
            <p className="text-amber-500 text-xs font-bold uppercase tracking-widest mb-6">Start a Project</p>
            <h2 className="text-5xl sm:text-6xl font-black leading-tight mb-6" style={{ color: "var(--text-primary)" }}>
              Got an Idea?<br /><span className="text-shimmer">Let's Build It.</span>
            </h2>
            <p className="text-lg mb-10 max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
              We collaborate with startups, local businesses, and organizations to ship modern digital solutions fast.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <button className="group px-10 py-4 rounded-2xl font-bold text-black text-sm bg-gradient-to-r from-yellow-500 to-amber-500 shadow-xl shadow-amber-500/20 hover:shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all duration-300">
                  <span className="flex items-center gap-2">Start a Conversation <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
                </button>
              </Link>
              <Link href="/about">
                <button className="px-10 py-4 rounded-2xl font-bold text-sm border hover:border-amber-500/40 active:scale-95 transition-all duration-300"
                  style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                  Meet the Team
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  );
}
