import React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = "text", label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full rounded-full border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-5 py-3 text-sm text-slate-900 dark:text-white transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-cyan-500/30 focus:border-purple-500/80 dark:focus:border-cyan-500/60 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 pl-2">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 tracking-wide">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex w-full min-h-[120px] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 backdrop-blur-md px-5 py-4 text-sm text-slate-900 dark:text-white transition-all duration-300 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 dark:focus:ring-cyan-500/30 focus:border-purple-500/80 dark:focus:border-cyan-500/60 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
            error && "border-red-500 focus:ring-red-500/50 focus:border-red-500",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <span className="text-xs text-red-500 pl-2">
            {error}
          </span>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
