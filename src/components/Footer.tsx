import { CONTACT_EMAIL, CONTACT_URL, FOOTER_ADDRESS, FOOTER_URL, menuLinks, socials } from "@/data/content";
import CaseArrow from "./icons/CaseArrow";
import FooterLogo from "./icons/FooterLogo";
import ReelLabel from "./icons/ReelLabel";
import CardVideo from "./ui/CardVideo";

const message = [
  "Ready for a bolder move? Say hello and tell",
  "us what you're making. We work with teams",
  "of every size, from every corner of the world,",
  "across design, film and space, to help you",
  "look like you really belong.",
];

// sitemap grid: three columns of three, read top to bottom
const columns = [
  menuLinks.slice(0, 3).map((l) => ({ label: l.label, href: l.href })),
  menuLinks.slice(3, 6).map((l) => ({ label: l.label, href: l.href })),
  socials.map((s) => ({ label: s, href: FOOTER_URL })),
];

/**
 * Footer: looping video behind two glass panels, a message and legal links on the left,
 * contact / address / sitemap rows on the right. Static by design; every size is vw-based,
 * see the `.ft-*` rules in globals.css (phones restack it).
 */
export default function Footer() {
  return (
    <footer id="contact" className="ft">
      <div className="ft-bg" aria-hidden>
        <CardVideo
          src="/images/footer-bg-video.mp4"
          poster="/images/footer-bg-video-poster.jpg"
          className="ft-video"
        />
      </div>

      <div className="ft-pl" aria-hidden />
      <div className="ft-pt" aria-hidden />
      <div className="ft-pb" aria-hidden />
      <div className="ft-rule ft-r-lt" aria-hidden />
      <div className="ft-rule ft-r-lb" aria-hidden />
      <div className="ft-rule ft-r-rt" aria-hidden />
      <div className="ft-rule ft-rule-sep ft-r-s1" aria-hidden />
      <div className="ft-rule ft-rule-sep ft-r-s2" aria-hidden />
      <div className="ft-rule ft-r-rb" aria-hidden />
      <div className="ft-r-v" aria-hidden />

      <FooterLogo className="ft-logo block text-white" />
      <p className="ft-msg">
        {message.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </p>
      <a href={FOOTER_URL} className="ft-priv ft-legal">
        Privacy policy
      </a>
      <a href={FOOTER_URL} className="ft-legalnk ft-legal">
        Legal terms
      </a>

      <h3 className="ft-reach">
        Reach out
      </h3>
      {/* fixed hover box: the address slides right while the arrow shrinks away */}
      <a href={CONTACT_URL} className="ft-email">
        <span className="ft-email-text">
          {CONTACT_EMAIL}
        </span>
        <CaseArrow className="ft-email-arrow" />
      </a>
      <a href={FOOTER_URL} className="ft-addr">
        <b>{FOOTER_ADDRESS[0]}</b>
        {FOOTER_ADDRESS.slice(1).map((l) => (
          <span key={l}>{l}</span>
        ))}
      </a>

      <h3 className="ft-maplab">
        Sitemap
      </h3>
      {columns.map((col, c) =>
        col.map((l, r) => (
          <a
            key={l.label}
            href={l.href}
            className={`ft-link ft-c${c} ft-row${r}`}
          >
            {l.label}
          </a>
        )),
      )}

      <p className="ft-copy">
        Copyright © Rockford Studio Ltd. 2025
      </p>
      <ReelLabel className="ft-label" />
    </footer>
  );
}
