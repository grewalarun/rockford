import { HOW_WE_WORK_URL } from "@/data/content";
import CaseArrow from "./icons/CaseArrow";
import CardVideo from "./ui/CardVideo";

/**
 * "Stepping into Orbit": title and intro on a black strip with a "How We Work" link, then
 * two autoplaying videos (a tall one left, a short one right; stacked on phones). Static by
 * design (no entrance animation); every size is vw-based, see the `.ob-*` rules in globals.css.
 */
export default function Orbit() {
  return (
    <section id="orbit" className="ob bg-black text-white">
      <div className="ob-head">
        <h2 className="ob-title">
          <span className="block">Stepping into Orbit.</span>
          <span className="ob-sub block">One orbit, many rhythms.</span>
        </h2>
        <p className="ob-copy">
          Every engagement is shaped around you. Some partners want us embedded for the long haul,
          others call us in for a sharp, short sprint before a launch or a pivot. Both are welcome.
          We flex the scope, the team and the tempo as things evolve, so the work always fits the
          moment it is made for and keeps pace with where you are heading. Nothing here is fixed in
          place.
        </p>
        {/* fixed hover box: the label slides right while the arrow shrinks away */}
        <a href={HOW_WE_WORK_URL} className="ob-cta-box">
          <span className="ob-cta">
            How We Work
          </span>
          <CaseArrow className="ob-arrow" />
        </a>
      </div>

      <div className="ob-media">
        <div className="ob-tile ob-left">
          <CardVideo
            src="/images/steping-out-left-video.mp4"
            poster="/images/steping-out-left-video-poster.jpg"
            className="ob-video"
          />
        </div>
        <div className="ob-tile ob-right">
          <CardVideo
            src="/images/steping-out-video.mp4"
            poster="/images/steping-out-video-poster.jpg"
            className="ob-video"
          />
        </div>
      </div>
    </section>
  );
}
