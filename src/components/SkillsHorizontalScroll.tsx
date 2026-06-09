import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Cpu, MonitorSmartphone, Cloud, Settings, Key, Database } from "lucide-react";

const SKILLS_DATA = [
    { id: "backend", title: "Backend Architecture", icon: <Cpu className="w-48 h-48 md:w-80 md:h-80 text-emerald-500/10" />, skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"], accent: "bg-emerald-600" },
    { id: "frontend", title: "Frontend Mastery", icon: <MonitorSmartphone className="w-48 h-48 md:w-80 md:h-80 text-teal-500/10" />, skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"], accent: "bg-teal-600" },
    { id: "devops", title: "Cloud & DevOps", icon: <Cloud className="w-48 h-48 md:w-80 md:h-80 text-cyan-500/10" />, skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"], accent: "bg-cyan-600" },
    { id: "tools", title: "Tooling & AI", icon: <Settings className="w-48 h-48 md:w-80 md:h-80 text-emerald-500/10" />, skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"], accent: "bg-emerald-500" },
    { id: "auth", title: "Auth & Security", icon: <Key className="w-48 h-48 md:w-80 md:h-80 text-teal-500/10" />, skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"], accent: "bg-teal-500" },
    { id: "database", title: "Data Systems", icon: <Database className="w-48 h-48 md:w-80 md:h-80 text-cyan-500/10" />, skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"], accent: "bg-cyan-500" }
];

const renderGradientPattern = (index: number, accent: string) => {
    switch(index) {
        case 0:
            return (
                <>
                    <div className={`absolute -top-32 -right-32 w-[350px] h-[350px] rounded-full ${accent} blur-[120px] opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />
                    <div className={`absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full ${accent} blur-[140px] opacity-40 group-hover:opacity-70 transition-opacity duration-700`} />
                </>
            );
        case 1:
            return (
                <div className={`absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-[100%] ${accent} blur-[120px] md:blur-[140px] opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
            );
        case 2:
            return (
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full ${accent} blur-[130px] opacity-50 group-hover:opacity-90 transition-opacity duration-700`} />
            );
        case 3:
            return (
                <>
                    <div className={`absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full ${accent} blur-[120px] opacity-60 group-hover:opacity-90 transition-opacity duration-700`} />
                    <div className={`absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full ${accent} blur-[130px] opacity-50 group-hover:opacity-80 transition-opacity duration-700`} />
                </>
            );
        case 4:
            return (
                <div className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%] rounded-[100%] ${accent} blur-[120px] md:blur-[140px] opacity-60 group-hover:opacity-100 transition-opacity duration-700`} />
            );
        case 5:
            return (
                <>
                    <div className={`absolute top-1/2 -left-32 -translate-y-1/2 w-[250px] h-[400px] rounded-[100%] ${accent} blur-[100px] opacity-60 group-hover:opacity-90 transition-opacity duration-700`} />
                    <div className={`absolute top-1/2 -right-32 -translate-y-1/2 w-[250px] h-[400px] rounded-[100%] ${accent} blur-[100px] opacity-60 group-hover:opacity-90 transition-opacity duration-700`} />
                </>
            );
        default:
            return null;
    }
};

export const SkillsHorizontalScroll = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [scrollRange, setScrollRange] = useState(0);
    
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    useEffect(() => {
        const updateScrollRange = () => {
            if (trackRef.current) {
                const scrollWidth = trackRef.current.scrollWidth;
                const clientWidth = window.innerWidth;
                setScrollRange(scrollWidth - clientWidth);
            }
        };
        
        updateScrollRange();
        // Give layout a moment to calculate, especially on mobile
        setTimeout(updateScrollRange, 100);
        window.addEventListener('resize', updateScrollRange);
        return () => window.removeEventListener('resize', updateScrollRange);
    }, []);

    const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

    // Touch Mapper: Converts horizontal swipes into vertical scrolls
    // using native DOM events to prevent default browser swipe-back physics
    useEffect(() => {
        const container = targetRef.current;
        if (!container) return;

        let startX = 0;
        let startY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
            const touchX = e.touches[0].clientX;
            const touchY = e.touches[0].clientY;
            const deltaX = startX - touchX;
            const deltaY = startY - touchY;

            // Give leeway for diagonal thumb movement (deltaX > deltaY * 0.5)
            // This ensures it catches the swipe even if it's not perfectly horizontal
            if (Math.abs(deltaX) > Math.abs(deltaY) * 0.5 && Math.abs(deltaX) > 1) {
                e.preventDefault();
                // Increased the multiplier massively (from 1.5 to 5) so it actually moves the heavy 400vh container
                // behavior: 'instant' prevents smooth-scroll engines (like Lenis) from damping the programmatic scroll
                window.scrollBy({ top: deltaX * 5, behavior: 'instant' });
                startX = touchX; 
                startY = touchY;
            }
        };

        // passive: false is REQUIRED to allow e.preventDefault()
        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: false });

        return () => {
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
        };
    }, []);

    return (
        <div className="w-full relative mt-12 z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 relative z-30">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">Expertise</h2>
                    <p className="text-4xl md:text-5xl font-Case text-white leading-tight">My Technical Stack</p>
                </div>
            </div>

            <section ref={targetRef} className="relative h-[400vh] w-full">
                <div className="sticky top-0 h-screen overflow-hidden flex items-center">
                    <motion.div 
                        ref={trackRef}
                        style={{ x }} 
                        className="flex gap-6 md:gap-24 px-4 md:px-[10vw] will-change-transform"
                    >
                        {SKILLS_DATA.map((data, index) => {
                            const itemProgressRange = [index * 0.15 - 0.2, index * 0.15 + 0.2];
                            const innerX = useTransform(scrollYProgress, itemProgressRange, ["-10%", "10%"]);
                            const innerScale = useTransform(scrollYProgress, itemProgressRange, [0.8, 1.1]);

                            return (
                                <div 
                                    key={data.id} 
                                    className="group relative w-[85vw] md:w-[450px] h-[550px] md:h-[600px] shrink-0 rounded-[40px] bg-[#020e08] border border-white/5 overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-10 hover:border-white/20 transition-colors duration-500 transform-gpu"
                                >
                                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[40px]">
                                        {renderGradientPattern(index, data.accent)}
                                    </div>
                                    
                                    <div 
                                        className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none rounded-[40px] transform-gpu" 
                                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                                    />

                                    <motion.div 
                                        style={{ x: innerX, scale: innerScale }}
                                        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 pointer-events-none origin-center will-change-transform"
                                    >
                                        {data.icon}
                                    </motion.div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-4 mb-6">
                                            <span className="text-5xl md:text-6xl font-Case text-white/20">0{index + 1}</span>
                                            <h3 className="text-3xl md:text-4xl font-Case text-white tracking-tight leading-none">
                                                {data.title.split(' ')[0]} <br />
                                                <span className="text-white/60">{data.title.split(' ').slice(1).join(' ')}</span>
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="relative z-10 w-full">
                                        <div className="flex flex-wrap gap-3">
                                            {data.skills.map((skill, i) => (
                                                <div 
                                                    key={i} 
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
                        
                        {/* 
                            Flexbox Right Padding Fix:
                            Browsers collapse right padding on flex containers. 
                            This physical spacer ensures the final card isn't cropped against the right edge of the screen 
                            and allows the user to scroll far enough to see it completely!
                        */}
                        <div className="w-4 md:w-[10vw] shrink-0" />
                    </motion.div>
                </div>
            </section>
        </div>
    );
};
