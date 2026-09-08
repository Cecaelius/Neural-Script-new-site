"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

const contactItems = [
  {
    title: "Solution Planning",
    description: "Explore how our products align with your workflows, data, & goals.",
  },
  {
    title: "Interactive Product Demo",
    description: "See our platforms in action, personalized to your use case.",
  },
  {
    title: "Custom Solutions",
    description: "An AI solution specifically built around your business objectives.",
  },
  {
    title: "Pricing & Technical Fit",
    description: "Get clarity on cost, deployment options, integrations, and support.",
  },
  {
    title: "Validation Evaluation",
    description: "Assess feasibility & receive clear benchmarks for informed decisions.",
  },
];

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          // honeypot field will be empty string if not filled by bot
          honeypot: data.honeypot || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit");
      }

      setSubmitted(true);
      reset();
    } catch (err: any) {
      setError(err.message || "Something went wrong while sending your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative bg-black py-24 text-white lg:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:px-12">
        <div className="flex flex-col justify-center">
          <h2 className="text-5xl font-display font-semibold leading-[0.95] tracking-tight md:text-6xl lg:text-[64px]">
            Connect with
            <br />
            <span>Our </span>
            <span className="bg-gradient-to-r from-[#8b5cf6] to-[#2563eb] bg-clip-text text-transparent">
              AI Experts
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-sm leading-relaxed text-white/75 lg:text-base">
            On the first call, we&apos;ll guide you through what&apos;s possible, practical, and impactful for your business.
          </p>

          <div className="mt-8 max-w-xl">
            <h3 className="mb-2 text-sm font-semibold text-white">Reach out to us for:</h3>
            <div>
              {contactItems.map((item) => (
                <div key={item.title} className="border-b border-white/15 py-4">
                  <div className="flex items-start gap-3">
                    <span className="pt-0.5 text-lg leading-none text-[#6d4aff]">&rarr;</span>
                    <div>
                      <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                      <p className="mt-1 text-xs leading-relaxed text-white/70 lg:text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 space-y-3 text-xs text-white/70 lg:text-sm">
            <p className="font-semibold text-white">Trusted by Enterprises</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-[6px] bg-white p-6 text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] lg:p-8">
          <h3 className="text-lg font-semibold">Get in touch with Neural Script</h3>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Honeypot field - hidden */}
            <div style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
              <input {...register("honeypot")} name="honeypot" tabIndex={-1} />
            </div>

            <div>
              <label htmlFor="ai-stage" className="mb-1.5 block text-xs text-black/70">What stage are you in your AI journey?*</label>
              <select {...register("aiStage", { required: "Please select your AI journey stage" })} id="ai-stage" className="h-10 w-full border border-black/20 bg-white px-3 text-sm outline-none focus:border-black">
                <option value="">Select</option>
                <option>Exploring AI</option>
                <option>Building a proof of concept</option>
                <option>Scaling an AI product</option>
              </select>
              {errors.aiStage && <p className="text-xs text-red-500 mt-1">{errors.aiStage.message}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="first-name" className="mb-1.5 block text-xs text-black/70">First Name*</label>
                <input {...register("firstName", { required: "First name is required" })} id="first-name" required type="text" className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black" />
                {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label htmlFor="last-name" className="mb-1.5 block text-xs text-black/70">Last Name*</label>
                <input {...register("lastName", { required: "Last name is required" })} id="last-name" required type="text" className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black" />
                {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>}
              </div>
            </div>

            <div className="gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="company" className="mb-1.5 block text-xs text-black/70">Company*</label>
                <input {...register("company", { required: "Company is required" })} id="company" required type="text" className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black" />
                {errors.company && <p className="text-xs text-red-500 mt-1">{errors.company.message}</p>}
              </div>
              <div>
                <label htmlFor="work-email" className="mb-1.5 block text-xs text-black/70">Work Email*</label>
                <input {...register("workEmail", { 
                  required: "Work email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format"
                  }
                })} id="work-email" required type="email" className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black" />
                {errors.workEmail && <p className="text-xs text-red-500 mt-1">{errors.workEmail.message}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="work-phone" className="mb-1.5 block text-xs text-black/70">Work Phone*</label>
              <input {...register("workPhone", { required: "Work phone is required" })} id="work-phone" required type="tel" className="h-10 w-full border border-black/20 px-3 text-sm outline-none focus:border-black" />
              {errors.workPhone && <p className="text-xs text-red-500 mt-1">{errors.workPhone.message}</p>}
            </div>

            <div>
              <label htmlFor="project-description" className="mb-1.5 block text-xs leading-relaxed text-black/70">
                Briefly describe your project—goals, challenges, and requirements, to help us assist you more effectively during our initial call.*
              </label>
              <textarea {...register("projectDescription", { required: "Please describe your project" })} id="project-description" required rows={4} className="w-full resize-y border border-black/20 px-3 py-2 text-sm outline-none focus:border-black" />
              {errors.projectDescription && <p className="text-xs text-red-500 mt-1">{errors.projectDescription.message}</p>}
            </div>

            <label className="flex items-start gap-2 text-xs text-black/70">
              <input type="checkbox" {...register("ndaRequested")} className="mt-0.5 h-4 w-4 shrink-0 accent-black" />
              <span>Send me the signed Non-Disclosure Agreement (NDA)</span>
            </label>

            <button 
              type="submit" 
              disabled={loading}
              className="rounded-full bg-black px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 ${loading ? 'opacity-70' : ''}"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
            
            {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
            {submitted && <p className="text-xs text-black/60 mt-2">Thank you! Your message has been sent successfully. Our team will get back to you soon.</p>}
          </form>
        </div>
      </div>
    </section>
  );
}