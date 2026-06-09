import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Server, Layout, HardDrive, Wrench, ShieldCheck, Database, Maximize2, Minus, X } from "lucide-react";

const SKILLS_DATA = [
    { id: "backend", title: "Backend", icon: <Server className="w-4 h-4" />, command: "cat ./skills/backend.json", skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"] },
    { id: "frontend", title: "Frontend", icon: <Layout className="w-4 h-4" />, command: "npm list --depth=0", skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"] },
    { id: "devops", title: "DevOps", icon: <HardDrive className="w-4 h-4" />, command: "aws s3 ls && docker ps", skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"] },
    { id: "tools", title: "Tools", icon: <Wrench className="w-4 h-4" />, command: "git log --oneline", skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"] },
    { id: "auth", title: "Auth", icon: <ShieldCheck className="w-4 h-4" />, command: "tail -f /var/log/auth.log", skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"] },
    { id: "database", title: "Databases", icon: <Database className="w-4 h-4" />, command: "psql -U postgres -c '\\dt'", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"] }
];

const TerminalLine = ({ text, delay = 0, isCommand = false }: { text: string, delay?: number, isCommand?: boolean }) => (
    <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2, delay }}
        className={`font-mono text-sm md:text-base ${isCommand ? 'text-emerald-400 font-bold mt-4' : 'text-emerald-50/70 ml-4'}`}
    >
        {isCommand && <span className="text-emerald-500 mr-2">guest@portfolio:~$</span>}
        {text}
    </motion.div>
);

export const SkillsTerminal = () => {
    const [activeCategory, setActiveCategory] = useState(SKILLS_DATA[0].id);
    const [history, setHistory] = useState([SKILLS_DATA[0]]);
    const [isTyping, setIsTyping] = useState(false);

    const handleRunCommand = (category: typeof SKILLS_DATA[0]) => {
        if (isTyping || activeCategory === category.id) return;
        
        setActiveCategory(category.id);
        setIsTyping(true);
        
        // Add to history so it scrolls down like a real terminal
        setHistory(prev => [...prev.slice(-3), category]);
        
        setTimeout(() => setIsTyping(false), 800);
    };

    return (
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mt-12 py-8">
            <div className="flex flex-col md:flex-row gap-6 h-[500px]">
                
                {/* Control Panel (Sidebar) */}
                <div className="w-full md:w-64 flex flex-col gap-2 shrink-0">
                    <div className="flex items-center gap-2 mb-4 px-2">
                        <Terminal className="w-5 h-5 text-emerald-500" />
                        <h3 className="font-Turbine tracking-widest text-emerald-50 text-sm uppercase">Scripts</h3>
                    </div>
                    
                    {SKILLS_DATA.map(category => (
                        <button
                            key={category.id}
                            onClick={() => handleRunCommand(category)}
                            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border text-left ${activeCategory === category.id ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-white/5 border-white/5 text-white/60 hover:bg-white/10 hover:text-white'}`}
                        >
                            {category.icon}
                            <span className="font-Case text-lg">{category.title}</span>
                        </button>
                    ))}
                </div>

                {/* The Terminal Window */}
                <div className="flex-1 bg-[#0a0a0a] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col relative">
                    {/* Mac/Linux Window Header */}
                    <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 justify-between shrink-0">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/80 border border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.5)] flex items-center justify-center group"><X className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black" /></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500/80 border border-yellow-500/50 shadow-[0_0_10px_rgba(234,179,8,0.5)] flex items-center justify-center group"><Minus className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black" /></div>
                            <div className="w-3 h-3 rounded-full bg-emerald-500/80 border border-emerald-500/50 shadow-[0_0_10px_rgba(16,185,129,0.5)] flex items-center justify-center group"><Maximize2 className="w-2 h-2 opacity-0 group-hover:opacity-100 text-black" /></div>
                        </div>
                        <div className="text-xs font-mono text-white/30">bash - 80x24</div>
                        <div className="w-12"></div> {/* Spacer for centering */}
                    </div>

                    {/* Terminal Output Area */}
                    <div className="flex-1 p-6 overflow-y-auto font-mono text-sm md:text-base flex flex-col justify-end">
                        <AnimatePresence mode="popLayout">
                            {history.map((cmd, idx) => (
                                <motion.div 
                                    key={`${cmd.id}-${idx}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: idx === history.length - 1 ? 1 : 0.4, y: 0 }}
                                    className="mb-6"
                                >
                                    <TerminalLine text={cmd.command} isCommand={true} />
                                    
                                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 ml-4">
                                        {cmd.skills.map((skill, sIdx) => (
                                            <TerminalLine 
                                                key={skill} 
                                                text={`[+] ${skill}`} 
                                                delay={(idx === history.length - 1 && isTyping) ? (sIdx * 0.1) + 0.2 : 0} 
                                            />
                                        ))}
                                    </div>
                                    
                                    {idx === history.length - 1 && !isTyping && (
                                        <motion.div 
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [1, 0] }}
                                            transition={{ duration: 0.8, repeat: Infinity }}
                                            className="w-2 h-5 bg-emerald-400 ml-4 mt-4"
                                        />
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                    
                    {/* CRT Scanline overlay effect */}
                    <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-50 opacity-20" />
                </div>

            </div>
        </div>
    );
};
