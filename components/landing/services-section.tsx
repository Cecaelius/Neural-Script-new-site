"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const services = [
  {
    title: "AI/ML Engineering",
    description: "Production-ready AI, ML, RAG, and computer vision - integrated into your stack. We build on OpenAI, Anthropic, Gemini, Llama, Mistral, DeepSeek, Qwen, and more, and turn your data into secure, measurable revenue gains - not pilots that gather dust.",
    tags: ["LLM", "ML", "RAG", "Computer Vision", "MLOps"],
    image: "/images/service-ai-ml.webp",
  },
  {
    title: "Agentic AI Engineering",
    description: "Custom agents, copilots, and multi-agent systems that automate real work - sales, support, ops, research. Production-grade from day one, with guardrails, evals, and observability built in.",
    tags: ["AI Agents", "Copilots", "Multi-Agent", "LangGraph", "Voice AI"],
    image: "/images/service-agentic.webp",
  },
  {
    title: "AI-Native Software Engineering",
    description: "Full AI-native products - web, mobile, and SaaS - engineered end-to-end with AI baked into every layer. From conversation UIs to recommendation engines and agent-first workflows.",
    tags: ["AI-Native", "SaaS", "Web", "Mobile", "Vibecode Rescue"],
    image: "/images/service-ai-native.webp",
  },
  {
    title: "AI-Driven Product Discovery",
    description: "Validate scope, architecture, and ROI before committing to a full build. From hypothesis to a working PoC in 1-2 weeks, with use-case mapping, data audit, and a costed roadmap.",
    tags: ["Use-case mapping", "Architecture", "Rapid PoC", "1-2 weeks"],
    image: "/images/service-discovery.webp",
  },
  {
    title: "AI Staff Augmentation",
    description: "We embed top 1% senior AI/ML, full-stack, and product engineers directly into your team who work AI-first by default. Our experts adapt your tools, stack, and culture - adding senior capacity without long hiring cycles.",
    tags: ["Cultural fit", "Top 1%", "Instant hire"],
    image: "/images/service-staff.webp",
  },
  {
    title: "Web Development",
    description: "Modern websites and web apps engineered by senior teams - fast, responsive, easy to manage. Integrate AI agents, copilots, or data when you need to; ship a great product even if you don't.",
    tags: ["Contentful", "Magento", "WordPress", "Shopify", "Sitecore"],
    image: "/images/service-web.webp",
  },
  {
    title: "Mobile Development",
    description: "Native and cross-platform iOS and Android apps engineered by senior teams. AI features (agents, copilots, computer vision) when your roadmap calls for them - solid, fast, user-loved apps whether or not you need them.",
    tags: ["Swift", "React Native", "Flutter", "Kotlin", "Java"],
    image: "/images/service-mobile.webp",
  },
] as const;

function ServiceCard({
  service,
  index,
  isVisible,
}: {
  service: (typeof services)[number];
  index: number;
  isVisible: boolean;
}) {
  const isLast = index === services.length - 1;

  return (
    <article
      className={`group relative min-h-[310px] overflow-hidden rounded-[24px] bg-white p-8 text-[#07112f] shadow-[0_8px_24px_rgba(12,20,45,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_44px_rgba(12,20,45,0.2)] ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${isLast ? "lg:col-span-2 lg:mx-auto lg:w-1/2" : ""}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="pointer-events-none absolute -inset-y-10 -left-1/2 z-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-[#ffffff]/90 to-transparent opacity-0 transition-all duration-700 group-hover:left-[130%] group-hover:opacity-100" />
      <div className="relative z-10 max-w-[68%]">
        <h3 className="text-2xl font-semibold tracking-tight">{service.title}</h3>
        <p className="mt-5 text-[15px] leading-[1.45] text-[#07112f]">{service.description}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          {service.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-[#f7f7fa] px-3 py-1.5 text-[11px] font-medium text-[#07112f]">
              {tag}
            </span>
          ))}
        </div>
        <button
          type="button"
          className="mt-6 inline-flex items-center gap-3 rounded-[6px] bg-[#07112f] px-3.5 py-2.5 text-xs font-semibold text-white opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 group-focus-within:translate-x-1 group-focus-within:opacity-100"
        >
          Let's chat
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
      <img
        src={service.image}
        alt=""
        aria-hidden="true"
        className="absolute right-5 top-1/2 h-44 w-44 -translate-y-1/2 object-contain transition-transform duration-500 group-hover:scale-125 group-hover:-translate-x-2 group-hover:rotate-6"
      />
    </article>
  );
}

export function ServicesSection() {
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
    <section id="services" ref={sectionRef} className="relative py-32 lg:py-40">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header - Dramatic offset */}
        <div className="grid lg:grid-cols-12 gap-8 mb-20">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-3 text-sm font-mono text-muted-foreground mb-8">
              <span className="w-12 h-px bg-foreground/30" />
              Services We Provide
            </span>
            <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
               Our
              <br />
              <span className="text-stroke">Solutions</span>
            </h2>
            <p className={`mt-8 text-left text-lg text-muted-foreground leading-relaxed transition-all duration-1000 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}>
                <span className="block">
                  We are here to accommodate you.  From a single pair of hands to entire teams and expert technical advice, we are flexible enough to support you in any way you need.
                </span>
                </p>
          </div>
          
          <div className="lg:col-span-5 relative p-0 h-96 lg:h-auto">
            {/* Whale image */}
            <div className={`absolute inset-0 pointer-events-none transition-all duration-1000 delay-100 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <img
                src="/images/whale.png"
                alt="Organic whale"
                className="w-full h-full object-contain object-center"
              />
            </div>

          </div>
        </div>

        <div className="grid gap-2 lg:grid-cols-2">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="#"
            className="group relative inline-flex h-14 items-center gap-4 rounded-[6px] bg-[linear-gradient(94.67deg,#9935e8_0%,#e85535_100%)] px-6 pr-[54px] text-lg font-bold text-white transition-colors duration-300 hover:bg-[#a038d8]"
          >
            Request a quote
            <ArrowRight className="absolute right-6 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>

        {/* Bottom note with icons */}
        <div className={`mt-20 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}>
          <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
                Automations
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Security
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#eca8d6]" />
              Data Sharing
            </span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .text-stroke {
          -webkit-text-stroke: 1.5px currentColor;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </section>
  );
}
