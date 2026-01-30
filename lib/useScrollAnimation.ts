"use client";

import { useEffect, useRef, RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Types for animation configuration
interface AnimationRefs {
  navbar: RefObject<HTMLDivElement | null>;
  heroSection: RefObject<HTMLElement | null>;
  heroBackground: RefObject<HTMLDivElement | null>;
  heroHeading: RefObject<HTMLHeadingElement | null>;
  heroSubtitle: RefObject<HTMLParagraphElement | null>;
  heroCTA: RefObject<HTMLDivElement | null>;
  trustSection: RefObject<HTMLElement | null>;
  trustLabel: RefObject<HTMLDivElement | null>;
  trustLogos: RefObject<HTMLDivElement | null>;
  scrollContainer: RefObject<HTMLDivElement | null>;
}

interface ScrollAnimationConfig {
  heroScrollLength: string;
  navAppearStart: number;
  navAppearEnd: number;
  trustAppearStart: number;
  trustAppearEnd: number;
}

const defaultConfig: ScrollAnimationConfig = {
  heroScrollLength: "200%",
  navAppearStart: 0.05,
  navAppearEnd: 0.15,
  trustAppearStart: 0.4,
  trustAppearEnd: 0.7,
};

export function useScrollAnimation(
  refs: AnimationRefs,
  config: Partial<ScrollAnimationConfig> = {}
) {
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);
  const mergedConfig = { ...defaultConfig, ...config };

  useEffect(() => {
    // Ensure we're in browser environment
    if (typeof window === "undefined") return;

    // Wait for refs to be available
    const {
      navbar,
      heroSection,
      heroBackground,
      heroHeading,
      heroSubtitle,
      heroCTA,
      trustSection,
      trustLabel,
      trustLogos,
      scrollContainer,
    } = refs;

    if (!heroSection.current || !scrollContainer.current) return;

    // Clear any existing ScrollTriggers
    scrollTriggersRef.current.forEach((st) => st.kill());
    scrollTriggersRef.current = [];

    // Set initial states
    gsap.set(navbar.current, {
      y: -100,
      opacity: 0,
      filter: "blur(10px)",
    });

    gsap.set(heroHeading.current, {
      scale: 1.1,
      opacity: 0,
    });

    gsap.set(heroSubtitle.current, {
      y: 30,
      opacity: 0,
    });

    gsap.set(heroCTA.current, {
      y: 40,
      opacity: 0,
    });

    gsap.set(trustSection.current, {
      opacity: 0,
    });

    gsap.set(trustLabel.current, {
      y: 20,
      opacity: 0,
    });

    // Create master timeline with ScrollTrigger for pinning
    const masterTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: scrollContainer.current,
        start: "top top",
        end: `+=${mergedConfig.heroScrollLength}`,
        scrub: 1.5, // Smooth scrubbing with slight delay for cinematic feel
        pin: heroSection.current,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Optional: expose progress for other effects
          const progress = self.progress;
          document.documentElement.style.setProperty(
            "--scroll-progress",
            progress.toString()
          );
        },
      },
    });

    // Store reference
    masterTimelineRef.current = masterTimeline;
    if (masterTimeline.scrollTrigger) {
      scrollTriggersRef.current.push(masterTimeline.scrollTrigger);
    }

    // ========================================
    // NAVBAR ANIMATION
    // Slides down with fade and blur removal
    // ========================================
    masterTimeline.to(
      navbar.current,
      {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.15,
        ease: "power2.out",
      },
      mergedConfig.navAppearStart
    );

    // ========================================
    // HERO BACKGROUND PARALLAX
    // Background moves slower than foreground
    // ========================================
    masterTimeline.to(
      heroBackground.current,
      {
        y: "-15%",
        scale: 1.05,
        duration: 1,
        ease: "none",
      },
      0
    );

    // ========================================
    // HERO HEADING ANIMATION
    // Scales from 1.1 to 1 while fading in
    // ========================================
    masterTimeline.to(
      heroHeading.current,
      {
        scale: 1,
        opacity: 1,
        duration: 0.2,
        ease: "power3.out",
      },
      0
    );

    // ========================================
    // HERO SUBTITLE ANIMATION
    // Fades in with slight upward motion
    // ========================================
    masterTimeline.to(
      heroSubtitle.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      },
      0.05
    );

    // ========================================
    // HERO CTA ANIMATION
    // Floats up subtly with easing
    // ========================================
    masterTimeline.to(
      heroCTA.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      },
      0.1
    );

    // ========================================
    // TRUST SECTION ANIMATION
    // Animates in while hero is still pinned
    // ========================================
    masterTimeline.to(
      trustSection.current,
      {
        opacity: 1,
        duration: 0.2,
        ease: "power2.out",
      },
      mergedConfig.trustAppearStart
    );

    masterTimeline.to(
      trustLabel.current,
      {
        y: 0,
        opacity: 1,
        duration: 0.15,
        ease: "power2.out",
      },
      mergedConfig.trustAppearStart + 0.05
    );

    // ========================================
    // TRUST LOGOS STAGGER ANIMATION
    // Logos fade in and move upward with stagger
    // ========================================
    const logoElements = trustLogos.current?.querySelectorAll(".logo-item");
    if (logoElements && logoElements.length > 0) {
      gsap.set(logoElements, {
        y: 30,
        opacity: 0,
      });

      masterTimeline.to(
        logoElements,
        {
          y: 0,
          opacity: 1,
          duration: 0.15,
          stagger: 0.03,
          ease: "power2.out",
        },
        mergedConfig.trustAppearStart + 0.1
      );
    }

    // ========================================
    // HERO CONTENT FADE OUT
    // Smooth transition as user continues scrolling
    // ========================================
    masterTimeline.to(
      [heroHeading.current, heroSubtitle.current, heroCTA.current],
      {
        opacity: 0,
        y: -30,
        duration: 0.2,
        ease: "power2.in",
      },
      0.75
    );

    // Cleanup
    return () => {
      scrollTriggersRef.current.forEach((st) => st.kill());
      masterTimelineRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [refs, mergedConfig]);

  return {
    masterTimeline: masterTimelineRef.current,
    refresh: () => ScrollTrigger.refresh(),
  };
}

// Utility for creating smooth parallax effects
export function createParallaxEffect(
  element: HTMLElement,
  speed: number = 0.5,
  trigger?: HTMLElement
) {
  return gsap.to(element, {
    y: () => (1 - speed) * 100 + "%",
    ease: "none",
    scrollTrigger: {
      trigger: trigger || element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

// Utility for smooth reveal animations
export function createRevealAnimation(
  elements: HTMLElement | HTMLElement[],
  options: {
    y?: number;
    opacity?: number;
    duration?: number;
    stagger?: number;
    ease?: string;
    trigger?: HTMLElement;
    start?: string;
    end?: string;
    scrub?: boolean | number;
  } = {}
) {
  const {
    y = 50,
    opacity = 0,
    duration = 1,
    stagger = 0.1,
    ease = "power2.out",
    trigger,
    start = "top 80%",
    end = "top 30%",
    scrub = 1,
  } = options;

  // Set initial state
  gsap.set(elements, { y, opacity });

  return gsap.to(elements, {
    y: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
    scrollTrigger: {
      trigger: trigger || (Array.isArray(elements) ? elements[0] : elements),
      start,
      end,
      scrub,
    },
  });
}
