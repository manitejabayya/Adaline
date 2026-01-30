"use client";

export default function Hero() {
  return (
    <section className="relative pt-24 md:pt-28 pb-6">
      <div className="max-w-5xl mx-auto text-center px-6">
        <h1 
          className="text-[#1a2e1a] text-[1.75rem] sm:text-[2rem] md:text-[2.75rem] lg:text-[3.25rem] font-normal leading-[1.15] tracking-[-0.02em]"
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
