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
      "Debates faster than Eminem raps.",
      "Argues so well that even Google starts doubting itself.",
      "Talks so smoothly even time listens."
    ],
    links: { github: "#", linkedin: "#", email: "sarah@example.com" },
  },
  {
    id: 3,
    name: "Gurmillan Singh",
    role: "Joint Secretary / Chaos Manager",
    image: "/Team-Members/Gurmillan.jpeg",
    funFacts: [
      "AI picks his outfits.",
      `"Secretary" sounds like a Naruto rank.`,
      "Lassi = pre-workout."
    ],
    links: { github: "#", linkedin: "#", email: "jordan@example.com" },
  },
  {
    id: 4,
    name: "Kaushik Chaurasiya",
    role: "Management Head",
    image: "/Team-Members/Kaushik.jpeg",
    funFacts: [
      "Professional meeting starter.",
      "Management = 90% vibes, 10% panic",
      "Solution to every problem: 'Let's have a meeting.'"
    ],
    links: { github: "#", linkedin: "#", email: "maya@example.com" },
  },
  {
    id: 5,
    name: "Sujal",
    role: "Operations Lead",
    image: "/Team-Members/Sujal.jpeg",
    funFacts: [
      "Street fighter",
      "Speaks 5 languages fluently.",
      "Runs operations like a military mission."
    ],
    links: { github: "#", linkedin: "#", email: "elena@example.com" },
  },
  {
    id: 6,
    name: "Prakhar Nautiyal",
    role: "Director of Logistics",
    image: "/Team-Members/Prakhar.jpeg",
    funFacts: [
      "Checklist level: NASA.",
      "Knows every cable and chair.",
      "If something is missing, blame logistics."
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 7,
    name: "Sakshi",
    role: "Documentation Head",
    image: "/Team-Members/Sakshi.jpeg",
    funFacts: [
      "Minutes longer than meetings.",
      "Turns tasks into documents.",
      "Probably documenting these facts."
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 8,
    name: "Kritika Ruhela",
    role: "Design Lead",
    image: "/Team-Members/Kritika.jpeg",
    funFacts: [
      "The vibe-check Authority",
      "Runs the design kingdom.",
      "Sees alignment issues no one else can."
    ],
    links: { github: "#", linkedin: "#", email: "leo@example.com" },
  },
  {
    id: 9,
    name: "Shivali",
    role: "Communication Director / PR Lead",
    image: "/Team-Members/Shivali.jpeg",
    funFacts: [
      "Turns chaos into PR.",
      "The Real Chaos Manager.",
      "Professional damage control."
    ],
    links: { github: "#", linkedin: "#", email: "sophie@example.com" },
  },
  {
    id: 10,
    name: "Vansh Bansal",
    role: "Sponsorship Head",
    image: "/Team-Members/Vansh.jpeg",
    funFacts: [
      "Pitches to anyone with WiFi.",
      "Favorite reply: 'We'll get back.'",
      "Got sponsor with one emoji — still no cash"
    ],
    links: { github: "#", linkedin: "#", email: "sophie@example.com" },
  }
];
