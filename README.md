
## AI Agent Platform Frontend

This project is a modern, visually engaging frontend for an AI agent platform. It features cinematic scroll-driven animations, smooth transitions, and a clean, responsive UI built with Next.js and Tailwind CSS.

### What I Built

- **Landing Page**: A hero section introducing the platform, followed by a "Trusted By" section with animated company logos.
- **Navigation**: Custom animated navigation bar with smooth transitions and hover effects.
- **Scroll-Driven Background**: Cinematic background animation using a sequence of high-quality images, synchronized with scroll progress.
- **Responsive Design**: Fully responsive layout for desktop and mobile devices.
- **Reusable Components**: Modular React components for easy maintenance and scalability.

### Animations & Libraries Used

- **GSAP (GreenSock Animation Platform)**
	- Used for advanced scroll-driven animations and timeline control.
	- [gsap](https://www.npmjs.com/package/gsap) and [@gsap/react](https://www.npmjs.com/package/@gsap/react) for smooth, performant animations.
	- ScrollTrigger plugin for scroll-based effects.
- **Framer Motion**
	- Used for declarative, physics-based UI animations (fade, scale, slide, stagger, etc.).
	- [framer-motion](https://www.framer.com/motion/) for animation variants and transitions.
- **Tailwind CSS**
	- Utility-first CSS framework for rapid UI development and transitions.
- **Custom Animation Hooks**
	- `useScrollAnimation.ts` for orchestrating GSAP timelines and scroll triggers.
	- `animations.ts` for reusable Framer Motion variants.
- **Image Sequence Animation**
	- `ScrollSequenceBackground.tsx` renders a cinematic background by sequencing images as the user scrolls.

### How to Run

1. Install dependencies:
	 ```bash
	 npm install
	 ```
2. Start the development server:
	 ```bash
	 npm run dev
	 ```
3. Open [http://localhost:3000](http://localhost:3000) in your browser.

---
**Built with Next.js, React, GSAP, Framer Motion, and Tailwind CSS.**


