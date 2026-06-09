import React, { useRef, useCallback, useEffect } from "react";
import { useScroll } from "framer-motion";

interface RevealGridProps {
    children: React.ReactNode;
    className?: string;
    maskSize?: number;
}

export function RevealGrid({ children, className = "", maskSize = 220 }: RevealGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // We use refs to store the latest mouse and scroll positions so they don't fight
    const mousePosRef = useRef({ x: -9999, y: -9999, active: false });
    const scrollPosRef = useRef({ leftX: -9999, rightX: -9999, y: -9999, active: false });

    // Central function to update all 3 mask gradients (1 for mouse, 2 for scroll)
    const updateMasks = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const overlays = container.querySelectorAll<HTMLElement>("[data-reveal-overlay]");
        overlays.forEach((overlay) => {
            const oRect = overlay.getBoundingClientRect();
            
            // 1. Mouse Mask
            let pos1 = "-9999px -9999px";
            if (mousePosRef.current.active) {
                const mx = mousePosRef.current.x - oRect.left;
                const my = mousePosRef.current.y - oRect.top;
                pos1 = `${mx - maskSize / 2}px ${my - maskSize / 2}px`;
            }

            // 2. Scroll Left Mask & 3. Scroll Right Mask
            let pos2 = "-9999px -9999px";
            let pos3 = "-9999px -9999px";
            
            if (scrollPosRef.current.active) {
                const cRect = container.getBoundingClientRect();
                const globalLeftX = cRect.left + scrollPosRef.current.leftX;
                const globalRightX = cRect.left + scrollPosRef.current.rightX;
                const globalY = cRect.top + scrollPosRef.current.y;

                const lx = globalLeftX - oRect.left;
                const rx = globalRightX - oRect.left;
                const sy = globalY - oRect.top;

                pos2 = `${lx - maskSize / 2}px ${sy - maskSize / 2}px`;
                pos3 = `${rx - maskSize / 2}px ${sy - maskSize / 2}px`;
            }

            overlay.style.webkitMaskPosition = `${pos1}, ${pos2}, ${pos3}`;
            overlay.style.maskPosition       = `${pos1}, ${pos2}, ${pos3}`;
            overlay.style.opacity            = (mousePosRef.current.active || scrollPosRef.current.active) ? "1" : "0";
        });
    }, [maskSize]);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            mousePosRef.current = { x: e.clientX, y: e.clientY, active: true };
            updateMasks();
        },
        [updateMasks]
    );

    const handleMouseLeave = useCallback(() => {
        mousePosRef.current.active = false;
        updateMasks();
    }, [updateMasks]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 60%", "end 40%"],
    });

    useEffect(() => {
        return scrollYProgress.on("change", (v) => {
            const container = containerRef.current;
            if (!container) return;

            const rect = container.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;

            if (v <= 0 || v >= 1) {
                scrollPosRef.current.active = false;
            } else {
                let leftX = 0;
                let rightX = width;
                let y = v * height;

                if (v < 0.25) {
                    const progress = v / 0.25;
                    leftX = progress * (width / 2);
                    rightX = width - (progress * (width / 2));
                } else if (v < 0.5) {
                    leftX = width / 2;
                    rightX = width / 2;
                } else if (v < 0.75) {
                    const progress = (v - 0.5) / 0.25;
                    leftX = (width / 2) - (progress * (width / 2));
                    rightX = (width / 2) + (progress * (width / 2));
                } else {
                    leftX = 0;
                    rightX = width;
                }
                
                scrollPosRef.current = { leftX, rightX, y, active: true };
            }
            updateMasks();
        });
    }, [scrollYProgress, updateMasks]);

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={className}
        >
            {children}
        </div>
    );
}
