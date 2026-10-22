import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  // custom easings
  CustomEase.create("rfInOut", "0.86,0,0.07,1");
  CustomEase.create("rfSoft", "0.645,0.045,0.355,1");
  CustomEase.create("rfOut", "0.16,1,0.3,1");
}

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isTouch = () =>
  typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

export { gsap, ScrollTrigger };
