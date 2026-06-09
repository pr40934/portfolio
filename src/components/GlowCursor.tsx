import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const GlowCursor = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth trailing spring settings
    const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    const [isVisible, setIsVisible] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);

            // Detect if the mouse is over a clickable element
            const target = e.target as HTMLElement;
            const isClickable = 
                window.getComputedStyle(target).cursor === 'pointer' || 
                target.closest('a') !== null || 
                target.closest('button') !== null;
            
            setIsHovering(isClickable);
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener("mousemove", handleMouseMove);
        document.body.addEventListener("mouseleave", handleMouseLeave);
        document.body.addEventListener("mouseenter", handleMouseEnter);

        // Hide default cursor globally
        document.body.style.cursor = "none";
        // Also inject a style tag to force hide cursor on all elements
        const style = document.createElement("style");
        style.innerHTML = "* { cursor: none !important; }";
        document.head.appendChild(style);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            document.body.removeEventListener("mouseleave", handleMouseLeave);
            document.body.removeEventListener("mouseenter", handleMouseEnter);
            document.body.style.cursor = "auto";
            document.head.removeChild(style);
        };
    }, [mouseX, mouseY, isVisible]);

    if (typeof window === "undefined") return null;

    return (
        <div
            className="fixed inset-0 pointer-events-none z-[100] mix-blend-screen overflow-hidden"
            style={{ opacity: isVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}
        >
            {/* The sharp immediate custom cursor dot */}
            <motion.div
                className="absolute w-3 h-3 -left-[6px] -top-[6px] bg-emerald-400 rounded-full shadow-[0_0_10px_#34d399] flex items-center justify-center"
                style={{
                    x: mouseX,
                    y: mouseY,
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                    opacity: isHovering ? 0 : 1,
                }}
                transition={{ duration: 0.2 }}
            />

            {/* The secondary trailing ring */}
            <motion.div
                className="absolute w-10 h-10 -left-5 -top-5 border-[1.5px] border-emerald-500/50 rounded-full bg-emerald-500/5"
                style={{
                    x: cursorX,
                    y: cursorY,
                }}
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    borderColor: isHovering ? "rgba(16, 185, 129, 0.8)" : "rgba(16, 185, 129, 0.5)",
                    backgroundColor: isHovering ? "rgba(16, 185, 129, 0.2)" : "rgba(16, 185, 129, 0.05)",
                }}
                transition={{ duration: 0.2 }}
            />
        </div>
    );
};
