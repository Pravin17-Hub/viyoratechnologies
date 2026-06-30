"use client";

import React from "react";
import { motion } from "framer-motion";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.99 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.99 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="flex-grow flex flex-col relative z-10 w-full"
    >
      {children}
    </motion.div>
  );
}
