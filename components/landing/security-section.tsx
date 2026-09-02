"use client";

import { useEffect, useState, useRef } from "react";
import { Shield, Lock, Eye, FileCheck } from "lucide-react";

const securityFeatures = [
  {
    icon: Shield,
    title: "Technical Deep Dive",
    description: "We go layer by layer through your code to kill bugs and boost performance before they ever reach production.",
    image: "/images/isolated.jpg",
  },
  {
    icon: Lock,
    title: "Complete Team",
    description: "No outsourcing, no gaps—just one fully-stocked in-house crew that handles everything from backend to frontend.",
    image: "/images/encrypted.jpg",
  },
  {
    icon: Eye,
    title: "Proactive Management",
    description: "We spot issues, trends, and improvements early, so we're always fixing things before they break.",
    image: "/images/audit.jpg",
  },
  {
    icon: FileCheck,
    title: "Redundant Systems",
    description: "If one server fails, another takes over instantly—zero downtime, zero panic.",
    image: "/images/permissions.jpg",
  },
];



export function SecuritySection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
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
      setActiveFeature((prev) => (prev + 1) % securityFeatures.length);
}, 3000);
     return () => clearInterval(interval);
   }, []);


   // Left content states
   const leftContent = [
     {
       title: "First Touch Deep Dive",
       subtitle: "A Pre-Kickoff Technical and Strategic Review",
       points: [
         "Full review of your stack, goals, and constraints before kickoff",
         "Technical alignment session led by our VP Eng, CTO, and senior leads",
         "Ensures the right architecture, tools, and people are in place before code is written"
       ]
     },
     {
       title: "A Complete Team",
       subtitle: "We Deliver More Than a Developer",
       points: [
         "Kickoff includes senior oversight: VP Eng, CTO, Project Manager, CSM",
         "Continued monitoring using proprietary AI tools",
         "Structured to anticipate risks and surface insights early"
       ]
     },
     {
       title: "Proactive Management",
       subtitle: "Daily Stand-ups & Weekly Reviews",
       points: [
         "Daily standups with developers to review progress and blockers",
         "Weekly internal reviews across every project: tracking, tickets, sprints",
         "Regular contact behind the scenes so you’re never in the dark"
       ]
     },
     {
       title: "Built-in Redundancy",
       subtitle: "Our 'Bench Strength' Protocol",
       points: [
         "Extra resources learn your application and sit in reserve",
         "Can step in immediately if priorities shift or needs change",
         "Keeps delivery on track, no matter what"
       ]
     }
   ];

   return (
    <section id="security" ref={sectionRef} className="relative py-32 lg:py-40 overflow-hidden">
      {/* Background accent removed */}
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
{/* Header */}
        <div className="mb-20">
          <span className={`inline-flex items-center gap-4 text-sm font-mono text-muted-foreground mb-8 transition-all duration-700 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            <span className="w-12 h-px bg-foreground/20" />
            We’re Your Trusted Advisor for Technology Solutions
          </span>
          
          {/* Title and Description side by side */}
          <div className={`flex flex-col lg:flex-row lg:items-start lg:justify-between transition-all duration-1000 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}>
            {/* Title */}
            <h2 className={`text-4xl md:text-5xl lg:text-[80px] font-display tracking-tight leading-[0.9] mb-6 lg:mb-0 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}>
              From Idea to
              <br />
              <span className="text-muted-foreground">Scalable Product.</span>
            </h2>
            
            {/* Description */}
            <div className={`lg:ml-auto lg:max-w-[45%] lg:w-[45%] flex-1 transition-all duration-1000 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}>
              <p className="text-xl text-muted-foreground leading-relaxed">
                We help businesses turn promising ideas into production-ready digital products through a structured journey—from validating concepts and launching MVPs to building market-ready solutions and scaling them for long-term growth. Our engineering, AI, and product expertise ensures every stage is practical, measurable, and built for what comes next.
              </p>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Large visual card */}
          <div className={`lg:col-span-7 relative p-8 lg:p-12 border border-foreground/10 min-h-[400px] overflow-hidden transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            {/* Dynamic feature image with cross-fade — desktop only */}
            <div className="absolute inset-0 pointer-events-none items-center justify-end hidden lg:flex">
              {securityFeatures.map((feature, index) => (
                <img
                  key={feature.image}
                  src={feature.image}
                  alt={feature.title}
                  className="absolute h-3/4 w-3/4 object-contain object-right transition-opacity duration-500"
                  style={{ opacity: activeFeature === index ? 0.85 : 0 }}
                />
              ))}
            </div>
            
{/* New left content panel */}
             <div className="relative z-10">
                 {leftContent.map((state, index) => (
                     <div
                         key={index}
                         className={`absolute inset-y-0 left-0 max-w-[40%] transition-opacity duration-500 ${
                             activeFeature === index ? 'opacity-100' : 'opacity-0'
                         }`}
                     >
                         <div className="space-y-6">
                             <h2 className={`text-3xl lg:text-4xl font-display text-white mb-4`}>
                                 {state.title}
                             </h2>
                             <p className="text-base text-muted-foreground mb-6">
                                 {state.subtitle}
                             </p>
                             <div className="space-y-3">
                                 {state.points.map((point, pointIndex) => (
                                     <div key={pointIndex} className="flex items-start space-x-3">
                                         <img src="/images/check-badge.svg" alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                         <p className="text-muted-foreground">{point}</p>
                                     </div>
                                 ))}
                             </div>
                         </div>
                     </div>
                 ))}
             </div>
          </div>

          {/* Feature cards stack */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {securityFeatures.map((feature, index) => (
              <div
                key={feature.title}
                className={`p-6 border transition-all duration-500 cursor-default ${
                  activeFeature === index 
                    ? "border-foreground/30 bg-foreground/[0.04]" 
                    : "border-foreground/10"
                } ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
                style={{ transitionDelay: `${index * 80}ms` }}
                onClick={() => setActiveFeature(index)}
                onMouseEnter={() => setActiveFeature(index)}
              >
                <div className="flex items-start gap-4">
                  <div className={`shrink-0 w-10 h-10 flex items-center justify-center border transition-colors ${
                    activeFeature === index 
                      ? "border-foreground bg-foreground text-background" 
                      : "border-foreground/20"
                  }`}>
                    <feature.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
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
