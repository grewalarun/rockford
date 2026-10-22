import { CASE_STUDY_URL } from "@/data/content";
import BehindLabel from "./icons/BehindLabel";
import CaseArrow from "./icons/CaseArrow";
import CardVideo from "./ui/CardVideo";

/**
 * "Behind the Design" feature: autoplaying case-study video with a blurred bar that stays
 * pinned to the viewport top while the video is on screen, plus a text column. Static by
 * design (no entrance animation); every size is vw-based, see the `.bd-*` rules in globals.css.
 */
export default function BehindTheDesign() {
  return (
    <>
      <div className="bd-rule" aria-hidden />
      <section className="bd relative bg-white text-black">
        <div className="bd-media">
          <CardVideo
            src="/images/behind-the-design.mp4"
            poster="/images/behind-the-design-poster.jpg"
            className="bd-video"
          />
          <div className="bd-bar">
            <BehindLabel className="bd-label block" />
          </div>
          <button type="button" aria-label="Play video" className="bd-pill">
            PLAY
          </button>
        </div>

        <h2 className="bd-title">
          <span className="block">Behind the Design</span>
          <span className="bd-with block">with Mee Energy</span>
        </h2>
        <p className="bd-quote">
          “Great design starts with listening long before anything gets drawn.” — a note from the
          founder that shaped every decision across the Mee Energy project.
        </p>
        {/* fixed hover box: the label slides right while the arrow shrinks away */}
        <a href={CASE_STUDY_URL} className="bd-cta-box">
          <span className="bd-cta">
            Case Study
          </span>
          <CaseArrow className="bd-arrow" />
        </a>
      </section>
    </>
  );
}
