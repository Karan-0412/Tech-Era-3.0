export interface Sponsor {
  name: string;
  logo: string;
  url?: string;
  color?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "TechNova Solutions",
    logo: "/sponsors-logo/gfg.png",
    url: "https://technova.example.com",
    color: "#06b6d4",
  },
  {
    name: "CyberCore Systems",
    logo: "https://placehold.co/400x160/000000/3b82f6/png?text=CyberCore",
    url: "https://cybercore.example.com",
    color: "#3b82f6",
  },
  {
    name: "Quantum Dynamics",
    logo: "https://placehold.co/300x120/000000/d946ef/png?text=Quantum",
    url: "https://quantum.example.com",
    color: "#d946ef",
  }
];
