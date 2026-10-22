import { CONTACT_URL } from "@/data/content";
import CaseArrow from "./icons/CaseArrow";

/**
 * "Brands We've Worked With": black header strip with a "Let's talk" link, then the logo
 * grid delivered as a looping GIF (separate art for desktop and phone). Static by design;
 * every size is vw-based, see the `.br-*` rules in globals.css.
 */
export default function Brands() {
  return (
    <section className="br bg-black text-white">
      <div className="br-head">
        <h2 className="br-title">
          Brands We&apos;ve Worked With.
        </h2>
        {/* fixed hover box: the label slides right while the arrow shrinks away */}
        <a href={CONTACT_URL} className="br-cta-box">
          <span className="br-cta">
            Let&apos;s talk
          </span>
          <CaseArrow className="br-arrow" />
        </a>
      </div>

      <div className="br-media">
        <picture>
          <source media="(max-width: 750px)" srcSet="/images/brands-mobile.gif" />
          <img
            className="br-img"
            src="/images/brands-desktop.gif"
            alt="Logos of the brands we have worked with"
            draggable={false}
          />
        </picture>
      </div>
    </section>
  );
}
