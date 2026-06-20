import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "outline";
}

export function Badge({ variant = "primary", className, children, ...props }: BadgeProps) {
  const variantStyles = {
    primary: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20",
    secondary: "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20",
    success: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
    outline: "bg-transparent border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border transition-all duration-350 select-none",
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
