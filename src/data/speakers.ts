export interface Speaker {
  name: string;
  role: string;
  avatar: string;
}

export const SPEAKERS: Speaker[] = [
  { name: "Dr. Yuki Tanaka", role: "AI Research Lead, NeuraCorp", avatar: "YT" },
  { name: "Marcus Chen", role: "Founder, Quantum Labs", avatar: "MC" },
  { name: "Aria Volkov", role: "CTO, CyberShield", avatar: "AV" },
  { name: "Kai Okafor", role: "Head of Web3, MetaForge", avatar: "KO" },
  { name: "Luna Reyes", role: "VP Engineering, SynthOS", avatar: "LR" },
  { name: "Zane Patel", role: "Director, DeepMind X", avatar: "ZP" },
];
