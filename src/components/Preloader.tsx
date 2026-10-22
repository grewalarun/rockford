"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { getLenis, markIntroDone } from "@/lib/intro";

/** Counter + wordmark, then the panel wipes upward and the hero cascades in. */
export default function Preloader() {
  const panel = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const mark = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = panel.current;
    if (!el) return;

    if (prefersReduced()) {
      gsap.set(el, { display: "none" });
      markIntroDone();
      return;
    }

    const ctx = gsap.context(() => {
      const state = { n: 0 };
      gsap.set(mark.current, { yPercent: 110 });
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(el, { display: "none" });
          getLenis()?.start();
        },
      });
      tl.to(mark.current, { yPercent: 0, duration: 1, ease: "rfOut" })
        .to(
          state,
          {
            n: 100,
            duration: 1.8,
            ease: "rfSoft",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(state.n)).padStart(3, "0");
            },
          },
          0,
        )
        .to(mark.current, { yPercent: -110, duration: 0.8, ease: "rfInOut" }, "+=0.1")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1.1, ease: "rfInOut" }, "-=0.35")
        .call(markIntroDone, undefined, "-=0.55");
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={panel}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0b0b0b] text-white"
      style={{ clipPath: "inset(0% 0% 0% 0%)" }}
    >
      <div className="overflow-hidden pb-2">
        <div ref={mark} className="text-[clamp(2.5rem,8vw,7rem)] font-light tracking-tight">
          Rockford<span className="text-accent">.</span>Studio
        </div>
      </div>
      <span
        ref={count}
        className="label absolute bottom-[var(--gutter)] left-[var(--gutter)] tabular-nums"
      >
        000
      </span>
    </div>
  );
}
