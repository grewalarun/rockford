import type { SVGProps } from "react";

/** Invisible click-capture rectangle laid over each work card's media. */
export default function CardHit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="9.04 19.052 186 103"
      preserveAspectRatio="none"
      role="presentation"
      aria-hidden
      {...props}
    >
      <path d="M195.04 19.052v103h-186v-103h186z" fill="transparent" />
    </svg>
  );
}
