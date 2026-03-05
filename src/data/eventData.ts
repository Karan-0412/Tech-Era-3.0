export const EVENT_DATE = new Date("2026-03-15T09:00:00");

export interface EventSpec {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  color: "cyan" | "magenta" | "green";
}

export const EVENT_SPECS: EventSpec[] = [
  {
    icon: "◈",
    title: "Five",
    subtitle: "EVENTS",
    description: "Five flagship challenges including AI hackathons, coding battles, project expos, marketing pitches, and tech escape puzzles.",
    color: "cyan",
  },
  {
    icon: "⬡",
    title: "AI + TECH",
    subtitle: "INNOVATION",
    description: "Explore AI prompt engineering, prototype building, competitive coding, and problem-solving challenges.",
    color: "magenta",
  },
  {
    icon: "◇",
    title: "SKILL",
    subtitle: "SHOWCASE",
    description: "Test creativity, logic, strategy, and technical skills through diverse competitive events.",
    color: "green",
  },
  {
    icon: "△",
    title: "TECH ERA",
    subtitle: "3.0",
    description: "A multi-event tech fest bringing together innovation, competition, and futuristic thinking.",
    color: "cyan",
  },
];