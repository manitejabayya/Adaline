"use client";

import { useState, useCallback } from "react";
import Navigation from "@/components/Navigation";
import Hero from "./sections/Hero";
import TrustedBy from "./sections/TrustedBy";
import ScrollSequenceBackground from "@/components/background/ScrollSequenceBackground";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  // Calculate fade and transform values based on scroll
  const heroOpacity = Math.max(0, 1 - scrollProgress * 4);
  const heroTransform = scrollProgress * 100;
  const navOpacity = Math.max(0, 1 - scrollProgress * 5);
  const navTransform = scrollProgress * 50;

  return (
    <main className="relative">
      {/* Scroll-driven Background Animation */}
      <ScrollSequenceBackground onScrollProgress={handleScrollProgress} />

      {/* Navigation - fades out on scroll */}
      <div 
        className="transition-all duration-300 ease-out"
        style={{ 
          opacity: navOpacity,
          transform: `translateY(-${navTransform}px)`,
          pointerEvents: navOpacity < 0.1 ? 'none' : 'auto'
        }}
      >
        <Navigation />
      </div>

      {/* Hero & TrustedBy - fades out on scroll */}
      <div 
        className="transition-all duration-300 ease-out"
        style={{ 
          opacity: heroOpacity,
          transform: `translateY(-${heroTransform}px)`,
          pointerEvents: heroOpacity < 0.1 ? 'none' : 'auto'
        }}
      >
        <Hero />
        <TrustedBy />
      </div>

      {/* Spacer for scroll height - allows continuous scrolling through the sequence */}
      <div className="h-[500vh]" />
    </main>
  );
}

