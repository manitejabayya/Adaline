"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, forwardRef } from "react";

// Product menu data for dropdown
const productMenuData = [
  {
    number: 1,
    title: "ITERATE",
    heading: "Sketch, test\nand refine",
    links: [
      { label: "Editor", href: "/products/editor" },
      { label: "Playground", href: "/products/playground" },
      { label: "Datasets", href: "/products/datasets" },
    ],
  },
  {
    number: 2,
    title: "EVALUATE",
    heading: "Reflect\nand measure",
    links: [
      { label: "Evaluations", href: "/products/evaluations" },
      { label: "Datasets", href: "/products/datasets" },
    ],
  },
  {
    number: 3,
    title: "DEPLOY",
    heading: "From draft\nto live",
    links: [
      { label: "Deployments", href: "/products/deployments" },
      { label: "Analytics", href: "/products/analytics" },
      { label: "Gateway", href: "/products/gateway", external: true },
    ],
  },
  {
    number: 4,
    title: "MONITOR",
    heading: "Insights\nin real time",
    links: [
      { label: "Logs", href: "/products/logs" },
      { label: "Analytics", href: "/products/analytics" },
    ],
  },
];

// Product menu items for mobile
const productItems = [
  {
    title: "Iterate",
    description: "Sketch, test and refine",
    icon: (
      <div className="relative w-10 h-10">
        {/* Hexagon - larger, bottom layer */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute inset-0 w-full h-full text-[#1a2e1a] animate-spin-slow"
          strokeWidth="1.2"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
          />
        </svg>
        {/* Pentagon - smaller, top layer, offset */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 text-[#1a2e1a] animate-spin-slow-reverse"
          strokeWidth="1.2"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Evaluate",
    description: "Reflect and measure",
    icon: (
      <div className="relative w-10 h-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute inset-0 w-full h-full text-[#1a2e1a] animate-spin-slow"
          strokeWidth="1.2"
        >
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke="currentColor"
            strokeDasharray="5 3"
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Deploy",
    description: "From draft to live",
    icon: (
      <div className="relative w-10 h-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute inset-0 w-full h-full text-[#1a2e1a] animate-spin-slow"
          strokeWidth="1.2"
        >
          <path
            fill="none"
            stroke="currentColor"
            d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
          />
        </svg>
      </div>
    ),
  },
  {
    title: "Monitor",
    description: "Insights in real time",
    icon: (
      <div className="relative w-10 h-10">
        {/* Outer dashed circle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute inset-0 w-full h-full text-[#1a2e1a] animate-spin-slow"
          strokeWidth="1.2"
        >
          <circle
            cx="32"
            cy="32"
            r="24"
            fill="none"
            stroke="currentColor"
            strokeDasharray="5 3"
          />
        </svg>
        {/* Inner solid circle */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2/3 h-2/3 text-[#1a2e1a] animate-spin-slow-reverse"
          strokeWidth="1.2"
        >
          <circle
            cx="32"
            cy="32"
            r="20"
            fill="none"
            stroke="currentColor"
          />
        </svg>
      </div>
    ),
  },
];

// Iterate illustration - Using Hexagon.svg and pentagon.svg shapes
const IterateIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-[160px] h-[120px]">
    {/* Large Hexagon - bottom left (from Hexagon.svg) */}
    <svg
      className={`absolute bottom-0 left-0 w-[70px] h-[70px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <path
        fill="none"
        stroke="currentColor"
        d="m32 8 15.427 5.615 8.208 14.217L52.785 44 40.209 54.553H23.79L11.215 44l-2.85-16.168 8.208-14.217z"
      />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small circle - top right */}
    <svg
      className={`absolute top-2 right-10 w-[28px] h-[28px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Pentagon - top center overlapping (from pentagon.svg) */}
    <svg
      className={`absolute top-0 left-10 w-[55px] h-[55px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <path
        fill="none"
        stroke="currentColor"
        d="m32 8 18.764 9.036 4.634 20.304-12.985 16.283H21.587L8.602 37.341l4.634-20.305z"
      />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small circle - bottom center */}
    <svg
      className={`absolute bottom-6 left-16 w-[22px] h-[22px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

// Evaluate illustration - dashed circles with plus signs (using dottedCircle.svg)
const EvaluateIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-[160px] h-[120px]">
    {/* Large dashed circle - top left */}
    <svg
      className={`absolute top-0 left-2 w-[75px] h-[75px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Medium dashed circle - right side overlapping */}
    <svg
      className={`absolute top-10 right-4 w-[55px] h-[55px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small dashed circle - bottom center */}
    <svg
      className={`absolute bottom-0 left-14 w-[35px] h-[35px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="24" fill="none" stroke="currentColor" strokeDasharray="5 3" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

// Deploy illustration - using CutCircle.svg (compass/pie chart style)
const DeployIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-[160px] h-[120px]">
    {/* Main CutCircle - compass/pie chart style (from CutCircle.svg) */}
    <svg
      className={`absolute top-4 left-4 w-[70px] h-[70px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <path
        fill="none"
        stroke="currentColor"
        d="M30.803 8.03c-7.956.39-14.893 4.654-18.965 10.946L19.53 24.8l-8.893-3.75A23.9 23.9 0 0 0 8 32c0 3.945.952 7.667 2.638 10.95l8.892-3.75-7.691 5.825c4.072 6.291 11.01 10.555 18.964 10.946L32 46.4l1.198 9.57c7.954-.392 14.89-4.656 18.963-10.947l-7.69-5.823 8.89 3.749A23.9 23.9 0 0 0 56 32c0-3.944-.951-7.666-2.637-10.948L44.472 24.8l7.69-5.824C48.092 12.685 41.155 8.42 33.2 8.029l-1.198 9.572z"
      />
    </svg>
    {/* Small circle - top right with plus */}
    <svg
      className={`absolute top-0 right-10 w-[28px] h-[28px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small circle - bottom left with plus */}
    <svg
      className={`absolute bottom-2 left-16 w-[26px] h-[26px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Tiny circle with 4 dots - bottom right */}
    <svg
      className={`absolute bottom-6 right-8 w-[20px] h-[20px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="18" stroke="currentColor" strokeWidth="1" fill="none" />
      <circle cx="32" cy="18" r="3" fill="currentColor" />
      <circle cx="32" cy="46" r="3" fill="currentColor" />
      <circle cx="18" cy="32" r="3" fill="currentColor" />
      <circle cx="46" cy="32" r="3" fill="currentColor" />
    </svg>
  </div>
);

// Monitor illustration - large dashed outer ring with inner solid circle
const MonitorIllustration = ({ isHovered }: { isHovered: boolean }) => (
  <div className="relative w-[160px] h-[120px]">
    {/* Large outer dashed circle */}
    <svg
      className={`absolute top-2 left-2 w-[85px] h-[85px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeDasharray="5 3" />
    </svg>
    {/* Inner solid circle with plus - centered inside large circle */}
    <svg
      className={`absolute top-6 left-6 w-[60px] h-[60px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small circle - top right with plus */}
    <svg
      className={`absolute top-0 right-4 w-[32px] h-[32px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Small dashed circle - bottom right */}
    <svg
      className={`absolute bottom-0 right-8 w-[35px] h-[35px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? '-rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeDasharray="5 3" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
    {/* Tiny circle - bottom center with plus */}
    <svg
      className={`absolute bottom-4 left-20 w-[24px] h-[24px] text-[#1a2e1a] transition-transform duration-[3000ms] ease-linear ${isHovered ? 'rotate-[360deg]' : ''}`}
      viewBox="0 0 64 64"
      fill="none"
      strokeWidth="1"
    >
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" />
      <path d="M28 32h8M32 28v8" stroke="currentColor" strokeWidth="1" />
    </svg>
  </div>
);

// Products Dropdown Component
const ProductsDropdown = ({ isOpen }: { isOpen: boolean }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const illustrations = [
    IterateIllustration,
    EvaluateIllustration,
    DeployIllustration,
    MonitorIllustration,
  ];

  return (
    <div
      className={`fixed top-[60px] left-0 w-screen bg-[#e8e8e3] border-t border-b border-[#1a2e1a]/10 transition-all duration-300 ease-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
        }`}
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 py-8">
        {/* Illustrations Row */}
        <div className="grid grid-cols-4 gap-6 mb-4">
          {productMenuData.map((item, index) => {
            const Illustration = illustrations[index];
            const isActive = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;
            return (
              <div
                key={item.title}
                className={`flex flex-col items-start cursor-pointer transition-opacity duration-300 ${hasHover ? (isActive ? 'opacity-100' : 'opacity-40') : 'opacity-100'
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="relative w-full">
                  <Illustration isHovered={isActive} />
                  {/* Number badge and title positioned at top right of illustration */}
                  <div className="absolute top-0 right-0 flex items-center gap-1">
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-medium transition-colors duration-300 ${isActive
                        ? 'bg-[#1a2e1a] text-white'
                        : 'bg-[#c5d4a0] text-[#1a2e1a]'
                        }`}
                      style={{ fontFamily: 'var(--font-fragment-mono)' }}
                    >
                      {item.number}
                    </div>
                    <span
                      className="text-[10px] font-medium text-[#1a2e1a] whitespace-nowrap"
                      style={{ fontFamily: 'var(--font-fragment-mono)', letterSpacing: '0.05em' }}
                    >
                      {item.title}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dotted line separator */}
        <div className="border-t border-dotted border-[#1a2e1a]/30 my-6" />

        {/* Content Row */}
        <div className="grid grid-cols-4 gap-6">
          {productMenuData.map((item, index) => {
            const isActive = hoveredIndex === index;
            const hasHover = hoveredIndex !== null;
            return (
              <div
                key={item.title}
                className={`flex flex-col cursor-pointer transition-opacity duration-300 ${hasHover ? (isActive ? 'opacity-100' : 'opacity-40') : 'opacity-100'
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Section label */}
                <span
                  className="text-[10px] font-medium text-[#1a2e1a]/70 mb-2 tracking-wider"
                  style={{ fontFamily: 'var(--font-fragment-mono)', letterSpacing: '0.08em' }}
                >
                  {item.title}
                </span>
                {/* Heading */}
                <h3
                  className="text-[24px] leading-[1.1] text-[#1a2e1a] mb-4 whitespace-pre-line"
                  style={{ fontFamily: 'var(--font-akkurat)' }}
                >
                  {item.heading}
                </h3>
                {/* Links */}
                <div className="flex flex-col gap-1">
                  {item.links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="text-[14px] text-[#1a2e1a] hover:opacity-60 transition-opacity flex items-center gap-1"
                      style={{ fontFamily: 'var(--font-akkurat)' }}
                    >
                      {link.label}
                      {link.external && (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

interface NavigationProps {
  className?: string;
  navOpacity?: number;
  navBlur?: number;
}

const Navigation = forwardRef<HTMLDivElement, NavigationProps>(
  function Navigation({ className = "", navOpacity = 1, navBlur = 0 }, ref) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProductsOpen, setIsProductsOpen] = useState(false);

    return (
      <>
        <nav
          ref={ref}
          className={`fixed top-0 left-0 right-0 z-50 px-4 md:px-8 lg:px-12 py-4 bg-transparent will-change-transform ${className}`}
          style={{
            opacity: navOpacity,
            filter: `blur(${navBlur}px)`,
            pointerEvents: navOpacity < 0.1 ? 'none' : 'auto'
          }}
        >
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
              <div
                className="flex items-center gap-1 cursor-pointer group relative"
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
              >
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
                  className={`opacity-80 group-hover:opacity-100 transition-all duration-200 ${isProductsOpen ? 'rotate-180' : ''}`}
                />
                {/* Products Dropdown */}
                <ProductsDropdown isOpen={isProductsOpen} />
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
              {/* Demo button - hidden on mobile */}
              <button className="hidden md:flex items-center gap-2 px-3 md:px-4 py-2 rounded-full border border-[#1a2e1a]/30 bg-white/80 backdrop-blur-sm hover:bg-white transition-colors">
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
                    <path d="M18 6L6 18M6 6l12 12" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[200] md:hidden">
            {/* Full Screen Menu */}
            <div className="absolute inset-0 bg-white overflow-y-auto">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between px-4 py-4">
                {/* Logo */}
                <Link href="/" className="flex items-center" onClick={() => setIsMobileMenuOpen(false)}>
                  <Image
                    src="/Assets/logo.svg"
                    alt="Adaline"
                    width={28}
                    height={28}
                    className="h-6 w-auto"
                  />
                </Link>

                {/* Right side - CTA and Close */}
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 rounded-full bg-[#1a2e1a] text-white text-[11px] font-medium tracking-wider"
                    style={{ fontFamily: 'var(--font-fragment-mono)' }}
                  >
                    START FOR FREE
                  </button>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6l12 12" stroke="#1a2e1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Menu Content */}
              <div className="px-4 py-2">
                {/* Products Section */}
                <div className="mb-4">
                  <h2
                    className="text-[#2d5a4a] text-[24px] font-normal mb-0"
                    style={{ fontFamily: 'var(--font-akkurat)' }}
                  >
                    Products
                  </h2>
                  <p
                    className="text-[#7a8a7a] text-[14px] mb-2"
                    style={{ fontFamily: 'var(--font-akkurat)' }}
                  >
                    Across your journey
                  </p>

                  {/* Product Items */}
                  <div>
                    {productItems.map((item, index) => (
                      <Link
                        key={index}
                        href={`/products/${item.title.toLowerCase()}`}
                        className="flex items-center justify-between py-4 border-t border-[#e0e0d8] group"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 flex items-center justify-center">
                            {item.icon}
                          </div>
                          <div>
                            <h3
                              className="text-[#1a2e1a] text-[16px] font-medium"
                              style={{ fontFamily: 'var(--font-akkurat)' }}
                            >
                              {item.title}
                            </h3>
                            <p
                              className="text-[#7a8a7a] text-[14px]"
                              style={{ fontFamily: 'var(--font-akkurat)' }}
                            >
                              {item.description}
                            </p>
                          </div>
                        </div>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="text-[#b0b0a0] group-hover:text-[#1a2e1a] transition-colors"
                        >
                          <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Pricing Link */}
                <Link
                  href="/pricing"
                  className="block py-4 border-t border-[#e0e0d8]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <h2
                    className="text-[#2d5a4a] text-[24px] font-normal"
                    style={{ fontFamily: 'var(--font-akkurat)' }}
                  >
                    Pricing
                  </h2>
                </Link>

                {/* Blog Link */}
                <Link
                  href="/blog"
                  className="block py-4 border-t border-[#e0e0d8]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <h2
                    className="text-[#2d5a4a] text-[24px] font-normal"
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
);

export default Navigation;
