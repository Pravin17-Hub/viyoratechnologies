"use client";

import React from "react";
import { motion } from "framer-motion";

interface RevealProps {
  children: React.ReactNode;
  width?: "w-full" | "w-fit" | "";
  delay?: number;
}

export function Reveal({ children, width = "w-full", delay = 0 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 0.65, delay, ease: [0.215, 0.61, 0.355, 1] }}
      className={width}
    >
      {children}
    </motion.div>
  );
}
