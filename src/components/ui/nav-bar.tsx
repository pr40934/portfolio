import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";

type NavLink = {
  label: string;
  href: string;
};

export const NavBar = ({
  links = [
    { label: "PROJECTS", href: "#projects" },
    { label: "EXPERIENCE", href: "#experience" },
    { label: "SKILLS", href: "#skills" },
  ],
  className = "",
}: {
  links?: NavLink[];
  className?: string;
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className={`flex items-center justify-between w-full max-w-7xl mx-auto px-6 py-4 ${className}`}>
      {/* Logo Section - Left Side */}
      <div className="flex items-center gap-2 group cursor-pointer">
        <div className="p-1.5 bg-white/10 rounded-lg group-hover:bg-white/20 transition-colors">
          <Code2 size={24} className="text-white" strokeWidth={1.5} />
        </div>
        <span className="text-xl font-Case font-medium tracking-tight text-white drop-shadow-md">
          Pratap<span className="font-light opacity-80">Raju</span>
        </span>
      </div>

      {/* Desktop Capsule Nav - Right Side */}
      <div className="hidden lg:flex items-center bg-[#253f31] rounded-full p-1.5 pl-12 shadow-2xl border border-white/20">
        <div className="flex items-center gap-12 mr-12">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: "#ffffff" }}
              className="!text-[11px] font-Turbine font-black tracking-[0.2em] hover:text-white/70 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* <a href="#contact"> */}
        <button className="bg-[#eceeed] hover:bg-white text-[#253f31] !text-[11px] font-Turbine font-black tracking-[0.2em] px-12 py-4 rounded-full transition-all duration-300 active:scale-95 shadow-md whitespace-nowrap">
          SEND MESSAGE
        </button>
        {/* </a> */}
      </div>

      {/* Tablet Capsule Nav - More compact */}
      <div className="hidden md:flex lg:hidden items-center bg-[#253f31] rounded-full p-1 pl-8 shadow-xl border border-white/10">
        <div className="flex items-center gap-6 mr-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              style={{ color: "#ffffff" }}
              className="!text-[9px] font-Turbine font-black tracking-[0.15em] hover:text-white/70 transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
        {/* <a> */}
        <button className="bg-[#eceeed] hover:bg-white text-[#253f31] !text-[9px] font-Turbine font-black tracking-[0.15em] px-8 py-3.5 rounded-full transition-all duration-300 active:scale-95 shadow-md whitespace-nowrap">
          SEND MESSAGE
        </button>
        {/* </a> */}
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-white/70 hover:text-white transition-colors"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-4 right-4 mt-2 p-6 rounded-3xl border border-white/10 bg-black/90 backdrop-blur-2xl md:hidden flex flex-col gap-4 z-50 shadow-2xl"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-Turbine font-bold tracking-[0.3em] text-white/70 hover:text-white text-center py-4 border-b border-white/5 last:border-0"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full bg-[#eceeed] text-[#253f31] text-sm font-Turbine font-bold tracking-[0.3em] py-4 rounded-2xl mt-4">
                SEND MESSAGE
              </button>
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
