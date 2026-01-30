"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Hero from "./sections/Hero";
import TrustedBy from "./sections/TrustedBy";
import ScrollSequenceBackground from "@/components/background/ScrollSequenceBackground";

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  
  const handleScrollProgress = useCallback((progress: number) => {
    setScrollProgress(progress);
  }, []);

  // Smooth easing functions for cinematic transitions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  // ============ SCROLL-DRIVEN "CAMERA MOVING FORWARD" ANIMATION ============
  // Hero & TrustedBy move back together and fade out together

  // ============ GLOBAL MOVE BACK (0% - 21% scroll) ============
  // Hero & TrustedBy move back together as camera moves forward
  const globalMoveProgress = Math.min(1, scrollProgress / 0.21);
  const globalMoveEased = easeOutCubic(globalMoveProgress);
  const globalScale = 1 - (globalMoveEased * 0.25); // Scale down to 75%
  const globalTranslateZ = globalMoveEased * -400; // Move back in Z space

  // ============ NAVBAR FADE OUT (0% - 10% scroll) ============
  const navProgress = Math.min(1, scrollProgress / 0.10);
  const navEased = easeOutCubic(navProgress);
  const navOpacity = Math.max(0, 1 - navEased);
  const navBlur = navEased * 3;

  // ============ HERO & TRUSTED BY FADE OUT TOGETHER (11% - 21% scroll) ============
  const contentStartProgress = Math.max(0, (scrollProgress - 0.11) / 0.10);
  const contentProgress = Math.min(1, contentStartProgress);
  const contentEased = easeInOutQuart(contentProgress);
  const contentOpacity = Math.max(0, 1 - contentEased);
  const contentBlur = contentEased * 5;

  // Image appears first (89% - 91% scroll progress)
  const imageShowProgress = Math.max(0, Math.min(1, (scrollProgress - 0.89) / 0.02));
  const imageEased = 1 - Math.pow(1 - imageShowProgress, 3);
  const imageOpacity = imageEased;
  const imageTranslateY = (1 - imageEased) * 50;

  // Play button appears after image is shown (92%+ scroll progress)
  const playButtonProgress = Math.max(0, Math.min(1, (scrollProgress - 0.92) / 0.05));
  const playButtonEased = 1 - Math.pow(1 - playButtonProgress, 3);
  const playButtonOpacity = playButtonEased;
  const playButtonScale = 0.5 + (playButtonEased * 0.5); 

  // Image shrinks continuously from when it appears (89%+)
  const shrinkProgress = Math.max(0, Math.min(1, (scrollProgress - 0.89) / 0.10)); 
  const shrinkEased = shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress); 
  
  const imageWidthVw = 95 - (shrinkEased * 25);
  const imageMaxWidth = 1400 - (shrinkEased * 500); 

  const handlePlayVideo = () => {
    setIsVideoPlaying(true);
  };

  return (
    <main className="relative">
      {/* Scroll-driven Background Animation */}
      <ScrollSequenceBackground onScrollProgress={handleScrollProgress} />

      {/* Navigation - stays fixed, just fades out (0-10% scroll) */}
      <div 
        className="fixed top-0 left-0 right-0 z-20 will-change-transform"
        style={{ 
          opacity: navOpacity,
          filter: `blur(${navBlur}px)`,
          pointerEvents: navOpacity < 0.1 ? 'none' : 'auto'
        }}
      >
        <Navigation />
      </div>

      {/* Fixed container with perspective for 3D depth effect - Hero & TrustedBy only */}
      <div 
        className="fixed inset-0 z-10 pointer-events-none"
        style={{ perspective: '1000px', perspectiveOrigin: 'center center' }}
      >
        {/* Hero & TrustedBy container - moves back together */}
        <div 
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `scale(${globalScale}) translateZ(${globalTranslateZ}px)`,
            transformOrigin: 'center center',
          }}
        >
          {/* Hero & TrustedBy Container - fade out together (11-21% scroll) */}
          <div 
            className="absolute inset-0 flex flex-col items-center pt-20 md:pt-24 will-change-transform"
            style={{ 
              opacity: contentOpacity,
              filter: `blur(${contentBlur}px)`,
              pointerEvents: contentOpacity < 0.1 ? 'none' : 'auto'
            }}
          >
            {/* Hero Section */}
            <div className="w-full">
              <Hero />
            </div>

            {/* TrustedBy Section */}
            <div className="w-full mt-2">
              <TrustedBy />
            </div>
          </div>
        </div>
      </div>

      {/* Video Section - Image appears first, then play button */}
      <div 
        className="fixed inset-0 flex items-center justify-center z-20"
        style={{
          opacity: imageOpacity,
          transform: `translateY(${imageTranslateY}px)`,
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          visibility: imageOpacity > 0.01 ? 'visible' : 'hidden',
          pointerEvents: imageOpacity > 0.3 ? 'auto' : 'none',
        }}
      >
        <div 
          className="relative aspect-video rounded-2xl overflow-hidden bg-[#1a2e1a]"
          style={{
            width: `${imageWidthVw}vw`,
            maxWidth: `${imageMaxWidth}px`,
            transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1), max-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: `0 25px 80px -12px rgba(0, 0, 0, ${0.3 * imageOpacity}), 
                        0 12px 40px -8px rgba(0, 0, 0, ${0.25 * imageOpacity})`,
          }}
        >
          {!isVideoPlaying ? (
            // Video thumbnail with play button
            <div 
              className="relative w-full h-full group cursor-pointer" 
              onClick={playButtonOpacity > 0.5 ? handlePlayVideo : undefined}
              style={{ cursor: playButtonOpacity > 0.5 ? 'pointer' : 'default' }}
            >
              {/* Hero product shot as thumbnail */}
              <Image
                src="/Assets/hero-product-shot.png"
                alt="Product Demo Thumbnail"
                fill
                className="object-cover transition-transform duration-700 ease-out"
                style={{
                  transform: playButtonOpacity > 0.5 ? 'scale(1.02)' : 'scale(1)',
                }}
                sizes="(max-width: 768px) 85vw, 1000px"
                priority
              />
              
              {/* Dark overlay - appears with play button */}
              <div 
                className="absolute inset-0 transition-colors duration-500"
                style={{
                  backgroundColor: `rgba(0, 0, 0, ${0.3 * playButtonOpacity})`,
                }}
              />
              
              {/* Play button - appears at 92% */}
              <div 
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: playButtonOpacity,
                  transform: `scale(${playButtonScale})`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div 
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/95 flex items-center justify-center transform hover:scale-110 transition-all duration-500 ease-out"
                  style={{
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3), 0 0 60px rgba(255,255,255,0.15)',
                  }}
                >
                  <svg 
                    className="w-8 h-8 md:w-10 md:h-10 text-[#1a2e1a] ml-1" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              
              {/* Watch Demo text - appears with play button */}
              <div 
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                style={{
                  opacity: playButtonOpacity,
                  transform: `translateX(-50%) translateY(${(1 - playButtonOpacity) * 20}px)`,
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <span className="text-white/90 text-sm md:text-base font-medium tracking-wider uppercase">
                  Watch Demo
                </span>
              </div>
            </div>
          ) : (
            // Video iframe
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&rel=0&modestbranding=1"
              title="Product Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          )}
        </div>
        
        {/* Ambient glow behind video */}
        <div 
          className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none"
          style={{ opacity: imageOpacity * 0.5 }}
        >
          <div 
            className="w-[90vw] max-w-6xl aspect-video rounded-3xl blur-3xl"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(74, 124, 89, 0.3) 0%, transparent 70%)'
            }}
          />
        </div>
      </div>

      {/* Spacer for scroll height - allows continuous scrolling through the sequence */}
      <div className="h-[550vh]" />
    </main>
  );
}

