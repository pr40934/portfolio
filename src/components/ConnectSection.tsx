import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useInView, animate } from "framer-motion";
import { Linkedin, Github, MessageCircle, ArrowUpRight } from "lucide-react";

const SOCIAL_LINKS = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pratap-raju/", icon: <Linkedin className="w-5 h-5" /> },
    { label: "GitHub", href: "https://github.com/pr40934", icon: <Github className="w-5 h-5" /> },
    { label: "WhatsApp", href: "https://wa.me/918688659066", icon: <MessageCircle className="w-5 h-5" /> },
];

export const ConnectSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [githubMsg, setGithubMsg] = useState<"double" | "final" | null>(null);
    const [hoverGithub, setHoverGithub] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // 1. Initial 10% fill on mount/inView
    const entryProgress = useMotionValue(0);
    const isInView = useInView(containerRef, { once: true, amount: 0.1 });
    
    useEffect(() => {
        if (isInView) {
            animate(entryProgress, 10, { duration: 0.8, ease: "easeOut" });
        }
    }, [isInView, entryProgress]);

    // 2. Scroll fill from 0 to 90
    // "start 90%" -> when top of section enters from bottom
    // "end 100%" -> when bottom of section hits bottom of screen (max scroll)
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "end 100%"]
    });

    // 3. Combine them using modern Framer Motion reactive useTransform
    const clipPath = useTransform(() => {
        const entry = entryProgress.get();
        const scroll = scrollYProgress.get() * 90;
        const totalFill = Math.min(100, entry + scroll);
        return `inset(0 ${100 - totalFill}% 0 0)`;
    });

    return (
        <section
            ref={containerRef}
            id="connect"
            className="w-full bg-white/5 backdrop-blur-md border-t border-white/10 pt-20 pb-10 px-4 md:px-8 z-20 flex flex-col justify-between min-h-[80vh]"
        >
            <div className="max-w-7xl mx-auto w-full flex flex-col gap-12">

                {/* Structural Top Bar */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-white/10 pb-8 gap-4">
                    <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="font-Turbine text-xs tracking-widest text-white/50 uppercase">
                            Available for new projects
                        </span>
                    </div>
                    <span className="font-Turbine text-xs tracking-widest text-emerald-400 uppercase">
                        Let's Build Together
                    </span>
                </div>

                {/* Massive Scroll-Fill Typography */}
                <div className="py-12 md:py-24">
                    <div 
                        className="relative inline-block cursor-default"
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                    >
                        {/* Base layer: Faded transparent white — visible before scroll */}
                        <h1
                            className="text-[4rem] md:text-[8rem] lg:text-[10rem] font-Case uppercase tracking-tighter leading-[0.85] select-none"
                            style={{ color: "rgba(255,255,255,0.15)" }}
                        >
                            HAVE AN <br /> IDEA<motion.span
                                animate={isHovered ? {
                                    rotate: [0, -15, 12, -10, 8, -5, 0],
                                    transition: { duration: 0.7, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }
                                } : { rotate: 0 }}
                                style={{ display: "inline-block", originX: "0.5", originY: "1" }}
                            >?</motion.span>
                        </h1>

                        {/* Overlay layer: Solid white fills left-to-right via scroll */}
                        <motion.h1
                            className="absolute top-0 left-0 text-[4rem] md:text-[8rem] lg:text-[10rem] font-Case uppercase tracking-tighter leading-[0.85] text-white select-none"
                            style={{ clipPath }}
                            aria-hidden="true"
                        >
                            HAVE AN <br /> IDEA<motion.span
                                animate={isHovered ? {
                                    rotate: [0, -15, 12, -10, 8, -5, 0],
                                    transition: { duration: 0.7, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.3 }
                                } : { rotate: 0 }}
                                style={{ display: "inline-block", originX: "0.5", originY: "1" }}
                            >?</motion.span>
                        </motion.h1>
                    </div>
                </div>

                {/* Grid Links Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 border-t border-b border-white/10">

                    {/* Primary Email */}
                    <div className="md:col-span-2 py-12 md:border-r border-white/10 md:pr-12 group cursor-pointer">
                        <a href="mailto:pr4093403@gmail.com" className="flex flex-col gap-6 w-full h-full justify-center">
                            <span className="font-Turbine text-xs tracking-widest text-white/50 uppercase">
                                Drop me a line
                            </span>
                            <div className="flex items-center justify-between">
                                <span className="text-3xl md:text-5xl font-Case tracking-tight text-white group-hover:text-emerald-400 transition-colors duration-500">
                                    pr4093403@gmail.com
                                </span>
                                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-emerald-500 group-hover:border-emerald-500 transition-colors duration-500">
                                    <ArrowUpRight className="w-6 h-6 text-white group-hover:rotate-45 transition-transform duration-500" />
                                </div>
                            </div>
                        </a>
                    </div>

                    {/* Social List */}
                    <div className="py-12 md:pl-12 flex flex-col justify-center gap-6">
                        <span className="font-Turbine text-xs tracking-widest text-white/50 uppercase">
                            Connect
                        </span>
                        <div className="flex flex-col gap-4">
                            {SOCIAL_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => {
                                        if (link.label === "GitHub") setHoverGithub(true);
                                    }}
                                    onMouseLeave={() => {
                                        if (link.label === "GitHub") setHoverGithub(false);
                                    }}
                                    onClick={(e) => {
                                        if (link.label === "GitHub") e.preventDefault();
                                    }}
                                    onDoubleClick={(e) => {
                                        if (link.label === "GitHub") {
                                            e.preventDefault();
                                            if (githubMsg === "double") {
                                                // They're persistent — let them through 😄
                                                setGithubMsg("final");
                                                window.open(link.href, "_blank");
                                            } else {
                                                setGithubMsg("double");
                                            }
                                        }
                                    }}
                                    className="flex items-center justify-between group py-2 border-b border-white/5 hover:border-emerald-500/50 transition-colors select-none cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <span className="text-white/50 group-hover:text-emerald-400 transition-colors">
                                            {link.icon}
                                        </span>
                                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3">
                                            <span className="font-Case text-xl text-white tracking-wide group-hover:text-emerald-400 transition-colors">
                                                {link.label}
                                            </span>
                                            {link.label === "GitHub" && (hoverGithub || githubMsg === "double" || githubMsg === "final") && (
                                                <motion.span
                                                    key={githubMsg === "double" || githubMsg === "final" ? "msg2" : "msg1"}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    className="font-Turbine text-[10px] md:text-xs text-emerald-400/80 normal-case tracking-wider"
                                                >
                                                    {githubMsg === "double" || githubMsg === "final"
                                                        ? "(Why are you so interested in seeing an empty GitHub profile? Uff... double click to see)"
                                                        : "(I'm pushing to the company account, nothing to see here — double click if you still wanna see)"}
                                                </motion.span>
                                            )}
                                        </div>
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-emerald-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="flex flex-col md:flex-row justify-between items-center text-white/30 font-Turbine text-[10px] md:text-xs uppercase tracking-[0.2em] mt-12 gap-4">
                    <span>© {new Date().getFullYear()} Pratap Raju</span>
                    <span>All Rights Reserved</span>
                </div>

            </div>
        </section>
    );
};
