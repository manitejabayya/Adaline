"use client";

import Image from "next/image";
import { forwardRef } from "react";

// Company logos from the Assets folder - matching the target order
const companies = [
  { name: "Reforge", logo: "/Assets/image%20(16).svg" },
  { name: "15five", logo: "/Assets/image%20(17).svg" },
  { name: "Coframe", logo: "/Assets/image%20(18).svg" },
  { name: "serif", logo: "/Assets/image%20(12).svg" },
  { name: "Daybreak", logo: "/Assets/image%20(13).svg" },
  { name: "HubSpot", logo: "/Assets/image%20(10).svg" },
];

interface TrustedByProps {
  labelRef?: React.RefObject<HTMLDivElement>;
  logosRef?: React.RefObject<HTMLDivElement>;
}

const TrustedBy = forwardRef<HTMLElement, TrustedByProps>(
  function TrustedBy({ labelRef, logosRef }, ref) {
    // Duplicate logos for seamless infinite scroll
    const duplicatedCompanies = [...companies, ...companies];

    return (
      <section 
        ref={ref}
        className="relative w-full py-2 md:py-4 will-change-transform"
      >
        {/* Trusted By Label */}
        <div 
          ref={labelRef}
          className="text-center mb-3 will-change-transform"
        >
          <span className="text-[#6b7c6b] text-[9px] md:text-[10px] font-medium tracking-[0.25em] uppercase">
            TRUSTED BY
          </span>
        </div>

        {/* Logos Container - centered with mask for smooth fade */}
        <div 
          ref={logosRef}
          className="relative mx-auto max-w-3xl overflow-hidden px-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          }}
        >
          <div className="flex items-center gap-12 md:gap-16 lg:gap-20 animate-marquee w-max">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={index}
                className="logo-item flex-shrink-0 flex items-center justify-center h-6 will-change-transform"
              >
                <Image
                  src={company.logo}
                  alt={company.name}
                  width={100}
                  height={24}
                  className="h-4 md:h-5 w-auto object-contain"
                  style={{ filter: 'brightness(0.25)' }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
);

export default TrustedBy;
