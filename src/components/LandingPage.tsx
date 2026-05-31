"use client";

import React, { useRef, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { StarsBackground } from "@/components/ui/stars-background";
import { Component as EtheralShadow } from "@/components/ui/etheral-shadow";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { NavBar } from "@/components/ui/nav-bar";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ResumePreview } from "@/components/ui/resume-preview";
import { GlassButton } from "@/components/ui/apple-tahoe-liquid-glass-button";
import { motion } from "framer-motion";
import { Github, Linkedin, ExternalLink, Code2, Sparkles, X } from "lucide-react";

// ── Types ───────────────────────────────────────────────────────────────────
type Project = {
    title: string;
    description: string;
    tech: string[];
    link?: string;
    highlights: string[];
    logo?: string;
};

// ── Content Data ────────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
    {
        title: "OneCall AI Onboarding",
        description: "A high-performance vendor onboarding system leveraging AI to automate data extraction from identity documents.",
        tech: ["React", "Python", "Tesseract.js", "Django"],
        highlights: [
            "Streamlined onboarding for 300+ vendors",
            "Reduced manual data entry time by 70%",
            "Implemented real-time AI document scanning"
        ],
        logo: "/logos/images.jpg"
    },
    {
        title: "MyFinalyst",
        description: "Financial insights platform that translates complex fiscal data into actionable, human-readable intelligence.",
        tech: ["Next.js", "TypeScript", "SQL", "Chart.js"],
        highlights: [
            "Automated translation of balance sheets",
            "Interactive data visualization suite",
            "Optimized query performance for large datasets"
        ],
        logo: "/logos/myfinalyst.png"
    },
    {
        title: "Hirelines",
        description: "End-to-end recruitment platform focused on optimizing the hiring pipeline for small to medium enterprises.",
        tech: ["React", "Node.js", "PostgreSQL", "Tailwind"],
        highlights: [
            "Seamless applicant tracking system",
            "Integrated interview scheduling",
            "Custom workflow builder for HR teams"
        ],
        logo: "/logos/hireLines.svg"
    }
];

const SKILLS = {
    Frontend: ["React", "Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    Backend: ["Python", "Django", "Node.js", "REST APIs"],
    Data: ["PostgreSQL", "SQL", "Data Translation", "ETL Pipelines"],
    Tools: ["Git", "Docker", "Vite", "Tesseract.js", "PDF.js"]
};

const EXPERIENCE = [
    {
        role: "Senior Software Engineer",
        company: "Digistashing Technologies",
        type: "Full-time",
        duration: "Dec 2025 - Present • 6 mos",
        location: "Kolkata • Remote",
        logo: "/logos/Digistashing Technologies.svg"
    },
    {
        role: "Associate Software Engineer",
        company: "GSSPEC",
        type: "Full-time",
        duration: "Feb 2023 - Jul 2025 • 2 yrs 6 mos",
        location: "Hyderabad, Telangana, India",
        logo: "/logos/gsspec.svg"
    }
];

// ── UI Components ───────────────────────────────────────────────────────────
const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <motion.div
        whileHover={{ y: -5 }}
        className={`rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all hover:bg-white/10 ${className}`}
    >
        {children}
    </motion.div>
);

const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">{title}</h2>
        {subtitle && <p className="text-2xl md:text-3xl font-Case text-white leading-tight">{subtitle}</p>}
    </div>
);

// ── Main Page ───────────────────────────────────────────────────────────────
export function LandingPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [navScrolled, setNavScrolled] = useState(false);
    const [showResume, setShowResume] = useState(false);
    const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);

    const handleResumeClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedResumeFile(file);
            setShowResume(true);
        }
    };

    return (
        <AuroraBackground>
            <div className="absolute inset-0 z-5">
                <StarsBackground
                    starDensity={0.0002}
                    allStarsTwinkle={true}
                    twinkleProbability={8}
                    minTwinkleSpeed={3}
                    maxTwinkleSpeed={5}
                />
            </div>

            <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
                <EtheralShadow
                    sizing="fill"
                    color="rgba(255, 255, 255, 0)"
                    animation={{ scale: 100, speed: 90 }}
                    noise={{ opacity: 0.7, scale: 1.2 }}
                />
            </div>

            <div
                className="relative z-20 min-h-screen p-4 md:p-8 flex flex-col gap-12 w-full overflow-y-auto"
                onScroll={(event) => setNavScrolled(event.currentTarget.scrollTop > 50)}
            >
                {/* Navigation */}
                <div className="flex items-center justify-center sticky top-0 z-50 pt-4">
                    <NavBar />
                </div>

                {/* Hero Section */}
                <section id="home" className="flex flex-col items-center justify-center pt-16 mb-16 gap-6 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <ContainerTextFlip
                            words={["PRATAP RAJU"]}
                            className="w-full font-SuperPunch md:text-9xl text-5xl tracking-wide text-white bg-transparent shadow-none drop-shadow-2xl"
                            textClassName="text-white"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="flex flex-col items-center gap-4"
                    >
                        <p className="font-Turbine font-light md:text-2xl text-xl text-white max-w-2xl leading-relaxed drop-shadow-lg">
                            Building Scalable Full Stack Solutions with AI-Driven Excellence.
                        </p>
                        <div className="flex gap-4 mt-4">
                            <a href="https://github.com/Pratap-Digistashing" target="_blank" rel="noreferrer">
                                <ShinyButton className="!p-3 border border-white/10 bg-white/5 backdrop-blur-md !rounded-2xl"><Github size={20} /></ShinyButton>
                            </a>
                            <a href="https://www.linkedin.com/in/pratap-raju/" target="_blank" rel="noreferrer">
                                <ShinyButton className="!p-3 border border-white/10 bg-white/5 backdrop-blur-md !rounded-2xl"><Linkedin size={20} /></ShinyButton>
                            </a>
                            <ShinyButton onClick={handleResumeClick} className="font-Turbine tracking-widest text-xs uppercase px-8 border border-white/10 bg-white/5 backdrop-blur-md !rounded-2xl">
                                View Full CV
                            </ShinyButton>
                        </div>
                    </motion.div>
                </section>

                <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 pb-32 text-white">

                    {/* Projects Section */}
                    <section id="projects">
                        <SectionHeader title="Selected Work" subtitle="Innovative solutions for complex problems." />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {PROJECTS.map((project, i) => (
                                <GlassCard key={project.title} className="flex flex-col gap-4">
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 bg-white/10 rounded-xl overflow-hidden flex items-center justify-center p-2 border border-white/10 group-hover:border-emerald-500/50 transition-colors">
                                            {project.logo ? (
                                                <img 
                                                    src={project.logo} 
                                                    alt={`${project.title} logo`} 
                                                    className="w-full h-full object-contain rounded-lg"
                                                />
                                            ) : (
                                                i === 0 ? <Sparkles size={24} className="text-emerald-400" /> : <Code2 size={24} className="text-white/60" />
                                            )}
                                        </div>
                                        <ExternalLink size={18} className="text-white/30" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-Case font-bold mb-2">{project.title}</h3>
                                        <p className="text-sm text-white font-Turbine leading-relaxed mb-4 drop-shadow-sm">
                                            {project.description}
                                        </p>
                                    </div>
                                    <div className="mt-auto">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {project.tech.map(t => (
                                                <span key={t} className="text-[10px] font-Turbine tracking-wider uppercase bg-white/5 border border-white/10 px-2 py-1 rounded">
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                        <ul className="text-xs text-white/50 space-y-1 list-disc list-inside mb-4">
                                            {project.highlights.map(h => <li key={h}>{h}</li>)}
                                        </ul>
                                        <div className="mt-4 pt-4 border-t border-white/5 w-full">
                                            <a href={project.link || "#"} target="_blank" rel="noreferrer" className="block w-full">
                                                <GlassButton size="sm" className="w-full text-xs" contentClassName="flex items-center justify-center gap-2">
                                                    View Project <ExternalLink size={14} />
                                                </GlassButton>
                                            </a>
                                        </div>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    </section>

                    {/* Experience Section */}
                    <section id="experience" className="relative">
                        <SectionHeader title="Professional Path" subtitle="Work Experience" />

                        <div className="relative flex flex-col gap-12 md:gap-16 mt-8 md:mt-16">
                            {/* Vertical Timeline Line - Hidden on small mobile */}
                            <div className="absolute left-[23px] md:left-[31px] top-4 bottom-4 w-px bg-gradient-to-b from-emerald-500/50 via-white/10 to-transparent hidden sm:block" />

                            {EXPERIENCE.map((job, i) => (
                                <motion.div
                                    key={job.company}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative flex flex-col sm:flex-row gap-6 md:gap-12 group"
                                >
                                    {/* Timeline Node */}
                                    <div className="relative z-10 flex-shrink-0">
                                        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-[#0a0a0a] border ${i === 0 ? 'border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'border-white/10'} flex items-center justify-center p-2 group-hover:scale-110 transition-transform duration-500 overflow-hidden`}>
                                            {job.logo.startsWith('/') ? (
                                                <img 
                                                    src={job.logo} 
                                                    alt={`${job.company} logo`} 
                                                    className="w-full h-full object-contain rounded-lg md:rounded-xl"
                                                />
                                            ) : (
                                                <span className="text-2xl md:text-3xl">{job.logo}</span>
                                            )}
                                        </div>
                                        {i === 0 && (
                                            <div className="absolute inset-0 rounded-2xl bg-emerald-500/20 animate-pulse blur-xl" />
                                        )}
                                    </div>

                                    {/* Experience Card */}
                                    <div className="flex-1">
                                        <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-8 rounded-[24px] md:rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.05] hover:border-white/10 transition-all duration-500">
                                            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                                <div>
                                                    <h3 className="text-xl md:text-3xl font-Case font-bold text-white mb-1 md:mb-2 tracking-tight">
                                                        {job.role}
                                                    </h3>
                                                    <p className="text-lg md:text-xl font-Case text-emerald-400 font-medium">
                                                        {job.company}
                                                    </p>
                                                </div>
                                                <div className="flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-2 w-full md:w-auto">
                                                    <span className="text-[9px] md:text-[10px] font-Turbine font-black tracking-[0.2em] text-white/40 uppercase px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 bg-white/5">
                                                        {job.type}
                                                    </span>
                                                    <span className="text-[10px] md:text-[11px] font-Turbine font-bold tracking-widest text-emerald-400/80 uppercase">
                                                        {job.location}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg md:rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                                                    <span className="text-[10px] md:text-xs font-Turbine font-bold text-emerald-400 tracking-wider">
                                                        {job.duration}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Skills & Expertise Section */}
                    <section id="skills" className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <SectionHeader title="Expertise" subtitle="My Technical Stack" />
                            <div className="grid grid-cols-2 gap-4">
                                {Object.entries(SKILLS).map(([cat, items]) => (
                                    <div key={cat} className="flex flex-col gap-2">
                                        <h4 className="text-[9px] md:text-[10px] font-Turbine tracking-[0.2em] text-white/70 uppercase mb-2 drop-shadow-sm">{cat}</h4>
                                        <ul className="space-y-1.5 md:space-y-2">
                                            {items.map(item => (
                                                <li key={item} className="text-xs md:text-sm font-Case text-white/80 flex items-center gap-2">
                                                    <div className="w-1 h-1 bg-emerald-500 rounded-full" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <GlassCard className="flex flex-col justify-center items-center text-center p-12">
                            <Sparkles size={48} className="text-emerald-400 mb-6 opacity-50" />
                            <h3 className="text-2xl font-Case font-bold mb-4">Always Learning</h3>
                            <p className="text-white/60 font-Turbine leading-relaxed">
                                I specialize in building systems that bridge the gap between complex data and intuitive user experiences. Currently exploring deeper integrations with Large Language Models and AI automation.
                            </p>
                        </GlassCard>
                    </section>
                </div>

                {/* Resume Preview Modal (Overlay) */}
                {showResume && selectedResumeFile && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                    >
                        <div className="w-full max-w-5xl bg-zinc-900 rounded-3xl border border-white/10 flex flex-col h-[90vh]">
                            <div className="flex items-center justify-between p-6 border-b border-white/5">
                                <h3 className="text-lg font-Turbine tracking-widest uppercase text-white/60">Resume Preview</h3>
                                <button
                                    onClick={() => setShowResume(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                            <div className="flex-1 overflow-hidden p-4">
                                <ResumePreview file={selectedResumeFile} />
                            </div>
                        </div>
                    </motion.div>
                )}

                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf"
                    className="hidden"
                    onChange={handleFileChange}
                />

                {/* Footer */}
                <footer className="mt-auto py-12 border-t border-white/5 flex flex-col items-center gap-4 opacity-40">
                    <p className="font-Turbine text-[10px] tracking-widest uppercase">
                        © 2026 Pratap Raju • Crafted with UI-UX-Pro-Max
                    </p>
                </footer>
            </div>
        </AuroraBackground>
    );
}
