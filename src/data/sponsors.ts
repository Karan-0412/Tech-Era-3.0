export interface Sponsor {
  name: string;
  tier: "Platinum" | "Gold" | "Silver" | "Startup";
  logo: string;
  url?: string;
  color?: string;
}

export const SPONSORS: Sponsor[] = [
  // Keeping exactly 3 sponsors
  {
    name: "TechNova Solutions",
    tier: "Platinum",
    logo: "https://placehold.co/400x160/000000/06b6d4/png?text=TechNova",
    url: "https://technova.example.com",
    color: "#06b6d4",
  },
  {
    name: "CyberCore Systems",
    tier: "Platinum",
    logo: "https://placehold.co/400x160/000000/3b82f6/png?text=CyberCore",
    url: "https://cybercore.example.com",
    color: "#3b82f6",
  },
  {
    name: "Quantum Dynamics",
    tier: "Gold",
    logo: "https://placehold.co/300x120/000000/d946ef/png?text=Quantum",
    url: "https://quantum.example.com",
    color: "#d946ef",
  }
];
