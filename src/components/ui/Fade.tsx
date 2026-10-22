"use client";

import { ElementType, ReactNode, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  y?: number;
  intro?: boolean;
  start?: string;
};

/** Fade + rise when scrolled into view (or after the intro). */
export default function Fade({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 40,
  intro = false,
  start = "top 90%",
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReduced()) {
      gsap.set(el, { opacity: 1 });
      return;
    }
    let off = () => {};
    const h: { ctx?: gsap.Context } = {};
    h.ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y });
      const tween = () => gsap.to(el, { opacity: 1, y: 0, duration: 1.2, delay, ease: "rfOut" });
      // may fire synchronously (already past the trigger), before `ctx` is assigned
      const play = () => (h.ctx ? h.ctx.add(tween) : tween());
      if (intro) off = onIntroDone(play);
      else ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play });
    }, el);
    return () => {
      off();
      h.ctx?.revert();
    };
  }, [delay, y, intro, start]);

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {children}
    </Tag>
  );
}
