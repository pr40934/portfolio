import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Cpu, MonitorSmartphone, Cloud, Settings, Key, Database } from "lucide-react";

const SKILLS_DATA = [
    { id: "backend", title: "Backend Architecture", icon: <Cpu className="w-48 h-48 md:w-80 md:h-80 text-emerald-500/10" />, skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"], accent: "bg-emerald-600" },
    { id: "frontend", title: "Frontend Mastery", icon: <MonitorSmartphone className="w-48 h-48 md:w-80 md:h-80 text-teal-500/10" />, skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"], accent: "bg-teal-600" },
    { id: "devops", title: "Cloud & DevOps", icon: <Cloud className="w-48 h-48 md:w-80 md:h-80 text-cyan-500/10" />, skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"], accent: "bg-cyan-600" },
    { id: "tools", title: "Tooling & AI", icon: <Settings className="w-48 h-48 md:w-80 md:h-80 text-emerald-500/10" />, skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"], accent: "bg-emerald-500" },
    { id: "auth", title: "Auth & Security", icon: <Key className="w-48 h-48 md:w-80 md:h-80 text-teal-500/10" />, skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"], accent: "bg-teal-500" },
    { id: "database", title: "Data Systems", icon: <Database className="w-48 h-48 md:w-80 md:h-80 text-cyan-500/10" />, skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"], accent: "bg-cyan-500" }
];

export const SkillsHorizontalScroll = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    
    // We create a container that is very tall (400vh) to give us a long scroll distance
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    // Smooth the scroll progress so the horizontal movement has a nice spring physics feel
    const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, mass: 0.5 });

    // Map the vertical scroll progress (0 to 1) into horizontal movement
    // Since we have 6 cards, moving -80% roughly shifts them all the way to the end
    const x = useTransform(smoothProgress, [0, 1], ["0%", "-75%"]);

    return (
        <div className="w-full relative mt-12 z-20">
            {/* Standard Header */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 relative z-30">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">Expertise</h2>
                    <p className="text-4xl md:text-5xl font-Case text-white leading-tight">My Technical Stack</p>
                </div>
            </div>

            {/* The Scroll-jacking Container */}
            <section ref={targetRef} className="relative h-[400vh] w-full">
                
                {/* The Sticky "Camera" Viewport */}
                <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
                    
                    {/* The Horizontal Track */}
                    <motion.div style={{ x }} className="flex gap-12 md:gap-24 px-12 md:px-[10vw]">
                        {SKILLS_DATA.map((data, index) => {
                            
                            // Parallax effect INSIDE the cards based on the same scroll
                            const itemProgressRange = [index * 0.15 - 0.2, index * 0.15 + 0.2];
                            const innerX = useTransform(smoothProgress, itemProgressRange, ["-10%", "10%"]);
                            const innerScale = useTransform(smoothProgress, itemProgressRange, [0.8, 1.1]);

                            return (
                                <div 
                                    key={data.id} 
                                    className="group relative w-[85vw] md:w-[450px] h-[550px] md:h-[600px] shrink-0 rounded-[40px] bg-[#020e08] border border-white/5 overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-10 hover:border-white/20 transition-colors duration-500"
                                >
                                    {/* Massive Layer Blur Gradient (Figma Style) */}
                                    <div className={`absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-[100%] ${data.accent} blur-[100px] md:blur-[140px] opacity-60 pointer-events-none group-hover:opacity-100 transition-opacity duration-700`} />
                                    
                                    {/* Massive Parallax Background Icon */}
                                    <motion.div 
                                        style={{ x: innerX, scale: innerScale }}
                                        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 pointer-events-none origin-center"
                                    >
                                        {data.icon}
                                    </motion.div>

                                    {/* Card Header */}
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-5xl md:text-6xl font-Case text-white/20">0{index + 1}</span>
                                            <h3 className="text-3xl md:text-4xl font-Case text-white tracking-tight leading-none">
                                                {data.title.split(' ')[0]} <br />
                                                <span className="text-white/60">{data.title.split(' ').slice(1).join(' ')}</span>
                                            </h3>
                                        </div>
                                    </div>

                                    {/* Skills Tags (Bottom Aligned) */}
                                    <div className="relative z-10 w-full">
                                        <div className="flex flex-wrap gap-3">
                                            {data.skills.map((skill, i) => (
                                                <div 
                                                    key={skill} 
                                                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-Turbine text-sm md:text-base backdrop-blur-md shadow-sm hover:bg-white/10 hover:border-white/30 hover:text-white transition-all cursor-default"
                                                >
                                                    {skill}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    
                                </div>
                            );
                        })}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
