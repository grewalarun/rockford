import type { CSSProperties } from "react";
import { workRows, WORK_URL, type Work } from "@/data/content";
import CardHit from "./icons/CardHit";
import CardVideo from "./ui/CardVideo";

/** px @1440 -> vw, the unit every size in this section is expressed in. */
const vw = (px: number) => `${(px / 14.4).toFixed(4)}vw`;

function Card({ w }: { w: Work }) {
  const [x, y, bw, bh] = w.box;
  const style = {
    "--x": vw(x),
    "--y": vw(y),
    "--w": vw(bw),
    "--h": vw(bh),
    "--dx": vw(w.textDx ?? 0),
  } as CSSProperties;

  return (
    <article className={`sw-card sw-${w.size}`} style={style}>
      <div className="sw-media">
        <CardVideo src={w.video} className="sw-video" />
        {w.tags && (
          <ul className={`sw-tags sw-tags-${w.pill ?? "glass"}`}>
            {w.tags.map((t, i) => (
              <li
                key={t}
                className="sw-tag"
                style={w.pillW ? ({ "--pw": vw(w.pillW[i]) } as CSSProperties) : undefined}
              >
                <p>{t}</p>
              </li>
            ))}
          </ul>
        )}
        <a href={WORK_URL} aria-label={w.name} className="sw-hit">
          <CardHit className="block h-full w-full" />
        </a>
      </div>
      <div className="sw-text">
        <h3 className="sw-title">
          <a href={WORK_URL}>{w.name}</a>
        </h3>
        <p className="sw-sub">
          {w.descriptor}
        </p>
      </div>
    </article>
  );
}

/**
 * Selected Works: rows of video cards laid out in rows (2 | 1 large + 2 small |
 * 2 | 2 small + 1 large | 2). Static by design (no entrance animation); every size is
 * vw-based, see the `.sw-*` rules in globals.css.
 */
export default function SelectedWorks() {
  return (
    <section id="works" className="sw bg-white text-black">
      <div className="sw-head">
        <h2 className="sw-h2">
          Selected Works
        </h2>
      </div>

      {workRows.map((row, r) => (
        <div key={r} className="sw-row">
          {row.map((w) => (
            <Card key={w.name} w={w} />
          ))}
        </div>
      ))}
    </section>
  );
}
