import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Server, Layout, HardDrive, Wrench, ShieldCheck, Database } from "lucide-react";

const SKILLS_DATA = [
    { id: "backend", title: "Backend Architecture", icon: <Server className="w-16 h-16" />, skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"], color: "from-emerald-900/40 to-emerald-950/40", stroke: "border-emerald-500/20" },
    { id: "frontend", title: "Frontend Mastery", icon: <Layout className="w-16 h-16" />, skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"], color: "from-teal-900/40 to-teal-950/40", stroke: "border-teal-500/20" },
    { id: "devops", title: "Cloud & DevOps", icon: <HardDrive className="w-16 h-16" />, skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"], color: "from-cyan-900/40 to-cyan-950/40", stroke: "border-cyan-500/20" },
    { id: "tools", title: "Tooling & AI", icon: <Wrench className="w-16 h-16" />, skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"], color: "from-emerald-900/40 to-emerald-950/40", stroke: "border-emerald-500/20" },
    { id: "auth", title: "Auth & Security", icon: <ShieldCheck className="w-16 h-16" />, skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"], color: "from-teal-900/40 to-teal-950/40", stroke: "border-teal-500/20" },
    { id: "database", title: "Data Systems", icon: <Database className="w-16 h-16" />, skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"], color: "from-cyan-900/40 to-cyan-950/40", stroke: "border-cyan-500/20" }
];

const StackCard = ({ data, i, progress, range, targetScale }: any) => {
    const container = useRef(null);
    
    // As we scroll past this card, scale it down slightly to create the 3D stacking depth effect
    const scale = useTransform(progress, range, [1, targetScale]);
    
    // Fade out slightly as it gets pushed to the back
    const opacity = useTransform(progress, range, [1, 0.4]);

    return (
        <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
            <motion.div 
                style={{ scale, opacity, top: `calc(10vh + ${i * 30}px)` }}
                className={`relative w-full max-w-6xl h-[500px] md:h-[600px] rounded-[40px] bg-gradient-to-br ${data.color} border ${data.stroke} p-8 md:p-16 backdrop-blur-2xl shadow-[0_-20px_50px_rgba(0,0,0,0.5)] transform origin-top overflow-hidden flex flex-col md:flex-row gap-10 md:gap-20`}
            >
                {/* Huge Watermark Icon */}
                <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none scale-[4] md:scale-[6]">
                    {data.icon}
                </div>

                <div className="flex-1 flex flex-col justify-center relative z-10">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-3xl w-max mb-8 backdrop-blur-md shadow-2xl">
                        {data.icon}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-Case tracking-tight text-white mb-6">
                        {data.title}
                    </h2>
                    <p className="text-white/50 font-Turbine text-lg max-w-md">
                        A comprehensive toolkit designed for high-performance, scalable, and modern software architecture.
                    </p>
                </div>

                <div className="flex-1 flex items-center relative z-10">
                    <div className="w-full grid grid-cols-2 gap-4">
                        {data.skills.map((skill: string) => (
                            <div key={skill} className="bg-black/40 border border-white/5 px-6 py-4 rounded-2xl flex items-center shadow-inner hover:border-emerald-500/40 hover:bg-emerald-500/10 transition-colors">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 mr-4 shadow-[0_0_10px_#10b981]" />
                                <span className="font-Turbine text-white/90">{skill}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export const SkillsStackedCards = () => {
    const container = useRef(null);
    
    // Track the scroll progress of the entire container
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div className="w-full mt-20 relative">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-[-50vh] relative z-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">Expertise</h2>
                    <p className="text-4xl md:text-5xl font-Case text-white leading-tight">My Technical Stack</p>
                </div>
            </div>

            {/* Container height dictates how long the scroll effect lasts */}
            <div ref={container} className="relative w-full px-4 md:px-8" style={{ height: `${SKILLS_DATA.length * 100}vh` }}>
                {SKILLS_DATA.map((data, i) => {
                    // Target scale decreases the further back a card is pushed
                    const targetScale = 1 - ((SKILLS_DATA.length - i) * 0.05);
                    
                    // The range of scroll progress during which THIS card scales down
                    // It starts scaling down when the NEXT card begins to cover it
                    const range = [i * (1 / SKILLS_DATA.length), 1];
                    
                    return (
                        <StackCard 
                            key={data.id} 
                            i={i} 
                            data={data} 
                            progress={scrollYProgress} 
                            range={range} 
                            targetScale={targetScale} 
                        />
                    );
                })}
            </div>
        </div>
    );
};
