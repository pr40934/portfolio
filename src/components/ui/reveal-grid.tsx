import React, { useRef, useCallback } from "react";

interface RevealGridProps {
    children: React.ReactNode;
    className?: string;
    maskSize?: number;
}

/**
 * RevealGrid — wraps a grid of RevealCards and drives ALL their overlay masks
 * from a single shared mousemove listener, so the glow bleeds naturally across
 * card boundaries. This mirrors the original vanilla JS approach:
 *
 *   addEventListener('mousemove', (event) => {
 *     elements.forEach((element) => {
 *       const {top, left} = element.getBoundingClientRect();
 *       const x = event.pageX - left - maskSize / 2;
 *       const y = event.pageY - top  - maskSize / 2;
 *       element.style.webkitMaskPosition = `${x}px ${y}px`;
 *     });
 *   });
 */
export function RevealGrid({ children, className = "", maskSize = 220 }: RevealGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = useCallback(
        (e: React.MouseEvent<HTMLDivElement>) => {
            const container = containerRef.current;
            if (!container) return;

            // Query every overlay inside this grid — same as the original JS forEach
            const overlays = container.querySelectorAll<HTMLElement>("[data-reveal-overlay]");
            overlays.forEach((overlay) => {
                const { top, left } = overlay.getBoundingClientRect();
                const x = e.clientX - left - maskSize / 2;
                const y = e.clientY - top  - maskSize / 2;

                overlay.style.webkitMaskPosition = `${x}px ${y}px`;
                overlay.style.maskPosition       = `${x}px ${y}px`;
                overlay.style.opacity            = "1";
            });
        },
        [maskSize]
    );

    const handleMouseLeave = useCallback(() => {
        const container = containerRef.current;
        if (!container) return;

        const overlays = container.querySelectorAll<HTMLElement>("[data-reveal-overlay]");
        overlays.forEach((overlay) => {
            overlay.style.opacity = "0";
        });
    }, []);

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
