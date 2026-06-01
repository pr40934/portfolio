import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Moon Icon (Dark Mode State) ────────────────────────────────────────────────
function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path
        d="M14.845 8.36965C14.7735 9.69243 14.3205 10.9662 13.5406 12.037C12.7607 13.1079 11.6874 13.9298 10.4503 14.4036C9.21321 14.8774 7.86538 14.9827 6.56972 14.7068C5.27407 14.431 4.08605 13.7857 3.14929 12.849C2.21253 11.9123 1.56714 10.7244 1.29113 9.42878C1.01511 8.13315 1.12029 6.78531 1.59395 5.54818C2.06762 4.31106 2.88948 3.23761 3.9602 2.45761C5.03092 1.67761 6.30465 1.22444 7.62741 1.1529C7.93599 1.13613 8.09752 1.50337 7.9337 1.7647C7.38581 2.64132 7.15121 3.67774 7.26818 4.70485C7.38515 5.73196 7.84679 6.6891 8.57776 7.42008C9.30873 8.15105 10.2659 8.61269 11.293 8.72966C12.3201 8.84662 13.3565 8.61203 14.2331 8.06413C14.4953 7.90033 14.8617 8.06108 14.845 8.36965Z"
        stroke="currentColor"
        strokeWidth="1.71429"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ── Sun Icon (Light Mode State) ─────────────────────────────────────────────────
function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white">
      <path d="M10.0007 15.8333C13.2223 15.8333 15.834 13.2217 15.834 10C15.834 6.77833 13.2223 4.16666 10.0007 4.16666C6.77899 4.16666 4.16732 6.77833 4.16732 10C4.16732 13.2217 6.77899 15.8333 10.0007 15.8333Z" fill="currentColor" />
      <path d="M10.0007 19.1333C9.54232 19.1333 9.16732 18.7917 9.16732 18.3333V18.2667C9.16732 17.8083 9.54232 17.4333 10.0007 17.4333C10.459 17.4333 10.834 17.8083 10.834 18.2667C10.834 18.725 10.459 19.1333 10.0007 19.1333ZM15.9507 16.7833C15.734 16.7833 15.5257 16.7 15.359 16.5417L15.2507 16.4333C14.9257 16.1083 14.9257 15.5833 15.2507 15.2583C15.5757 14.9333 16.1006 14.9333 16.4256 15.2583L16.534 15.3667C16.859 15.6917 16.859 16.2167 16.534 16.5417C16.3757 16.7 16.1673 16.7833 15.9507 16.7833ZM4.05065 16.7833C3.83398 16.7833 3.62565 16.7 3.45898 16.5417C3.13398 16.2167 3.13398 15.6917 3.45898 15.3667L3.56732 15.2583C3.89232 14.9333 4.41732 14.9333 4.74232 15.2583C5.06732 15.5833 5.06732 16.1083 4.74232 16.4333L4.63398 16.5417C4.47565 16.7 4.25898 16.7833 4.05065 16.7833ZM18.334 10.8333H18.2673C17.809 10.8333 17.434 10.4583 17.434 9.99999C17.434 9.54166 17.809 9.16666 18.2673 9.16666C18.7257 9.16666 19.134 9.54166 19.134 9.99999C19.134 10.4583 18.7923 10.8333 18.334 10.8333ZM1.73398 10.8333H1.66732C1.20898 10.8333 0.833984 10.4583 0.833984 9.99999C0.833984 9.54166 1.20898 9.16666 1.66732 9.16666C2.12565 9.16666 2.53398 9.54166 2.53398 9.99999C2.53398 10.4583 2.19232 10.8333 1.73398 10.8333ZM15.8423 4.99166C15.6257 4.99166 15.4173 4.90833 15.2507 4.74999C14.9257 4.42499 14.9257 3.89999 15.2507 3.57499L15.359 3.46666C15.684 3.14166 16.209 3.14166 16.534 3.46666C16.859 3.79166 16.859 4.31666 16.534 4.64166L16.4256 4.74999C16.2673 4.90833 16.059 4.99166 15.8423 4.99166ZM4.15898 4.99166C3.94232 4.99166 3.73398 4.90833 3.56732 4.74999L3.45898 4.63333C3.13398 4.30833 3.13398 3.78333 3.45898 3.45833C3.78398 3.13333 4.30898 3.13333 4.63398 3.45833L4.74232 3.56666C5.06732 3.89166 5.06732 4.41666 4.74232 4.74166C4.58398 4.90833 4.36732 4.99166 4.15898 4.99166ZM10.0007 2.53333C9.54232 2.53333 9.16732 2.19166 9.16732 1.73333V1.66666C9.16732 1.20833 9.54232 0.833328 10.0007 0.833328C10.459 0.833328 10.834 1.20833 10.834 1.66666C10.834 2.12499 10.459 2.53333 10.0007 2.53333Z" fill="currentColor" />
    </svg>
  );
}

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
  const [isDark, setIsDark] = useState(true);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Sync isDark with document element class initial state
  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    setIsDark(isDarkTheme);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    const container = document.querySelector(".relative.z-20.min-h-screen") as HTMLElement | null;
    const onScroll = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const pct = Math.round((el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100);
      setScrollPct(isNaN(pct) ? 0 : pct);
    };
    container?.addEventListener("scroll", onScroll);
    return () => container?.removeEventListener("scroll", onScroll);
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
          borderRadius: open ? 24 : 22,
          backgroundColor: open ? "#eceeed" : "transparent",
        }}
        className={`absolute top-0 left-1/2 -translate-x-1/2 overflow-hidden ${
          open ? "shadow-2xl" : ""
        }`}
      >
        {/* ── Pill row — always at top of container ── */}
        <motion.div layout className={open ? "p-3" : ""} transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}>
          <div className="flex items-center bg-[#0f0f0f] rounded-full h-11 overflow-hidden border border-white/10 shadow-xl">

            {/* Menu / Close Button */}
            <button
              id="nav-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="flex items-center gap-2.5 pl-5 pr-4 h-full hover:bg-white/5 transition-colors focus:outline-none"
            >
              {/* Hamburger → X */}
              <div className="w-[14px] h-[10px] relative">
                <motion.span
                  animate={open ? { rotate: 45, y: 4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="block absolute top-0 left-0 w-full h-px bg-white origin-center"
                />
                <motion.span
                  animate={open ? { rotate: -45, y: -4.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="block absolute bottom-0 left-0 w-full h-px bg-white origin-center"
                />
              </div>

              {/* Menu ↔ Close slide */}
              <div className="relative h-[14px] overflow-hidden w-[44px]">
                <motion.span
                  animate={{ y: open ? "-100%" : "0%" }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="text-[11px] font-Turbine font-black tracking-[0.18em] text-white uppercase absolute left-0"
                >
                  Menu
                </motion.span>
                <motion.span
                  animate={{ y: open ? "0%" : "100%" }}
                  transition={{ duration: 0.22, ease: "easeInOut" }}
                  className="text-[11px] font-Turbine font-black tracking-[0.18em] text-white uppercase absolute left-0"
                >
                  Close
                </motion.span>
              </div>
            </button>

            {/* Premium Theme Switcher */}
            <div className="px-1 h-full flex items-center justify-center">
              <button
                onClick={toggleTheme}
                className="w-7 h-7 rounded-full border border-white/15 flex items-center justify-center hover:bg-white/10 transition-colors focus:outline-none"
                aria-label="Toggle Theme"
              >
                {isDark ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>

            {/* Scroll % */}
            <div className="mx-1.5 h-7 bg-[#2a2a2a] rounded-full flex items-center px-4 ml-auto">
              <span className="text-[11px] font-Turbine font-black tracking-[0.15em] text-white tabular-nums">
                {scrollPct}%
              </span>
            </div>
          </div>
        </motion.div>

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
