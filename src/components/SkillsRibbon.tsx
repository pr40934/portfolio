import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Cpu, MonitorSmartphone, Cloud, Settings, Key, Database } from "lucide-react";

// Original SKILLS_DATA
const SKILLS_DATA = [
    { id: "backend", titleLine1: "Backend", titleLine2: "Architecture", icon: Cpu, skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"], accent: "bg-emerald-600", shadow: "shadow-emerald-500/20" },
    { id: "frontend", titleLine1: "Frontend", titleLine2: "Mastery", icon: MonitorSmartphone, skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"], accent: "bg-teal-600", shadow: "shadow-teal-500/20" },
    { id: "devops", titleLine1: "Cloud", titleLine2: "& DevOps", icon: Cloud, skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"], accent: "bg-cyan-600", shadow: "shadow-cyan-500/20" },
    { id: "tools", titleLine1: "Tooling", titleLine2: "& AI", icon: Settings, skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"], accent: "bg-emerald-500", shadow: "shadow-emerald-500/20" },
    { id: "auth", titleLine1: "Auth", titleLine2: "& Security", icon: Key, skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"], accent: "bg-teal-500", shadow: "shadow-teal-500/20" },
    { id: "database", titleLine1: "Data", titleLine2: "Systems", icon: Database, skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"], accent: "bg-cyan-500", shadow: "shadow-cyan-500/20" },
] as const;

// Flattened node structure
interface SkillNode {
    id: string;
    type: 'category' | 'skill';
    text: string;
    accent: string;
    shadow: string;
    icon?: React.ComponentType<any>;
}

// Cubic Bezier curve control points corresponding to the SVG path below
const BEZIER_CURVES: [ [number, number], [number, number], [number, number], [number, number] ][] = [
    [[-10, 100], [40, 100], [60, 100], [60, 200]],
    [[60, 200], [60, 350], [20, 350], [20, 500]],
    [[20, 500], [20, 650], [80, 650], [80, 800]],
    [[80, 800], [80, 950], [40, 950], [40, 1100]],
    [[40, 1100], [40, 1200], [70, 1200], [70, 1300]],
    [[70, 1300], [70, 1400], [15, 1400], [15, 1500]],
    [[15, 1500], [15, 1550], [110, 1550], [120, 1600]]
];

// Helper to evaluate a cubic bezier curve at parameter t [0, 1]
function getBezierPoint(
    t: number,
    p0: [number, number],
    p1: [number, number],
    p2: [number, number],
    p3: [number, number]
): [number, number] {
    const mt = 1 - t;
    const mt2 = mt * mt;
    const mt3 = mt2 * mt;
    const t2 = t * t;
    const t3 = t2 * t;

    const x = mt3 * p0[0] + 3 * mt2 * t * p1[0] + 3 * mt * t2 * p2[0] + t3 * p3[0];
    const y = mt3 * p0[1] + 3 * mt2 * t * p1[1] + 3 * mt * t2 * p2[1] + t3 * p3[1];
    return [x, y];
}

// Helper to find (x, y) coordinates on the snaking path for a given yTarget
function getPointForY(yTarget: number): [number, number] {
    const segmentYRanges = [
        { start: 100, end: 200 },
        { start: 200, end: 500 },
        { start: 500, end: 800 },
        { start: 800, end: 1100 },
        { start: 1100, end: 1300 },
        { start: 1300, end: 1500 },
        { start: 1500, end: 1600 }
    ];
    
    let segmentIdx = 0;
    for (let i = 0; i < 7; i++) {
        if (yTarget >= segmentYRanges[i].start && yTarget <= segmentYRanges[i].end) {
            segmentIdx = i;
            break;
        }
        if (i === 6) segmentIdx = 6;
    }
    
    const curve = BEZIER_CURVES[segmentIdx];
    
    // Binary search for t in [0, 1] to match yTarget
    let low = 0;
    let high = 1;
    let x = 0;
    
    for (let iter = 0; iter < 12; iter++) {
        const mid = (low + high) / 2;
        const pt = getBezierPoint(mid, curve[0], curve[1], curve[2], curve[3]);
        x = pt[0];
        const y = pt[1];
        if (y < yTarget) {
            low = mid;
        } else {
            high = mid;
        }
    }
    
    return [x, yTarget];
}

// Generate flattened list of items
const FLATTENED_SKILLS: SkillNode[] = [];
SKILLS_DATA.forEach((cat) => {
    // Add category title
    FLATTENED_SKILLS.push({
        id: cat.id,
        type: 'category',
        text: `${cat.titleLine1} ${cat.titleLine2}`,
        accent: cat.accent,
        shadow: cat.shadow,
        icon: cat.icon,
    });
    // Add its skills
    cat.skills.forEach((skill, idx) => {
        FLATTENED_SKILLS.push({
            id: `${cat.id}-skill-${idx}-${skill}`,
            type: 'skill',
            text: skill,
            accent: cat.accent,
            shadow: cat.shadow,
        });
    });
});

// Map items to coordinates along the path with even Y spacing
const yStart = 140;
const yEnd = 1550;
const yRange = yEnd - yStart;

const SKILL_NODES_WITH_POSITIONS = FLATTENED_SKILLS.map((item, index) => {
    const yTarget = yStart + (index / (FLATTENED_SKILLS.length - 1)) * yRange;
    const [x, y] = getPointForY(yTarget);
    return {
        ...item,
        x,
        y,
        topPercent: (y / 1600) * 100,
        leftPercent: x,
        isLeft: x > 50 // if curve is on right half, put badge on left side of curve
    };
});

function getColorClasses(accent: string) {
    if (accent.includes('emerald')) {
        return {
            border: 'border-emerald-500/20 hover:border-emerald-400/50',
            dot: 'bg-emerald-500 shadow-[0_0_12px_#10b981,0_0_20px_rgba(16,185,129,0.4)]',
            text: 'text-emerald-400',
            bg: 'bg-emerald-950/25 hover:bg-emerald-950/40 border border-emerald-500/20 hover:border-emerald-400/50 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
            categoryBorder: 'border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.25),inset_0_1px_2px_rgba(255,255,255,0.15)]',
            categoryBg: 'bg-emerald-950/45 hover:bg-emerald-950/60 backdrop-blur-xl',
            line: 'from-emerald-500/50 to-transparent'
        };
    } else if (accent.includes('teal')) {
        return {
            border: 'border-teal-500/20 hover:border-teal-400/50',
            dot: 'bg-teal-500 shadow-[0_0_12px_#14b8a6,0_0_20px_rgba(20,184,166,0.4)]',
            text: 'text-teal-400',
            bg: 'bg-teal-950/25 hover:bg-teal-950/40 border border-teal-500/20 hover:border-teal-400/50 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
            categoryBorder: 'border border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.25),inset_0_1px_2px_rgba(255,255,255,0.15)]',
            categoryBg: 'bg-teal-950/45 hover:bg-teal-950/60 backdrop-blur-xl',
            line: 'from-teal-500/50 to-transparent'
        };
    } else {
        // cyan
        return {
            border: 'border-cyan-500/20 hover:border-cyan-400/50',
            dot: 'bg-cyan-500 shadow-[0_0_12px_#06b6d4,0_0_20px_rgba(6,182,212,0.4)]',
            text: 'text-cyan-400',
            bg: 'bg-cyan-950/25 hover:bg-cyan-950/40 border border-cyan-500/20 hover:border-cyan-400/50 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.3)]',
            categoryBorder: 'border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25),inset_0_1px_2px_rgba(255,255,255,0.15)]',
            categoryBg: 'bg-cyan-950/45 hover:bg-cyan-950/60 backdrop-blur-xl',
            line: 'from-cyan-500/50 to-transparent'
        };
    }
}

export function SkillsRibbon() {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Ribbon draws as you scroll down the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"] 
    });

    return (
        <section ref={containerRef} className="relative w-full max-w-6xl mx-auto bg-black/0 z-20 mt-12 mb-32 h-[2600px] md:h-[3600px]">
            
            {/* Headers (Left aligned to match ExperienceSection) */}
            <div className="absolute top-[2%] md:top-[3%] left-0 w-full z-30 pointer-events-none px-6 md:px-12">
                <div className="flex flex-col gap-1 md:gap-2 max-w-7xl mx-auto">
                    <span className="text-[10px] md:text-xs font-Turbine tracking-[0.6em] text-white/60 uppercase">
                        Expertise
                    </span>
                    <h2 className="text-3xl md:text-6xl font-Case text-white tracking-wide uppercase">
                        My Technical Stack
                    </h2>
                </div>
            </div>

            {/* SVG Snaking Ribbon */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                <svg viewBox="0 0 100 1600" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                        <linearGradient id="vertRibbonGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="30%" stopColor="#14b8a6" />
                            <stop offset="70%" stopColor="#06b6d4" />
                            <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                        <filter id="ribbonGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Background track (Thick translucent glass track) */}
                    <path 
                        d="M -10 100 C 40 100, 60 100, 60 200 C 60 350, 20 350, 20 500 C 20 650, 80 650, 80 800 C 80 950, 40 950, 40 1100 C 40 1200, 70 1200, 70 1300 C 70 1400, 15 1400, 15 1500 C 15 1550, 110 1550, 120 1600"
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.05)" 
                        strokeWidth="14"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                    />
                    
                    {/* Background Neon Aura (Animated, glow blurred) */}
                    <motion.path 
                        d="M -10 100 C 40 100, 60 100, 60 200 C 60 350, 20 350, 20 500 C 20 650, 80 650, 80 800 C 80 950, 40 950, 40 1100 C 40 1200, 70 1200, 70 1300 C 70 1400, 15 1400, 15 1500 C 15 1550, 110 1550, 120 1600"
                        fill="none" 
                        stroke="url(#vertRibbonGrad)" 
                        strokeWidth="20"
                        opacity="0.15"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        style={{ pathLength: scrollYProgress }}
                        filter="url(#ribbonGlow)"
                    />

                    {/* Main Core Ribbon (Animated, colored glass glow) */}
                    <motion.path 
                        d="M -10 100 C 40 100, 60 100, 60 200 C 60 350, 20 350, 20 500 C 20 650, 80 650, 80 800 C 80 950, 40 950, 40 1100 C 40 1200, 70 1200, 70 1300 C 70 1400, 15 1400, 15 1500 C 15 1550, 110 1550, 120 1600"
                        fill="none" 
                        stroke="url(#vertRibbonGrad)" 
                        strokeWidth="8"
                        opacity="0.8"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        style={{ pathLength: scrollYProgress }}
                    />

                    {/* Ribbon Specular Edge Reflection (Animated, white glass sheen) */}
                    <motion.path 
                        d="M -10 100 C 40 100, 60 100, 60 200 C 60 350, 20 350, 20 500 C 20 650, 80 650, 80 800 C 80 950, 40 950, 40 1100 C 40 1200, 70 1200, 70 1300 C 70 1400, 15 1400, 15 1500 C 15 1550, 110 1550, 120 1600"
                        fill="none" 
                        stroke="rgba(255, 255, 255, 0.45)" 
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        strokeLinecap="round"
                        style={{ pathLength: scrollYProgress }}
                    />
                </svg>
            </div>

            {/* The Nodes */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
                {SKILL_NODES_WITH_POSITIONS.map((node) => {
                    const colors = getColorClasses(node.accent);
                    const isLeft = node.isLeft;

                    return (
                        <div
                            key={node.id}
                            className="absolute z-10 w-0 h-0 pointer-events-none"
                            style={{ top: `${node.topPercent}%`, left: `${node.leftPercent}%` }}
                        >
                            {/* The Dot on the Ribbon */}
                            <div className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full z-20 transition-all duration-300 pointer-events-auto ${
                                node.type === 'category'
                                    ? `${colors.dot} w-3 h-3 md:w-4.5 md:h-4.5`
                                    : `${colors.dot} w-1.5 h-1.5 md:w-2 md:h-2 opacity-80 hover:opacity-100`
                            }`} />

                            {/* The Badge Container (Left or Right based on curve x position) */}
                            <motion.div
                                initial={{ opacity: 0, x: isLeft ? -25 : 25, scale: 0.9 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: false, amount: 0.1, margin: "-10%" }}
                                transition={{ type: "spring", stiffness: 100, damping: 15 }}
                                className={`absolute flex items-center -translate-y-1/2 pointer-events-auto ${
                                    isLeft
                                        ? 'right-[8px] md:right-[14px] flex-row-reverse text-right'
                                        : 'left-[8px] md:left-[14px] flex-row text-left'
                                }`}
                            >
                                {/* Connector Line */}
                                <div className={`h-[1px] w-3 md:w-8 flex-shrink-0 bg-gradient-to-r ${
                                    isLeft 
                                        ? 'bg-gradient-to-l' 
                                        : 'bg-gradient-to-r'
                                } ${colors.line}`} />

                                {/* Badge */}
                                {node.type === 'category' ? (
                                    <div className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-Case text-white flex items-center gap-2 ${colors.categoryBg} ${colors.categoryBorder} hover:scale-105 transition-transform duration-300`}>
                                        {node.icon && <node.icon className={`w-3.5 h-3.5 md:w-4 md:h-4 ${colors.text}`} />}
                                        <span className="text-[10px] md:text-[12px] font-bold uppercase tracking-wider whitespace-nowrap">
                                            {node.text}
                                        </span>
                                    </div>
                                ) : (
                                    <div className={`px-2 py-1 md:px-3 md:py-1.5 rounded-md font-Case text-white/95 text-[9px] md:text-[11px] ${colors.bg} hover:text-white hover:scale-105 transition-all duration-300`}>
                                        <span className="whitespace-nowrap font-medium">
                                            {node.text}
                                        </span>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}

