"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, ChevronRight, Phone, Mail, Lock } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/careers", label: "Careers (Join Us)" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  const { settings } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) { setError("Please enter a valid email."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Invalid email format."); return; }
    const subs = JSON.parse(localStorage.getItem("newsletter_subscribers") || "[]");
    subs.push(email);
    localStorage.setItem("newsletter_subscribers", JSON.stringify(subs));
    setIsSubscribed(true);
    setEmail("");
    setError("");
  };

  return (
    <footer className="w-full border-t relative z-10" style={{ background: "var(--footer-bg)", borderColor: "var(--border-subtle)" }}>
      {/* Top gradient line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group w-fit select-none">
              <img src="/logo.png" alt="VT Logo" className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="text-lg sm:text-xl font-black tracking-wider" style={{ color: "var(--text-primary)" }}>
                  VIYORA
                </span>
                <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-violet-500 uppercase">
                  TECHNOLOGIES
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mt-1" style={{ color: "var(--text-secondary)" }}>
              A student-led tech studio crafting premium websites, mobile apps, and AI integrations.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {/* WhatsApp */}
              <a
                href="https://wa.me/919344438685"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all hover:border-emerald-500/50 hover:text-emerald-500"
                style={{ background: "rgba(16,185,129,0.1)", borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
                title="Chat on WhatsApp"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.5-5.729-1.45L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.967C16.48 2.023 14.004.992 11.381.992c-5.441 0-9.87 4.373-9.874 9.8.001 2.062.541 4.072 1.567 5.863l-.993 3.626 3.708-.971.268.158zm12.188-6.113c-.329-.165-1.952-.963-2.253-1.073-.3-.11-.52-.165-.74.165-.22.33-.85 1.073-1.04 1.293-.19.22-.38.242-.71.077-.33-.165-1.393-.513-2.653-1.637-.98-.874-1.643-1.953-1.835-2.283-.19-.33-.02-.508.145-.672.15-.148.33-.385.495-.578.165-.192.22-.33.33-.55.11-.22.055-.413-.027-.578-.083-.165-.74-1.788-1.013-2.453-.267-.643-.56-.557-.74-.566-.17-.008-.37-.01-.57-.01-.2 0-.52.075-.79.37-.27.295-1.04 1.018-1.04 2.484 0 1.466 1.07 2.883 1.22 3.08.15.198 2.106 3.215 5.102 4.507.712.308 1.27.492 1.704.63.716.227 1.368.195 1.884.118.575-.085 1.952-.797 2.227-1.566.275-.77.275-1.43.193-1.566-.083-.138-.3-.22-.63-.385z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/viyoratechnologies?igsh=MW43OXd3YXlrYm9yaQ=="
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border transition-all hover:border-pink-500/50 hover:text-pink-500"
                style={{ background: "rgba(236,72,153,0.1)", borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}
                title="Follow on Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>Navigation</h4>
            <ul className="flex flex-col gap-3.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group text-sm hover:text-violet-500 transition-colors flex items-center gap-1.5" style={{ color: "var(--text-secondary)" }}
                  >
                    <ChevronRight className="w-3.5 h-3.5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200 text-violet-500" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>Contact</h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-4 h-4 text-violet-400" />
                </div>
                <a href={`mailto:${settings.email}`} className="text-sm text-slate-400 hover:text-violet-300 transition-colors break-all">
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-4 h-4 text-blue-400" />
                </div>
                <a href={`tel:${settings.phone}`} className="text-sm text-slate-400 hover:text-blue-300 transition-colors">
                  {settings.phone}
                </a>
              </li>
              <li className="pt-2 mt-1 border-t border-slate-800">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-violet-400 transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-muted)" }}>Updates</h4>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
              Get notified about our latest projects and open-source releases.
            </p>
            {isSubscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
                ✓ You're subscribed! Thanks for joining.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
                <div className="relative flex items-center">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-violet-500/50 transition-all"
                    style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 w-8 h-8 rounded-lg bg-gradient-to-r from-violet-600 to-blue-600
                      flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
                  >
                    <Send className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
                {error && <span className="text-xs text-red-400 pl-1">{error}</span>}
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t mt-14 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderColor: "var(--border-subtle)" }}>
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            © {new Date().getFullYear()} Viyora Technologies. Built with ❤️ by passionate developers.
          </p>
          <div className="flex items-center gap-5">
            <span className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-xs text-slate-600 hover:text-slate-400 transition-colors cursor-pointer">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
