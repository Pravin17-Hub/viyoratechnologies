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
  image?: string;
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

    // Projects sync with auto-upgrade to include detailed MAK project
    const savedProjects = localStorage.getItem("viyora_projects");
    let loadedProjects = savedProjects ? JSON.parse(savedProjects) : [];
    
    const initialProjects: Project[] = [
      {
        id: "mak",
        title: "MAK Ladies Tailoring",
        category: "Bespoke Tailoring & Design",
        description: "A premium bespoke digital experience crafted for MAK Ladies Tailoring. Features interactive design catalogs, dynamic high-resolution image galleries showcasing intricate Aari, Zardosi & stone embroidery handworks, a booking reservation system, and smooth custom page transitions.",
        link: "https://mak-pied.vercel.app/",
        techUsed: ["React 19", "Next.js 15", "Framer Motion", "Tailwind CSS", "Canvas Effects"],
        image: "/mak-project.png"
      }
    ];

    // Filter out old fake projects from loaded storage if they exist
    const filteredProjects = loadedProjects.filter((p: any) => p.id !== "1" && p.id !== "2");
    const hasMak = filteredProjects.some((p: any) => p.id === "mak");

    if (!savedProjects || !hasMak) {
      setProjects(initialProjects);
      localStorage.setItem("viyora_projects", JSON.stringify(initialProjects));
    } else {
      // Auto-upgrade the MAK project in existing localStorage to the detailed version
      const upgraded = filteredProjects.map((p: any) => p.id === "mak" ? initialProjects[0] : p);
      setProjects(upgraded);
      localStorage.setItem("viyora_projects", JSON.stringify(upgraded));
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
