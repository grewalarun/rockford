import SplitReveal, { Token } from "./ui/SplitReveal";
import Fade from "./ui/Fade";

const statement: Token[] = [
  "Brand",
  "design",
  "studio.",
  "We",
  { text: "partner", href: "#studio", className: "text-white" },
  "with",
  "ambitious",
  "teams",
  "and",
  "growing",
  "ventures",
  "through",
  "work",
  "that’s",
  "backed",
  "by",
  { text: "film", href: "#reel", className: "text-white" },
  "and",
  "led",
  "by",
  { text: "design", href: "#works", className: "text-white" },
  "—",
  "helping",
  "you",
  "claim",
  "your",
  { text: "space", href: "#works", className: "text-white" },
  "and",
  "look",
  "like",
  "you",
  "belong.",
];

export default function Hero() {
  return (
    <section
      className="hero fold-hero fold-gut relative flex items-center justify-between bg-black text-white"
    >
      <SplitReveal
        as="h1"
        intro
        delay={0.1}
        stagger={0.03}
        colorTo="#ffffff"
        text={statement}
        className="hero-copy font-normal text-[#6e6e6e]"
      />

      <Fade intro delay={0.9} y={0} className="fold-scroll flex shrink-0 items-center gap-[0.9em] text-[#878787] hero-scroll">
        <span className="hero-scroll tracking-normal">
          [SCROLL]
        </span>
        <svg
          className="hero-scroll-arrow"
          viewBox="0 0 8 9"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          aria-hidden
        >
          <path d="M4 0v8.4M0.6 5.2 4 8.6l3.4-3.4" />
        </svg>
      </Fade>
    </section>
  );
}
