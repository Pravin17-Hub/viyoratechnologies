"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Tilt3D } from "@/components/custom/tilt";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverLift?: boolean;
  glow?: boolean;
  glowColor?: "indigo" | "purple" | "cyan" | "emerald";
  glass?: boolean;
  tilt?: boolean;
}

export function Card({
  className,
  hoverLift = true,
  glow = true,
  glowColor = "indigo",
  glass = true,
  tilt = false,
  children,
  ...props
}: CardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  const glowGradients = {
    indigo: "rgba(139, 92, 246, 0.18)",
    purple: "rgba(139, 92, 246, 0.18)",
    cyan: "rgba(6, 182, 212, 0.18)",
    emerald: "rgba(16, 185, 129, 0.15)"
  };

  const cardContent = (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "group relative rounded-3xl border transition-all duration-500 overflow-hidden h-full flex flex-col",
        glass ? "backdrop-blur-xl" : "",
        tilt && "preserve-3d",
        className
      )}
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border-card)"
      }}
      {...props}
    >
      {/* Dynamic Flashlight Glow Overlay */}
      {glow && isHovered && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-500 z-0"
          style={{
            background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${glowGradients[glowColor]}, transparent 80%)`
          }}
        />
      )}

      {/* Content slot wrapped in high z-index to stay above glow */}
      <div className="relative z-10 flex flex-col h-full w-full">
        {children}
      </div>
    </div>
  );

  if (tilt) {
    return (
      <Tilt3D className="w-full h-full">
        {cardContent}
      </Tilt3D>
    );
  }

  if (hoverLift) {
    return (
      <motion.div
        whileHover={{ y: -5, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="w-full h-full"
      >
        {cardContent}
      </motion.div>
    );
  }

  return cardContent;
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 flex flex-col gap-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn("text-xl font-bold leading-none tracking-tight", className)}
      style={{ transform: "translateZ(30px)", color: "var(--text-primary)" }} // Enable 3D float layer
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm", className)} style={{ color: "var(--text-secondary)" }} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 z-10", className)} style={{ color: "var(--text-secondary)" }} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-6 pt-0 flex items-center border-t mt-auto", className)} style={{ borderColor: "var(--border-subtle)" }} {...props}>
      {children}
    </div>
  );
}
