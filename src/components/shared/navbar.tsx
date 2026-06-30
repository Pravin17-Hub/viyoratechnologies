"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useTheme } from "@/context/theme-context";

const navLinks = [
  { href: "/",        label: "Home" },
  { href: "/about",   label: "About" },
  { href: "/services",label: "Services" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const [scrollProgress, setScrollProgress]       = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen]   = useState(false);
  const [isScrolled, setIsScrolled]               = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) setScrollProgress((window.scrollY / totalScroll) * 100);
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);

  /* Nav link color depends on theme AND scroll state */
  const linkColor = "var(--text-primary)"; 

  const logoTextColor = "var(--text-primary)";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        isScrolled ? "border-b backdrop-blur-xl shadow-sm" : "border-b border-transparent"
      }`}
      style={{
        background: isScrolled ? "var(--navbar-bg)" : "transparent",
        borderColor: isScrolled ? "var(--border-card)" : "transparent",
      }}
    >
      {/* Scroll progress bar */}
      <div
        className="absolute top-0 left-0 h-[2px] z-50 transition-all duration-100"
        style={{
          width: `${scrollProgress}%`,
          background: "#FFC72C",
          boxShadow: "0 0 10px rgba(255, 199, 44, 0.6)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <img src="/logo.png" alt="VT Logo" className="h-9 sm:h-11 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-lg sm:text-xl font-black tracking-wider" style={{ color: logoTextColor }}>
                VIYORA
              </span>
              <span className="text-[10px] sm:text-xs font-extrabold tracking-widest text-yellow-500 uppercase">
                TECHNOLOGIES
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
                  style={{ color: isActive ? "#FFC72C" : linkColor }}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBg"
                      className="absolute inset-0 rounded-xl border border-yellow-500/20"
                      style={{ background: "rgba(255, 199, 44, 0.08)" }}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavDot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-yellow-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3">
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border transition-colors"
              style={{ color: "var(--text-secondary)", borderColor: "var(--border-subtle)", background: "var(--bg-card)" }}
              aria-label="Toggle Menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isMobileMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden border-t backdrop-blur-xl overflow-hidden"
            style={{ background: "var(--navbar-bg)", borderColor: "var(--border-subtle)" }}
          >
            <div className="px-6 py-6 flex flex-col gap-2">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all"
                      style={isActive
                        ? { background: "rgba(255, 199, 44, 0.08)", border: "1px solid rgba(255, 199, 44, 0.15)", color: "#FFC72C" }
                        : { color: "var(--text-secondary)" }}
                    >
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 flex-shrink-0" />}
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
