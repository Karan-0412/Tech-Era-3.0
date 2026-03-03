import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail, Trophy, Zap, Coffee, Code, MessageSquare, AlertTriangle, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
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

const TEAM_MEMBERS: TeamMember[] = [
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

const CharacterCard = ({ member, isActive, onClick }: { member: TeamMember; isActive: boolean; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 150, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!isActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      layout
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? "brightness(1) contrast(1) blur(0px)" : "brightness(0.4) contrast(0.8) blur(2px)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative w-[260px] h-[440px] md:w-72 md:h-[500px] cursor-pointer rounded-3xl overflow-hidden border-2 shrink-0 ${
        isActive ? "border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.4)]" : "border-gray-800"
      } bg-black/90 backdrop-blur-xl group flex flex-col transition-all duration-300`}
    >
      {/* Active Card Effects */}
      {isActive && (
        <>
          <motion.div
            animate={{ opacity: [0, 0.05, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="absolute inset-0 bg-cyan-400 z-10 pointer-events-none mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/40 to-transparent z-0" />
        </>
      )}

      {/* Character Image */}
      <div className="h-40 md:h-48 relative flex items-center justify-center p-4 z-10">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-contain"
          style={{ translateZ: 50 }}
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 p-5 flex flex-col gap-4 relative z-20">
        <div className="space-y-1">
          <h3 className="text-white font-mono text-lg font-bold tracking-tight leading-tight">{member.name}</h3>
          <p className="text-cyan-400 font-mono text-[10px] uppercase tracking-widest font-semibold">{member.role}</p>
        </div>

        {/* Fun Facts Section */}
        <div className="space-y-2 bg-gray-900/50 p-3 rounded-xl border border-cyan-500/20">
          <p className="text-[10px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Quote className="w-3 h-3" /> Fun Facts
          </p>
          <ul className="space-y-1">
            {member.funFacts.map((fact, i) => (
              <li key={i} className="text-[10px] text-gray-300 leading-tight flex items-start gap-1.5">
                <span className="text-cyan-500 mt-1">•</span>
                {fact}
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons - Only visible when active */}
        <motion.div 
          animate={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
          className="mt-auto space-y-2"
        >
          <motion.a
            href={member.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300 shadow-[0_0_15px_rgba(37,99,235,0.2)]"
          >
            <Linkedin className="w-4 h-4" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Connect</span>
          </motion.a>
          
          <Button
            size="sm"
            className="w-full h-9 bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase italic tracking-widest rounded-xl text-[10px]"
            onClick={(e) => {
              e.stopPropagation();
              // Summon logic could be handled here or via a shared state
              window.dispatchEvent(new CustomEvent('summon-warrior', { detail: member }));
            }}
          >
            SUMMON
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export const ArcadeTeamSelect = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const activeMember = TEAM_MEMBERS[activeIndex];

  useEffect(() => {
    const handleSummon = (e: any) => {
      setSelectedMember(e.detail);
      setIsModalOpen(true);
    };
    window.addEventListener('summon-warrior', handleSummon);
    return () => window.removeEventListener('summon-warrior', handleSummon);
  }, []);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  };

  const onDragEnd = (event: any, info: any) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      handleNext();
    } else if (info.offset.x > threshold) {
      handlePrev();
    }
  };

  const cardWidth = 260; // Mobile width
  const cardGap = 20;    // Mobile gap
  const desktopCardWidth = 288;
  const desktopCardGap = 40;

  return (
    <section className="relative min-h-screen bg-black py-12 md:py-20 px-4 overflow-hidden flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-10 md:mb-16 space-y-2 z-10 px-4"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
          Select Your <span className="text-cyan-400 text-glow-cyan">Warriors</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] sm:text-xs uppercase tracking-[0.4em] sm:tracking-[0.6em]">
          Swipe or Click to Focus • Insert Coin to Connect
        </p>
      </motion.div>

      {/* Main Layout Container - Centered Cards Only */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        
        {/* Carousel Viewport */}
        <div className="w-full flex flex-col items-center justify-center relative h-[550px] md:h-[650px] overflow-visible">
           {/* Carousel Glow Background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-xl bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Navigation Buttons (Desktop Only) */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-4 z-30 p-3 rounded-full border border-cyan-400/30 bg-black/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all group shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Swipeable Viewport */}
          <div className="w-full h-full overflow-hidden flex items-center justify-center relative touch-none">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              animate={{
                // Formula to center index 'activeIndex':
                // Displacement = ((N-1)/2 - activeIndex) * (cardWidth + cardGap)
                x: `calc((${TEAM_MEMBERS.length - 1} / 2 - ${activeIndex}) * (var(--card-width) + var(--card-gap)))`
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              style={{
                "--card-width": "260px",
                "--card-gap": "20px",
                display: "flex",
                alignItems: "center",
                gap: "var(--card-gap)",
                cursor: "grab"
              } as any}
              className="md:[--card-width:288px] md:[--card-gap:40px]"
            >
              {TEAM_MEMBERS.map((member, index) => (
                <CharacterCard
                  key={member.id}
                  member={member}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              ))}
            </motion.div>
          </div>

          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-4 z-30 p-3 rounded-full border border-cyan-400/30 bg-black/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all group shadow-[0_0_20px_rgba(34,211,238,0.2)]"
            aria-label="Next member"
          >
            <ChevronRight className="w-8 h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Pagination Indicators */}
          <div className="flex gap-3 mt-6 md:mt-10 z-10">
            {TEAM_MEMBERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === activeIndex ? "w-10 bg-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]" : "w-3 bg-gray-800 hover:bg-gray-700"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Connection Portal (Modal) */}
      <AnimatePresence>
        {isModalOpen && selectedMember && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 40 }}
              className="relative w-full max-w-lg bg-gray-900 border-2 border-cyan-400 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(34,211,238,0.4)]"
            >
              <div className="p-8 md:p-12 space-y-10">
                <div className="text-center space-y-4">
                  <div className="inline-block p-6 rounded-full bg-cyan-400/10 mb-2 shadow-inner border border-cyan-400/20">
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-28 h-28" />
                  </div>
                  <div className="space-y-1">
                    <h2 className="text-4xl font-black text-white uppercase italic tracking-tighter">Connection Portal</h2>
                    <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">Establishing link with {selectedMember.name}...</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 md:gap-6">
                  <a href={selectedMember.links.github} className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Github className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">GitHub</span>
                  </a>
                  <a href={selectedMember.links.linkedin} className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Linkedin className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">LinkedIn</span>
                  </a>
                  <a href={`mailto:${selectedMember.links.email}`} className="flex flex-col items-center gap-3 p-5 rounded-3xl bg-white/5 border border-white/5 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Mail className="w-8 h-8 text-white group-hover:text-cyan-400 transition-colors" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider">Email</span>
                  </a>
                </div>

                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full py-6 bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase tracking-widest rounded-2xl"
                >
                  Terminate Connection
                </Button>
              </div>

              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Retro Grid Background */}
      <div
        className="absolute inset-0 -z-10 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #1f2937 1px, transparent 1px), linear-gradient(to bottom, #1f2937 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 80%)",
        }}
      />
    </section>
  );
};

export default ArcadeTeamSelect;
