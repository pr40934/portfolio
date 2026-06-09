import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Server, Layout, ShieldCheck, HardDrive, Wrench, Database } from "lucide-react";

const SKILLS_DATA = [
    {
        title: "Backend",
        icon: <Server className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"],
        bgImage: "radial-gradient(circle at bottom left, rgba(16,185,129,0.15) 0%, transparent 60%)"
    },
    {
        title: "Frontend",
        icon: <Layout className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["Next.js", "React.js", "Zustand", "HTML/CSS", "Tailwind", "Responsive Design"],
        bgImage: "radial-gradient(circle at bottom left, rgba(52,211,153,0.15) 0%, transparent 60%)"
    },
    {
        title: "DevOps",
        icon: <HardDrive className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"],
        bgImage: "radial-gradient(circle at bottom left, rgba(4,120,87,0.15) 0%, transparent 60%)"
    },
    {
        title: "Tools & AI",
        icon: <Wrench className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"],
        bgImage: "radial-gradient(circle at bottom left, rgba(16,185,129,0.15) 0%, transparent 60%)"
    },
    {
        title: "Auth & Sec",
        icon: <ShieldCheck className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"],
        bgImage: "radial-gradient(circle at bottom left, rgba(52,211,153,0.15) 0%, transparent 60%)"
    },
    {
        title: "Databases",
        icon: <Database className="w-6 h-6 md:w-8 md:h-8 text-emerald-400" />,
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"],
        bgImage: "radial-gradient(circle at bottom left, rgba(4,120,87,0.15) 0%, transparent 60%)"
    }
];

const AccordionItem = ({ data, isActive, onClick }: { data: typeof SKILLS_DATA[0], isActive: boolean, onClick: () => void }) => {
    return (
        <motion.div
            onClick={onClick}
            initial={false}
            animate={{
                width: isActive ? "50%" : "10%",
                opacity: 1
            }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
            style={{ background: isActive ? data.bgImage : "transparent" }}
            className={`relative h-[400px] md:h-[450px] cursor-pointer overflow-hidden rounded-3xl border ${isActive ? 'border-emerald-500/40 bg-zinc-900' : 'border-white/10 bg-white/5'} backdrop-blur-md group hover:border-emerald-500/20 transition-colors duration-300`}
        >
            {/* Background Oversized Icon */}
            <div className={`absolute -right-12 -bottom-12 opacity-[0.02] pointer-events-none transition-transform duration-700 origin-bottom-right ${isActive ? 'scale-[6]' : 'scale-[3]'}`}>
                {data.icon}
            </div>

            <div className="absolute inset-0 p-4 md:p-8 flex flex-col justify-end">
                <div className="flex items-center gap-4">
                    <div className={`p-3 md:p-4 rounded-2xl transition-colors duration-500 shrink-0 ${isActive ? 'bg-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 'bg-white/5 group-hover:bg-white/10'}`}>
                        {data.icon}
                    </div>
                    
                    {/* Horizontal Text when open */}
                    <AnimatePresence>
                        {isActive && (
                            <motion.h3 
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, delay: 0.2 }}
                                className="text-2xl md:text-3xl font-Case text-white whitespace-nowrap"
                            >
                                {data.title}
                            </motion.h3>
                        )}
                    </AnimatePresence>
                </div>

                {/* Vertical Text when closed */}
                <div className={`absolute bottom-24 left-1/2 -translate-x-1/2 whitespace-nowrap -rotate-90 origin-left transition-opacity duration-300 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
                    <span className="text-lg md:text-xl font-Case tracking-widest text-white/40 group-hover:text-white/80 transition-colors">{data.title}</span>
                </div>

                {/* Expanded Content: The Skills */}
                <AnimatePresence>
                    {isActive && (
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20, transition: { duration: 0.2 } }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="mt-6 md:mt-8 mb-2 w-full"
                        >
                            <div className="flex flex-wrap gap-2 md:gap-3">
                                {data.skills.map(skill => (
                                    <span 
                                        key={skill}
                                        className="px-3 py-1.5 md:px-4 md:py-2 bg-black/40 border border-emerald-500/20 rounded-xl text-xs md:text-sm font-Turbine text-emerald-50 whitespace-nowrap backdrop-blur-md shadow-lg hover:border-emerald-500/60 hover:bg-emerald-500/10 transition-all cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export const SkillsAccordion = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 py-8">
            <div className="flex w-full gap-2 md:gap-4 h-[400px] md:h-[450px]">
                {SKILLS_DATA.map((data, idx) => (
                    <AccordionItem 
                        key={data.title} 
                        data={data} 
                        isActive={activeIndex === idx} 
                        onClick={() => setActiveIndex(idx)} 
                    />
                ))}
            </div>
        </div>
    );
};
