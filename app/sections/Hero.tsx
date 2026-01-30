"use client";

export default function Hero() {
  return (
    <section className="relative pt-8 md:pt-12 pb-8 md:pb-10">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h1 
          className="text-[#1a2e1a] text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem] lg:text-[2.75rem] font-normal leading-[1.2] tracking-[-0.02em]"
          style={{ fontFamily: 'var(--font-akkurat)' }}
        >
          The single platform to iterate,
          <br />
          evaluate, deploy, and monitor AI agents
        </h1>
      </div>
    </section>
  );
}
