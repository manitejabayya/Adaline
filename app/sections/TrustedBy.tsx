"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Company logos from the Assets folder - matching the target order
const companies = [
  { name: "Reforge", logo: "/Assets/image%20(16).svg" },
  { name: "15five", logo: "/Assets/image%20(17).svg" },
  { name: "Coframe", logo: "/Assets/image%20(18).svg" },
  { name: "serif", logo: "/Assets/image%20(12).svg" },
  { name: "Daybreak", logo: "/Assets/image%20(13).svg" },
  { name: "HubSpot", logo: "/Assets/image%20(10).svg" },
];

export default function TrustedBy() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative py-4 mt-2">
      {/* Trusted By Label */}
      <div 
        className={`text-center mb-5 transition-all duration-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <span className="text-[#6b7c6b] text-[10px] md:text-[11px] font-medium tracking-[0.2em] uppercase">
          TRUSTED BY
        </span>
      </div>

      {/* Infinite Scrolling Logos Container */}
      <div 
        className={`relative overflow-hidden mx-auto max-w-5xl transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ 
          transitionDelay: '400ms',
          maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
        }}
      >
        {/* Scrolling container - moves right to left */}
        <div 
          className={`flex items-center ${isVisible ? 'animate-marquee' : ''}`}
          style={{ width: 'fit-content' }}
        >
          {/* First set of logos */}
          {companies.map((company, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center h-8"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={32}
                className="h-4 md:h-5 w-auto object-contain"
                style={{ filter: 'brightness(0.2)' }}
              />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {companies.map((company, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12 lg:mx-16 flex items-center justify-center h-8"
            >
              <Image
                src={company.logo}
                alt={company.name}
                width={120}
                height={32}
                className="h-4 md:h-5 w-auto object-contain"
                style={{ filter: 'brightness(0.2)' }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
