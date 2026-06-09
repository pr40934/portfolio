import React, { useState, useRef, useEffect } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";
import { Server, Layout, HardDrive, Wrench, ShieldCheck, Database } from "lucide-react";

const SKILLS_DATA = [
    { id: "backend", title: "Backend", icon: <Server className="w-12 h-12 text-emerald-400" />, skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"] },
    { id: "frontend", title: "Frontend", icon: <Layout className="w-12 h-12 text-emerald-400" />, skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"] },
    { id: "devops", title: "DevOps", icon: <HardDrive className="w-12 h-12 text-emerald-400" />, skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"] },
    { id: "tools", title: "Tools", icon: <Wrench className="w-12 h-12 text-emerald-400" />, skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"] },
    { id: "auth", title: "Auth", icon: <ShieldCheck className="w-12 h-12 text-emerald-400" />, skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"] },
    { id: "database", title: "Databases", icon: <Database className="w-12 h-12 text-emerald-400" />, skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] }
];

export const SkillsAwwwards = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Cursor follower springs (high stiffness for responsiveness, low damping for smooth tail)
    const mouseX = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });
    const mouseY = useSpring(0, { stiffness: 150, damping: 15, mass: 0.5 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        // Calculate relative position inside the container
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    return (
        <div 
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredIndex(null)}
            className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 py-20 relative min-h-[70vh] flex flex-col justify-center"
        >
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.05)_0%,transparent_70%)] opacity-50" />

            {/* Massive Kinetic Typography List */}
            <div className="flex flex-col w-full relative z-10">
                {SKILLS_DATA.map((data, idx) => {
                    const isHovered = hoveredIndex === idx;
                    const isAnyHovered = hoveredIndex !== null;

                    return (
                        <div 
                            key={data.id}
                            onMouseEnter={() => setHoveredIndex(idx)}
                            className="group relative border-b border-white/10 py-8 md:py-12 cursor-pointer flex flex-col md:flex-row md:items-center justify-between overflow-hidden"
                        >
                            {/* Hover background slide effect */}
                            <div 
                                className={`absolute inset-0 bg-white/[0.02] origin-left transition-transform duration-700 ease-[0.32,0.72,0,1] ${isHovered ? 'scale-x-100' : 'scale-x-0'}`}
                            />

                            <h2 
                                className={`relative z-10 text-5xl md:text-[8rem] font-Case tracking-tighter uppercase leading-none transition-all duration-700 ease-[0.32,0.72,0,1]
                                ${isHovered ? 'translate-x-4 md:translate-x-8' : 'translate-x-0'}`}
                                style={{
                                    WebkitTextStroke: isHovered ? '0px' : '1px rgba(255,255,255,0.2)',
                                    color: isHovered ? '#ffffff' : 'transparent',
                                    opacity: isAnyHovered && !isHovered ? 0.3 : 1
                                }}
                            >
                                {data.title}
                            </h2>

                            {/* Mobile Skills Reveal (Hidden on Desktop) */}
                            <div className="md:hidden mt-4 pl-4 overflow-hidden">
                                <AnimatePresence>
                                    {isHovered && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-wrap gap-2 pt-4"
                                        >
                                            {data.skills.map(skill => (
                                                <span key={skill} className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-sm font-Turbine">
                                                    {skill}
                                                </span>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Floating Glass Panel (Desktop Only) */}
            <motion.div
                className="pointer-events-none absolute left-0 top-0 z-50 hidden md:flex flex-col gap-6 p-8 rounded-3xl bg-zinc-950/80 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5),0_0_20px_rgba(16,185,129,0.1)] w-[400px]"
                style={{
                    x: mouseX,
                    y: mouseY,
                    // Offset slightly to the bottom right of the cursor
                    translateX: "20px",
                    translateY: "-50%",
                    opacity: hoveredIndex !== null ? 1 : 0,
                    scale: hoveredIndex !== null ? 1 : 0.8,
                }}
                transition={{ 
                    opacity: { duration: 0.3, ease: "easeOut" }, 
                    scale: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] } 
                }}
            >
                {hoveredIndex !== null && (
                    <>
                        <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                                {SKILLS_DATA[hoveredIndex].icon}
                            </div>
                            <h3 className="text-3xl font-Case text-white tracking-wide">
                                {SKILLS_DATA[hoveredIndex].title}
                            </h3>
                        </div>
                        
                        <div className="flex flex-wrap gap-3">
                            {SKILLS_DATA[hoveredIndex].skills.map((skill, i) => (
                                <motion.span 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    key={skill} 
                                    className="px-4 py-2 bg-white/5 border border-white/10 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-colors rounded-xl text-sm text-emerald-50 font-Turbine shadow-sm"
                                >
                                    {skill}
                                </motion.span>
                            ))}
                        </div>
                    </>
                )}
            </motion.div>
        </div>
    );
};
