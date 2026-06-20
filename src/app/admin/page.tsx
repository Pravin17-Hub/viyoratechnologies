"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Lock, Eye, EyeOff, LogOut, Briefcase, MessageSquare, Settings,
  Mail, Phone, FileText, Trash2, CheckCircle, Globe, Shield, Sparkles
} from "lucide-react";
import { useTheme } from "@/context/theme-context";
import { dbGetApplications, dbGetMessages, dbDeleteApplication, dbDeleteMessage } from "@/lib/firebase";

/* ─────────────── Types ─────────────── */
interface Application { id: string; name: string; email: string; mobile: string; skills: string; projects: string; appliedAt: string; }
interface Message { id: string; name: string; email: string; subject: string; message: string; createdAt: string; }
type Tab = "applications" | "messages" | "settings" | "projects";

/* ─────────────── Admin credentials (client-side only) ─────────────── */
const ADMIN_USER = "pravin";
const ADMIN_PASS = "viyoratechnologies@2023startup";

/* ─────────────── Reusable input ─────────────── */
function AdminInput({ label, icon, ...props }: { label: string; icon?: React.ReactNode } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>{label}</label>
      <div className="relative flex items-center">
        {icon && <div className="absolute left-4 text-violet-400 pointer-events-none">{icon}</div>}
        <input
          {...props}
          className="w-full rounded-xl py-3.5 text-sm border focus:outline-none transition-all duration-300 input-glow"
          style={{
            paddingLeft: icon ? "2.75rem" : "1rem",
            paddingRight: "1rem",
            background: "var(--input-bg)",
            borderColor: "var(--input-border)",
            color: "var(--text-primary)",
          }}
        />
      </div>
    </div>
  );
}

/* ─────────────── Stat Card ─────────────── */
function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: React.ReactNode; color: string }) {
  return (
    <div className="flex items-center justify-between p-6 rounded-2xl border transition-all duration-300"
      style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider mb-1" style={{ color: "var(--text-muted)" }}>{label}</p>
        <p className="text-3xl font-black" style={{ color }}>{value}</p>
      </div>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-white/10" style={{ background: `${color}15`, color }}>
        {icon}
      </div>
    </div>
  );
}

/* ─────────────── Main Page ─────────────── */
export default function AdminPage() {
  const { settings, updateSettings, projects, addProject, updateProject, deleteProject } = useTheme();

  const [showPass, setShowPass]         = useState(false);
  const [username, setUsername]         = useState("");
  const [password, setPassword]         = useState("");
  const [isLoggedIn, setIsLoggedIn]     = useState(false);
  const [authError, setAuthError]       = useState("");
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  const [activeTab, setActiveTab]       = useState<Tab>("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [messages, setMessages]         = useState<Message[]>([]);

  const [editPhone, setEditPhone]       = useState("");
  const [editEmail, setEditEmail]       = useState("");
  const [editAnnouncement, setEditAnnouncement] = useState("");
  const [settingsOk, setSettingsOk]     = useState(false);

  // Projects editor state
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projTitle, setProjTitle] = useState("");
  const [projCategory, setProjCategory] = useState("");
  const [projDescription, setProjDescription] = useState("");
  const [projLink, setProjLink] = useState("");
  const [projTech, setProjTech] = useState("");

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = projTech.split(",").map(t => t.trim()).filter(Boolean);
    const projData = {
      title: projTitle,
      category: projCategory,
      description: projDescription,
      link: projLink,
      techUsed: techArray
    };

    if (editingProject) {
      updateProject({ id: editingProject.id, ...projData });
      setEditingProject(null);
    } else {
      addProject(projData);
      setIsAddingProject(false);
    }

    setProjTitle("");
    setProjCategory("");
    setProjDescription("");
    setProjLink("");
    setProjTech("");
  };

  /* Check existing session */
  useEffect(() => {
    if (sessionStorage.getItem("admin_auth") === "true") setIsLoggedIn(true);
  }, []);

  /* Load data after login */
  useEffect(() => {
    if (!isLoggedIn) return;
    const loadData = async () => {
      const apps = await dbGetApplications();
      const msgs = await dbGetMessages();
      setApplications(apps);
      setMessages(msgs);
    };
    loadData();
    setEditPhone(settings.phone);
    setEditEmail(settings.email);
    setEditAnnouncement(settings.announcement);
  }, [isLoggedIn, settings]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      if (username === ADMIN_USER && password === ADMIN_PASS) {
        sessionStorage.setItem("admin_auth", "true");
        setIsLoggedIn(true);
      } else {
        setAuthError("Invalid credentials. Access denied.");
      }
    }, 800);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    setIsLoggedIn(false);
    setUsername(""); setPassword("");
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings({ phone: editPhone, email: editEmail, announcement: editAnnouncement });
    setSettingsOk(true);
    setTimeout(() => setSettingsOk(false), 3000);
  };

  const deleteApp = async (id: string) => {
    await dbDeleteApplication(id);
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
  };

  const deleteMsg = async (id: string) => {
    await dbDeleteMessage(id);
    const updated = messages.filter(m => m.id !== id);
    setMessages(updated);
  };

  /* ── Input base class ── */
  const fieldBase = `w-full rounded-xl py-3.5 px-4 text-sm border focus:outline-none input-glow transition-all`;

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      {/* Background orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px]" style={{ background: `rgba(139,92,246,var(--orb-opacity))` }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px]" style={{ background: `rgba(59,130,246,calc(var(--orb-opacity)*0.7))` }} />
      </div>

      <AnimatePresence mode="wait">
        {/* ══════════ LOGIN SCREEN ══════════ */}
        {!isLoggedIn ? (
          <motion.div key="login"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            className="relative z-10 min-h-screen flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-md">
              {/* Card */}
              <div className="p-8 sm:p-10 rounded-3xl border shadow-2xl"
                style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                {/* Logo area */}
                <div className="flex flex-col items-center mb-8">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 12 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center mb-5 shadow-xl shadow-violet-500/30"
                  >
                    <Shield className="w-8 h-8 text-white" />
                  </motion.div>
                  <h1 className="text-2xl font-black text-center" style={{ color: "var(--text-primary)" }}>Admin Console</h1>
                  <p className="text-sm text-center mt-1.5" style={{ color: "var(--text-secondary)" }}>Viyora Technologies · Secure Access</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                  {/* Username */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Username</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-4 h-4 text-violet-400 pointer-events-none" />
                      <input type="text" placeholder="Enter username" value={username}
                        onChange={e => setUsername(e.target.value)}
                        className={`${fieldBase} pl-11`}
                        style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
                        required />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Password</label>
                    <div className="relative flex items-center">
                      <Lock className="absolute left-4 w-4 h-4 text-violet-400 pointer-events-none" />
                      <input type={showPass ? "text" : "password"} placeholder="Enter password" value={password}
                        onChange={e => setPassword(e.target.value)}
                        className={`${fieldBase} pl-11 pr-12`}
                        style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
                        required />
                      <button type="button" onClick={() => setShowPass(v => !v)}
                        className="absolute right-4 transition-colors" style={{ color: "var(--text-muted)" }}>
                        {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Error */}
                  <AnimatePresence>
                    {authError && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="px-4 py-3 rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 text-xs font-semibold flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 flex-shrink-0" />
                        {authError}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Submit */}
                  <button type="submit" disabled={isAuthLoading}
                    className="mt-2 py-4 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-95 transition-all duration-300 disabled:opacity-60 disabled:scale-100">
                    {isAuthLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                        Authenticating…
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2"><Shield className="w-4 h-4" /> Authenticate</span>
                    )}
                  </button>
                </form>

                <p className="text-center text-xs mt-6" style={{ color: "var(--text-muted)" }}>
                  Authorized personnel only · Viyora Technologies
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
        /* ══════════ DASHBOARD ══════════ */
          <motion.div key="dashboard"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative z-10 max-w-7xl mx-auto px-6 py-10 pt-24 min-h-screen">

            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10 pb-8 border-b"
              style={{ borderColor: "var(--border-subtle)" }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-lg shadow-violet-500/25">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black" style={{ color: "var(--text-primary)" }}>Admin Console</h1>
                  <p className="text-xs mt-0.5 flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Session Active · Viyora Technologies
                  </p>
                </div>
              </div>
              <button onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold hover:text-red-400 hover:border-red-500/30 transition-all"
                style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "var(--bg-card)" }}>
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <StatCard label="Job Applicants"     value={applications.length} icon={<Briefcase className="w-5 h-5" />}     color="#8b5cf6" />
              <StatCard label="Inquiries Received" value={messages.length}     icon={<MessageSquare className="w-5 h-5" />} color="#3b82f6" />
              <StatCard label="Platform Status"    value="Online"               icon={<Globe className="w-5 h-5" />}         color="#10b981" />
            </div>

            {/* Tabs */}
            <div className="flex gap-1.5 p-1.5 rounded-2xl border mb-8 w-full max-w-lg" style={{ background: "var(--tab-bg)", borderColor: "var(--border-subtle)" }}>
              {([ ["applications", <Briefcase className="w-4 h-4" />, "Applications"],
                  ["messages",     <MessageSquare className="w-4 h-4" />, "Inquiries"],
                  ["projects",     <Globe className="w-4 h-4" />, "Projects"],
                  ["settings",     <Settings className="w-4 h-4" />, "Settings"],
              ] as [Tab, React.ReactNode, string][]).map(([tab, icon, label]) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    activeTab === tab ? "shadow-sm" : ""
                  }`}
                  style={activeTab === tab
                    ? { background: "var(--bg-surface)", color: "#8b5cf6", boxShadow: "0 2px 8px rgba(139,92,246,0.15)" }
                    : { color: "var(--text-muted)", background: "transparent" }}>
                  {icon}{label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              {/* ── Applications ── */}
              {activeTab === "applications" && (
                <motion.div key="apps" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <FileText className="w-5 h-5 text-violet-400" /> Application Resumes
                    <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
                      {applications.length} total
                    </span>
                  </h2>
                  {applications.length === 0 ? (
                    <div className="py-20 text-center border border-dashed rounded-3xl" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
                      <Briefcase className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No applications received yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {applications.map(app => (
                        <div key={app.id} className="p-6 rounded-3xl border flex flex-col gap-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-black text-base" style={{ color: "var(--text-primary)" }}>{app.name}</h3>
                              <p className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>Applied: {new Date(app.appliedAt).toLocaleString()}</p>
                            </div>
                            <button onClick={() => deleteApp(app.id)} title="Delete" className="p-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors" style={{ color: "var(--text-muted)" }}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <div className="flex flex-col gap-1 text-xs" style={{ color: "var(--text-secondary)" }}>
                            <a href={`mailto:${app.email}`} className="flex items-center gap-2 hover:text-violet-500 transition-colors">
                              <Mail className="w-3.5 h-3.5 text-violet-400" />{app.email}
                            </a>
                            <a href={`tel:${app.mobile}`} className="flex items-center gap-2 hover:text-violet-500 transition-colors">
                              <Phone className="w-3.5 h-3.5 text-violet-400" />{app.mobile}
                            </a>
                          </div>
                          <div className="pt-3 border-t flex flex-col gap-2" style={{ borderColor: "var(--border-subtle)" }}>
                            <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--text-muted)" }}>Skills</p>
                            <p className="text-xs leading-relaxed p-3 rounded-xl" style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}>{app.skills}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ color: "var(--text-muted)" }}>Projects & Links</p>
                            <p className="text-xs leading-relaxed p-3 rounded-xl break-all" style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}>{app.projects}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Messages ── */}
              {activeTab === "messages" && (
                <motion.div key="msgs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-5">
                  <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                    <MessageSquare className="w-5 h-5 text-blue-400" /> Inbox Messages
                    <span className="ml-auto text-xs font-bold px-3 py-1 rounded-full" style={{ background: "rgba(59,130,246,0.1)", color: "#60a5fa" }}>
                      {messages.length} total
                    </span>
                  </h2>
                  {messages.length === 0 ? (
                    <div className="py-20 text-center border border-dashed rounded-3xl" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
                      <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No messages received yet.</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {messages.map(msg => (
                        <div key={msg.id} className="p-6 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <h3 className="font-black text-sm" style={{ color: "var(--text-primary)" }}>{msg.name}</h3>
                              <div className="flex flex-wrap gap-2 text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                                <span>{msg.email}</span><span>·</span><span>{new Date(msg.createdAt).toLocaleString()}</span>
                              </div>
                            </div>
                            <button onClick={() => deleteMsg(msg.id)} title="Delete" className="p-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors" style={{ color: "var(--text-muted)" }}>
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-xs font-bold mb-2" style={{ color: "#a78bfa" }}>Subject: {msg.subject}</p>
                          <p className="text-xs leading-relaxed p-4 rounded-2xl" style={{ background: "var(--bg-surface)", color: "var(--text-secondary)" }}>{msg.message}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ── Settings ── */}
              {activeTab === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="max-w-xl">
                  <div className="p-8 rounded-3xl border" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                    <h2 className="text-lg font-bold flex items-center gap-2 mb-1" style={{ color: "var(--text-primary)" }}>
                      <Settings className="w-5 h-5 text-violet-400" /> Studio Configuration
                    </h2>
                    <p className="text-xs mb-7" style={{ color: "var(--text-secondary)" }}>
                      Edit global properties synced to navbar, footer, and contact pages instantly.
                    </p>
                    <form onSubmit={handleSaveSettings} className="flex flex-col gap-5">
                      {[
                        { label: "Contact Mobile Number", icon: <Phone className="w-4 h-4" />, value: editPhone, setter: setEditPhone, type: "text", placeholder: "+91 99999 99999" },
                        { label: "Contact Email Address", icon: <Mail className="w-4 h-4" />,  value: editEmail, setter: setEditEmail, type: "email", placeholder: "viyoratechnologies@gmail.com" },
                        { label: "Home Announcement Line", icon: <FileText className="w-4 h-4" />, value: editAnnouncement, setter: setEditAnnouncement, type: "text", placeholder: "Student Product Development Studio" },
                      ].map(field => (
                        <div key={field.label} className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: "var(--text-muted)" }}>
                            <span className="text-violet-400">{field.icon}</span>{field.label}
                          </label>
                          <input type={field.type} value={field.value} placeholder={field.placeholder}
                            onChange={e => field.setter(e.target.value)}
                            className={`${fieldBase} input-glow`}
                            style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }}
                            required />
                        </div>
                      ))}

                      <AnimatePresence>
                        {settingsOk && (
                          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                            className="px-4 py-3 rounded-xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400 text-xs font-bold flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Settings saved and synced!
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <button type="submit"
                        className="mt-2 py-3.5 rounded-2xl font-bold text-white text-sm bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/20 hover:shadow-violet-500/40 hover:scale-[1.01] active:scale-95 transition-all duration-300">
                        Save Changes
                      </button>
                    </form>
                  </div>
                </motion.div>
              )}

              {/* ── Projects ── */}
              {activeTab === "projects" && (
                <motion.div key="projs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col gap-6">
                  <div className="flex items-center justify-between gap-4">
                    <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "var(--text-primary)" }}>
                      <Globe className="w-5 h-5 text-violet-400" /> Published Projects
                      <span className="text-xs font-bold px-3 py-1 rounded-full animate-pulse-glow" style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
                        {projects.length} active
                      </span>
                    </h2>
                    {!isAddingProject && !editingProject && (
                      <button onClick={() => {
                        setIsAddingProject(true);
                        setProjTitle("");
                        setProjCategory("");
                        setProjDescription("");
                        setProjLink("");
                        setProjTech("");
                      }} className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-md hover:scale-105 active:scale-95 transition-all">
                        + Add Project
                      </button>
                    )}
                  </div>

                  {(isAddingProject || editingProject) ? (
                    <form onSubmit={handleSaveProject} className="p-6 rounded-3xl border flex flex-col gap-4 shadow-xl" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                      <h3 className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>
                        {isAddingProject ? "New Project Details" : "Edit Project Details"}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Project Title</label>
                          <input type="text" placeholder="e.g. E-Commerce Platform" value={projTitle} onChange={e => setProjTitle(e.target.value)} className={fieldBase} style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} required />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Category</label>
                          <input type="text" placeholder="e.g. Web Development" value={projCategory} onChange={e => setProjCategory(e.target.value)} className={fieldBase} style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} required />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Description</label>
                        <textarea rows={3} placeholder="Describe the project, features, and impact..." value={projDescription} onChange={e => setProjDescription(e.target.value)} className={`${fieldBase} resize-none`} style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} required />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Project Link (URL)</label>
                          <input type="url" placeholder="https://..." value={projLink} onChange={e => setProjLink(e.target.value)} className={fieldBase} style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-xs font-bold" style={{ color: "var(--text-muted)" }}>Tech Stack (Comma-separated)</label>
                          <input type="text" placeholder="React, Next.js, Tailwind" value={projTech} onChange={e => setProjTech(e.target.value)} className={fieldBase} style={{ background: "var(--input-bg)", borderColor: "var(--input-border)", color: "var(--text-primary)" }} required />
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 mt-2">
                        <button type="button" onClick={() => { setIsAddingProject(false); setEditingProject(null); }} className="px-4 py-2 rounded-xl text-xs font-semibold border transition-all" style={{ borderColor: "var(--border-subtle)", color: "var(--text-secondary)", background: "transparent" }}>
                          Cancel
                        </button>
                        <button type="submit" className="px-5 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-violet-600 to-blue-600 shadow-lg shadow-violet-500/25">
                          Save Project
                        </button>
                      </div>
                    </form>
                  ) : projects.length === 0 ? (
                    <div className="py-20 text-center border border-dashed rounded-3xl" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>
                      <Globe className="w-10 h-10 mx-auto mb-3 opacity-30" />
                      <p className="text-sm">No projects published yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {projects.map(proj => (
                        <div key={proj.id} className="p-6 rounded-3xl border flex flex-col justify-between gap-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-card)" }}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full" style={{ background: "rgba(139,92,246,0.1)", color: "#a78bfa" }}>
                                {proj.category}
                              </span>
                              <h3 className="font-black text-base mt-2" style={{ color: "var(--text-primary)" }}>{proj.title}</h3>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => {
                                setEditingProject(proj);
                                setProjTitle(proj.title);
                                setProjCategory(proj.category);
                                setProjDescription(proj.description);
                                setProjLink(proj.link || "");
                                setProjTech(proj.techUsed.join(", "));
                              }} className="p-2 rounded-xl hover:bg-violet-500/10 hover:text-violet-400 transition-colors" style={{ color: "var(--text-muted)" }} title="Edit">
                                <Settings className="w-4 h-4" />
                              </button>
                              <button onClick={() => deleteProject(proj.id)} className="p-2 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-colors" style={{ color: "var(--text-muted)" }} title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs leading-relaxed" style={{ color: "var(--text-secondary)" }}>{proj.description}</p>
                          <div className="flex flex-col gap-2 pt-3 border-t" style={{ borderColor: "var(--border-subtle)" }}>
                            <div className="flex flex-wrap gap-1">
                              {proj.techUsed.map(t => (
                                <span key={t} className="text-[9px] px-2 py-0.5 rounded-md border font-medium" style={{ borderColor: "var(--border-subtle)", color: "var(--text-muted)" }}>{t}</span>
                              ))}
                            </div>
                            {proj.link && (
                              <a href={proj.link} target="_blank" rel="noreferrer" className="text-[10px] font-semibold text-violet-400 hover:underline">
                                Link: {proj.link}
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
