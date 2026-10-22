"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, prefersReduced } from "@/lib/gsap";
import { REEL_URL } from "@/data/content";
import ReelLabel from "./icons/ReelLabel";
import PlayCircle from "./icons/PlayCircle";

/**
 * Full-viewport reel stage: the video sits inset on black, then grows ~4% to
 * full bleed as the section reaches the top while a blurred bar stays pinned.
 * All sizes are vw-based so the section scales with the viewport.
 */
export default function ReelStage() {
  const section = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  // inset -> full-bleed scale, scrubbed from "section top at 50% vh" to "top at 0"
  useLayoutEffect(() => {
    const el = section.current;
    if (!el || prefersReduced()) return;
    // the bar is scaled on its own: inside the stage, the scale would inflate its sticky offset
    const ctx = gsap.context(() => {
      gsap.fromTo(
        [stage.current, bar.current],
        { scale: 1 },
        {
          scale: 1.04,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 50%", end: "top top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  // only decode frames while the stage is on screen
  useEffect(() => {
    const v = video.current;
    const s = section.current;
    if (!v || !s) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.dataset.userPaused) v.play().catch(() => {});
        } else v.pause();
      },
      { threshold: 0.05 },
    );
    io.observe(s);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = video.current;
    if (!v) return;
    if (v.paused) {
      delete v.dataset.userPaused;
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.dataset.userPaused = "1";
      v.pause();
      setPaused(true);
    }
  };

  return (
    <section ref={section} id="reel" className="reel relative h-[100svh] bg-black">
      <div ref={stage} className="reel-stage absolute inset-y-0">
        <video
          ref={video}
          className="absolute inset-0 h-full w-full cursor-pointer object-cover"
          src="/images/video-1.mp4"
          poster="/images/image.png"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onClick={toggle}
        />

        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play reel" : "Pause reel"}
          className="reel-toggle absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white"
          data-paused={paused}
        >
          {paused ? (
            <svg viewBox="0 0 40 40" className="block h-full w-full" aria-hidden>
              <path d="M14 9.5v21L30.5 20z" fill="currentColor" />
            </svg>
          ) : (
            <svg viewBox="0 0 40 40" className="block h-full w-full" aria-hidden>
              <rect x="13" y="10" width="5" height="20" fill="currentColor" />
              <rect x="22" y="10" width="5" height="20" fill="currentColor" />
            </svg>
          )}
        </button>

      </div>

      <div ref={bar} className="reel-bar sticky top-0 z-10 flex items-center justify-between text-white">
        <ReelLabel className="reel-label block" />
        <a href={REEL_URL} target="_blank" rel="noreferrer noopener" className="reel-link flex items-center">
          <PlayCircle className="reel-icon block shrink-0" />
          <span className="reel-link-text underline underline-offset-[0.14em]">
            Playback 2025
          </span>
        </a>
      </div>
    </section>
  );
}
