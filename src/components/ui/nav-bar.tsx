import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";



// ── Hover lift link ───────────────────────────────────────────────────────────
function HoverLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a href={href} onClick={onClick}
      className={`group relative block overflow-hidden ${className}`}
    >
      <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
        {children}
      </span>
      <span className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0" aria-hidden>
        {children}
      </span>
    </a>
  );
}

// ── Motion Variants for Premium Staggered Expansion ──────────────────────────
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.03,
      staggerDirection: -1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 110,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.15 },
  },
};

// ── NavBar ────────────────────────────────────────────────────────────────────
export const NavBar = () => {
  const [open, setOpen] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;
      const pct = Math.round((scrollTop / (scrollHeight - clientHeight)) * 100);
      setScrollPct(isNaN(pct) ? 0 : Math.min(100, Math.max(0, pct)));
    };
    
    // Initialize once
    onScroll();
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const close = () => setOpen(false);

  const navLinks = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Skills", href: "#skills" },
  ];
  const otherLinks = [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ];
  const socialLinks = [
    { label: "Github", href: "https://github.com/Pratap-Digistashing" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pratap-raju/" },
  ];

  return (
    <div ref={wrapperRef} className="relative h-11 flex justify-center z-50">
      {/*
        ONE container — layout animation smoothly grows from pill → full panel.
        We fix the crescent layout shift / clipping bug by animating the borderRadius
        property dynamically rather than using a static style override.
      */}
      <motion.div
        layout
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        animate={{
          borderRadius: 24,
          backgroundColor: open ? "#eceeed" : "transparent",
        }}
        className={`absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden ${
          open ? "shadow-2xl" : ""
        }`}
      >
        {/* ── Pill row — always at top of container ── */}
        <div className="p-3 w-fit">
          <div className="flex items-center bg-white rounded-full h-11 overflow-hidden border border-black/10 shadow-xl">

            {/* Menu / Close Button */}
            <button
              id="nav-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2.5 pl-5 pr-4 h-full hover:bg-black/5 transition-colors focus:outline-none"
            >
              {/* Hamburger → X */}
              <div className="w-[24px] h-[10px] relative">
                <motion.span
                  animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="block absolute top-0 left-0 w-full h-[2px] bg-black origin-center"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="block absolute bottom-0 left-0 w-full h-[2px] bg-black origin-center"
                />
              </div>

              {/* Menu ↔ Close slide */}
              <div className="relative h-[14px] overflow-hidden w-[44px]">
                <motion.span
                  animate={{ y: open ? "-100%" : "0%" }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="text-[11px] font-Turbine font-black tracking-[0.18em] text-black uppercase absolute left-0"
                >
                  Menu
                </motion.span>
                <motion.span
                  animate={{ y: open ? "0%" : "100%" }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="text-[11px] font-Turbine font-black tracking-[0.18em] text-black uppercase absolute left-0"
                >
                  Close
                </motion.span>
              </div>
            </button>



            {/* Scroll % */}
            <div className="mx-1.5 h-7 w-14 bg-black rounded-full flex items-center justify-center">
              <span className="text-[11px] font-Turbine font-black tracking-[0.15em] text-white tabular-nums">
                {scrollPct}%
              </span>
            </div>
          </div>
        </div>

        {/* ── Panel content — fades in inside the same container ── */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="panel-body"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Menu */}
              <motion.div variants={itemVariants} className="px-7 pt-2 pb-5">
                <p className="text-[10px] font-Turbine tracking-[0.3em] text-black/40 uppercase mb-4">Menu</p>
                <nav className="flex flex-col">
                  {navLinks.map((link) => (
                    <HoverLink key={link.href} href={link.href} onClick={close}
                      className="text-[1.75rem] font-Case font-bold text-[#052415] py-1 leading-tight">
                      {link.label}
                    </HoverLink>
                  ))}
                </nav>
              </motion.div>

              <motion.div variants={itemVariants} className="h-px bg-black/10" />

              {/* Other */}
              <motion.div variants={itemVariants} className="px-7 pt-5 pb-5">
                <p className="text-[10px] font-Turbine tracking-[0.3em] text-black/40 uppercase mb-3">Other</p>
                <div className="flex flex-col gap-1">
                  {otherLinks.map((link) => (
                    <HoverLink key={link.label} href={link.href} onClick={close}
                      className="text-sm font-Case font-bold text-[#052415] py-0.5 leading-tight">
                      {link.label}
                    </HoverLink>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="h-px bg-black/10" />

              {/* Social */}
              <motion.div variants={itemVariants} className="px-7 pt-5 pb-7">
                <p className="text-[10px] font-Turbine tracking-[0.3em] text-black/40 uppercase mb-3">Social media</p>
                <div className="flex flex-col gap-1">
                  {socialLinks.map((link) => (
                    <HoverLink key={link.href} href={link.href} onClick={close}
                      className="text-sm font-Case font-bold text-[#052415] py-0.5 leading-tight">
                      {link.label}
                    </HoverLink>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
