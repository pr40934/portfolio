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
    const scrollPosRef = useRef({ leftX: -9999, centerX: -9999, rightX: -9999, y: -9999, active: false });

    // Central function to update all 4 mask gradients (1 for mouse, 3 for scroll: left, center, right)
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

            // 2. Scroll Left | 3. Scroll Center | 4. Scroll Right
            let pos2 = "-9999px -9999px";
            let pos3 = "-9999px -9999px";
            let pos4 = "-9999px -9999px";
            
            if (scrollPosRef.current.active) {
                const cRect = container.getBoundingClientRect();
                const globalLeftX   = cRect.left + scrollPosRef.current.leftX;
                const globalCenterX = cRect.left + scrollPosRef.current.centerX;
                const globalRightX  = cRect.left + scrollPosRef.current.rightX;
                const globalY       = cRect.top  + scrollPosRef.current.y;

                const lx = globalLeftX   - oRect.left;
                const cx = globalCenterX - oRect.left;
                const rx = globalRightX  - oRect.left;
                const sy = globalY       - oRect.top;

                pos2 = `${lx - maskSize / 2}px ${sy - maskSize / 2}px`;
                pos3 = `${cx - maskSize / 2}px ${sy - maskSize / 2}px`;
                pos4 = `${rx - maskSize / 2}px ${sy - maskSize / 2}px`;
            }

            overlay.style.webkitMaskPosition = `${pos1}, ${pos2}, ${pos3}, ${pos4}`;
            overlay.style.maskPosition       = `${pos1}, ${pos2}, ${pos3}, ${pos4}`;
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
                // All 3 spotlights travel straight down their borders simultaneously
                const y       = v * height;
                const leftX   = 0;          // left outer border
                const centerX = width / 2;  // center vertical border
                const rightX  = width;      // right outer border

                scrollPosRef.current = { leftX, centerX, rightX, y, active: true };
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
