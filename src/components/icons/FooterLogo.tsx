import type { SVGProps } from "react";

/** Outlined "RFD." badge with a tiny tagline, drawn for the footer. */
export default function FooterLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 74 24.5"
      fill="none"
      role="img"
      aria-label="Rockford Studio"
      {...props}
    >
      <rect x="0.5" y="0.5" width="73" height="23.5" rx="2.5" stroke="currentColor" strokeOpacity="0.8" />
      <text
        x="7"
        y="15.6"
        fill="currentColor"
        fontFamily="inherit"
        fontSize="8.6"
        fontWeight="600"
        letterSpacing="1.4"
      >
        RFD.
      </text>
      <text x="38" y="11" fill="currentColor" fontFamily="inherit" fontSize="3.4" letterSpacing="0.3" opacity="0.85">
        BRAND · FILM
      </text>
      <text x="38" y="16.2" fill="currentColor" fontFamily="inherit" fontSize="3.4" letterSpacing="0.3" opacity="0.85">
        SPACE STUDIO
      </text>
    </svg>
  );
}
