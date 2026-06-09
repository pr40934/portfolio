import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { Server, Layout, ShieldCheck, HardDrive, Wrench, Database } from "lucide-react";

const SKILLS_DATA = [
    {
        title: "Backend",
        icon: <Server className="w-8 h-8 text-emerald-400" />,
        skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"],
    },
    {
        title: "Frontend",
        icon: <Layout className="w-8 h-8 text-emerald-400" />,
        skills: ["Next.js", "React.js", "Zustand", "HTML/CSS", "Tailwind", "Responsive"],
    },
    {
        title: "DevOps & OS",
        icon: <HardDrive className="w-8 h-8 text-emerald-400" />,
        skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker"],
    },
    {
        title: "Tools & AI",
        icon: <Wrench className="w-8 h-8 text-emerald-400" />,
        skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE"],
    },
    {
        title: "Auth",
        icon: <ShieldCheck className="w-8 h-8 text-emerald-400" />,
        skills: ["JWT", "OAuth2", "Session Auth", "Security"],
    },
    {
        title: "Databases",
        icon: <Database className="w-8 h-8 text-emerald-400" />,
        skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis"],
    }
];

const HoloCard = ({ data, index }: { data: typeof SKILLS_DATA[0], index: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
    const rotateX = useSpring(useTransform(mouseY, [-1, 1], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-15, 15]), springConfig);

    const glareX = useSpring(useTransform(mouseX, [-1, 1], [100, 0]), springConfig);
    const glareY = useSpring(useTransform(mouseY, [-1, 1], [100, 0]), springConfig);

    const glareBackground = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.8) 10%, rgba(16,185,129,0.4) 40%, transparent 60%)`;
    
    // Iridescent foil position
    const foilPositionX = useSpring(useTransform(mouseX, [-1, 1], [0, 100]), springConfig);
    const foilPositionY = useSpring(useTransform(mouseY, [-1, 1], [0, 100]), springConfig);
    const foilBackgroundPosition = useMotionTemplate`${foilPositionX}% ${foilPositionY}%`;

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const normalizedX = (e.clientX - centerX) / (rect.width / 2);
        const normalizedY = (e.clientY - centerY) / (rect.height / 2);

        mouseX.set(normalizedX);
        mouseY.set(normalizedY);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        mouseX.set(0);
        mouseY.set(0);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            style={{ perspective: 1200 }}
            className="w-full flex justify-center"
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className={`relative w-full max-w-[320px] aspect-[3/4] rounded-2xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl overflow-hidden cursor-pointer group`}
            >
                {/* Holographic Glare Layer */}
                <motion.div
                    className="absolute inset-0 z-20 pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: glareBackground }}
                />
                
                {/* Iridescent Foil Effect */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-color-dodge opacity-0 group-hover:opacity-[0.15] transition-opacity duration-300"
                    style={{
                        background: `linear-gradient(105deg, transparent 20%, #10b981 25%, #6ee7b7 45%, #10b981 55%, transparent 60%)`,
                        backgroundSize: "200% 200%",
                        backgroundPosition: foilBackgroundPosition,
                    }}
                />

                {/* Card Content (Lifted in 3D) */}
                <div 
                    className="absolute inset-0 p-8 flex flex-col items-center justify-start z-30"
                    style={{ transform: "translateZ(40px)" }}
                >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                        {data.icon}
                    </div>
                    
                    <h3 className="text-2xl font-Case tracking-wide text-white mb-8 text-center drop-shadow-md">
                        {data.title}
                    </h3>
                    
                    <div className="w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />
                    
                    <div className="flex flex-wrap gap-2 justify-center mt-auto w-full">
                        {data.skills.map(skill => (
                            <span 
                                key={skill}
                                className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm font-Turbine text-white/80 whitespace-nowrap backdrop-blur-md"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Cyberpunk Edges */}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </motion.div>
    );
};

export const SkillsHoloCards = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
                {SKILLS_DATA.map((data, idx) => (
                    <HoloCard key={data.title} data={data} index={idx} />
                ))}
            </div>
        </div>
    );
};
