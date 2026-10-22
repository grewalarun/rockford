"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import SplitReveal from "./ui/SplitReveal";

const phrase = "We orbit organisations to define who they are";

function Pill({ from, to }: { from: string; to: string }) {
  return (
    <span
      className="mx-[0.35em] inline-block h-[0.7em] w-[1.6em] rounded-full align-middle"
      style={{ background: `linear-gradient(120deg, ${from}, ${to})` }}
    />
  );
}

/** Oversized looping text whose speed and direction follow scroll velocity. */
export default function StudioMarquee() {
  const track = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = track.current;
    if (!el || prefersReduced()) return;
    const ctx = gsap.context(() => {
      const loop = gsap.to(el, { xPercent: -50, duration: 40, ease: "none", repeat: -1 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const dir = self.direction; // 1 down, -1 up
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 350, 5);
          gsap.to(loop, { timeScale: dir * boost, duration: 0.25, overwrite: true });
          gsap.to(loop, { timeScale: dir, duration: 1.2, delay: 0.25, ease: "power2.out" });
        },
      });
    }, el);
    return () => ctx.revert();
  }, []);

  const half = (
    <div className="flex shrink-0 items-center whitespace-nowrap pr-[0.5em]">
      {[0, 1, 2].map((i) => (
        <span key={i} className="flex items-center">
          {phrase}
          <Pill from="#ea6020" to="#ffd2b8" />
          Film
          <Pill from="#2b328c" to="#9aa4ff" />
          Design
          <Pill from="#111" to="#8d8d8d" />
        </span>
      ))}
    </div>
  );

  return (
    <section id="studio" className="overflow-hidden border-t border-[var(--line)] py-20 md:py-32">
      <div className="gutter mb-16 grid gap-6 md:grid-cols-12 md:mb-24">
        <div className="md:col-span-8 md:col-start-5">
          <SplitReveal
            text="Rockford Studio is a multi-disciplinary branding agency working with scale-ups and established businesses on identity, design maturity and strategic creative — defining who they are, shaping how they show up, and helping them grow."
            className="text-[clamp(1.25rem,2vw,2rem)] font-light leading-[1.3] tracking-[-0.01em]"
          />
        </div>
      </div>
      <div ref={track} className="flex w-max text-[clamp(3.5rem,11vw,11rem)] font-light leading-none tracking-[-0.04em]">
        {half}
        {half}
      </div>
    </section>
  );
}
