"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useTransform, useScroll } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

// ── Rich Experience Data ──────────────────────────────────────────────────
interface ExperienceEntry {
    role: string;
    company: string;
    type: string;
    duration: string;
    location: string;
    logo: string;
    description: string;
    achievements: string[];
    tech: string[];
}

const EXPERIENCE_DATA: ExperienceEntry[] = [
    {
        role: "Senior Software Engineer",
        company: "Digistashing Technologies",
        type: "Full-time",
        duration: "Dec 2025 - Present • 6 mos",
        location: "Kolkata • Remote",
        logo: "/logos/Digistashing Technologies.svg",
        description: "Architect and lead developer driving full-stack engineering and AI integration workflows. Designed high-throughput microservices and scalable APIs that connect enterprise partners with core gift card trading mechanisms.",
        achievements: [
            "Architected and deployed the core backend for Gyftport using Django, GraphQL, and Redis/Celery, handling thousands of real-time transactions daily.",
            "Designed high-throughput REST API schemas and led cross-functional engineering teams to implement seamless partner API integrations.",
            "Engineered deep-tech insurance onboarding solutions featuring real-time biometric analysis and automated document compiling."
        ],
        tech: ["React", "Next.js", "Django", "Celery", "PostgreSQL", "Redis", "GraphQL", "AWS"]
    },
    {
        role: "Associate Software Engineer",
        company: "GSSPEC",
        type: "Full-time",
        duration: "Feb 2023 - Jul 2025 • 2 yrs 6 mos",
        location: "Hyderabad, Telangana, India",
        logo: "/logos/gsspec.svg",
        description: "Developed enterprise SaaS financial syncing systems and candidate screening tools. Focused on integrating multiple third-party ERP platforms and optimizing database access performance.",
        achievements: [
            "Integrated complex ERP systems (Tally ERP, Tally Prime, MS Business Central) into the MyFinalyst financial SaaS platform, enabling automated data sync.",
            "Built secure and responsive dashboards with React/Redux that present dense accounting metrics and reports clearly.",
            "Configured AWS infrastructure and deployed high-performance recruitment screening tools with Django, Postgres, and Docker."
        ],
        tech: ["React", "Django", "Python", "Spring Boot", "MySQL", "MongoDB", "AWS", "Docker"]
    }
];

interface ExperienceSectionProps {
    scrollContainerRef?: React.RefObject<HTMLElement>;
}

export function ExperienceSection({ scrollContainerRef }: ExperienceSectionProps = {}) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Use Framer Motion's built-in robust scroll tracker
    const { scrollYProgress } = useScroll({
        target: containerRef,
        container: scrollContainerRef,
        offset: ["start end", "end start"]
    });

    // Map scroll progress to path drawing length (Increase while scrolling)
    const ribbonPathLength = useTransform(scrollYProgress, [0.05, 0.8], [0, 1]);

    // Map scroll progress to a horizontal ribbon translation sweeping left to right
    const ribbonX = useTransform(scrollYProgress, [0, 1], ["-10vw", "10vw"]);

    // Map scroll progress to a subtle vertical float
    const ribbonY = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

    // Bind dashed line flow directly to scroll
    const dashOffset = useTransform(scrollYProgress, [0, 1], [0, -800]);

    // Update active index cleanly based on framer-motion's scroll progress
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            const index = Math.min(
                Math.floor(latest * EXPERIENCE_DATA.length),
                EXPERIENCE_DATA.length - 1
            );
            setActiveIndex(Math.max(0, index));
        });
    }, [scrollYProgress]);

    // Handle smooth scroll centering to parent when title is clicked
    const handleItemClick = (index: number) => {
        if (!containerRef.current) return;
        
        // Since we switched to native window scrolling with Lenis, we use bounding rects
        const rect = containerRef.current.getBoundingClientRect();
        const parentTop = window.scrollY + rect.top;
        const parentHeight = containerRef.current.offsetHeight;

        // Calculate scroll offset based on item index range
        const targetProgress = (index + 0.5) / EXPERIENCE_DATA.length;
        const targetScroll = parentTop + targetProgress * (parentHeight - window.innerHeight);

        window.scrollTo({
            top: targetScroll,
            behavior: "smooth",
        });
    };

    // Horizontal winding path for Desktop
    const desktopPath = "M 100,500 C 400,100 800,900 1400,500 C 1800,100 2100,900 2500,500";
    
    // Vertical looping path for Mobile (perfect 118-degree crossing, pushed down to prevent top cutoff)
    const mobilePath = "M -100,400 C 800,400 600,800 500,1200 C 400,1600 100,1300 500,1200 C 900,1100 900,1800 1000,2400";

    return (
        <section
            id="experience"
            ref={containerRef}
            className="relative z-30 bg-transparent text-white w-full h-[240vh]"
        >
            {/* ── Sticky Viewport Container (Locks scroll inside) ── */}
            <div className="sticky top-0 h-screen w-full flex flex-col justify-center bg-transparent">
                
                {/* ── Giant Winding Emerald Ribbon (Background) ── */}
                <div className="absolute inset-y-0 w-[100vw] left-[50%] -translate-x-[50%] z-0 pointer-events-none select-none overflow-hidden">
                    <motion.div
                        style={{ x: ribbonX, y: ribbonY }}
                        className="absolute w-full h-full top-0 left-0 flex items-center"
                    >
                        {/* ── DESKTOP RIBBON ── */}
                        <svg
                            viewBox="0 0 2400 1000"
                            preserveAspectRatio="none"
                            className="w-[150%] h-[150%] -translate-x-[15%] shrink-0 hidden lg:block"
                        >
                            <defs>
                                <linearGradient id="desktop-ribbon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                                    <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>
                            {/* Main thick organic ribbon body */}
                            <motion.path
                                d={desktopPath}
                                fill="none"
                                stroke="url(#desktop-ribbon-gradient)"
                                strokeWidth="150"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                                style={{ pathLength: ribbonPathLength }}
                            />
                            {/* Flowing white digital pathway overlay */}
                            <motion.path
                                d={desktopPath}
                                fill="none"
                                stroke="#ffffff"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeDasharray="14 26"
                                opacity="0.6"
                                vectorEffect="non-scaling-stroke"
                                style={{ 
                                    pathLength: ribbonPathLength,
                                    strokeDashoffset: dashOffset 
                                }}
                            />
                        </svg>

                        {/* ── MOBILE RIBBON ── */}
                        <svg
                            viewBox="0 0 1000 2400"
                            preserveAspectRatio="none"
                            className="w-[120%] h-[120%] -translate-x-[10%] shrink-0 block lg:hidden"
                        >
                            <defs>
                                <linearGradient id="mobile-ribbon-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity="0.9" />
                                    <stop offset="50%" stopColor="#10b981" stopOpacity="1" />
                                    <stop offset="100%" stopColor="#064e3b" stopOpacity="0.9" />
                                </linearGradient>
                            </defs>
                            <motion.path
                                d={mobilePath}
                                fill="none"
                                stroke="url(#mobile-ribbon-gradient)"
                                strokeWidth="150"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                vectorEffect="non-scaling-stroke"
                                style={{ pathLength: ribbonPathLength }}
                            />
                                <motion.path
                                    d={mobilePath}
                                    fill="none"
                                    stroke="#ffffff"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeDasharray="18 30"
                                    opacity="0.6"
                                    vectorEffect="non-scaling-stroke"
                                    style={{ 
                                        pathLength: ribbonPathLength
                                    }}
                                />
                        </svg>
                    </motion.div>
                </div>

                {/* ── Content Container ── */}
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-4 md:gap-16 mt-16 md:mt-0">
                    {/* Cinematic Widescreen Header */}
                    <div className="flex flex-col gap-1 md:gap-2">
                        <span className="text-[10px] md:text-xs font-Turbine tracking-[0.6em] text-white/60 uppercase">
                            Professional Path
                        </span>
                        <h2 className="text-3xl md:text-6xl font-SuperPunch text-white tracking-wide uppercase">
                            Work Experience
                        </h2>
                    </div>

                    {/* ── Unified Layout (Desktop & Mobile) ── */}
                    <div className="flex flex-col lg:grid lg:grid-cols-12 gap-3 md:gap-6 lg:gap-12 xl:gap-20 items-start lg:items-center w-full">
                        
                        {/* Top/Left Column: Interactive Typographic Milestones */}
                        <div className="w-full lg:col-span-5 flex flex-col gap-2 lg:gap-8">
                            <div className="flex flex-col relative pl-4 border-l border-zinc-900/60">
                                {EXPERIENCE_DATA.map((job, idx) => {
                                    const isActive = activeIndex === idx;
                                    return (
                                        <div
                                            key={job.company}
                                            onClick={() => handleItemClick(idx)}
                                            className="group relative py-2 lg:py-8 cursor-pointer transition-all duration-700 flex items-center gap-3 lg:gap-8"
                                        >
                                            {/* Progress / Year marker like high-end portfolio */}
                                            <span className={`text-xs md:text-base font-Turbine transition-all duration-700 w-12 md:w-16 shrink-0 tracking-wider ${
                                                isActive ? "text-white font-black" : "text-white/10"
                                            }`}>
                                                ({idx === 0 ? "35" : "38"})
                                            </span>

                                            {/* Typography Role Title */}
                                            <h3
                                                className={`text-xl md:text-3xl xl:text-4xl font-black font-Case tracking-widest uppercase transition-all duration-700 ${
                                                    isActive
                                                        ? "text-white scale-100"
                                                        : "text-white/10 group-hover:text-white/30"
                                                }`}
                                            >
                                                {job.company}
                                            </h3>

                                            {/* Left margin visual line for active item */}
                                            {isActive && (
                                                <motion.div
                                                    layoutId="activeBar"
                                                    className="absolute left-[-17px] top-0 bottom-0 w-[3px] bg-white"
                                                    transition={{ type: "spring", stiffness: 100, damping: 18 }}
                                                />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Bottom/Right Column: Premium Animated Detail Card */}
                        <div className="w-full lg:col-span-7 mt-4 lg:mt-0">
                            <div className="relative">
                                {/* Ambient Glow */}
                                <div className="hidden md:block absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500/10 to-transparent blur-2xl opacity-40 pointer-events-none select-none" />

                                <div className="relative overflow-hidden rounded-2xl md:rounded-3xl border border-zinc-800/40 bg-zinc-950/60 md:bg-zinc-950/20 backdrop-blur-md md:backdrop-blur-xl p-4 md:p-8 xl:p-12 shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, y: 15 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -15 }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                            className="flex flex-col gap-6"
                                        >
                                            {/* Details Header */}
                                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-zinc-900/60">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-14 h-14 rounded-2xl bg-zinc-950/60 border border-zinc-800/50 flex items-center justify-center p-2.5 overflow-hidden shadow-inner relative">
                                                        {EXPERIENCE_DATA[activeIndex].logo.startsWith("/") ? (
                                                            <img
                                                                src={EXPERIENCE_DATA[activeIndex].logo}
                                                                alt={`${EXPERIENCE_DATA[activeIndex].company} logo`}
                                                                className="w-full h-full object-contain filter invert opacity-80"
                                                            />
                                                        ) : (
                                                            <span className="text-2xl">{EXPERIENCE_DATA[activeIndex].logo}</span>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <h4 className="text-xl md:text-2xl font-black font-Case tracking-tight text-white leading-tight">
                                                            {EXPERIENCE_DATA[activeIndex].role}
                                                        </h4>
                                                        <p className="text-base font-Case font-bold text-white/60 mt-0.5">
                                                            {EXPERIENCE_DATA[activeIndex].company}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col sm:items-end gap-1.5 shrink-0">
                                                    <span className="text-[9px] font-Turbine font-black tracking-[0.2em] text-white uppercase px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 w-fit">
                                                        {EXPERIENCE_DATA[activeIndex].type}
                                                    </span>
                                                    <span className="text-[10px] font-Turbine font-bold text-white tracking-wider flex items-center gap-1.5 mt-1">
                                                        <MapPin size={11} />
                                                        {EXPERIENCE_DATA[activeIndex].location}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Core Description */}
                                            <div className="flex flex-col gap-3">
                                                <div className="flex items-center gap-2 text-[10px] font-Turbine font-bold text-white tracking-widest uppercase">
                                                    <Calendar size={11} />
                                                    <span>{EXPERIENCE_DATA[activeIndex].duration}</span>
                                                </div>
                                                <p className="text-sm md:text-base text-white font-Turbine leading-relaxed font-light">
                                                    {EXPERIENCE_DATA[activeIndex].description}
                                                </p>
                                            </div>

                                            {/* Key Achievements */}
                                            <div className="flex flex-col gap-3">
                                                <h5 className="text-[9px] font-Turbine font-black tracking-[0.3em] text-white uppercase">
                                                    Selected Achievements
                                                </h5>
                                                <ul className="space-y-3">
                                                    {EXPERIENCE_DATA[activeIndex].achievements.map((ach, i) => (
                                                        <li key={i} className="flex items-start gap-3.5 text-xs md:text-sm text-white font-Turbine leading-relaxed font-light">
                                                            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0 shadow-[0_0_8px_#10b981]" />
                                                            <span>{ach}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>

                                            {/* Technologies Used */}
                                            <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-900/60">
                                                <h5 className="text-[9px] font-Turbine font-black tracking-[0.3em] text-emerald-500 uppercase">
                                                    Technologies Used
                                                </h5>
                                                <div className="flex flex-wrap gap-2">
                                                    {EXPERIENCE_DATA[activeIndex].tech.map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="text-[9px] font-Turbine font-bold tracking-wider uppercase bg-zinc-950/60 border border-zinc-800/40 text-zinc-400 px-2.5 py-1.5 rounded hover:border-emerald-500/30 hover:text-white transition-colors duration-300"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
