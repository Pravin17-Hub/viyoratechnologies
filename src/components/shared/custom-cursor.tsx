"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Motion values for smooth hardware-accelerated coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);

  // Springs for smooth trailing lag effect
  const cursorXSpring = useSpring(cursorX, { damping: 40, stiffness: 400, mass: 0.4 });
  const cursorYSpring = useSpring(cursorY, { damping: 40, stiffness: 400, mass: 0.4 });

  const ringXSpring = useSpring(ringX, { damping: 30, stiffness: 180, mass: 0.8 });
  const ringYSpring = useSpring(ringY, { damping: 30, stiffness: 180, mass: 0.8 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      
      // Center inner dot
      cursorX.set(e.clientX - 3);
      cursorY.set(e.clientY - 3);

      // Center outer ring (32px / 2 = 16)
      ringX.set(e.clientX - 16);
      ringY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button";
      
      setHovered(!!isClickable);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, ringX, ringY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Dynamic Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[9999] bg-brand-gold mix-blend-difference hidden sm:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: hovered ? 1.5 : 1,
        }}
      />
      {/* Dynamic Outer Ring with Glowing Fluid Physics */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[9998] hidden sm:block"
        style={{
          x: ringXSpring,
          y: ringYSpring,
          scale: hovered ? 1.6 : 1,
          backgroundColor: hovered ? "rgba(255, 199, 44, 0.08)" : "rgba(255, 199, 44, 0.02)",
          borderColor: hovered ? "rgba(255, 199, 44, 0.8)" : "rgba(255, 199, 44, 0.3)",
          boxShadow: hovered ? "0 0 15px rgba(255, 199, 44, 0.4)" : "none",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      />
    </>
  );
}
