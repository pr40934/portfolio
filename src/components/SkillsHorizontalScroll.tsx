import { memo, useRef, useState, useLayoutEffect, useEffect, useCallback, type RefObject } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { Cpu, MonitorSmartphone, Cloud, Settings, Key, Database } from "lucide-react";

const CARD_COUNT = 6;
const MOBILE_MQ = "(max-width: 767px)";

const NOISE_BG =
    'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")';

const SKILLS_DATA = [
    { id: "backend", titleLine1: "Backend", titleLine2: "Architecture", icon: Cpu, iconClass: "text-emerald-500/10", skills: ["Python", "Django", "Redis", "RabbitMQ", "Celery", "REST", "GraphQL", "Supabase"], accent: "bg-emerald-600", pattern: 0 },
    { id: "frontend", titleLine1: "Frontend", titleLine2: "Mastery", icon: MonitorSmartphone, iconClass: "text-teal-500/10", skills: ["Next.js", "React.js", "Zustand", "HTML", "CSS", "Tailwind", "Responsive Design"], accent: "bg-teal-600", pattern: 1 },
    { id: "devops", titleLine1: "Cloud", titleLine2: "& DevOps", icon: Cloud, iconClass: "text-cyan-500/10", skills: ["AWS S3", "CloudFront", "EC2 Linux", "PM2", "Docker", "Windows Server"], accent: "bg-cyan-600", pattern: 2 },
    { id: "tools", titleLine1: "Tooling", titleLine2: "& AI", icon: Settings, iconClass: "text-emerald-500/10", skills: ["Postman", "GIT", "Jira", "Claude", "Cursor IDE", "GitHub Actions"], accent: "bg-emerald-500", pattern: 3 },
    { id: "auth", titleLine1: "Auth", titleLine2: "& Security", icon: Key, iconClass: "text-teal-500/10", skills: ["JWT", "OAuth2", "Session Auth", "Django Auth", "Security"], accent: "bg-teal-500", pattern: 4 },
    { id: "database", titleLine1: "Data", titleLine2: "Systems", icon: Database, iconClass: "text-cyan-500/10", skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Supabase"], accent: "bg-cyan-500", pattern: 5 },
] as const;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const xFromProgress = (progress: number, positions: number[]) => {
    if (!positions.length) return 0;
    if (positions.length === 1) return positions[0];

    const scaled = progress * (positions.length - 1);
    const lower = Math.floor(scaled);
    const upper = Math.min(lower + 1, positions.length - 1);
    return lerp(positions[lower], positions[upper], scaled - lower);
};

const GradientPattern = memo(function GradientPattern({ index, accent }: { index: number; accent: string }) {
    switch (index) {
        case 0:
            return (
                <>
                    <div className={`absolute -top-32 -right-32 w-[350px] h-[350px] rounded-full ${accent} blur-[80px] md:blur-[120px] opacity-50 group-data-[active=true]:opacity-80`} />
                    <div className={`absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full ${accent} blur-[80px] md:blur-[140px] opacity-40 group-data-[active=true]:opacity-70`} />
                </>
            );
        case 1:
            return <div className={`absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-[120%] h-[60%] rounded-[100%] ${accent} blur-[80px] md:blur-[140px] opacity-60 group-data-[active=true]:opacity-100`} />;
        case 2:
            return <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full ${accent} blur-[80px] md:blur-[130px] opacity-50 group-data-[active=true]:opacity-90`} />;
        case 3:
            return (
                <>
                    <div className={`absolute -top-20 -left-20 w-[300px] h-[300px] rounded-full ${accent} blur-[80px] md:blur-[120px] opacity-60 group-data-[active=true]:opacity-90`} />
                    <div className={`absolute -bottom-20 -right-20 w-[350px] h-[350px] rounded-full ${accent} blur-[80px] md:blur-[130px] opacity-50 group-data-[active=true]:opacity-80`} />
                </>
            );
        case 4:
            return <div className={`absolute -top-1/4 left-1/2 -translate-x-1/2 w-[150%] h-[60%] rounded-[100%] ${accent} blur-[80px] md:blur-[140px] opacity-60 group-data-[active=true]:opacity-100`} />;
        case 5:
            return (
                <>
                    <div className={`absolute top-1/2 -left-32 -translate-y-1/2 w-[250px] h-[400px] rounded-[100%] ${accent} blur-[80px] md:blur-[100px] opacity-60 group-data-[active=true]:opacity-90`} />
                    <div className={`absolute top-1/2 -right-32 -translate-y-1/2 w-[250px] h-[400px] rounded-[100%] ${accent} blur-[80px] md:blur-[100px] opacity-60 group-data-[active=true]:opacity-90`} />
                </>
            );
        default:
            return null;
    }
});

const SkillCard = memo(function SkillCard({
    data,
    index,
    isActive,
    isMobile,
}: {
    data: (typeof SKILLS_DATA)[number];
    index: number;
    isActive: boolean;
    isMobile?: boolean;
}) {
    const Icon = data.icon;

    return (
        <div
            data-skill-card
            data-active={isActive}
            className={`group relative shrink-0 rounded-[32px] md:rounded-[40px] bg-[#020e08] border border-white/5 overflow-hidden shadow-2xl flex flex-col justify-between data-[active=true]:border-white/20 transition-[border-color] duration-300 ${
                isMobile
                    ? "w-full h-[min(520px,78dvh)] p-6"
                    : "w-[450px] h-[600px] p-10"
            }`}
        >
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[inherit]">
                <GradientPattern index={data.pattern} accent={data.accent} />
            </div>

            <div
                className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none rounded-[inherit]"
                style={{ backgroundImage: NOISE_BG }}
            />

            <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 pointer-events-none opacity-40">
                <Icon className={`w-32 h-32 md:w-80 md:h-80 ${data.iconClass}`} />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                    <span className="text-4xl md:text-6xl font-Case text-white/20">0{index + 1}</span>
                    <h3 className="text-2xl md:text-4xl font-Case text-white tracking-tight leading-none">
                        {data.titleLine1} <br />
                        <span className="text-white/60">{data.titleLine2}</span>
                    </h3>
                </div>
            </div>

            <div className="relative z-10 w-full min-w-0">
                <div className="flex flex-wrap gap-2 md:gap-3">
                    {data.skills.map((skill) => (
                        <div
                            key={skill}
                            className="px-4 py-2 md:px-6 md:py-3 rounded-full bg-white/5 border border-white/10 text-white/80 font-Turbine text-xs md:text-base md:backdrop-blur-md group-data-[active=true]:bg-white/10 group-data-[active=true]:border-white/30 group-data-[active=true]:text-white transition-colors duration-300"
                        >
                            {skill}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

function MobileCardTrack({
    trackRef,
    activeIndex,
}: {
    trackRef: RefObject<HTMLDivElement | null>;
    activeIndex: number;
}) {
    return (
        <div
            ref={trackRef}
            className="flex w-max h-full items-center will-change-transform"
            style={{ transform: "translate3d(0,0,0)" }}
        >
            {SKILLS_DATA.map((data, index) => (
                <div key={data.id} className="w-[100vw] shrink-0 flex justify-center px-4 box-border">
                    <SkillCard data={data} index={index} isActive={activeIndex === index} isMobile />
                </div>
            ))}
        </div>
    );
}

export const SkillsHorizontalScroll = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const metricsRef = useRef({ range: 0, scrollable: 0, positions: [] as number[] });
    const activeIndexRef = useRef(0);
    const scrollTickingRef = useRef(false);
    const measureFrameRef = useRef(0);
    const [isMobile, setIsMobile] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const desktopX = useTransform(scrollYProgress, (progress) => xFromProgress(progress, metricsRef.current.positions));

    useMotionValueEvent(scrollYProgress, "change", (progress) => {
        if (isMobile) return;
        const next = Math.min(CARD_COUNT - 1, Math.round(progress * (CARD_COUNT - 1)));
        setActiveIndex((prev) => (prev === next ? prev : next));
    });

    const measureCenterPositions = useCallback((track: HTMLElement, mobile: boolean) => {
        const slides = Array.from(track.children) as HTMLElement[];
        const cards = mobile
            ? slides
            : slides.slice(0, CARD_COUNT);

        const vw = window.innerWidth;

        return cards.map((slide, i) => {
            const card = mobile ? slide.querySelector("[data-skill-card]") as HTMLElement | null : slide;
            const el = card ?? slide;
            const center = el.offsetLeft + el.offsetWidth / 2;
            const x = -(center - vw / 2);

            if (!mobile && i === CARD_COUNT - 1) {
                return -(track.scrollWidth - vw);
            }
            return x;
        });
    }, []);

    const applyLayout = useCallback(() => {
        const track = trackRef.current;
        const section = targetRef.current;
        if (!track || !section) return;

        const mobile = window.matchMedia(MOBILE_MQ).matches;
        const positions = measureCenterPositions(track, mobile);
        const range = positions.length > 1 ? -positions[positions.length - 1] : 0;
        const scrollable = mobile
            ? section.offsetHeight - window.innerHeight
            : range + window.innerHeight;

        const prev = metricsRef.current;
        if (
            prev.range === range &&
            prev.scrollable === scrollable &&
            prev.positions.length === positions.length &&
            prev.positions.every((v, i) => v === positions[i])
        ) {
            return;
        }

        metricsRef.current = { range, scrollable: Math.max(1, scrollable), positions };

        if (!mobile) {
            section.style.height = `${range + window.innerHeight}px`;
        } else {
            section.style.height = "";
        }
    }, [measureCenterPositions]);

    useLayoutEffect(() => {
        const mq = window.matchMedia(MOBILE_MQ);
        const updateMode = () => setIsMobile(mq.matches);
        updateMode();
        mq.addEventListener("change", updateMode);
        return () => mq.removeEventListener("change", updateMode);
    }, []);

    useLayoutEffect(() => {
        applyLayout();

        const track = trackRef.current;
        if (!track) return;

        const scheduleMeasure = () => {
            cancelAnimationFrame(measureFrameRef.current);
            measureFrameRef.current = requestAnimationFrame(applyLayout);
        };

        const resizeObserver = new ResizeObserver(scheduleMeasure);
        resizeObserver.observe(track);
        window.addEventListener("resize", scheduleMeasure, { passive: true });

        return () => {
            cancelAnimationFrame(measureFrameRef.current);
            resizeObserver.disconnect();
            window.removeEventListener("resize", scheduleMeasure);
        };
    }, [applyLayout, isMobile]);

    useEffect(() => {
        if (!isMobile) return;

        const section = targetRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const update = () => {
            scrollTickingRef.current = false;

            const { scrollable, positions } = metricsRef.current;
            const rect = section.getBoundingClientRect();
            const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
            const x = xFromProgress(progress, positions);

            track.style.transform = `translate3d(${x}px,0,0)`;

            const next = Math.min(CARD_COUNT - 1, Math.round(progress * (CARD_COUNT - 1)));
            if (next !== activeIndexRef.current) {
                activeIndexRef.current = next;
                setActiveIndex(next);
            }
        };

        const onScroll = () => {
            if (scrollTickingRef.current) return;
            scrollTickingRef.current = true;
            requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [isMobile]);

    return (
        <div className="w-full relative mt-12 z-20">
            <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4 relative z-30">
                <div className="flex flex-col gap-2">
                    <h2 className="text-[10px] md:text-xs font-Turbine tracking-[0.4em] text-white/60 uppercase">Expertise</h2>
                    <p className="text-4xl md:text-5xl font-Case text-white leading-tight">My Technical Stack</p>
                </div>
            </div>

            <section
                ref={targetRef}
                {...(isMobile ? { "data-lenis-prevent": "" } : {})}
                className={`relative w-full ${isMobile ? "h-[400vh]" : "min-h-screen"}`}
            >
                <div className="sticky top-0 h-[100dvh] overflow-hidden flex items-center">
                    {isMobile ? (
                        <MobileCardTrack trackRef={trackRef} activeIndex={activeIndex} />
                    ) : (
                        <motion.div
                            ref={trackRef}
                            style={{ x: desktopX }}
                            className="flex gap-24 px-[10vw] w-max items-center h-full will-change-transform transform-gpu"
                        >
                            {SKILLS_DATA.map((data, index) => (
                                <div key={data.id} className="shrink-0">
                                    <SkillCard data={data} index={index} isActive={activeIndex === index} />
                                </div>
                            ))}
                            <div className="w-[10vw] shrink-0" aria-hidden />
                        </motion.div>
                    )}
                </div>
            </section>
        </div>
    );
};
