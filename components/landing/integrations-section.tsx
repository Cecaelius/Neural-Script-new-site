"use client";

import { useEffect, useRef, useState } from "react";
import {
  AppWindow,
  Bot,
  BrainCircuit,
  CloudCog,
  Code2,
  Database,
  Factory,
  Gamepad2,
  Landmark,
  Microscope,
  ScanLine,
  type LucideIcon,
} from "lucide-react";

const projects: {
  name: string;
  category: string;
  description: string;
  technologies: string[];
  icon: LucideIcon;
}[] = [
  { name: "Fusion Neural Networks for Medical Diagnosis", category: "Research | Multimodal Data", description: "Developed custom fusion strategies for neural networks to classify patient conditions across multiple classes.", technologies: ["PyTorch", "CNN", "LSTM", "RBM"], icon: Microscope },
  { name: "Enterprise Web Systems & Tools", category: "Software Engineering | Fullstack & AI Integration", description: "Designed and developed software systems including electronic logbooks, project trackers, and a POC code assistant for enterprise clients.", technologies: ["Next.js", "NestJS", "PostgreSQL", "LangChain", "OpenAI", "Microservices", "Vue", "Nuxt"], icon: Code2 },
  { name: "Storm Prediction Models for BMD", category: "Weather & Disaster Forecasting | Government", description: "Developed two machine learning models for the Bangladesh Meteorological Department: a binary classifier for thunderstorm prediction and a regression model for storm surge forecasting.", technologies: ["Scikit-learn", "Random Forest", "Logistic Regression", "Feature Engineering", "GeoJSON"], icon: CloudCog },
  { name: "Waterkant Chatbot", category: "NLP | Festival Assistant", description: "Built an LLM-powered chatbot for answering event queries during the Waterkant AI Festival.", technologies: ["LangChain", "OpenAI", "Next.js"], icon: Bot },
  { name: "Phytoplankton Species Classification", category: "Marine Biology | Image Recognition", description: "Developed a deep neural network to classify 50+ phytoplankton types from microscope images.", technologies: ["TensorFlow", "CNN", "Data Augmentation"], icon: ScanLine },
  { name: "Online Banking & Job Portal Platform", category: "Web Application | Banking & Recruitment", description: "Developed the front-end of a React-based platform combining online banking services with job posting and application tracking, along with company portfolio management.", technologies: ["React.js", "JavaScript", "HTML5", "CSS3", "REST API"], icon: Landmark },
  { name: "Rural Data Survey & Reporting App", category: "Android Application | Data Collection", description: "Built an Android app to collect rural survey data and generate structured reports for analysis.", technologies: ["Java", "Android SDK", "XML", "SQLite"], icon: Database },
  { name: "Soil Data Collection App", category: "Mobile Application | Environmental Data", description: "Built a Flutter app for collecting soil data with intuitive real-time area marking on interactive maps.", technologies: ["Dart", "Flutter", "Google Maps API", "REST API"], icon: BrainCircuit },
  { name: "Payment Processor App", category: "Android Application | Payment Data Processing", description: "Developed a Kotlin app that collects payment data from SMS messages, processes it, and syncs with the server.", technologies: ["Kotlin", "Android SDK", "SMS API", "REST API"], icon: AppWindow },
  { name: "Football Game & Team Management App", category: "Mobile Application | Sports Management", description: "Developed a Kotlin app using Jetpack Compose and Firebase to provide intuitive football team and game management features.", technologies: ["Kotlin", "Jetpack Compose", "Firebase", "REST API"], icon: Gamepad2 },
  { name: "AQL AI Agent", category: "Agentic AI | AI Automation", description: "A production-ready AI agent system designed to understand requests, reason across connected knowledge and tools, and execute real-world workflows with intelligent automation.", technologies: ["LLMs", "Pinecone", "Cohere Rerank (v3)", "Redis Stack", "FastAPI", "LangSmith"], icon: Bot },
  { name: "iERP", category: "Enterprise Software | ERP", description: "A modern enterprise resource planning platform designed to streamline financial, operational, and business workflows through a unified digital system.", technologies: ["Python", "Django", "FastAPI"], icon: Factory },
];

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number } | null>(null);
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
    <section id="integrations" ref={sectionRef} className="relative overflow-hidden">
      <div className="relative z-10 pt-32 lg:pt-40 text-center">
        <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 justify-center ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <span className="w-12 h-px bg-foreground/20" />
          Portfolio
          <span className="w-12 h-px bg-foreground/20" />
        </span>
        <h2 className={`text-6xl md:text-7xl lg:text-[128px] font-display tracking-tight leading-[0.9] transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          Our
          <br />
          <span className="text-muted-foreground">Cases</span>
        </h2>
        <p className={`mt-8 text-xl text-muted-foreground leading-relaxed max-w-lg mx-auto transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          While much of our work is confidential, here's a look at the challenges we've solved across industries — from climate resilience to intelligent assistants.
        </p>
      </div>

      <div className={`relative left-1/2 -translate-x-1/2 w-screen -mt-16 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/connection-KeJwWPQvn6l0a7C48tCARYtNEdC92H.png" alt="" aria-hidden="true" className="w-full h-auto object-cover" />
      </div>

      <div className="relative z-10 mt-0 lg:-mt-24 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-16">
          {projects.map((project, index) => (
            <div
              key={project.name}
              className={`group relative flex flex-col items-start justify-start overflow-hidden p-6 lg:p-8 border transition-all duration-500 cursor-default ${hoveredIndex === index ? "border-foreground bg-foreground/[0.04] scale-[1.02]" : "border-foreground/10 hover:border-foreground/30"} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              style={{ transitionDelay: `${index * 30 + 300}ms` }}
              onMouseEnter={(e) => {
                setHoveredIndex(index);
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                setMousePos(null);
              }}
            >
              {hoveredIndex === index && mousePos && (
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ background: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.1) 0%, transparent 70%)` }} />
              )}

              <div className="relative z-10 -mt-4">
                <div className={`w-10 h-10 mb-6 shrink-0 flex items-center justify-center transition-colors ${hoveredIndex === index ? "text-white" : "text-foreground/60"}`}>
                  <project.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
                <div className="-translate-y-2">
                  <span className="font-medium block mb-2">{project.name}</span>
                  <span className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{project.description}</span>
                </div>
              </div>

              <span className={`absolute bottom-3 right-3 max-w-[70%] truncate text-[10px] font-mono px-2 py-0.5 transition-colors ${hoveredIndex === index ? "bg-foreground text-background" : "bg-foreground/10 text-muted-foreground"}`} title={`${project.category}: ${project.technologies.join(" • ")}`}>
                {project.technologies.join(" • ")}
              </span>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-foreground/20 overflow-hidden">
                <div className={`h-full bg-foreground transition-all duration-500 ${hoveredIndex === index ? "w-full" : "w-0"}`} />
              </div>
            </div>
          ))}
        </div>

        <div className={`flex flex-wrap items-center justify-between gap-8 pt-12 border-t border-foreground/10 transition-all duration-1000 delay-500 pb-32 lg:pb-40 ${isVisible ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-wrap gap-12">
            {[
              { value: "10+", label: "AI lifecycles completed" },
              { value: "90%", label: "Quicker ROI Realization" },
              { value: "98.7% Ø", label: "Model Precision" },
            ].map((stat) => (
              <div key={stat.label} className="flex items-baseline gap-3">
                <span className="text-3xl font-display">{stat.value}</span>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
            ))}
          </div>
          <a href="#" className="group inline-flex items-center gap-2 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors">
            View all cases
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
