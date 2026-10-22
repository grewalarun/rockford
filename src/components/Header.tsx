"use client";

import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis, onIntroDone } from "@/lib/intro";
import MenuOverlay from "./MenuOverlay";
import Magnetic from "./ui/Magnetic";
import RollText from "./ui/RollText";

/** London clock, e.g. "08:04:17 GMT". Renders a stable placeholder until mounted. */
function Clock() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span data-m="time" className="fold-meta-time font-semibold tabular-nums text-white">
      {t} GMT
    </span>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const bar = useRef<HTMLElement>(null);

  // slide the bar in after the preloader
  useLayoutEffect(() => {
    const el = bar.current;
    if (!el) return;
    gsap.set(el, { yPercent: -100, opacity: 0 });
    return onIntroDone(() =>
      gsap.to(el, { yPercent: 0, opacity: 1, duration: 1.2, ease: "rfOut", delay: 0.2 }),
    );
  }, []);

  // fixed bar: slides out (0.3s linear) when scrolling down past the hero, back in on any scroll up
  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    el.style.transition = "translate 0.3s linear";
    let last = window.scrollY;
    let hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      const next = y > last ? y > 500 : y < last ? false : hidden;
      last = y;
      if (next !== hidden) {
        hidden = next;
        el.style.translate = hidden ? "0 -100%" : "0 0";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggle = useCallback((next: boolean) => {
    setOpen(next);
    const lenis = getLenis();
    if (next) lenis?.stop();
    else lenis?.start();
  }, []);

  return (
    <>
      <header
        ref={bar}
        data-m="header"
        className="fold-header fixed inset-x-0 top-0 z-60 flex justify-between bg-black text-white"
      >
        <Link
          href="/"
          data-m="logo"
          aria-label="Rockford Studio"
          className="fold-logo"
          onClick={() => open && toggle(false)}
        >
          <span>RFD.</span>
          <i />
          <span>Studio</span>
        </Link>
        <div className="fold-meta">
          <span data-m="loc" className="fold-meta-loc text-[#acacac]">
            North London
          </span>
          <Clock />
        </div>
        <Magnetic>
          <button
            type="button"
            onClick={() => toggle(!open)}
            aria-expanded={open}
            className="fold-menu group cursor-pointer"
          >
            <span data-m="menu">
              <RollText>{open ? "Close" : "Menu"}</RollText>
            </span>
            <svg
              data-m="menu-arrow"
              className="block"
              style={{ width: "1.32em", height: "1.32em" }}
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden
            >
              <path d="M5 11 11 5M5.6 5H11v5.4" />
            </svg>
          </button>
        </Magnetic>
      </header>
      <MenuOverlay open={open} onClose={() => toggle(false)} />
    </>
  );
}
