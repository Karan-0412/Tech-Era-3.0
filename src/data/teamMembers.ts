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
    name: "Alex 'The Architect' Chen",
    role: "Lead Systems Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    funFacts: [
      "Can debug code in his sleep.",
      "Has a mechanical keyboard collection.",
      "Coffee intake is measured in gallons."
    ],
    links: { github: "#", linkedin: "#", email: "alex@example.com" },
  },
  {
    id: 2,
    name: "Sarah 'The Stylist' Miller",
    role: "Senior UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    funFacts: [
      "Obsessed with perfect kerning.",
      "Once designed a logo in 5 minutes.",
      "Owns 50 pairs of cool sneakers."
    ],
    links: { github: "#", linkedin: "#", email: "sarah@example.com" },
  },
  {
    id: 3,
    name: "Jordan 'The Juggler' Wu",
    role: "Full-Stack Dev / Chaos Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    funFacts: [
      "Writes SQL queries for fun.",
      "Secretly a master of chess.",
      "Can juggle 5 items at once."
    ],
    links: { github: "#", linkedin: "#", email: "jordan@example.com" },
  },
  {
    id: 4,
    name: "Elena 'The Enforcer' Rodriguez",
    role: "Backend Security Expert",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    funFacts: [
      "Found a zero-day in her toaster.",
      "Speaks 5 languages fluently.",
      "Black belt in Brazilian Jiu-Jitsu."
    ],
    links: { github: "#", linkedin: "#", email: "elena@example.com" },
  },
  {
    id: 5,
    name: "Hiroshi 'The Haiku' Sato",
    role: "Senior Frontend Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
    funFacts: [
      "Once wrote a whole app in one file.",
      "Loves minimalist architecture.",
      "Makes the best sushi in town."
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 6,
    name: "Maya 'The Matrix' Williams",
    role: "Data Scientist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    funFacts: [
      "Sees patterns in static noise.",
      "Trained a model to pick her outfits.",
      "Has a pet owl named 'Logic'."
    ],
    links: { github: "#", linkedin: "#", email: "maya@example.com" },
  },
  {
    id: 7,
    name: "Leo 'The Lightning' Kim",
    role: "DevOps Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
    funFacts: [
      "Once reached 1000 days of uptime.",
      "Built his own server rack out of LEGO.",
      "Fastest typist in the company."
    ],
    links: { github: "#", linkedin: "#", email: "leo@example.com" },
  },
  {
    id: 8,
    name: "Sophie 'The Spark' Dubois",
    role: "Motion Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    funFacts: [
      "Can animate with her eyes closed.",
      "Has a collection of vintage film cameras.",
      "Always has a sketchbook in hand."
    ],
    links: { github: "#", linkedin: "#", email: "sophie@example.com" },
  },
];
