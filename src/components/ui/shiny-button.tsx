"use client";

import React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

const animationProps = {
    initial: { "--x": "100%", scale: 0.8 },
    animate: { "--x": "-100%", scale: 1 },
    whileTap: { scale: 0.95 },
    transition: {
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
        type: "spring",
        stiffness: 20,
        damping: 15,
        mass: 2,
        scale: {
            type: "spring",
            stiffness: 200,
            damping: 5,
            mass: 0.5,
        },
    },
} as HTMLMotionProps<"button">;

interface ShinyButtonProps extends HTMLMotionProps<"button"> {
    children: React.ReactNode;
    className?: string;
}

export const ShinyButton = ({ children, className, ...props }: ShinyButtonProps) => {
    return (
        <motion.button
            {...animationProps}
            {...props}
            // cast props to any to avoid motion/react types conflict if strictly typed, 
            // but standard button props usually pass fine to motion.button
            className={cn(
                "group relative rounded-full px-6 py-2 font-normal backdrop-blur-xl transition-all duration-300 ease-in-out hover:scale-[1.03] shadow-[0_8px_20px_rgba(5,36,21,0.25)] hover:shadow-[0_10px_24px_rgba(5,36,21,0.35)] text-[rgb(0,0,0,65%)] dark:text-[rgb(255,255,255,90%)]",
                "disabled:opacity-50 disabled:pointer-events-none", // Add disabled styles
                className,
            )}
        >
            <span
                className="relative block h-full w-full flex justify-center items-center text-sm capitalize tracking-wide px-2 py-2 transition-transform duration-300 ease-in-out group-hover:scale-[1.05]"
                style={{
                    maskImage:
                        "linear-gradient(-75deg, hsl(0,0%,100%) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), hsl(0,0%,100%) calc(var(--x) + 100%))",
                }}
            >
                {children}
            </span>
        </motion.button>
    );
};





