"use client";

import Link from "next/link";
import { ElementType, useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReduced } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";

export type Token = string | { text: string; href?: string; className?: string };

type Props = {
  text: Token[] | string;
  as?: ElementType;
  className?: string;
  /** wait for the preloader instead of the scroll position */
  intro?: boolean;
  delay?: number;
  stagger?: number;
  start?: string;
  /** words fade from the element's colour to this one as they rise */
  colorTo?: string;
};

const wordWrap = "inline-block overflow-hidden align-top pb-[0.14em] -mb-[0.14em]";

/** Word-by-word masked rise, triggered on scroll (or after the intro). */
export default function SplitReveal({
  text,
  as: Tag = "p",
  className,
  intro = false,
  delay = 0,
  stagger = 0.035,
  start = "top 88%",
  colorTo,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const tokens: Token[] = typeof text === "string" ? text.split(" ") : text;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const words = el.querySelectorAll("[data-w]");
    gsap.set(el, { opacity: 1 });
    if (prefersReduced()) return;

    let off = () => {};
    const h: { ctx?: gsap.Context } = {};
    h.ctx = gsap.context(() => {
      gsap.set(words, { yPercent: 115 });
      // may fire synchronously (already past the trigger), before `ctx` is assigned
      const play = () => {
        const run = () => {
          gsap.to(words, { yPercent: 0, duration: 1.25, ease: "rfOut", stagger, delay });
          if (colorTo)
            gsap.to(words, {
              color: colorTo,
              duration: 0.9,
              ease: "rfSoft",
              stagger,
              delay: delay + 0.35,
            });
        };
        if (h.ctx) h.ctx.add(run);
        else run();
      };
      if (intro) off = onIntroDone(play);
      else ScrollTrigger.create({ trigger: el, start, once: true, onEnter: play });
    }, el);
    return () => {
      off();
      h.ctx?.revert();
    };
  }, [intro, delay, stagger, start, colorTo]);

  const words = tokens.map((t, i) => ({
    key: i,
    text: typeof t === "string" ? t : t.text,
    href: typeof t === "string" ? undefined : t.href,
    className: typeof t === "string" ? undefined : t.className,
  }));

  return (
    <Tag ref={ref} className={className} style={{ opacity: 0 }}>
      {words.map((w) => {
        const inner = (
          <span data-w className="inline-block will-change-transform">
            {w.text}
          </span>
        );
        return (
          <span key={w.key}>
            <span className={wordWrap}>
              {w.href ? (
                <Link href={w.href} className={`${w.className ?? ""} u-link`}>
                  {inner}
                </Link>
              ) : (
                inner
              )}
            </span>{" "}
          </span>
        );
      })}
    </Tag>
  );
}
