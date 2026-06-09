"use client";

import React, { useRef, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { StarsBackground } from "@/components/ui/stars-background";
import { Component as EtheralShadow } from "@/components/ui/etheral-shadow";
import { ContainerTextFlip } from "@/components/ui/container-text-flip";
import { NavBar } from "@/components/ui/nav-bar";
import { ShinyButton } from "@/components/ui/shiny-button";
import { ResumePreview } from "@/components/ui/resume-preview";
import { RevealCard } from "@/components/ui/reveal-card";
import { RevealGrid } from "@/components/ui/reveal-grid";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import { Github, Linkedin, ExternalLink, Sparkles, X, Code2 } from "lucide-react";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ReactLenis } from 'lenis/react';

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
        description: "Insurance automation platform for onboarding workflows including biometric verification, interview processing, and automated document generation.",
        tech: ["Django", "Python", "Next.js", "MySQL", "REST API", "JWT Auth"],
        highlights: [
            "AI face scan, BMI calculator & video/audio interview workflows",
            "Biometric verification & automated document generation",
            "Health verification system for insurance onboarding"
        ],
        logo: "/logos/onecall.jpg"
    },
    {
        title: "MyFinalyst",
        description: "SaaS financial platform integrating Tally ERP, Tally Prime & Microsoft Business Central for automated financial sync and reporting.",
        tech: ["React", "Redux", "Java Spring Boot", "MongoDB", "REST APIs"],
        highlights: [
            "Integrated Tally ERP, Tally Prime & MS Business Central",
            "Built responsive dashboards & financial reporting modules",
            "Modules for Loans, Receivables & Accounting Policies"
        ],
        logo: "/logos/myfinalyst.png"
    },
    {
        title: "Hirelines",
        description: "SaaS recruitment platform automating screening, coding assessments, interviews, and candidate workflows for enterprises.",
        tech: ["Django", "REST APIs", "MySQL", "HTML", "JavaScript", "AWS"],
        highlights: [
            "Automated screening, coding assessments & interview scheduling",
            "Integrated scoring systems & hiring workflow APIs",
            "Managed AWS EC2, PM2, Nginx & CloudFront deployments"
        ],
        logo: "/logos/hireLines.svg"
    },
    {
        title: "Gyftport",
        description: "Gift card marketplace platform with cross-platform integrations, async order processing, and seamless partner API connectivity.",
        tech: ["Django", "Next.js", "PostgreSQL", "GraphQL", "Redis", "RabbitMQ", "Celery", "AWS"],
        highlights: [
            "Led backend & web platform as Technical Lead",
            "Built async order processing with Celery & RabbitMQ",
            "Developed GraphQL & REST APIs for third-party integrations"
        ],
        logo: "/logos/gyftport.png"
    }
];

const SKILLS = {
    Backend: ["Python", "Django", "Redis", "RabbitMQ", "Celery & Beat CRON", "Uvicorn (ASGI)", "GraphQL API", "REST API", "Serverless", "Supabase"],
    Auth: ["JWT", "OAuth2", "Django Auth"],
    OsAndDevops: ["AWS S3", "CloudFront", "EC2 Linux", "Windows", "PM2"],
    Frontend: ["Next.js", "React.js", "Redux", "Zustand", "Hooks", "HTML", "CSS", "JS", "Bootstrap", "Tailwind CSS", "Responsive Design"],
    Tools: ["Postman", "GIT", "Jira", "AI", "Claude code", "Cursor IDE"],
    Database: ["PostgreSQL", "MySQL", "MongoDB"],
    TestingAndQuality: ["Code Reviews", "API Testing", "Manual Testing"]
};

// ── UI Components ───────────────────────────────────────────────────────────
const SectionHeader = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">{title}</h2>
        {subtitle && <p className="text-2xl md:text-3xl font-Case text-white leading-tight">{subtitle}</p>}
    </div>
);

const SkillChain = ({ items }: { items: string[] }) => (
    <div className="flex items-center shrink-0 drop-shadow-[0_0_15px_rgba(16,185,129,0.15)]">
        {items.map((item, idx) => (
            <React.Fragment key={`${item}-${idx}`}>
                <div className="h-[48px] px-6 md:px-8 flex items-center justify-center border-y border-emerald-500/40 bg-transparent shrink-0">
                    <span className="text-lg font-Case text-emerald-50 whitespace-nowrap">{item}</span>
                </div>
                <svg width="60" height="48" viewBox="0 0 60 48" className="shrink-0">
                    <path d="M 0,0.5 C 15,0.5 15,12 30,12 C 45,12 45,0.5 60,0.5" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                    <path d="M 0,47.5 C 15,47.5 15,36 30,36 C 45,36 45,47.5 60,47.5" fill="none" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="1" />
                </svg>
            </React.Fragment>
        ))}
    </div>
);

// ── Main Page ───────────────────────────────────────────────────────────────
export function LandingPage() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [showResume, setShowResume] = useState(false);
    const [selectedResumeFile, setSelectedResumeFile] = useState<File | null>(null);

    // Marquee State
    const topRowSkills = [...SKILLS.Backend, ...SKILLS.Auth, ...SKILLS.OsAndDevops, ...SKILLS.Database];
    const bottomRowSkills = [...SKILLS.Frontend, ...SKILLS.Tools, ...SKILLS.TestingAndQuality];
    const baseX = useMotionValue(0);
    const isDragging = useRef(false);

    useAnimationFrame((_t, delta) => {
        if (!isDragging.current) {
            let moveBy = 0.00015 * delta; // Slower, premium smooth drift
            baseX.set(baseX.get() - moveBy);
        }
    });

    const x = useTransform(baseX, (v) => {
        const wrap = (min: number, max: number, val: number) => {
            const rangeSize = max - min;
            return ((((val - min) % rangeSize) + rangeSize) % rangeSize) + min;
        };
        return `${wrap(-50, -25, v)}%`;
    });

    const reverseX = useTransform(baseX, (v) => {
        const wrap = (min: number, max: number, val: number) => {
            const rangeSize = max - min;
            return ((((val - min) % rangeSize) + rangeSize) % rangeSize) + min;
        };
        return `${wrap(-50, -25, -v)}%`;
    });



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
        <ReactLenis root>
            {/* Premium Fixed Background Underlay */}
            <div className="fixed inset-0 z-0 pointer-events-none">
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
                </AuroraBackground>
            </div>

            {/* Native Scrolling Content Container */}
            <div className="relative z-20 min-h-screen p-4 md:p-8 flex flex-col gap-12 w-full">
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
                        <RevealGrid maskSize={280} className="grid grid-cols-1 md:grid-cols-2">
                            {PROJECTS.map((project, i) => (
                                <RevealCard
                                    key={project.title}
                                    maskSize={280}
                                    className="flex flex-col gap-4 bg-white/5 backdrop-blur-md p-6"
                                >
                                    <div className="flex justify-between items-start">
                                        <div className="w-12 h-12 overflow-hidden flex items-center justify-center">
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
                                    </div>
                                </RevealCard>
                            ))}
                        </RevealGrid>
                    </section>
                </div>

                <div className="max-w-7xl mx-auto w-full flex flex-col gap-24 pt-24 pb-24 text-white">

                    {/* Interactive Premium Widescreen Timeline Section */}
                    <ExperienceSection />

                </div>

                {/* Skills & Expertise Section (Edge to Edge) */}
                <section id="skills" className="w-full pb-20">
                    <div className="max-w-7xl mx-auto w-full">
                        <SectionHeader title="Expertise" subtitle="My Technical Stack" />
                    </div>
                    <div className="w-full h-[200px] md:h-[240px] overflow-hidden relative cursor-grab active:cursor-grabbing mask-horizontal-fade mt-12 py-8">
                        {/* Row 1 (Top) - Reversed, Positive Rotation */}
                        <div className="absolute inset-0 flex items-center justify-start rotate-[8deg] scale-[1.15] origin-center z-10 pointer-events-none">
                            <motion.div
                                className="flex w-[max-content] pointer-events-auto"
                                style={{ x: reverseX }}
                                onPanStart={() => isDragging.current = true}
                                onPanEnd={() => isDragging.current = false}
                                onPan={(_e, info) => {
                                    baseX.set(baseX.get() - info.delta.x * 0.03);
                                }}
                            >
                                <SkillChain items={topRowSkills} />
                                <SkillChain items={topRowSkills} />
                                <SkillChain items={topRowSkills} />
                                <SkillChain items={topRowSkills} />
                            </motion.div>
                        </div>

                        {/* Row 2 (Bottom) - Normal, Negative Rotation */}
                        <div className="absolute inset-0 flex items-center justify-start -rotate-[8deg] scale-[1.15] origin-center z-0 pointer-events-none">
                            <motion.div
                                className="flex w-[max-content] pointer-events-auto"
                                style={{ x }}
                                onPanStart={() => isDragging.current = true}
                                onPanEnd={() => isDragging.current = false}
                                onPan={(_e, info) => {
                                    baseX.set(baseX.get() + info.delta.x * 0.03);
                                }}
                            >
                                <SkillChain items={bottomRowSkills} />
                                <SkillChain items={bottomRowSkills} />
                                <SkillChain items={bottomRowSkills} />
                                <SkillChain items={bottomRowSkills} />
                            </motion.div>
                        </div>
                    </div>
                </section>
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


            </div>
        </ReactLenis>
    );
}
