"use client";

import { useEffect, useState, useRef } from "react";

const strategyPhases = [
  {
    number: "01",
    title: "Discover & Plan",
    detail: "We use AI during workshops and stakeholder interviews. The AI reviews information from calls, documents, and social conversations - highlighting blind spots, unusual cases, and contradictions that people might overlook.",
    badge: "Human + AI",
    badgeClass: "text-[#f6b24a] border-[#f6b24a]/50 bg-[#f6b24a]/10",
  },
  {
    number: "02",
    title: "Align",
    detail: "You review and approve. Every decision is logged - an auditable trail before any code is written. No black box, no scope drift.",
    badge: "Human",
    badgeClass: "text-green-300 border-green-300/50 bg-green-300/10",
  },
  {
    number: "03",
    title: "Build",
    detail: "AI agents execute the approved plan inside engineered guardrails. Senior engineers steer and unblock. Sprint cadence with working artifacts, not status decks.",
    badge: "AI",
    badgeClass: "text-[#f6b24a] border-[#f6b24a]/50 bg-[#f6b24a]/10",
  },
  {
    number: "04",
    title: "Validate",
    detail: "Three independent layers on every release candidate: automated evals, senior code review, and dedicated Human QA - manual and exploratory testing alongside security, performance, and accessibility checks.",
    badge: "Human + AI",
    badgeClass: "text-[#f6b24a] border-[#f6b24a]/50 bg-[#f6b24a]/10",
  },
  {
    number: "05",
    title: "Release",
    detail: "Production deployment, UAT, knowledge transfer, runbooks. Cutover is documented, reversible, and on a schedule you approve. Your team takes the keys - or we operate it for you.",
    badge: "Human + AI",
    badgeClass: "text-[#f6b24a] border-[#f6b24a]/50 bg-[#f6b24a]/10",
  },
  {
    number: "06",
    title: "Evolve",
    detail: "Launch is a milestone, not a finish line. Monitoring, feedback loops, and incremental improvements keep the system compounding - and feed the next discovery cycle.",
    badge: "Human + AI",
    badgeClass: "text-[#f6b24a] border-[#f6b24a]/50 bg-[#f6b24a]/10",
  },
] as const;

function GridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef(0);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      ctx.clearRect(0, 0, width, height);
      const gridSize = 60;
      const time = timeRef.current;
      for (let x = 0; x < width; x += gridSize) {
        for (let y = 0; y < height; y += gridSize) {
          const wave = Math.sin(x * 0.01 + y * 0.01 + time) * 0.5 + 0.5;
          const size = 1 + wave * 2;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255, 255, 255, 0.04)";
          ctx.fill();
        }
      }
      const pulseY = (time * 30) % height;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, pulseY);
      ctx.lineTo(width, pulseY);
      ctx.stroke();
      timeRef.current += 0.02;
      frameRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
    />
  );
}

function DotGraph({
  color = "white",
  height = 32,
  freq1 = 0.35,
  freq2 = 0.12,
  freqT = 0.7,
  speed = 0.025,
  baseline = 0.3,
  amplitude = 0.5,
}: {
  color?: string;
  height?: number;
  freq1?: number;
  freq2?: number;
  freqT?: number;
  speed?: number;
  baseline?: number;
  amplitude?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const timeRef = useRef(Math.random() * 100);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth || 300;
    const H = height;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const render = () => {
      ctx.clearRect(0, 0, W, H);
      const t = timeRef.current;
      const cols = Math.floor(W / 8);

      for (let i = 0; i < cols; i++) {
        const raw = baseline + amplitude * Math.sin(i * freq1 + t) * Math.cos(i * freq2 + t * freqT);
        const v = Math.max(0, Math.min(1, raw));
        const dotY = H - 4 - v * (H - 8);
        const x = i * 8 + 4;
        const alpha = 0.15 + v * 0.55;
        const r = 1.5 + v * 1.2;

        ctx.beginPath();
        ctx.arc(x, dotY, r, 0, Math.PI * 2);
        ctx.fillStyle = color === "green"
          ? `rgba(236, 168, 214, ${alpha})`
          : `rgba(255, 255, 255, ${alpha})`;
        ctx.fill();
      }

      timeRef.current += speed;
      frameRef.current = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(frameRef.current);
  }, [color, height, freq1, freq2, freqT, speed, baseline, amplitude]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: `${height}px`, display: "block" }}
    />
  );
}

export function MetricsSection() {
  const [time, setTime] = useState<Date | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setTime(new Date());
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      <GridBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20 lg:mb-32">
          <div className="lg:col-span-7 lg:col-start-1">
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-2 px-3 py-1 bg-[#eca8d6]/10 text-[#eca8d6] text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-[#eca8d6] animate-pulse" />
                Work
              </span>
              <span className="text-sm font-mono text-muted-foreground">
                {time ? `${time.toLocaleTimeString("en-GB")} GMT+6` : ""}
              </span>
            </div>

            <h2 className={`text-6xl md:text-7xl lg:text-[140px] font-display tracking-tight leading-[0.95] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              Our
              <br />
              <span className="text-muted-foreground">Strategy Offerings</span>
            </h2>
          </div>
          <p className={`lg:col-span-5 lg:col-start-8 self-end max-w-3xl text-xl text-muted-foreground leading-relaxed transition-all duration-1000 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            Six defined phases. Ongoing iteration. AI works with us in every discussion - revealing blind spots, edge cases, and inconsistencies before they turn into rework - while senior engineers and Human QA own the choices that manage risk and deliver the product. <strong className="text-foreground font-normal">You always know who's leading, what you're approving, and what follows.</strong>
          </p>
        </div>

        {/* Organic graph image */}
        <div className={`w-full mb-0 transition-all duration-1000 delay-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/real-time-graph-INFmn3u0MlUwvNPynoIhwxtPaPjxM5.png"
            alt=""
            aria-hidden="true"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Metrics grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {strategyPhases.map((phase, index) => (
            <div
              key={phase.number}
              className={`min-h-[260px] lg:h-[280px] rounded-2xl border border-foreground/15 bg-black/45 p-7 backdrop-blur-sm transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
              <span className="text-sm font-mono font-semibold text-[#f6b24a]">{phase.number}</span>
                  <h3 className="text-2xl font-display text-foreground">{phase.title}</h3>
                </div>
                <span className={`shrink-0 rounded-full border px-3 py-1 text-xs font-mono ${phase.badgeClass}`}>
                  {phase.badge}
                </span>
              </div>
              <p className="text-base leading-relaxed text-muted-foreground">{phase.detail}</p>
              <div className="mt-6 border-t border-foreground/10 pt-4">
                <DotGraph
                  color={index === 1 ? "green" : "white"}
                  height={24}
                  freq1={index === 1 ? 0.45 : 0.22}
                  freq2={index === 1 ? 0.18 : 0.07}
                  freqT={index === 1 ? 1.1 : 0.4}
                  speed={index === 1 ? 0.032 : 0.015}
                  baseline={index === 1 ? 0.4 : 0.25}
                  amplitude={index === 1 ? 0.45 : 0.6}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Bottom ticker */}
        <div className={`mt-16 pt-8 border-t border-foreground/10 flex flex-wrap items-center gap-x-12 gap-y-4 text-sm font-mono text-muted-foreground transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <span>OPTIMIZING FOR GROUTH</span>
          <span>PROJECT TO PRODUCT</span>
          <span>MERGERS & ACQUISITION</span>
          <span>GENARATIVE AI</span>
          <span className="text-foreground">BUSINESS VALUE</span>
        </div>
      </div>
    </section>
  );
}
