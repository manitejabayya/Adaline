"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

// Product menu items
const productItems = [
  {
    title: "Iterate",
    description: "Sketch, test and refine",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#1a2e1a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1 3"/>
      </svg>
    ),
  },
  {
    title: "Evaluate",
    description: "Reflect and measure",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#1a2e1a" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 4"/>
      </svg>
    ),
  },
  {
    title: "Deploy",
    description: "From draft to live",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#1a2e1a" strokeWidth="1.5"/>
        <path d="M16 8v4" stroke="#1a2e1a" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    title: "Monitor",
    description: "Insights in real time",
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="16" cy="16" r="11" stroke="#1a2e1a" strokeWidth="1.5" strokeDasharray="8 2"/>
      </svg>
    ),
  },
];

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 bg-transparent">
        <div className="w-full flex items-center justify-between">
          {/* Logo - Left on mobile, Center on desktop */}
          <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Assets/logo.svg"
                alt="Adaline"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Left side - Navigation links (hidden on mobile) */}
          <div className="hidden md:flex items-center gap-6 md:gap-8">
            <div className="flex items-center gap-1 cursor-pointer group">
              <span 
                className="text-[#1a2e1a] text-[14px] font-medium" 
                style={{ 
                  fontFamily: 'var(--font-fragment-mono)',
                  letterSpacing: '0.02em',
                  lineHeight: '14px'
                }}
              >
                PRODUCTS
              </span>
              <Image
                src="/Assets/dropdown.svg"
                alt="dropdown"
                width={12}
                height={12}
                className="opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <Link
              href="/pricing"
              className="text-[#1a2e1a] text-[14px] font-medium hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: 'var(--font-fragment-mono)',
                letterSpacing: '0.02em',
                lineHeight: '14px'
              }}
            >
              PRICING
            </Link>
            <Link
              href="/blog"
              className="text-[#1a2e1a] text-[14px] font-medium hover:opacity-80 transition-opacity"
              style={{ 
                fontFamily: 'var(--font-fragment-mono)',
                letterSpacing: '0.02em',
                lineHeight: '14px'
              }}
            >
              BLOG
            </Link>
          </div>

          {/* Center - Logo (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/Assets/logo.svg"
                alt="Adaline"
                width={140}
                height={32}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Right side - CTA buttons and mobile menu */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Demo button */}
            <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-[#1a2e1a]/30 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
              <span 
                className="text-[#1a2e1a] text-[12px] md:text-[14px] font-medium" 
                style={{ 
                  fontFamily: 'var(--font-fragment-mono)',
                  letterSpacing: '0.02em',
                  lineHeight: '14px'
                }}
              >
                <span className="hidden md:inline">WATCH </span>DEMO
              </span>
              <Image
                src="/Assets/playIcon.svg"
                alt="Play"
                width={20}
                height={20}
                className="w-4 h-4 md:w-5 md:h-5"
              />
            </button>
            
            {/* Start for free button */}
            <button 
              className="px-4 md:px-5 py-2 md:py-2.5 rounded-full bg-[#1a2e1a] text-white text-[12px] md:text-[14px] font-medium hover:bg-[#2a3e2a] transition-colors"
              style={{ 
                fontFamily: 'var(--font-fragment-mono)',
                letterSpacing: '0.02em',
                lineHeight: '14px'
              }}
            >
              START FOR FREE
            </button>

            {/* Mobile menu button */}
            <button 
              className="md:hidden flex items-center justify-center w-10 h-10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6l12 12" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 12h18M3 6h18M3 18h18" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/20"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Menu Content */}
          <div className="absolute top-[72px] left-0 right-0 bottom-0 bg-[#c5c9b8] overflow-y-auto">
            <div className="px-4 py-6">
              {/* Products Section */}
              <div className="mb-6">
                <h2 
                  className="text-[#1a2e1a] text-2xl font-normal mb-1"
                  style={{ fontFamily: 'var(--font-akkurat)' }}
                >
                  Products
                </h2>
                <p className="text-[#6b7c6b] text-sm mb-4">Across your journey</p>
                
                {/* Product Items */}
                <div className="space-y-1">
                  {productItems.map((item, index) => (
                    <Link
                      key={index}
                      href={`/products/${item.title.toLowerCase()}`}
                      className="flex items-center justify-between py-4 border-t border-[#1a2e1a]/10 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 flex items-center justify-center">
                          {item.icon}
                        </div>
                        <div>
                          <h3 
                            className="text-[#1a2e1a] text-base font-medium"
                            style={{ fontFamily: 'var(--font-akkurat)' }}
                          >
                            {item.title}
                          </h3>
                          <p className="text-[#6b7c6b] text-sm">{item.description}</p>
                        </div>
                      </div>
                      <svg 
                        width="24" 
                        height="24" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-[#6b7c6b] group-hover:text-[#1a2e1a] transition-colors"
                      >
                        <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Pricing Link */}
              <Link
                href="/pricing"
                className="block py-4 border-t border-[#1a2e1a]/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h2 
                  className="text-[#1a2e1a] text-2xl font-normal"
                  style={{ fontFamily: 'var(--font-akkurat)' }}
                >
                  Pricing
                </h2>
              </Link>

              {/* Blog Link */}
              <Link
                href="/blog"
                className="block py-4 border-t border-[#1a2e1a]/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h2 
                  className="text-[#1a2e1a] text-2xl font-normal"
                  style={{ fontFamily: 'var(--font-akkurat)' }}
                >
                  Blog
                </h2>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
