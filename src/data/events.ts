export interface Event {
  id: string;
  name: string;
  description: string;
  limit: number;
  schedule: Array<{
    time: string;
    title: string;
    desc: string;
    day: string;
  }>;
}

export const EVENTS: Event[] = [
  {
    id: "TE-1",
    name: "Neural Nexus",
    description: "Neural Nexus is a high-intensity Prompt Engineering Hackathon where participants design structured AI solutions to solve real-world problems. Teams compete through innovation, reasoning depth, and optimization skills to build impactful AI-driven outputs.",
    limit: 4,
    schedule: [
      { time: "09:00", title: "GATES OPEN", desc: "Registration & neural sync", day: "DAY 1" },
      { time: "10:00", title: "KEYNOTE", desc: "The Future of AGI — Dr. Yuki Tanaka", day: "DAY 1" },
      { time: "13:00", title: "WORKSHOP", desc: "Building with Quantum APIs", day: "DAY 1" },
      { time: "16:00", title: "PANEL", desc: "Ethics in AI: The Next Frontier", day: "DAY 1" },
      { time: "09:00", title: "HACKATHON BEGINS", desc: "48-hour build sprint kicks off", day: "DAY 2" },
      { time: "14:00", title: "DEEP DIVE", desc: "Zero-Knowledge Proofs in Practice", day: "DAY 2" },
      { time: "18:00", title: "AFTERPARTY", desc: "Neon Night — Live DJ & networking", day: "DAY 2" },
      { time: "15:00", title: "DEMO DAY", desc: "Hackathon finalists present", day: "DAY 3" },
    ],
  },
  {
    id: "TE-2",
    name: "InnovateX",
    description: "InnovateX is the innovation showcase of Tech Era 3.0 where students present working prototypes, AI systems, and technical solutions designed to solve real-world challenges and demonstrate creative engineering.",
    limit: 1,
    schedule: [
      { time: "09:00", title: "CHECK-IN", desc: "Project registration", day: "DAY 1" },
      { time: "10:00", title: "OPENING", desc: "Welcome to InnovateX showcase", day: "DAY 1" },
      { time: "11:00", title: "PROJECT DEMOS", desc: "Participants present prototypes", day: "DAY 1" },
      { time: "12:30", title: "Q&A SESSION", desc: "Judges interact with teams", day: "DAY 1" },
      { time: "14:00", title: "NETWORKING", desc: "Explore innovation booths", day: "DAY 1" },
    ],
  },
  {
    id: "TE-3",
    name: "CodeRave",
    description: "CodeRave is the ultimate competitive coding championship where participants tackle algorithmic challenges, data structures, and optimization problems while racing against time to demonstrate speed, accuracy, and logical thinking.",
    limit: 2,
    schedule: [
      { time: "09:00", title: "WELCOME", desc: "Competition briefing", day: "DAY 1" },
      { time: "09:30", title: "ROUND 1", desc: "Algorithmic challenge begins", day: "DAY 1" },
      { time: "11:00", title: "ROUND 2", desc: "Advanced problem solving", day: "DAY 1" },
      { time: "13:00", title: "BREAK", desc: "Short refreshment break", day: "DAY 1" },
      { time: "14:00", title: "FINAL ROUND", desc: "High difficulty coding problems", day: "DAY 2" },
      { time: "16:00", title: "RESULTS", desc: "Top coders announced", day: "DAY 2" },
    ],
  },
  {
    id: "TE-4",
    name: "Hack The Lock",
    description: "Hack The Lock is a technical escape challenge where teams solve logic puzzles, cryptographic clues, and algorithmic problems to unlock layers of digital mysteries within a limited time.",
    limit: 3,
    schedule: [
      { time: "08:00", title: "BRIEFING", desc: "Challenge rules explained", day: "DAY 1" },
      { time: "09:00", title: "LOCKDOWN START", desc: "Teams begin solving puzzles", day: "DAY 1" },
      { time: "12:00", title: "MID CHECK", desc: "Hint release & progress review", day: "DAY 1" },
      { time: "15:00", title: "CRYPTO PUZZLES", desc: "Advanced encrypted challenges", day: "DAY 1" },
      { time: "09:00", title: "FINAL STAGE", desc: "Last layer of the escape system", day: "DAY 2" },
      { time: "14:00", title: "SUBMISSIONS", desc: "Final unlock attempts", day: "DAY 2" },
      { time: "16:00", title: "WINNERS", desc: "Teams who escaped announced", day: "DAY 3" },
    ],
  },
];