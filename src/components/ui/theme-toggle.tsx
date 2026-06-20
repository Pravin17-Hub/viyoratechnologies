"use client";

import React from "react";
import { useTheme } from "@/context/theme-context";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border border-slate-700 bg-slate-800/60 backdrop-blur-md hover:bg-slate-800 hover:border-violet-500/40 transition-all duration-200 cursor-pointer select-none focus:outline-none"
      aria-label="Toggle Theme"
    >
      <div className="w-5 h-5 flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {theme === "dark" ? (
            <motion.div
              key="sun"
              initial={{ y: 25, rotate: 45, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -25, rotate: -45, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: 25, rotate: 45, opacity: 0 }}
              animate={{ y: 0, rotate: 0, opacity: 1 }}
              exit={{ y: -25, rotate: -45, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </button>
  );
}
