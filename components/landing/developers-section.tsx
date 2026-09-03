"use client";

import { useState, useEffect, useRef } from "react";

const aiRunCards = [
  {
    title: "AI/Run.Transform",
    href: "#",
    gradient: "linear-gradient(135deg, #12dce8 0%, #13dce4 48%, #b99cf7 100%)",
  },
  {
    title: "AI/Run.Blueprints",
    href: "#",
    gradient: "linear-gradient(135deg, #ff7900 0%, #ff7900 38%, #ff4c78 100%)",
  },
  {
    title: "AI/Run.Talent",
    href: "#",
    gradient: "linear-gradient(135deg, #a88af5 0%, #a88af5 42%, #48bdf0 100%)",
  },
  {
    title: "AI/Run.Tools",
    href: "#",
    gradient: "linear-gradient(135deg, #12dce8 0%, #13dce4 48%, #b99cf7 100%)",
  },
];

export function DevelopersSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  return (
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">

      {/* Image — absolute, bottom-right, behind all content */}
      <div
        className={`absolute bottom-0 right-0 w-[55%] h-[85%] pointer-events-none transition-all duration-1000 delay-300 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Upscaled%20Image%20%2813%29-OQ2DiR3ElVsUg8kTvTL1kC5A3Q6maM.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left-top"
        />
        {/* Fade left edge */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        {/* Fade top edge */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-transparent" />
      </div>

      {/* All text content sits on top */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header — Full width */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-6">
            <span className="w-8 h-px bg-foreground/30" />
            Artificial Intelligence
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-[80px] font-display tracking-tight leading-[0.9]">
            Our
            <br />
            <span className="text-muted-foreground">AI Insights</span>
          </h2>
          <p className="mt-8 text-xl text-muted-foreground leading-relaxed max-w-md">
            Transform your enterprise: innovate, operate, and outpace competitors in the era of AI.
          </p>
        </div>

        {/* AI/Run cards — left half only */}
        <div
          className={`max-w-full transition-all duration-700 delay-100 lg:max-w-[50%] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 gap-4 max-w-[760px] sm:grid-cols-2 lg:grid-cols-3">
            {aiRunCards.map((card, index) => (
              <div
                key={card.title}
                className={`group relative isolate box-border aspect-square overflow-visible border border-white/80 transition-opacity duration-500 ${
                  isVisible ? "opacity-100" : "opacity-0"
                }`}
                style={{ transitionDelay: `${index * 50 + 200}ms` }}
              >
                <span
                  aria-hidden="true"
                  className="absolute -left-2 top-2 z-0 h-full w-full border border-white/80"
                />
                <div className="relative h-full w-full [perspective:1000px]">
                  <div className="relative z-10 h-full w-full [transform-style:preserve-3d] transition-transform duration-700 ease-in-out group-hover:[transform:rotateY(180deg)]">
                    <div
                      className="absolute inset-0 flex min-w-0 flex-col justify-end overflow-hidden p-4 [backface-visibility:hidden] lg:p-6"
                      style={{ backgroundImage: card.gradient }}
                    >
                      <span className="max-w-full whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.1em] text-black lg:text-xs">
                        {card.title}
                      </span>
                      <span className="mt-3 text-lg leading-none text-black">
                        &rarr;
                      </span>
                    </div>
                    <div className="absolute inset-0 flex min-w-0 flex-col justify-between overflow-hidden bg-black p-4 text-white [backface-visibility:hidden] [transform:rotateY(180deg)] lg:p-6">
                      <span className="max-w-full whitespace-nowrap text-[10px] font-semibold tracking-[0.1em] lg:text-xs">
                        {card.title}
                      </span>
                      <a href={card.href} className="text-xs font-semibold hover:underline lg:text-sm">
                        Learn More
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
