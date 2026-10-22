import type { SVGProps } from "react";

/** Right-pointing arrow glyph; rotate it for the diagonal "↗" used by link CTAs. */
export default function CaseArrow(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0.564 0.185 18.647 16.215"
      fill="currentColor"
      aria-hidden
      {...props}
    >
      <path d="M17.205 9.548V7.034H.564v2.514z" />
      <path d="m11.231 16.4-1.557-1.583 6.422-6.525-6.422-6.525L11.231.185l7.98 8.107z" />
    </svg>
  );
}
