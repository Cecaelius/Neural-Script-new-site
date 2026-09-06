"use client";

import { useEffect, useState, useRef } from "react";
import {
  Building2,
  CandlestickChart,
  CircuitBoard,
  ContactRound,
  Factory,
  Fingerprint,
  Gamepad2,
  GraduationCap,
  HeartPulse,
  PanelsTopLeft,
  type LucideIcon,
} from "lucide-react";

const industries: { name: string; description: string; icon: LucideIcon }[] = [
  { name: "CRM", description: "Transform Customer Data into Revenue with AI", icon: ContactRound },
  { name: "Education", description: "Transform Student Outcomes with AI-Powered Platforms", icon: GraduationCap },
  { name: "Enterprise Software", description: "Unify Your Enterprise Systems with AI", icon: Building2 },
  { name: "Fintech", description: "Fintech software, built by payments and banking engineers", icon: Fingerprint },
  { name: "Game Development", description: "Ship Games Faster with AI-Accelerated Pipelines", icon: Gamepad2 },
  { name: "Healthcare Services", description: "Healthcare software for clinical and operational workflows", icon: HeartPulse },
  { name: "High Frequency Trading", description: "Capture Microsecond Advantages with AI-Optimized Systems", icon: CandlestickChart },
  { name: "IoT", description: "Deploy Smarter Connected Devices with AI at the Edge", icon: CircuitBoard },
  { name: "Manufacturing", description: "Run Smarter Production Lines with AI", icon: Factory },
  { name: "SaaS", description: "Your embedded, AI-native team for SaaS development", icon: PanelsTopLeft },
];

export function InfrastructureSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndustry, setActiveIndustry] = useState(0);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const [industryMousePos, setIndustryMousePos] = useState<{ x: number; y: number } | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndustry((prev) => (prev + 1) % industries.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="industries" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
        {/* Background accent — retiré, remplacé par l'image sphère */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            Industries
          </span>
          
          <div className="grid lg:grid-cols-[auto_1fr] gap-8 lg:gap-16 items-stretch">
            {/* Image globe — colonne gauche, pleine hauteur */}
            <div className={`w-48 lg:w-72 xl:w-80 shrink-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/world-3i68QNWJwmO7W19ztZWbevAwJQHzYL.png"
                alt="Global network sphere"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain object-center"
              />
            </div>

            {/* Titre + description empilés */}
            <div className="flex flex-col justify-center">
              <h2 className={`text-4xl md:text-5xl lg:text-[64px] font-display tracking-tight leading-[1.05] transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}>
                We Empower Businesses
                <br />
                <span className="text-muted-foreground">Across Industries.</span>
              </h2>

              <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg transition-all duration-1000 delay-100 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}>
                The Blueprint Intelligence Platform Preferred by Businesses.
              </p>
            </div>
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large stat card */}
          <div className={`lg:col-span-2 relative p-8 lg:p-12 border border-foreground/10 bg-foreground/[0.02] overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Animated dots background with connecting lines */}
            <div className="absolute inset-0 opacity-70">
              {/* SVG for connecting lines */}
              <svg
                className="absolute inset-0 w-full h-full"
                style={{ pointerEvents: "none" }}
              >
                <defs>
                  <style>{`
                    @keyframes drawLine {
                      0%   { stroke-dashoffset: 1000; opacity: 0; }
                      15%  { opacity: 1; }
                      70%  { opacity: 0.7; }
                      100% { stroke-dashoffset: 0; opacity: 0; }
                    }
                    .connecting-line {
                      stroke: #eca8d6;
                      stroke-width: 1.2;
                      fill: none;
                      stroke-dasharray: 1000;
                      animation: drawLine 3s ease-in-out infinite;
                    }
                  `}</style>
                </defs>
                {[...Array(19)].map((_, i) => {
                  const x1 = 10 + (i % 5) * 20;
                  const y1 = 10 + Math.floor(i / 5) * 25;
                  const x2 = 10 + ((i + 1) % 5) * 20;
                  const y2 = 10 + Math.floor((i + 1) / 5) * 25;
                  return (
                    <line
                      key={`line-${i}`}
                      x1={`${x1}%`}
                      y1={`${y1}%`}
                      x2={`${x2}%`}
                      y2={`${y2}%`}
                      className="connecting-line"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  );
                })}
              </svg>

              {/* Dots */}
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full bg-[#eca8d6]"
                  style={{
                    left: `${10 + (i % 5) * 20}%`,
                    top: `${10 + Math.floor(i / 5) * 25}%`,
                    animation: `pulse 2s ease-in-out ${i * 0.1}s infinite`,
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-8xl lg:text-[10rem] font-display leading-none">11</span>
                <span className="text-2xl text-muted-foreground">industry verticals</span>
              </div>
              <p className="text-muted-foreground max-w-md">
                Purpose-built for regulated, high-volume, and fast-moving sectors.
              </p>
            </div>
          </div>

          {/* Industry cards */}
          <div className="flex flex-col gap-6">
            {industries.slice(0, 2).map((industry, index) => (
              <div
                key={industry.name}
                className={`group relative overflow-hidden p-8 border transition-all duration-500 ${index === 0 ? "delay-100" : "delay-200"} cursor-default ${
                  hoveredIndustry === index
                    ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                    : activeIndustry === index
                    ? "border-white/30 bg-black"
                    : "border-white/10 bg-black hover:border-white/30"
                } ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                onClick={() => setActiveIndustry(index)}
                onMouseEnter={(e) => {
                  setActiveIndustry(index);
                  setHoveredIndustry(index);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setIndustryMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  setIndustryMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
                }}
                onMouseLeave={() => {
                  setHoveredIndustry(null);
                  setIndustryMousePos(null);
                }}
              >
                {hoveredIndustry === index && industryMousePos && (
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 z-0"
                    style={{
                      background: `radial-gradient(200px circle at ${industryMousePos.x}px ${industryMousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                    }}
                  />
                )}
                <industry.icon className="relative z-10 mb-6 h-8 w-8 text-white" strokeWidth={1.5} />
                <span className="relative z-10 font-medium text-white block mb-2">{industry.name}</span>
                <span className="relative z-10 text-sm leading-relaxed text-white/70">{industry.description}</span>
                <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-foreground/20 overflow-hidden">
                  <div className={`h-full bg-foreground transition-all duration-500 ${hoveredIndustry === index ? "w-full" : "w-0"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Remaining industry cards */}
        <div className={`mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          {industries.slice(2).map((industry, index) => {
            const industryIndex = index + 2;
            return (
            <div
              key={industry.name}
              className={`group relative overflow-hidden p-6 border transition-all duration-500 cursor-default ${
                hoveredIndustry === industryIndex
                  ? "border-foreground bg-foreground/[0.04] scale-[1.02]"
                  : activeIndustry === industryIndex
                  ? "border-white/30 bg-black"
                  : "border-white/10 bg-black hover:border-white/30"
              }`}
              onClick={() => setActiveIndustry(industryIndex)}
              onMouseEnter={(e) => {
                setActiveIndustry(industryIndex);
                setHoveredIndustry(industryIndex);
                const rect = e.currentTarget.getBoundingClientRect();
                setIndustryMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setIndustryMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndustry(null);
                setIndustryMousePos(null);
              }}
            >
              {hoveredIndustry === industryIndex && industryMousePos && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-0"
                  style={{
                    background: `radial-gradient(200px circle at ${industryMousePos.x}px ${industryMousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)`,
                  }}
                />
              )}
              <industry.icon className="relative z-10 mb-5 h-7 w-7 text-white" strokeWidth={1.5} />
              <span className="relative z-10 font-medium text-white block mb-2">{industry.name}</span>
              <span className="relative z-10 text-sm leading-relaxed text-white/70">{industry.description}</span>
              <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-foreground/20 overflow-hidden">
                <div className={`h-full bg-foreground transition-all duration-500 ${hoveredIndustry === industryIndex ? "w-full" : "w-0"}`} />
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
