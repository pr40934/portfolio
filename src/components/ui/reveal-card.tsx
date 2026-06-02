import React from "react";

interface RevealCardProps {
    children: React.ReactNode;
    className?: string;
    maskSize?: number;
    borderColor?: string;
    glowColor?: string;
}

export function RevealCard({
    children,
    className = "",
    maskSize = 220,
    borderColor = "hsla(160, 84%, 55%, 1)",
}: RevealCardProps) {
    return (
        <div
            className={`relative ${className}`}
            style={{ isolation: "isolate" }}
        >
            {/* ── Base border – always visible, very dim */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{ border: "1px solid hsla(0,0%,100%,0.08)" }}
            />

            {/* ── Glow overlay – driven by RevealGrid's mouse listener */}
            <div
                data-reveal-overlay="true"
                className="pointer-events-none absolute inset-0"
                style={{
                    opacity: 0,
                    transition: "opacity 0.25s ease",
                    border: `1px solid ${borderColor}`,
                    boxShadow: `0 0 12px 2px hsla(160, 84%, 55%, 0.45), inset 0 0 12px 2px hsla(160, 84%, 55%, 0.15)`,
                    WebkitMaskImage:
                        "radial-gradient(circle closest-side, white 20%, transparent 100%)",
                    maskImage:
                        "radial-gradient(circle closest-side, white 20%, transparent 100%)",
                    WebkitMaskSize: `${maskSize}px ${maskSize}px`,
                    maskSize: `${maskSize}px ${maskSize}px`,
                    WebkitMaskRepeat: "no-repeat",
                    maskRepeat: "no-repeat",
                    WebkitMaskOrigin: "border-box",
                    maskOrigin: "border-box",
                    WebkitMaskPosition: "-9999px -9999px",
                    maskPosition: "-9999px -9999px",
                }}
            />

            {/* ── Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
}
