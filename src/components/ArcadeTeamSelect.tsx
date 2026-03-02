import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail, Trophy, Zap, Coffee, Code, MessageSquare, AlertTriangle, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  stats: {
    label: string;
    value: number;
    icon: React.ReactNode;
  }[];
  skills: {
    name: string;
    description: string;
    icon: string;
  }[];
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
    stats: [
      { label: "Coffee Dependency", value: 98, icon: <Coffee className="w-4 h-4" /> },
      { label: "Stack Overflow Speed", value: 85, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 12, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 92, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "React Refactoring Strike", description: "Instantly turns spaghetti into clean components.", icon: "⚔️" },
      { name: "Docker Container Slam", description: "Crushes environment inconsistencies with one command.", icon: "📦" },
    ],
    links: { github: "#", linkedin: "#", email: "alex@example.com" },
  },
  {
    id: 2,
    name: "Sarah 'The Stylist' Miller",
    role: "Senior UX Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    stats: [
      { label: "Pixel Perfectionism", value: 100, icon: <Zap className="w-4 h-4" /> },
      { label: "Figma Layer Hygiene", value: 95, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 45, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 15, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Auto-Layout Whirlwind", description: "Bends containers to her will across all viewports.", icon: "🌀" },
      { name: "Component Library Shield", description: "Defends against inconsistent branding.", icon: "🛡️" },
    ],
    links: { github: "#", linkedin: "#", email: "sarah@example.com" },
  },
  {
    id: 3,
    name: "Jordan 'The Juggler' Wu",
    role: "Full-Stack Dev / Chaos Manager",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
    stats: [
      { label: "Coffee Dependency", value: 75, icon: <Coffee className="w-4 h-4" /> },
      { label: "Stack Overflow Speed", value: 99, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 60, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 40, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Python Script of Doom", description: "Automates everything, including his breakfast.", icon: "🐍" },
      { name: "SQL Query Blast", description: "Joins tables that were never meant to be together.", icon: "🔥" },
    ],
    links: { github: "#", linkedin: "#", email: "jordan@example.com" },
  },
  {
    id: 4,
    name: "Elena 'The Enforcer' Rodriguez",
    role: "Backend Security Expert",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Elena",
    stats: [
      { label: "Firewall Fortitude", value: 96, icon: <Zap className="w-4 h-4" /> },
      { label: "Intrusion Detection", value: 89, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 5, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 75, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Encryption Shield", description: "Secures data with unbreakable algorithmic barriers.", icon: "🛡️" },
      { name: "Query Optimization Strike", description: "Slashes response times by 500%.", icon: "⚡" },
    ],
    links: { github: "#", linkedin: "#", email: "elena@example.com" },
  },
  {
    id: 5,
    name: "Hiroshi 'The Haiku' Sato",
    role: "Senior Frontend Developer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Hiroshi",
    stats: [
      { label: "CSS Wizardry", value: 99, icon: <Zap className="w-4 h-4" /> },
      { label: "Bundle Size Obsession", value: 92, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 30, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 20, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Animation Flow", description: "Creates interfaces smoother than silk.", icon: "✨" },
      { name: "Framework Jump", description: "Master of React, Vue, and the next big thing.", icon: "🦘" },
    ],
    links: { github: "#", linkedin: "#", email: "hiroshi@example.com" },
  },
  {
    id: 6,
    name: "Maya 'The Matrix' Williams",
    role: "Data Scientist",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
    stats: [
      { label: "Algorithm Insight", value: 100, icon: <Zap className="w-4 h-4" /> },
      { label: "Pattern Recognition", value: 95, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 15, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 65, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Neural Network Pulse", description: "Predicts user behavior before they even think.", icon: "🧠" },
      { name: "Visualization Nova", description: "Turns complex data into beautiful, actionable insights.", icon: "📊" },
    ],
    links: { github: "#", linkedin: "#", email: "maya@example.com" },
  },
  {
    id: 7,
    name: "Leo 'The Lightning' Kim",
    role: "DevOps Engineer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leo",
    stats: [
      { label: "Uptime Zealotry", value: 99, icon: <Zap className="w-4 h-4" /> },
      { label: "Pipeline Velocity", value: 94, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 10, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 85, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "CI/CD Storm", description: "Deploys code faster than the speed of light.", icon: "🌩️" },
      { name: "Cloud Infrastructure Wall", description: "Builds scalable systems that never fail.", icon: "☁️" },
    ],
    links: { github: "#", linkedin: "#", email: "leo@example.com" },
  },
  {
    id: 8,
    name: "Sophie 'The Spark' Dubois",
    role: "Motion Designer",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    stats: [
      { label: "Frame Precision", value: 98, icon: <Zap className="w-4 h-4" /> },
      { label: "Aesthetic Sense", value: 97, icon: <Code className="w-4 h-4" /> },
      { label: "Meeting Tolerance", value: 50, icon: <MessageSquare className="w-4 h-4" /> },
      { label: "Syntax Error Rage", value: 10, icon: <AlertTriangle className="w-4 h-4" /> },
    ],
    skills: [
      { name: "Keyframe Magic", description: "Brings static designs to vibrant life.", icon: "🎬" },
      { name: "Vibe Check", description: "Ensures every interaction feels 'just right'.", icon: "💎" },
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
      onMouseMove={isActive ? handleMouseMove : undefined}
      onMouseLeave={isActive ? handleMouseLeave : undefined}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      animate={{
        scale: isActive ? 1.1 : 0.8,
        opacity: isActive ? 1 : 0.4,
        filter: isActive ? "brightness(1.2) contrast(1.1)" : "brightness(0.5) grayscale(0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative w-[240px] h-[360px] md:w-64 md:h-96 cursor-pointer rounded-2xl overflow-hidden border-2 ${
        isActive ? "border-cyan-400 shadow-[0_0_30px_rgba(34,211,238,0.5)]" : "border-gray-800"
      } bg-black/80 backdrop-blur-xl group flex flex-col`}
    >
      {/* Glitch Overlay for Active Card */}
      {isActive && (
        <motion.div
          animate={{ opacity: [0, 0.1, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute inset-0 bg-cyan-400 z-10 pointer-events-none mix-blend-overlay"
        />
      )}

      {/* Background Neon Glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-950/50 to-transparent" />

      {/* Character Image */}
      <div className="flex-1 relative flex items-center justify-center p-4">
        <motion.img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-contain"
          style={{ translateZ: 50 }}
        />
      </div>

      {/* Name/Role Overlay */}
      <div className="p-4 bg-gradient-to-t from-black to-transparent">
        <h3 className="text-white font-mono text-lg font-bold truncate tracking-tight">{member.name}</h3>
        <p className="text-cyan-400 font-mono text-xs uppercase tracking-widest">{member.role}</p>

        {/* LinkedIn Connect Option */}
        <motion.a
          href={member.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 10 }}
          animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          whileHover={{ scale: 1.05 }}
          className="mt-3 flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-600/20 border border-blue-500/50 text-blue-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          <Linkedin className="w-4 h-4" />
          <span className="font-mono text-[10px] font-bold uppercase tracking-wider">Connect</span>
        </motion.a>
      </div>
    </motion.div>
  );
};

const StatBar = ({ label, value, icon, index }: { label: string; value: number; icon: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.1 * index }}
    className="space-y-1"
  >
    <div className="flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-wider">
      <div className="flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <span className={value > 90 ? "text-red-400 animate-pulse" : "text-cyan-400"}>
        {value}%
      </span>
    </div>
    <div className="h-2 w-full bg-gray-900 rounded-full overflow-hidden border border-gray-800">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, delay: 0.5 + 0.1 * index, ease: "easeOut" }}
        className={`h-full rounded-full ${
          value > 90 ? "bg-gradient-to-r from-red-500 to-orange-400" : "bg-gradient-to-r from-cyan-500 to-blue-500"
        } shadow-[0_0_10px_rgba(34,211,238,0.5)]`}
      />
    </div>
  </motion.div>
);

export const ArcadeTeamSelect = () => {
  const [activeIndex, setActiveIndex] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dragX = useMotionValue(0);
  const activeMember = TEAM_MEMBERS[activeIndex];

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

  return (
    <section className="relative min-h-screen bg-black py-12 md:py-20 px-4 overflow-hidden flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-16 space-y-2 z-10 px-4"
      >
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
          Select Your <span className="text-cyan-400">Warriors</span>
        </h2>
        <p className="text-gray-500 font-mono text-[10px] sm:text-sm uppercase tracking-[0.3em] sm:tracking-[0.5em]">
          Swipe to Choose • Insert Coin to Connect
        </p>
      </motion.div>

      {/* Main Container */}
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
        {/* Left Side: Stats Panel (Desktop) */}
        <div className="lg:col-span-3 order-2 lg:order-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6 bg-gray-950/50 p-6 rounded-2xl border border-gray-800/50 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="text-yellow-400 w-5 h-5" />
                <h3 className="font-mono text-white text-sm font-bold uppercase tracking-widest">Base Stats</h3>
              </div>
              <div className="space-y-4">
                {activeMember.stats.map((stat, i) => (
                  <StatBar key={stat.label} {...stat} index={i} />
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Center: Carousel */}
        <div className="lg:col-span-6 flex items-center justify-center gap-4 py-12 order-1 lg:order-2 overflow-visible relative">
           {/* Carousel Glow */}
           <div className="absolute inset-0 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Navigation Buttons (Desktop Only) */}
          <button
            onClick={handlePrev}
            className="hidden md:flex absolute left-0 md:-left-8 z-30 p-2 rounded-full border border-cyan-400/30 bg-black/40 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all group"
            aria-label="Previous member"
          >
            <ChevronLeft className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
          </button>

          {/* Swipeable Container */}
          <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={onDragEnd}
            style={{ x: dragX }}
            className="flex items-center justify-center gap-2 md:gap-4 relative touch-none"
          >
            {TEAM_MEMBERS.map((member, index) => (
              <div
                key={member.id}
                className={`transition-all duration-500 ease-out ${
                  index === activeIndex ? "z-20 scale-100" : "z-10 scale-75 -mx-12 md:-mx-16"
                }`}
              >
                <CharacterCard
                  member={member}
                  isActive={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                />
              </div>
            ))}
          </motion.div>

          {/* Right Navigation Button (Desktop Only) */}
          <button
            onClick={handleNext}
            className="hidden md:flex absolute right-0 md:-right-8 z-30 p-2 rounded-full border border-cyan-400/30 bg-black/40 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all group"
            aria-label="Next member"
          >
            <ChevronRight className="w-6 h-6 md:w-8 md:h-8 group-hover:scale-110 transition-transform" />
          </button>
        </div>

        {/* Right Side: Skills Panel */}
        <div className="lg:col-span-3 order-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeMember.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              className="space-y-6 bg-gray-950/50 p-6 rounded-2xl border border-gray-800/50 backdrop-blur-md"
            >
              <div className="flex items-center gap-2 mb-4">
                <Zap className="text-cyan-400 w-5 h-5" />
                <h3 className="font-mono text-white text-sm font-bold uppercase tracking-widest">Ultimate Moves</h3>
              </div>
              <div className="space-y-6">
                {activeMember.skills.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + 0.1 * i }}
                    className="relative group"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl group-hover:scale-125 transition-transform duration-300">{skill.icon}</span>
                      <div>
                        <h4 className="text-cyan-300 font-mono text-xs font-bold uppercase group-hover:text-white transition-colors">{skill.name}</h4>
                        <p className="text-gray-500 text-[10px] leading-relaxed mt-1">{skill.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summon Button */}
              <motion.div className="pt-6">
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-transparent border-2 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400 hover:text-black font-black uppercase italic tracking-tighter transition-all duration-300 group overflow-hidden relative"
                >
                  <motion.span
                    className="absolute inset-0 bg-cyan-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                  />
                  <span className="relative flex items-center gap-2">
                    SUMMON {activeMember.name.split("'")[1] || activeMember.name.split(" ")[0]}
                    <ExternalLink className="w-4 h-4" />
                  </span>
                </Button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Connection Portal (Modal) */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-gray-900 border-2 border-cyan-400 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.3)]"
            >
              <div className="p-8 space-y-8">
                <div className="text-center space-y-2">
                  <div className="inline-block p-4 rounded-full bg-cyan-400/10 mb-4">
                    <img src={activeMember.image} alt={activeMember.name} className="w-24 h-24" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Connection Portal</h2>
                  <p className="text-gray-400 font-mono text-xs uppercase">Establishing link with {activeMember.name}...</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <a href={activeMember.links.github} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Github className="w-6 h-6 text-white group-hover:text-cyan-400" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase">GitHub</span>
                  </a>
                  <a href={activeMember.links.linkedin} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Linkedin className="w-6 h-6 text-white group-hover:text-cyan-400" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase">LinkedIn</span>
                  </a>
                  <a href={`mailto:${activeMember.links.email}`} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-800/50 border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 transition-all group">
                    <Mail className="w-6 h-6 text-white group-hover:text-cyan-400" />
                    <span className="text-[10px] font-mono text-gray-400 uppercase">Email</span>
                  </a>
                </div>

                <Button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-cyan-400 hover:bg-cyan-500 text-black font-bold uppercase"
                >
                  Close Portal
                </Button>
              </div>

              {/* Decorative scanline effect */}
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
