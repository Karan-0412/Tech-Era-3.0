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
      { time: "10:00 AM", title: "REGISTRATION", desc: "Registration of Participants", day: "DAY 1" },
      { time: "10:20 AM", title: "PROGRAM INTRO", desc: "Program Introduction by Stage Coordinator", day: "DAY 1" },
      { time: "10:25 AM", title: "EVENT BRIEFING", desc: "Briefing of Events & Competition Guidelines", day: "DAY 1" },
      { time: "10:30 AM", title: "HACKATHON LAUNCH", desc: "Hackathon Launch & Problem Statement Release", day: "DAY 1" },
      { time: "10:45 AM", title: "ROUND 1", desc: "Ideation & Problem Understanding", day: "DAY 1" },
      { time: "12:00 PM", title: "ROUND 2", desc: "Development Phase Begins", day: "DAY 1" },
      { time: "02:00 PM", title: "MENTORING", desc: "Team Mentoring & Prototype Development", day: "DAY 1" },
      { time: "08:00 PM", title: "DEV PHASE", desc: "Continuous Development Phase (Teams continue overnight)", day: "DAY 1" },
      { time: "10:30 AM", title: "DEV COMPLETE", desc: "Completion of Hackathon Development", day: "DAY 2" },
      { time: "10:30 AM", title: "ROUND 3", desc: "Hackathon Final Presentations", day: "DAY 2" },
      { time: "11:30 AM", title: "JURY EVALUATION", desc: "Jury Evaluation", day: "DAY 2" },
    ],
  },
  {
    id: "2",
    name: "InnovateX",
    description: "InnovateX is the innovation showcase of Tech Era 3.0 where students present working prototypes, AI systems, and technical solutions designed to solve real-world challenges and demonstrate creative engineering.",
    limit: 4,
    schedule: [
      { time: "10:00 AM", title: "REGISTRATION", desc: "Registration of Participants", day: "DAY 1" },
      { time: "10:20 AM", title: "PROGRAM INTRO", desc: "Program Introduction by Stage Coordinator", day: "DAY 1" },
      { time: "10:25 AM", title: "EVENT BRIEFING", desc: "Briefing of Events & Competition Guidelines", day: "DAY 1" },
      { time: "10:30 AM", title: "PROJECT SETUP", desc: "Project Setup by Participants", day: "DAY 1" },
      { time: "11:00 AM", title: "ROUND 1", desc: "Project Display & Demonstration", day: "DAY 1" },
      { time: "01:00 PM", title: "LUNCH BREAK", desc: "Lunch Break", day: "DAY 1" },
      { time: "02:00 PM", title: "ROUND 2", desc: "Technical Evaluation by Judges", day: "DAY 1" },
      { time: "04:00 PM", title: "SHORTLISTING", desc: "Shortlisting of Top Projects", day: "DAY 1" },
    ],
  },
  {
    id: "3",
    name: "CodeRave",
    description: "CodeRave \u2013 Competitive Coding Championship : is the ultimate competitive coding showdown designed to test participants on core DSA concepts, speed-based implementation, and real-time logical thinking under pressure. The event gradually increases in difficulty across three elimination rounds, ensuring only the most consistent and strategic teams reach the finale.",
    limit: 4,
    schedule: [
      { time: "10:30 AM", title: "BRIEFING", desc: "Participant Briefing", day: "DAY 2" },
      { time: "10:40 AM", title: "ROUND 1", desc: "Algorithmic Coding Challenge", day: "DAY 2" },
      { time: "12:00 PM", title: "ROUND 2", desc: "Advanced Coding Round", day: "DAY 2" },
      { time: "01:00 PM", title: "RESULTS", desc: "Result Compilation", day: "DAY 2" },
    ],
  },
  {
    id: "4",
    name: "Hack The Lock",
    description: "Hack the lock is a fast-paced escape room competition focused exclusively on coding and programming. Participants must solve technical programming challenges, debug code, analyze algorithms, and unlock digital clues to \u201Cescape\u201D before time runs out. This event is designed to test logical thinking, computational skills, teamwork, and the ability to apply programming knowledge under pressure.",
    limit: 5,
    schedule: [
      { time: "10:30 AM", title: "BRIEFING", desc: "Participant Briefing", day: "DAY 2" },
      { time: "10:40 AM", title: "ROUND 1", desc: "Logical Puzzle Round", day: "DAY 2" },
      { time: "11:30 AM", title: "ROUND 2", desc: "Debugging Challenge", day: "DAY 2" },
      { time: "12:15 PM", title: "ROUND 3", desc: "Final Escape Round", day: "DAY 2" },
      { time: "02:30 PM", title: "RESULTS", desc: "Result Compilation", day: "DAY 2" },
    ],
  },
  {
    id: "5",
    name: "Pitch & Pop",
    description: "Pitch & Pop is a fast-paced, multi-round competition that tests creativity, analytical thinking, and marketing skills. Participants tackle real-world business challenges through case studies, marketing strategies, and product promotion, showcasing their ability to ideate, plan, and execute innovative campaigns under pressure.",
    limit: 4,
    schedule: [
      { time: "10:00 AM", title: "REGISTRATION", desc: "Registration of Participants", day: "DAY 1" },
      { time: "10:20 AM", title: "PROGRAM INTRO", desc: "Program Introduction by Stage Coordinator", day: "DAY 1" },
      { time: "10:25 AM", title: "EVENT BRIEFING", desc: "Briefing of Events & Competition Guidelines", day: "DAY 1" },
      { time: "10:30 AM", title: "BRIEFING", desc: "Participant Briefing", day: "DAY 1" },
      { time: "10:40 AM", title: "ROUND 1", desc: "Product Ideation & Strategy Preparation", day: "DAY 1" },
      { time: "12:00 PM", title: "ROUND 2", desc: "Final Pitch Presentation", day: "DAY 1" },
      { time: "01:30 PM", title: "EVALUATION", desc: "Judges Evaluation", day: "DAY 1" },
    ],
  },
];