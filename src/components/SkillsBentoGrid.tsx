import React from "react";
import { motion } from "framer-motion";
import { Server, Layout, ShieldCheck, HardDrive, Wrench, Database, CheckCircle2 } from "lucide-react";

export const SKILLS = {
    Backend: {
        icon: <Server className="w-6 h-6 text-emerald-400" />,
        skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery & Beat CRON", "Uvicorn (ASGI)", "GraphQL API", "REST API", "Serverless", "Supabase"],
        className: "md:col-span-2"
    },
    Frontend: {
        icon: <Layout className="w-6 h-6 text-emerald-400" />,
        skills: ["Next.js", "React.js", "Redux", "Zustand", "Hooks", "HTML", "CSS", "JS", "Bootstrap", "Tailwind CSS", "Responsive Design"],
        className: "md:col-span-2"
    },
    OsAndDevops: {
        icon: <HardDrive className="w-6 h-6 text-emerald-400" />,
        skills: ["AWS S3", "CloudFront", "EC2 Linux", "Windows", "PM2"],
        className: "md:col-span-2"
    },
    Tools: {
        icon: <Wrench className="w-6 h-6 text-emerald-400" />,
        skills: ["Postman", "GIT", "Jira", "AI", "Claude code", "Cursor IDE"],
        className: "md:col-span-3"
    },
    Auth: {
        icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
        skills: ["JWT", "OAuth2", "Django Auth"],
        className: "md:col-span-1"
    },
    Database: {
        icon: <Database className="w-6 h-6 text-emerald-400" />,
        skills: ["PostgreSQL", "MySQL", "MongoDB"],
        className: "md:col-span-1"
    },
    TestingAndQuality: {
        icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
        skills: ["Code Reviews", "API Testing", "Manual Testing"],
        className: "md:col-span-1"
    }
};

const BentoCard = ({ title, icon, skills, className, index }: { title: string, icon: React.ReactNode, skills: string[], className: string, index: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ scale: 1.02 }}
            className={`relative overflow-hidden flex flex-col gap-4 p-6 md:p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 transition-all duration-300 shadow-xl ${className}`}
        >
            <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-3 bg-emerald-500/10 rounded-2xl">
                    {icon}
                </div>
                <h3 className="text-xl md:text-2xl font-Case text-white tracking-wide">{title}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2 relative z-10">
                {skills.map((skill) => (
                    <span 
                        key={skill} 
                        className="px-3 py-1.5 bg-white/5 hover:bg-emerald-500/20 hover:text-emerald-300 transition-colors border border-white/5 rounded-lg text-sm md:text-base font-Turbine text-white/80 backdrop-blur-sm"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </motion.div>
    );
};

export const SkillsBentoGrid = () => {
    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 py-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 auto-rows-auto md:grid-flow-row-dense">
                {/* Row 1 & 2 */}
                <BentoCard title="Backend Engineering" index={0} {...SKILLS.Backend} />
                <BentoCard title="Authentication" index={1} {...SKILLS.Auth} />
                <BentoCard title="Database Architecture" index={2} {...SKILLS.Database} />
                
                {/* Row 3 & 4 */}
                <BentoCard title="DevOps & OS" index={4} {...SKILLS.OsAndDevops} />
                <BentoCard title="Frontend Mastery" index={3} {...SKILLS.Frontend} />
                
                {/* Row 5 */}
                <BentoCard title="Tooling & AI" index={5} {...SKILLS.Tools} />
                <BentoCard title="Quality Assurance" index={6} {...SKILLS.TestingAndQuality} />
            </div>
        </div>
    );
};
