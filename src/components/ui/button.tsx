"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onAnimationStart" | "onDrag" | "onDragStart" | "onDragEnd"> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
  glow?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  glow = false,
  icon,
  iconPosition = "right",
  className,
  children,
  ...props
}: ButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

  const handlePointerDown = (event: React.PointerEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setRipples((prev) => [...prev, { id: Date.now(), x, y }]);
  };

  const cleanRipple = (id: number) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  };

  // Base styles
  const baseStyles = "relative overflow-hidden inline-flex items-center justify-center font-semibold tracking-wide rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

  // Size styles
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base"
  };

  // Variant styles
  const variantStyles = {
    primary: "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25",
    secondary: "bg-white/10 hover:bg-white/15 dark:bg-white/5 dark:hover:bg-white/10 border border-white/20 dark:border-white/10 text-slate-800 dark:text-white backdrop-blur-md",
    outline: "bg-transparent border-2 border-indigo-600 dark:border-indigo-400 hover:bg-indigo-600/10 text-indigo-700 dark:text-indigo-300",
    ghost: "bg-transparent hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-200",
    link: "bg-transparent hover:underline text-indigo-600 dark:text-indigo-400 p-0"
  };

  return (
    <motion.button
      ref={buttonRef}
      onPointerDown={handlePointerDown}
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        baseStyles,
        sizeStyles[size],
        variantStyles[variant],
        glow && variant === "primary" && "shadow-lg shadow-purple-500/30 dark:shadow-cyan-400/20 after:absolute after:inset-0 after:rounded-full after:opacity-0 hover:after:opacity-100 after:transition-opacity after:duration-500 after:shadow-[0_0_20px_8px_rgba(139,92,246,0.3)]",
        className
      )}
      {...props}
    >
      {/* Ripple particles container */}
      <span className="absolute inset-0 pointer-events-none z-0">
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onAnimationComplete={() => cleanRipple(ripple.id)}
            style={{
              position: "absolute",
              top: ripple.y,
              left: ripple.x,
              transform: "translate(-50%, -50%)",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.4)",
              pointerEvents: "none"
            }}
          />
        ))}
      </span>

      {/* Button content layout */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && iconPosition === "left" && (
          <span className="flex-shrink-0 transition-transform duration-300 group-hover:-translate-x-0.5">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="flex-shrink-0 transition-transform duration-300 group-hover:translate-x-0.5">{icon}</span>
        )}
      </span>
    </motion.button>
  );
}
