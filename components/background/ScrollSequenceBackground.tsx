"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// Generate the list of available image files (based on actual files in the folder)
const generateImageList = () => {
  const images: string[] = [];
  
  // Start with the high-quality initial image
  images.push("/animationAsset/graded_4K_100_gm_85_1440_3-001.jpg");
  
  const baseUrl = "/animationAsset/graded_4K_100_gm_50_1080_3-";
  
  // Add all available images based on the folder listing
  const availableNumbers = [
    2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19, 20,
    21, 22, 23, 24, 25, 27, 28, 29, 30, 31, 32, 33, 34, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 53, 54, 55, 56, 57, 58, 59, 60,
    62, 63, 64, 65, 66, 67, 68, 69, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
    81, 82, 83, 84, 85, 86, 88, 89, 90, 91, 92, 93, 94, 95, 97, 98, 99, 100,
    101, 102, 103, 104, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 120,
    123, 125, 127, 129, 132, 134, 136, 138, 141, 143, 145, 147, 149, 151, 153, 155, 158, 160,
    162, 164, 167, 169, 171, 173, 176, 178, 180, 182, 184, 186, 188, 190, 193, 195, 197, 199,
    202, 204, 206, 208, 211, 213, 215, 217, 219, 221, 223, 225, 228, 230, 232, 234, 237, 239,
    241, 243, 246, 248, 250, 252, 254, 256, 258, 260, 263, 265, 267, 269, 272, 274, 276, 278, 281
  ];
  
  availableNumbers.forEach(num => {
    const paddedNum = num.toString().padStart(3, "0");
    images.push(`${baseUrl}${paddedNum}.jpg`);
  });
  
  return images;
};

const imageSequence = generateImageList();
const TOTAL_FRAMES = imageSequence.length;

// Smooth interpolation function
const lerp = (start: number, end: number, factor: number): number => {
  return start + (end - start) * factor;
};

// Smooth damp function for even smoother transitions
const smoothDamp = (
  current: number, 
  target: number, 
  velocity: { value: number }, 
  smoothTime: number, 
  deltaTime: number
): number => {
  const omega = 2 / smoothTime;
  const x = omega * deltaTime;
  const exp = 1 / (1 + x + 0.48 * x * x + 0.235 * x * x * x);
  const change = current - target;
  const temp = (velocity.value + omega * change) * deltaTime;
  velocity.value = (velocity.value - omega * temp) * exp;
  return target + (change + temp) * exp;
};

interface ScrollSequenceBackgroundProps {
  onScrollProgress?: (progress: number) => void;
}

export default function ScrollSequenceBackground({ 
  onScrollProgress 
}: ScrollSequenceBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  // Animation state refs
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);
  const frameVelocityRef = useRef({ value: 0 });
  const lastTimeRef = useRef(performance.now());
  const animationFrameRef = useRef<number>();
  
  // Cinematic effect refs
  const scaleRef = useRef(1.02);
  const targetScaleRef = useRef(1.02);
  const scaleVelocityRef = useRef({ value: 0 });
  
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [firstImageLoaded, setFirstImageLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    
    const loadImage = (src: string, index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
          resolve();
        };
        img.src = src;
        images[index] = img;
      });
    };

    // Load first image immediately for instant display
    const loadAllImages = async () => {
      // Load first image first for immediate display
      await loadImage(imageSequence[0], 0);
      setFirstImageLoaded(true);
      
      // Load rest in batches
      const batchSize = 15;
      for (let i = 1; i < imageSequence.length; i += batchSize) {
        const batch = imageSequence.slice(i, i + batchSize);
        await Promise.all(batch.map((src, idx) => loadImage(src, i + idx)));
      }
      imagesRef.current = images;
      setIsLoaded(true);
    };

    loadAllImages();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Store display dimensions for responsive calculations
  const displayDimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });

  // Draw frame on canvas with smooth crossfade between frames
  const drawFrame = useCallback((frameIndex: number, scale: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;

    const { width: displayWidth, height: displayHeight } = displayDimensionsRef.current;
    if (displayWidth === 0 || displayHeight === 0) return;

    // Get current and next frame for smooth blending
    const currentIndex = Math.floor(frameIndex);
    const nextIndex = Math.min(currentIndex + 1, TOTAL_FRAMES - 1);
    const blendFactor = frameIndex - currentIndex; // 0 to 1 between frames
    
    const currentImg = imagesRef.current[currentIndex];
    const nextImg = imagesRef.current[nextIndex];
    
    if (!currentImg || !currentImg.complete) return;

    // Clear canvas with background color to prevent flashing
    ctx.fillStyle = '#c5c9b8';
    ctx.fillRect(0, 0, displayWidth, displayHeight);

    // Helper function to draw an image covering the canvas (object-fit: cover behavior)
    const drawImageCover = (img: HTMLImageElement, alpha: number = 1) => {
      if (!img || !img.complete) return;
      
      ctx.globalAlpha = alpha;
      
      const imgAspect = img.width / img.height;
      const canvasAspect = displayWidth / displayHeight;
      
      let drawWidth, drawHeight, drawX, drawY;
      
      // Cover behavior: image fills the entire canvas, cropping if necessary
      if (imgAspect > canvasAspect) {
        // Image is wider than canvas - fit height, crop width
        drawHeight = displayHeight * scale;
        drawWidth = drawHeight * imgAspect;
      } else {
        // Image is taller than canvas - fit width, crop height
        drawWidth = displayWidth * scale;
        drawHeight = drawWidth / imgAspect;
      }
      
      // Center the image
      drawX = (displayWidth - drawWidth) / 2;
      drawY = (displayHeight - drawHeight) / 2;

      ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
      ctx.globalAlpha = 1;
    };

    // Always draw current frame at full opacity first
    drawImageCover(currentImg, 1);
    
    // Smooth crossfade: blend next frame on top with blend factor
    // This creates a smooth dissolve transition between all frames
    if (nextImg && nextImg.complete && blendFactor > 0.001 && currentIndex !== nextIndex) {
      // Use eased blend factor for smoother transition
      const easedBlend = blendFactor * blendFactor * (3 - 2 * blendFactor); // smoothstep
      drawImageCover(nextImg, easedBlend);
    }
  }, []);

  // Animation loop with ultra-smooth interpolation
  useEffect(() => {
    if (!isLoaded) return;

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.1); // Cap delta time
      lastTimeRef.current = currentTime;

      // Ultra-smooth frame interpolation using smoothDamp
      // Higher smoothTime = slower, smoother animation even during fast scroll
      const frameSmoothTime = 0.4; // Increased for smoother animation
      currentFrameRef.current = smoothDamp(
        currentFrameRef.current,
        targetFrameRef.current,
        frameVelocityRef.current,
        frameSmoothTime,
        deltaTime
      );
      
      // Smooth scale interpolation
      const scaleSmoothTime = 0.6;
      scaleRef.current = smoothDamp(
        scaleRef.current,
        targetScaleRef.current,
        scaleVelocityRef.current,
        scaleSmoothTime,
        deltaTime
      );

      // Clamp frame to valid range
      const clampedFrame = Math.max(0, Math.min(TOTAL_FRAMES - 1, currentFrameRef.current));
      
      drawFrame(clampedFrame, scaleRef.current);
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isLoaded, drawFrame]);

  // Handle scroll events with smooth target updates
  useEffect(() => {
    if (!isLoaded) return;

    let scrollTimeout: NodeJS.Timeout;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      
      // Map scroll progress to frame index
      // The smoothDamp in the animation loop will handle smooth interpolation
      targetFrameRef.current = scrollProgress * (TOTAL_FRAMES - 1);
      
      // Subtle scale effect during scroll
      targetScaleRef.current = 1.04;
      
      // Reset scale after scroll stops
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        targetScaleRef.current = 1.02;
      }, 150);
      
      // Callback for UI fade effects
      if (onScrollProgress) {
        onScrollProgress(scrollProgress);
      }
    };

    // Initial call
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isLoaded, onScrollProgress]);

  // Handle canvas resize - responsive for all devices
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout;
    
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      
      // Get viewport dimensions (works on all devices including mobile)
      const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // Device pixel ratio for sharp rendering on retina/high-DPI displays
      // Cap at 2 for performance on very high DPI devices
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      
      // Store display dimensions for drawing calculations
      displayDimensionsRef.current = {
        width: viewportWidth,
        height: viewportHeight,
        dpr: dpr
      };
      
      // Set canvas resolution (internal size for sharp rendering)
      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      
      // Set canvas display size (CSS size)
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      
      const ctx = canvas.getContext("2d");
      if (ctx) {
        // Reset transform and scale for device pixel ratio
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
      }
      
      // Redraw current frame at new size
      if (isLoaded) {
        drawFrame(currentFrameRef.current, scaleRef.current);
      }
    };

    // Debounced resize for performance
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    // Initial size setup
    handleResize();
    
    // Listen for resize events
    window.addEventListener("resize", debouncedResize);
    
    // Listen for orientation changes on mobile devices
    window.addEventListener("orientationchange", () => {
      // Delay to allow orientation change to complete
      setTimeout(handleResize, 200);
    });
    
    // Handle visual viewport changes (mobile keyboard, etc.)
    if (window.visualViewport) {
      window.visualViewport.addEventListener("resize", debouncedResize);
    }
    
    return () => {
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("orientationchange", handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener("resize", debouncedResize);
      }
      clearTimeout(resizeTimeout);
    };
  }, [isLoaded, drawFrame]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '-webkit-fill-available' // iOS Safari fix
      }}
    >
      {/* Initial static background shown while loading */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        style={{
          backgroundImage: "url('/animationAsset/graded_4K_100_gm_85_1440_3-001.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          width: '100%',
          height: '100%',
          backgroundColor: '#c5c9b8'
        }}
      />
      
      {/* Loading indicator - subtle, non-blocking */}
      {!isLoaded && firstImageLoaded && (
        <div className="absolute bottom-4 right-4 z-10">
          <div className="text-center px-3 py-2 bg-black/20 backdrop-blur-sm rounded-lg">
            <p className="text-white/60 text-[10px] font-medium tracking-wide">
              Loading animation... {loadProgress}%
            </p>
          </div>
        </div>
      )}
      
      {/* Canvas for rendering frames - fully responsive */}
      <canvas
        ref={canvasRef}
        className={`block transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'auto',
          WebkitBackfaceVisibility: 'hidden',
          backfaceVisibility: 'hidden'
        }}
      />
    </div>
  );
}
