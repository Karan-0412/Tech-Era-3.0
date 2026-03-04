import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Github, Linkedin, Mail, Trophy, Zap, Coffee, Code, MessageSquare, AlertTriangle, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TEAM_MEMBERS, TeamMember } from "@/data/teamMembers";

const CharacterCard = React.memo(({ member, isActive, onClick }: { member: TeamMember; isActive: boolean; onClick: () => void }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), { stiffness: 150, damping: 20 });

  const handleMouseMove = React.useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }, [isActive, x, y]);

  const handleMouseLeave = React.useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        willChange: "transform, opacity"
      }}
      animate={{
        scale: isActive ? 1 : 0.85,
        opacity: isActive ? 1 : 0.3,
        filter: isActive ? "brightness(1) contrast(1) blur(0px)" : "brightness(0.4) contrast(0.8) blur(2px)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.8 }}
      className={`relative w-[240px] md:w-72 cursor-pointer rounded-3xl overflow-hidden border-2 shrink-0 ${
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
      <div className="h-40 md:h-48 relative flex items-center justify-center p-6 z-10 bg-gradient-to-b from-cyan-900/20 to-transparent">
        <motion.img
          src={member.image}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]"
          style={{ translateZ: 50 }}
        />
      </div>

      {/* Info Section */}
      <div className="flex-1 p-5 flex flex-col gap-3 relative z-20 overflow-hidden">
        <div className="space-y-1">
          <h3 className="text-white font-mono text-base md:text-lg font-bold tracking-tight leading-tight truncate">{member.name}</h3>
          <p className="text-cyan-400 font-mono text-[9px] md:text-[10px] uppercase tracking-widest font-semibold truncate">{member.role}</p>
        </div>

        {/* Fun Facts Section */}
        <div className="space-y-2 bg-gray-900/50 p-3 rounded-xl border border-cyan-500/20">
          <p className="text-[9px] font-mono font-bold text-cyan-300 uppercase tracking-wider flex items-center gap-1.5">
            <Quote className="w-3 h-3" /> Fun Facts
          </p>
          <ul className="space-y-1.5">
            {member.funFacts.map((fact, i) => (
              <li key={i} className="text-[9px] md:text-[10px] text-gray-300 leading-tight flex items-start gap-1.5">
                <span className="text-cyan-500 mt-1 shrink-0">•</span>
                <span>{fact}</span>
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
});

CharacterCard.displayName = "CharacterCard";

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

  const handleNext = React.useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % TEAM_MEMBERS.length);
  }, []);

  const handlePrev = React.useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + TEAM_MEMBERS.length) % TEAM_MEMBERS.length);
  }, []);

  const onDragEnd = (event: any, info: any) => {
    const threshold = 50;
    const velocityThreshold = 500;

    if (info.offset.x < -threshold || info.velocity.x < -velocityThreshold) {
      handleNext();
    } else if (info.offset.x > threshold || info.velocity.x > velocityThreshold) {
      handlePrev();
    }
  };

  const cardWidth = 240; // Mobile width
  const cardGap = 20;    // Mobile gap
  const desktopCardWidth = 288;
  const desktopCardGap = 40;

  return (
    <section className="relative h-full bg-black py-6 md:py-8 px-4 overflow-auto flex flex-col items-center justify-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-center mb-8 md:mb-12 space-y-2 z-10 px-4"
      >
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tighter uppercase italic">
          Select Your <span className="text-cyan-400 text-glow-cyan">Warriors</span>
        </h2>
      </motion.div>

      {/* Main Layout Container - Centered Cards Only */}
      <div className="w-full max-w-7xl flex flex-col items-center justify-center">
        
        {/* Carousel Viewport */}
        <div className="w-full flex flex-col items-center justify-center relative h-auto min-h-[500px] md:min-h-[600px] py-10 overflow-visible">
           {/* Carousel Glow Background */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-xl bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

          {/* Navigation Buttons */}
          <div className="absolute left-1 md:left-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 group cursor-pointer" onClick={handlePrev}>
            <button
              className="p-1.5 md:p-3 rounded-full border border-cyan-400/30 bg-black/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95 group-hover:scale-110"
              aria-label="Previous member"
            >
              <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          </div>

          {/* Swipeable Viewport */}
          <div className="w-[calc(100%-70px)] md:w-full h-full overflow-hidden flex items-center justify-center relative touch-none select-none">
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              animate={{
                x: `calc((${TEAM_MEMBERS.length - 1} / 2 - ${activeIndex}) * (var(--card-width) + var(--card-gap)))`
              }}
              transition={{ type: "spring", stiffness: 250, damping: 25, mass: 0.5 }}
              style={{
                "--card-width": "240px",
                "--card-gap": "20px",
                display: "flex",
                alignItems: "center",
                gap: "var(--card-gap)",
                cursor: "grab",
                willChange: "transform"
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

          <div className="absolute right-1 md:right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2 group cursor-pointer" onClick={handleNext}>
            <button
              className="p-1.5 md:p-3 rounded-full border border-cyan-400/30 bg-black/60 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] active:scale-95 group-hover:scale-110"
              aria-label="Next member"
            >
              <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
            </button>
          </div>

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
                  className="w-full py-6 bg-cyan-400 hover:bg-cyan-500 text-black font-black uppercase tracking-wider rounded-2xl text-[10px] sm:text-xs"
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
