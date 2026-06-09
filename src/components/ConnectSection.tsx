import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, MessageCircle, ArrowUpRight } from "lucide-react";

const CONTACTS = [
    {
        id: "email",
        label: "Drop an Email",
        value: "hello@example.com", // Replace with actual email
        href: "mailto:hello@example.com",
        icon: <Mail className="w-8 h-8 md:w-12 md:h-12" />,
        color: "bg-emerald-500",
        hoverText: "Say Hello"
    },
    {
        id: "linkedin",
        label: "Connect on LinkedIn",
        value: "pratap-raju",
        href: "https://www.linkedin.com/in/pratap-raju/",
        icon: <Linkedin className="w-8 h-8 md:w-12 md:h-12" />,
        color: "bg-blue-600",
        hoverText: "Network"
    },
    {
        id: "whatsapp",
        label: "Chat on WhatsApp",
        value: "+91 0000000000", // Replace with actual number
        href: "https://wa.me/910000000000",
        icon: <MessageCircle className="w-8 h-8 md:w-12 md:h-12" />,
        color: "bg-green-500",
        hoverText: "Message"
    }
];

export const ConnectSection = () => {
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <section id="connect" className="relative w-full min-h-screen flex flex-col justify-between py-24 px-4 md:px-8 z-20 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
                <div className="w-[800px] h-[800px] bg-emerald-500/20 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            {/* Header */}
            <div className="w-full max-w-7xl mx-auto flex flex-col items-center text-center gap-6 mb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <h2 className="text-sm md:text-base font-Turbine tracking-[0.5em] text-emerald-400 uppercase mb-4">
                        What's Next?
                    </h2>
                    <h1 className="text-5xl md:text-[7rem] lg:text-[9rem] leading-[0.9] font-Case tracking-tighter text-white uppercase drop-shadow-2xl">
                        Let's Build <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600">
                            Together
                        </span>
                    </h1>
                </motion.div>
                
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="max-w-2xl mt-8 text-white/50 font-Turbine text-lg md:text-xl"
                >
                    Have an idea or a project in mind? Let's discuss how we can turn it into reality. I'm currently open for new opportunities.
                </motion.p>
            </div>

            {/* Interactive Contact List */}
            <div className="w-full max-w-7xl mx-auto flex flex-col relative z-10">
                {CONTACTS.map((contact, index) => {
                    const isHovered = hoveredId === contact.id;

                    return (
                        <motion.a
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={contact.id}
                            onMouseEnter={() => setHoveredId(contact.id)}
                            onMouseLeave={() => setHoveredId(null)}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.3, duration: 0.6 }}
                            className="group relative border-b border-white/10 last:border-b-0 py-10 md:py-16 flex items-center justify-between overflow-hidden cursor-pointer"
                        >
                            {/* Hover Background Reveal: White Glass with Noise */}
                            <motion.div 
                                className="absolute inset-0 origin-left -z-10 overflow-hidden"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: isHovered ? 1 : 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            >
                                {/* Frosted glass background */}
                                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/5 to-transparent backdrop-blur-xl border-t border-white/10" />
                                
                                {/* Granular noise texture */}
                                <div 
                                    className="absolute inset-0 opacity-[0.2] mix-blend-overlay"
                                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                                />
                            </motion.div>

                            {/* Left Side: Icon & Label */}
                            <div className="flex items-center gap-6 md:gap-12 relative z-10 px-4 md:px-8">
                                <motion.div 
                                    animate={{ 
                                        color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
                                        scale: isHovered ? 1.1 : 1,
                                        rotate: isHovered ? -10 : 0
                                    }}
                                    transition={{ duration: 0.4 }}
                                >
                                    {contact.icon}
                                </motion.div>
                                <motion.h3 
                                    animate={{ 
                                        color: isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.9)",
                                        x: isHovered ? 20 : 0
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="text-3xl md:text-5xl font-Case tracking-tight"
                                >
                                    {contact.label}
                                </motion.h3>
                            </div>

                            {/* Right Side: Value & Arrow */}
                            <div className="flex items-center gap-8 relative z-10 px-4 md:px-8">
                                <motion.span 
                                    animate={{ 
                                        opacity: isHovered ? 1 : 0,
                                        x: isHovered ? 0 : 20
                                    }}
                                    transition={{ duration: 0.4 }}
                                    className="hidden md:block text-xl font-Turbine text-white/90 uppercase tracking-widest"
                                >
                                    {contact.hoverText}
                                </motion.span>
                                
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-sm overflow-hidden group-hover:border-white/50 transition-colors duration-500">
                                    <motion.div
                                        animate={{ 
                                            rotate: isHovered ? 45 : 0,
                                            scale: isHovered ? 1.2 : 1
                                        }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <ArrowUpRight className={`w-6 h-6 md:w-8 md:h-8 ${isHovered ? 'text-white' : 'text-white/50'}`} />
                                    </motion.div>
                                </div>
                            </div>
                        </motion.a>
                    );
                })}
            </div>

            {/* Simple Footer Text */}
            <div className="w-full flex items-center justify-between text-white/30 font-Turbine text-xs uppercase tracking-widest mt-32 px-4 relative z-10">
                <span>© {new Date().getFullYear()} Pratap Raju</span>
                <span>Crafted with passion</span>
            </div>
        </section>
    );
};
