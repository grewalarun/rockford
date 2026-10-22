"use client";

import Link from "next/link";
import { useEffect } from "react";
import { getLenis } from "@/lib/intro";
import {
  CONTACT_EMAIL,
  CONTACT_URL,
  MENU_INTRO,
  MENU_JUMP,
  MENU_MARQUEE,
  menuLinks,
  socials,
} from "@/data/content";
import CaseArrow from "./icons/CaseArrow";
import ReelLabel from "./icons/ReelLabel";

type Props = { open: boolean; onClose: () => void };

// three columns of three links, read top to bottom
const columns = [menuLinks.slice(0, 3), menuLinks.slice(3, 6), menuLinks.slice(6, 9)];
const MARQUEE_COPIES = 8; // two identical halves so a -50% shift loops seamlessly

/**
 * Full-screen menu over a blurred, darkened page. It cuts in and out instantly; the
 * only entrance animation is the intro paragraph's shutter wipe. Hover states: nav rows
 * slide a highlight in, the email slides while its arrow shrinks, the journal arrow
 * straightens. Every size is vw-based, see the `.mn-*` rules in globals.css.
 */
export default function MenuOverlay({ open, onClose }: Props) {
  // Escape closes; scrolling is locked while open (Lenis is stopped by the header toggle)
  useEffect(() => {
    if (!open) return;
    const key = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", key);
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", key);
      html.style.overflow = prev;
    };
  }, [open, onClose]);

  const go = (e: React.MouseEvent, href: string) => {
    if (!href.startsWith("#") || href === "#") {
      onClose();
      return;
    }
    e.preventDefault();
    onClose();
    // the menu closes instantly, so glide to the section on the next frame
    requestAnimationFrame(() => {
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(href, { duration: 1.6, easing: (x) => 1 - Math.pow(1 - x, 4) });
      else document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      aria-hidden={!open}
      className={`mn ${open ? "is-open" : ""}`}
    >
      <div className="mn-bg" aria-hidden />

      <div className="fold-header absolute left-0 top-0 flex">
        <Link href="/" aria-label="Rockford Studio" className="fold-logo" onClick={onClose}>
          <span>RFD.</span>
          <i />
          <span>Studio</span>
        </Link>
      </div>
      <button type="button" className="mn-close" onClick={onClose}>
        Close
      </button>

      {socials.map((s, i) => (
        <a key={s} href="#" className={`mn-soc mn-s${i}`}>
          {s.toUpperCase()}
        </a>
      ))}
      <p className="mn-para">
        {MENU_INTRO}
      </p>
      <a href={MENU_JUMP.href} className="mn-jump" onClick={onClose}>
        <span className="mn-link-text">{MENU_JUMP.label}</span>
        <CaseArrow className="mn-link-arrow" />
      </a>

      {columns.map((col, c) => (
        <span key={c} className={`mn-num mn-n${c}`}>
          [0{c + 1}]
        </span>
      ))}
      {columns.map((col, c) =>
        col.map((l, r) => (
          <a
            key={l.label}
            href={l.href}
            className={`mn-row mn-c${c} mn-r${r}`}
            onClick={(e) => go(e, l.href)}
          >
            <span className="mn-bar" aria-hidden />
            <span className="mn-txt">{l.label}</span>
          </a>
        )),
      )}

      <a href={CONTACT_URL} className="mn-email">
        <span className="mn-link-text">
          {CONTACT_EMAIL}
        </span>
        <CaseArrow className="mn-link-arrow" />
      </a>
      <div className="mn-marq" aria-hidden>
        <div className="mn-marq-track">
          {Array.from({ length: MARQUEE_COPIES }, (_, i) => (
            <span key={i}>{MENU_MARQUEE}</span>
          ))}
        </div>
      </div>
      <ReelLabel className="mn-label" />
    </div>
  );
}
