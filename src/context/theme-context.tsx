"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  link: string;
  techUsed: string[];
}

interface SiteSettings {
  phone: string;
  email: string;
  announcement: string;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  settings: SiteSettings;
  updateSettings: (newSettings: Partial<SiteSettings>) => void;
  projects: Project[];
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme] = useState<Theme>("dark"); // force dark theme
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    phone: "+91 93444 38685",
    email: "viyoratechnologies@gmail.com",
    announcement: "Viyora Technologies · Product Studio"
  });

  useEffect(() => {
    // Force dark theme
    localStorage.setItem("theme", "dark");
    document.documentElement.classList.add("dark");
    
    // Settings sync
    const savedPhone = localStorage.getItem("settings_phone");
    const savedEmail = localStorage.getItem("settings_email");
    const savedAnnouncement = localStorage.getItem("settings_announcement");
    
    setSettings({
      phone: savedPhone || "+91 93444 38685",
      email: savedEmail || "viyoratechnologies@gmail.com",
      announcement: savedAnnouncement || "Viyora Technologies · Product Studio"
    });

    // Projects sync
    const savedProjects = localStorage.getItem("viyora_projects");
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      const initialProjects: Project[] = [
        {
          id: "1",
          title: "Aesthetic Portfolio & Brand Launch",
          category: "Web Design",
          description: "Designed a premium glassmorphic portfolio site with custom fluid animations for an early-stage consumer tech startup.",
          link: "https://viyoratechnologies.com",
          techUsed: ["React", "Next.js", "Framer Motion", "Tailwind CSS"]
        },
        {
          id: "2",
          title: "Digital Product Showcase",
          category: "Web Development",
          description: "Published a highly optimized Next.js template featuring pre-configured dark modes, animation controls, and custom layouts.",
          link: "https://viyoratechnologies.com",
          techUsed: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
        }
      ];
      setProjects(initialProjects);
      localStorage.setItem("viyora_projects", JSON.stringify(initialProjects));
    }
    
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    // Noop - forced dark theme
  };

  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...newSettings };
      if (newSettings.phone !== undefined) localStorage.setItem("settings_phone", newSettings.phone);
      if (newSettings.email !== undefined) localStorage.setItem("settings_email", newSettings.email);
      if (newSettings.announcement !== undefined) localStorage.setItem("settings_announcement", newSettings.announcement);
      return next;
    });
  };

  const addProject = (p: Omit<Project, "id">) => {
    setProjects((prev) => {
      const next = [...prev, { ...p, id: Date.now().toString() }];
      localStorage.setItem("viyora_projects", JSON.stringify(next));
      return next;
    });
  };

  const updateProject = (p: Project) => {
    setProjects((prev) => {
      const next = prev.map((proj) => (proj.id === p.id ? p : proj));
      localStorage.setItem("viyora_projects", JSON.stringify(next));
      return next;
    });
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => {
      const next = prev.filter((proj) => proj.id !== id);
      localStorage.setItem("viyora_projects", JSON.stringify(next));
      return next;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, settings, updateSettings, projects, addProject, updateProject, deleteProject }}>
      <div style={{ visibility: mounted ? "visible" : "hidden" }} className="contents">
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
