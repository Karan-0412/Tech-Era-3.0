export interface Sponsor {
  name: string;
  tier: "Platinum" | "Gold" | "Silver" | "Startup";
  logo: string;
  url?: string;
  color?: string;
}

export const SPONSORS: Sponsor[] = [
  // PLATINUM (Tier 1) - Massive presence
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
  
  // GOLD (Tier 2) - Large presence
  {
    name: "Quantum Dynamics",
    tier: "Gold",
    logo: "https://placehold.co/300x120/000000/d946ef/png?text=Quantum",
    url: "https://quantum.example.com",
    color: "#d946ef",
  },
  {
    name: "Aether Grid",
    tier: "Gold",
    logo: "https://placehold.co/300x120/000000/a855f7/png?text=Aether",
    url: "https://aether.example.com",
    color: "#a855f7",
  },
  {
    name: "Zenith AI",
    tier: "Gold",
    logo: "https://placehold.co/300x120/000000/ec4899/png?text=Zenith",
    url: "https://zenith.example.com",
    color: "#ec4899",
  },

  // SILVER (Tier 3) - Medium presence
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
  {
    name: "SyncPoint",
    tier: "Silver",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=SyncPoint",
    url: "https://syncpoint.example.com",
  },
  {
    name: "DataForge",
    tier: "Silver",
    logo: "https://placehold.co/200x80/000000/FFFFFF/png?text=DataForge",
    url: "https://dataforge.example.com",
  },

  // STARTUP (Tier 4) - Small/Dense presence
  {
    name: "PixelPulse",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=PixelPulse",
    url: "https://pixelpulse.example.com",
  },
  {
    name: "CodeCraft",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=CodeCraft",
    url: "https://codecraft.example.com",
  },
  {
    name: "OrbitX",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=OrbitX",
    url: "https://orbitx.example.com",
  },
  {
    name: "Vortex Labs",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=Vortex",
    url: "https://vortex.example.com",
  },
  {
    name: "Echo Systems",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=Echo",
    url: "https://echo.example.com",
  },
  {
    name: "Spark Digital",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=Spark",
    url: "https://spark.example.com",
  },
  {
    name: "Lumina",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=Lumina",
    url: "https://lumina.example.com",
  },
  {
    name: "Astra",
    tier: "Startup",
    logo: "https://placehold.co/150x60/000000/888888/png?text=Astra",
    url: "https://astra.example.com",
  },
];
