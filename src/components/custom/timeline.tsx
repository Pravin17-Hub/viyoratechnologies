"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { timelineMilestones } from "@/lib/data";
import { Award, Zap, Shield, TrendingUp } from "lucide-react";

const milestoneIcons = [
  <Zap className="w-8 h-8 text-indigo-500" />,
  <Award className="w-8 h-8 text-purple-500" />,
  <TrendingUp className="w-8 h-8 text-blue-500" />,
  <Shield className="w-8 h-8 text-cyan-500" />
];

export function Timeline() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-10 w-full max-w-4xl mx-auto py-8">
      {/* Horizontal Line with Nodes */}
      <div className="relative flex items-center justify-between px-6 sm:px-12 w-full">
        {/* Background connector line */}
        <div className="absolute left-[10%] right-[10%] h-[3px] z-0" style={{ background: "var(--border-subtle)" }} />
        
        {/* Active connector progress line */}
        <motion.div
          className="absolute left-[10%] h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 z-0"
          initial={{ width: "0%" }}
          animate={{ width: `${(activeIndex / (timelineMilestones.length - 1)) * 80}%` }}
          transition={{ duration: 0.4 }}
        />

        {timelineMilestones.map((milestone, idx) => {
          const isActive = idx === activeIndex;
          const isCompleted = idx < activeIndex;

          return (
            <div key={milestone.year} className="relative z-10 flex flex-col items-center">
              <motion.button
                onClick={() => setActiveIndex(idx)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-sm border-2 transition-all duration-300 cursor-pointer focus:outline-none"
                style={{
                  background: isActive
                    ? "var(--text-primary)"
                    : isCompleted
                    ? "linear-gradient(to right, #3b82f6, #8b5cf6)"
                    : "var(--bg-card)",
                  color: isActive
                    ? "var(--bg-base)"
                    : isCompleted
                    ? "#ffffff"
                    : "var(--text-muted)",
                  borderColor: isActive
                    ? "#8b5cf6"
                    : isCompleted
                    ? "transparent"
                    : "var(--border-subtle)",
                  boxShadow: isActive
                    ? "0 10px 15px -3px rgba(139, 92, 246, 0.35)"
                    : "none"
                }}
              >
                {milestone.year}
              </motion.button>
            </div>
          );
        })}
      </div>

      {/* Details Card */}
      <div className="min-h-[220px] relative flex justify-center items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full rounded-3xl border backdrop-blur-md p-8 shadow-xl flex flex-col sm:flex-row items-center sm:items-start gap-6"
            style={{
              background: "var(--bg-card)",
              borderColor: "var(--border-card)"
            }}
          >
            {/* Visual Icon Node */}
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 dark:bg-indigo-500/5 flex items-center justify-center flex-shrink-0 border border-indigo-500/20">
              {milestoneIcons[activeIndex] || <Zap className="w-8 h-8 text-indigo-500" />}
            </div>

            {/* Content Node */}
            <div className="flex-1 text-center sm:text-left">
              <span className="text-xs uppercase tracking-widest font-extrabold" style={{ color: "#8b5cf6" }}>
                Milestone Year {timelineMilestones[activeIndex].year}
              </span>
              <h3 className="text-2xl font-black mt-2" style={{ color: "var(--text-primary)" }}>
                {timelineMilestones[activeIndex].title}
              </h3>
              <p className="text-sm leading-relaxed mt-3" style={{ color: "var(--text-secondary)" }}>
                {timelineMilestones[activeIndex].description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
