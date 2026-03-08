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
    id: "1",
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
    id: "2",
    name: "InnovateX",
    description: "InnovateX is the innovation showcase of Tech Era 3.0 where students present working prototypes, AI systems, and technical solutions designed to solve real-world challenges and demonstrate creative engineering.",
    limit: 4,
    schedule: [
      { time: "09:00", title: "CHECK-IN", desc: "Project registration", day: "DAY 1" },
      { time: "10:00", title: "OPENING", desc: "Welcome to InnovateX showcase", day: "DAY 1" },
      { time: "11:00", title: "PROJECT DEMOS", desc: "Participants present prototypes", day: "DAY 1" },
      { time: "12:30", title: "Q&A SESSION", desc: "Judges interact with teams", day: "DAY 1" },
      { time: "14:00", title: "NETWORKING", desc: "Explore innovation booths", day: "DAY 1" },
    ],
  },
  {
    id: "3",
    name: "CodeRave",
    description: "CodeRave – Competitive Coding Championship : is the ultimate competitive coding showdown designed to test participants on core DSA concepts, speed-based implementation, and real-time logical thinking under pressure. The event gradually increases in difficulty across three elimination rounds, ensuring only the most consistent and strategic teams reach the finale.",
    limit: 4,
    schedule: [
      { time: "09:00", title: "WELCOME", desc: "Competition briefing", day: "DAY 1" },
      { time: "09:30", title: "ROUND 1", desc: "Algorithmic challenge begins", day: "DAY 1" },
      { time: "11:00", title: "ROUND 2", desc: "Advanced problem solving", day: "DAY 1" },
      { time: "13:00", title: "BREAK", desc: "Short refreshment break", day: "DAY 1" },
      { time: "14:00", title: "FINAL ROUND", desc: "High difficulty coding problems", day: "DAY 1" },
      { time: "16:00", title: "RESULTS", desc: "Top coders announced", day: "DAY 1" },
    ],
  },
  {
    id: "4",
    name: "Hack The Lock",
    description: "Hack the lock is a fast-paced escape room competition focused exclusively on coding and programming. Participants must solve technical programming challenges, debug code, analyze algorithms, and unlock digital clues to “escape” before time runs out. This event is designed to test logical thinking, computational skills, teamwork, and the ability to apply programming knowledge under pressure.",
    limit: 5,
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
  {
    id: "5",
    name: "Pitch & Pop",
    description: "Pitch & Pop is a fast-paced, multi-round competition that tests creativity, analytical thinking, and marketing skills. Participants tackle real-world business challenges through case studies, marketing strategies, and product promotion, showcasing their ability to ideate, plan, and execute innovative campaigns under pressure.",
    limit: 4,
    schedule: [
      { time: "09:00", title: "REGISTRATION", desc: "Team check-in & briefing", day: "DAY 1" },
      { time: "09:30", title: "ROUND 1", desc: "Case study analysis begins", day: "DAY 1" },
      { time: "11:30", title: "ROUND 2", desc: "Marketing strategy design", day: "DAY 1" },
      { time: "14:00", title: "BREAK", desc: "Networking & refreshments", day: "DAY 1" },
      { time: "15:00", title: "FINAL PITCH", desc: "Product campaign presentations", day: "DAY 1" },
      { time: "17:00", title: "RESULTS", desc: "Winners announcement", day: "DAY 1" },
    ],
  },
];