export type Work = {
  name: string;
  descriptor: string;
  video: string;
  /** media box in px at a 1440 viewport, relative to the row: [x, y, width, height] */
  box: [number, number, number, number];
  /** small cards (quarter width) carry no tags */
  size: "lg" | "sm";
  tags?: string[];
  /** "glass": tight white-15% pills; "tint": fixed-width centred pills (widths in px @1440) */
  pill?: "glass" | "tint";
  pillW?: number[];
  /** px @1440 the title block sits off the media's left edge */
  textDx?: number;
};

const V2 = "/images/video-2.mp4";
const V3 = "/images/video-3.mp4";

// Placeholder projects — swap in real case studies later. Rows follow the layout
// grid: 2 equal | large + 2 small | 2 equal | 2 small + large | 2 equal. Videos alternate.
export const workRows: Work[][] = [
  [
    { name: "Northwind Aero", descriptor: "Urban Airspace Operations", video: V2, size: "lg", box: [25.2, 25.2, 687.2, 381.7], pill: "glass", tags: ["Extension", "Architecture", "Motion", "UI/UX"] },
    { name: "Halden Clinic", descriptor: "Skincare Clinic", video: V3, size: "lg", box: [727.6, 25.2, 687.2, 381.7], pill: "glass", tags: ["Rebrand", "Architecture", "Art Direction", "Motion"] },
  ],
  [
    { name: "Pelham", descriptor: "Advisory Group", video: V2, size: "lg", box: [25.2, 25.2, 679.6, 381.7], pill: "tint", pillW: [68.6, 100, 65.6, 52.2], tags: ["Rebrand", "Architecture", "Motion", "Web"] },
    { name: "Solis Energy", descriptor: "Solar Solutions", video: V3, size: "sm", box: [719.5, 25.2, 339.8, 190.8], textDx: 1 },
    { name: "Deskly", descriptor: "Hospitality Communications", video: V2, size: "sm", box: [1075.5, 25.2, 340.3, 190.8], textDx: -0.6 },
  ],
  [
    { name: "Forgeline", descriptor: "Manufacturing Analytics", video: V3, size: "lg", box: [25.2, 25.2, 687.2, 381.7], pill: "tint", pillW: [68.6, 65.6, 52.2, 52.2], tags: ["Rebrand", "Motion", "UI/UX", "Film"] },
    { name: "Vantor", descriptor: "3D Assets", video: V2, size: "lg", box: [727.6, 25.2, 687.2, 381.7], pill: "tint", pillW: [68.6, 65.6, 52.2, 52.2], tags: ["Rebrand", "Motion", "UI/UX", "Film"] },
  ],
  [
    { name: "Ink & Ember", descriptor: "Tattoo Studio", video: V3, size: "sm", box: [24.7, 25.2, 339.8, 190.8], textDx: 1 },
    { name: "Reclaim", descriptor: "Waste Management", video: V2, size: "sm", box: [380.1, 25.7, 339.8, 191.3] },
    { name: "Aphelion", descriptor: "Satellite Technology", video: V3, size: "lg", box: [735.6, 25.7, 681.1, 381.7], pill: "glass", textDx: -0.5, tags: ["Identity", "Motion", "Event", "Web"] },
  ],
  [
    { name: "Marlow", descriptor: "Collaboration Film", video: V2, size: "lg", box: [25.2, 25.2, 687.2, 381.7], pill: "tint", pillW: [73.6, 35, 52.2], tags: ["Campaign", "PR", "Film"] },
    { name: "Quill", descriptor: "Software Platform", video: V3, size: "lg", box: [727.6, 25.2, 687.2, 381.7], pill: "tint", pillW: [68.6, 100, 46.6, 52.2], tags: ["UI/UX", "Architecture", "3D", "Web"] },
  ],
];

// Placeholder destination for a project page.
export const WORK_URL = "#";

export const menuLinks = [
  { label: "Film", href: "#reel" },
  { label: "Design", href: "#works" },
  { label: "Space", href: "#works" },
  { label: "Services", href: "#orbit" },
  { label: "Systems", href: "#orbit" },
  { label: "Studio", href: "#studio" },
  { label: "Voice", href: "#" },
  { label: "Archive", href: "#" },
  { label: "Contact", href: "#contact" },
];

export const socials = ["LinkedIn", "Instagram", "YouTube"];

// Placeholder destination for the "Playback" link.
export const REEL_URL = "#";

// Placeholder destination for the case-study link.
export const CASE_STUDY_URL = "#";

// Placeholder destination for the "Let's talk" link.
export const CONTACT_EMAIL = "hi@rockford.studio";
export const CONTACT_URL = `mailto:${CONTACT_EMAIL}`;

// Placeholder destination for the "How We Work" link.
export const HOW_WE_WORK_URL = "#";

// Placeholder footer details.
export const FOOTER_ADDRESS = ["Unit 12", "Example Yard", "North London", "N1 0AA"];
export const FOOTER_URL = "#";

// Placeholder main-menu copy.
export const MENU_INTRO =
  "We build brands, films and spaces with care, working with teams of every size, from the first sketch to the final cut. The aim is simple: work that looks right, feels sharp and says something.";
export const MENU_JUMP = { label: "Studio journal", href: "#" };
export const MENU_MARQUEE = "Make something bold™";
