"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, FileText, Briefcase, CheckCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

interface StepperProps {
  jobTitle?: string;
  onClose?: () => void;
}

export function ApplicationStepper({ jobTitle, onClose }: StepperProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: jobTitle || "Senior AI Engineer",
    resumeName: "",
    experience: "",
    coverLetter: "",
    linkedin: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [dragActive, setDragActive] = useState(false);

  const steps = [
    { number: 1, label: "Identity", icon: <User className="w-4 h-4" /> },
    { number: 2, label: "Resume", icon: <FileText className="w-4 h-4" /> },
    { number: 3, label: "Experience", icon: <Briefcase className="w-4 h-4" /> },
    { number: 4, label: "Submit", icon: <CheckCircle className="w-4 h-4" /> }
  ];

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (currentStep === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required.";
      if (!formData.email.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required.";
    } else if (currentStep === 2) {
      if (!formData.resumeName) newErrors.resume = "Please upload a PDF CV/Resume.";
    } else if (currentStep === 3) {
      if (!formData.experience.trim()) newErrors.experience = "Please summarize your experience.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length + 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleInputChange = (field: string, val: string) => {
    setFormData((prev) => ({ ...prev, [field]: val }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === "application/pdf") {
        setFormData((prev) => ({ ...prev, resumeName: file.name }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      } else {
        setErrors((prev) => ({ ...prev, resume: "Only PDF format CVs are supported." }));
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf") {
        setFormData((prev) => ({ ...prev, resumeName: file.name }));
        setErrors((prev) => {
          const next = { ...prev };
          delete next.resume;
          return next;
        });
      } else {
        setErrors((prev) => ({ ...prev, resume: "Only PDF format CVs are supported." }));
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto rounded-3xl border border-slate-200/50 dark:border-slate-800/40 bg-white/70 dark:bg-slate-900/60 backdrop-blur-md p-8 shadow-2xl overflow-hidden relative">
      {currentStep <= steps.length ? (
        <>
          {/* Stepper Header */}
          <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-850 pb-6 mb-8 w-full">
            {steps.map((s, idx) => {
              const isActive = s.number === currentStep;
              const isPast = s.number < currentStep;

              return (
                <div key={s.number} className="flex-1 flex flex-col items-center relative">
                  {/* Step Connector Line */}
                  {idx > 0 && (
                    <div
                      className={`absolute top-4 left-[-50%] right-[50%] h-[2px] z-0 -translate-y-1/2 ${
                        isPast ? "bg-indigo-600 dark:bg-indigo-500" : "bg-slate-200 dark:bg-slate-800"
                      }`}
                    />
                  )}

                  <div
                    className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold border-2 transition-all ${
                      isActive
                        ? "bg-indigo-600 dark:bg-indigo-500 border-indigo-600 dark:border-indigo-500 text-white shadow-md shadow-indigo-500/25"
                        : isPast
                        ? "bg-slate-100 dark:bg-slate-800 border-indigo-600 dark:border-indigo-500 text-indigo-600 dark:text-indigo-400"
                        : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-500"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 mt-2">
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Form Content Panel */}
          <div className="min-h-[280px]">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Personal Information</h3>
                  <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="you@workemail.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    error={errors.email}
                  />
                  <Input
                    label="Phone Number"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    error={errors.phone}
                  />
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Resume Upload</h3>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full h-40 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 ${
                      dragActive
                        ? "border-indigo-650 bg-indigo-500/5"
                        : "border-slate-200 dark:border-slate-800 bg-white/20 dark:bg-slate-950/20 hover:border-indigo-500/50"
                    }`}
                  >
                    <FileText className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-700 dark:text-slate-350">
                      Drag and drop your resume here, or{" "}
                      <label className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer">
                        browse
                        <input
                          type="file"
                          accept=".pdf"
                          onChange={handleFileSelect}
                          className="hidden"
                        />
                      </label>
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PDF format only (Max 5MB)</p>
                  </div>

                  {formData.resumeName && (
                    <div className="flex items-center gap-2 px-4 py-2 border border-emerald-500/25 bg-emerald-500/5 rounded-full text-xs font-semibold text-emerald-600 dark:text-emerald-450 self-start">
                      <CheckCircle className="w-4 h-4" />
                      {formData.resumeName}
                    </div>
                  )}

                  {errors.resume && <span className="text-xs text-red-500 pl-2">{errors.resume}</span>}

                  <Input
                    label="LinkedIn Profile URL (Optional)"
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={(e) => handleInputChange("linkedin", e.target.value)}
                  />
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Work Experience</h3>
                  <Textarea
                    label="Brief Professional Summary"
                    placeholder="Summarize your past experience, tech stacks, and notable projects..."
                    value={formData.experience}
                    onChange={(e) => handleInputChange("experience", e.target.value)}
                    error={errors.experience}
                  />
                  <Textarea
                    label="Why do you want to join Viyora Technologies? (Optional)"
                    placeholder="Tell us what drives you and how you can make an impact..."
                    value={formData.coverLetter}
                    onChange={(e) => handleInputChange("coverLetter", e.target.value)}
                  />
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex flex-col gap-4"
                >
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Review & Submit</h3>
                  <div className="rounded-2xl border border-slate-200/50 dark:border-slate-800/40 bg-slate-50/50 dark:bg-slate-950/30 p-5 flex flex-col gap-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Position:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Full Name:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Email:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400 font-medium">Phone:</span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">CV / Resume:</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-450">{formData.resumeName}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-450 leading-relaxed mt-2 text-center">
                    By submitting, you agree that our recruitment managers can contact you regarding this job opening.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Footer Navigation */}
          <div className="flex justify-between items-center border-t border-slate-200/50 dark:border-slate-850 pt-6 mt-8">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              icon={<ArrowLeft className="w-4 h-4" />}
              iconPosition="left"
            >
              Back
            </Button>
            
            <Button
              variant="primary"
              onClick={currentStep === 4 ? () => setCurrentStep(5) : handleNext}
              icon={<ArrowRight className="w-4 h-4" />}
            >
              {currentStep === 4 ? "Submit Application" : "Continue"}
            </Button>
          </div>
        </>
      ) : (
        /* SUCCESS SCREEN */
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-center py-10"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-6">
            <CheckCircle className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">Application Received!</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mt-4 max-w-sm">
            Thank you, <span className="font-bold text-slate-800 dark:text-slate-200">{formData.name}</span>. We have successfully cataloged your profile for the <span className="font-bold text-slate-800 dark:text-slate-200">{formData.position}</span> opening. Our hiring coordinators will email you within 3 business days.
          </p>
          <div className="flex gap-3 mt-8">
            <Button variant="secondary" onClick={() => setCurrentStep(1)}>
              Apply to another role
            </Button>
            {onClose && (
              <Button variant="primary" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
}
