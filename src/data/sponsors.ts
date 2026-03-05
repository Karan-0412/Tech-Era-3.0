export interface Sponsor {
  name: string;
  tier: "Platinum" | "Gold" | "Silver";
  logo: string;
  url?: string;
}

export const SPONSORS: Sponsor[] = [
  {
    name: "TechNova Solutions",
    tier: "Platinum",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=TechNova",
    url: "https://technova.example.com",
  },
  {
    name: "CyberCore Systems",
    tier: "Gold",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=CyberCore",
    url: "https://cybercore.example.com",
  },
  {
    name: "Quantum Dynamics",
    tier: "Gold",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=Quantum",
    url: "https://quantum.example.com",
  },
  {
    name: "ByteStream Inc.",
    tier: "Silver",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=ByteStream",
    url: "https://bytestream.example.com",
  },
  {
    name: "Nebula Cloud",
    tier: "Silver",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=Nebula",
    url: "https://nebula.example.com",
  },
  {
    name: "FutureLogics",
    tier: "Silver",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=FutureLogics",
    url: "https://futurelogics.example.com",
  },
];
