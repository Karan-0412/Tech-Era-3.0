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
    title: "3 DAYS",
    subtitle: "RUNTIME",
    description: "72 hours of non-stop innovation, workshops, and networking across 4 stages.",
    color: "cyan",
  },
  {
    icon: "⬡",
    title: "120+",
    subtitle: "SPEAKERS",
    description: "Industry pioneers in AI, Web3, quantum computing, and cybersecurity.",
    color: "magenta",
  },
  {
    icon: "◇",
    title: "5,000",
    subtitle: "NODES",
    description: "Connect with developers, founders, and visionaries from 60+ countries.",
    color: "green",
  },
  {
    icon: "△",
    title: "48HR",
    subtitle: "HACKATHON",
    description: "Build the future in our flagship hackathon with $500K in prizes.",
    color: "cyan",
  },
];
