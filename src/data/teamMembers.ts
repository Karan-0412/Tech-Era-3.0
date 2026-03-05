export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  funFacts: string[];
  links: {
    github?: string;
    linkedin?: string;
    email?: string;
  };
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Umang Dokania",
    role: "Executive Director / Secretary",
    image: "/Team-Members/Umang.jpeg",
    funFacts: [
      "Has more apetite than the whole team.",
      "Bihar's GDP is 40% of his lunch.",
      `Only worries if the budget covers "Litti Chokha" or not.`
    ],
    links: { github: "#", linkedin: "#", email: "alex@example.com" },
  },
  {
    id: 2,
    name: "V S Aarsha",
    role: "Joint Secretary",
    image: "/Team-Members/Aarsha.jpeg",
    funFacts: [
      "Obsessed with perfect kerning.",
      "Once designed a logo in 5 minutes.",
      "Owns 50 pairs of cool sneakers."
    ],
    links: { github: "#", linkedin: "#", email: "sarah@example.com" },
  },
  {
    id: 3,
    name: "Gurmillan Singh",
    role: "Joint Secretary / Chaos Manager",
    image: "/Team-Members/Gurmillan.jpeg",
    funFacts: [
      "Trained a model to pick his outfits.",
      `Thinks "Secretary" is a Naruto rank.`,
      "Drinks Lassi as pre-workout."
    ],
    links: { github: "#", linkedin: "#", email: "jordan@example.com" },
  },
  {
    id: 4,
    name: "Kaushik Chaurasiya",
    role: "Management Head",
    image: "/Team-Members/Kaushik.jpeg",
    funFacts: [
      "Sees patterns in static noise.",
      "Trained a model to pick her outfits.",
      "Has a pet owl named 'Logic'."
    ],
    links: { github: "#", linkedin: "#", email: "maya@example.com" },
  },
  {
    id: 5,
    name: "Sujal",
    role: "Operations Lead",
    image: "/Team-Members/Sujal.jpeg",
    funFacts: [
      "Found a zero-day in her toaster.",
      "Speaks 5 languages fluently.",
      "Black belt in Brazilian Jiu-Jitsu."
    ],
    links: { github: "#", linkedin: "#", email: "elena@example.com" },
  },
  {
    id: 6,
    name: "Prakhar Nautiyal",
    role: "Director of Logistics",
    image: "/Team-Members/Prakhar.jpeg",
    funFacts: [
      "Once wrote a whole app in one file.",
      "Loves minimalist architecture.",
      "Makes the best sushi in town."
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 7,
    name: "Sakshi",
    role: "Documentation Head",
    image: "/Team-Members/Sakshi.jpeg",
    funFacts: [
      "Once wrote a whole app in one file.",
      "Loves minimalist architecture.",
      "Makes the best sushi in town."
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 8,
    name: "Kritika Ruhela",
    role: "Design Lead",
    image: "/Team-Members/Kritika.jpeg",
    funFacts: [
      "Once reached 1000 days of uptime.",
      "Built his own server rack out of LEGO.",
      "Fastest typist in the company."
    ],
    links: { github: "#", linkedin: "#", email: "leo@example.com" },
  },
  {
    id: 9,
    name: "Shivali",
    role: "Communication Director / PR Lead",
    image: "/Team-Members/Shivali.jpeg",
    funFacts: [
      "Can animate with her eyes closed.",
      "Has a collection of vintage film cameras.",
      "Always has a sketchbook in hand."
    ],
    links: { github: "#", linkedin: "#", email: "sophie@example.com" },
  },
];
