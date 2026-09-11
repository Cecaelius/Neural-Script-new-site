"use client";

import { useEffect, useState, useRef } from "react";

export function WidescreenSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sliderRef = useRef<HTMLElement>(null);
  const slidesContainerRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          startAutoPlay();
        } else {
          setIsVisible(false);
          stopAutoPlay();
        }
      },
      { threshold: 0.1 }
    );
    if (sliderRef.current) observer.observe(sliderRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (slidesContainerRef.current) {
      updateSlidePosition();
    }
  }, [currentSlide]);

  const startAutoPlay = () => {
    stopAutoPlay();
    timeoutRef.current = window.setTimeout(() => {
      setCurrentSlide((prev) => (prev + 1) % 2);
    }, 5000);
  };

  const stopAutoPlay = () => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    startAutoPlay();
  };

  const updateSlidePosition = () => {
    if (slidesContainerRef.current) {
      slidesContainerRef.current.style.transform = `translateX(-${currentSlide * 50}%)`;
      slidesContainerRef.current.style.transition = "transform 1000ms ease-in-out";
    }
  };

  useEffect(() => {
    updateSlidePosition();
    const handleResize = () => updateSlidePosition();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isVisible) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
  }, [isVisible]);

  return (
    <section
      ref={sliderRef}
      className={`relative overflow-hidden w-full bg-background ${isVisible ? "opacity-100" : "opacity-0"} transition-opacity duration-1000`}
    >
      <div className="relative w-full h-[80vh] min-h-[600px] max-h-[90vh] overflow-hidden">
        <div
          ref={slidesContainerRef}
          className={`absolute inset-0 flex w-[200%] transition-transform duration-1000 ease-in-out`}
        >
          {/* Slide 1: Video - moved to right of screen (vertically centered, right-aligned) */}
          <div className="flex-shrink-0 w-full h-full flex items-center justify-end">
            <div className="relative w-full h-full">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                aria-hidden="true"
                className="object-contain w-full h-full"
              >
                <source src="/AA.mp4" type="video/mp4" />
              </video>
              {/* Subtle overlays for readability - adjusted to be less intense */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
            </div>
          </div>

          {/* Slide 2: Image - centered as standard practice */}
          <div className="flex-shrink-0 w-full h-full flex items-center justify-center">
            <img
              src="/banner.jpg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              decoding="async"
              className="object-cover w-full h-full"
            />
            {/* Subtle overlay for consistency */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/20" />
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {[0, 1].map((index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full bg-muted-foreground/30 transition-all duration-300 ${currentSlide === index ? "bg-foreground" : ""} hover:bg-muted-foreground/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}