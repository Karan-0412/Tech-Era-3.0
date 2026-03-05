import { useState, useCallback, Suspense, lazy, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import HeroScreen from "@/components/HeroScreen";
import MissionBriefing from "@/components/MissionBriefing";
import AboutSection from "@/components/AboutSection";
import ZeroGravitySponsors from "@/components/ZeroGravitySponsors";
import { Link, useSearchParams } from "react-router-dom";
import TeamSection from "@/components/TeamSection";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import TerminalFooter from "@/components/TerminalFooter";

// Lazy load heavy components
const MeshBackground = lazy(() => import("@/components/MeshBackground"));
const TerminalOverlay = lazy(() => import("@/components/TerminalOverlay"));

// Module-level variables to preserve state across component re-mounts (while not refreshing)
let sessionBooted = false;
let sessionUnlocked = false;

const Index = () => {
  const [searchParams] = useSearchParams();
  const skipBoot = searchParams.get("unlocked") === "true";

  // Initialize state from session variables or search parameters
  const [booted, setBooted] = useState(sessionBooted || skipBoot);
  const [unlocked, setUnlocked] = useState(sessionUnlocked || skipBoot);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Sync state changes to session variables
  const handleBootComplete = useCallback(() => {
    setBooted(true);
    sessionBooted = true;
  }, []);
  const handleUnlock = useCallback(() => {
    setUnlocked(true);
    sessionUnlocked = true;
  }, []);
  const handleRegister = useCallback(() => setTerminalOpen(true), []);
  const handleOpenTerminal = useCallback(() => setTerminalOpen(true), []);
  const handleCloseTerminal = useCallback(() => setTerminalOpen(false), []);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {!booted ? (
          <BootSequence key="boot" onComplete={handleBootComplete} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <Suspense fallback={null}>
              <MeshBackground />
            </Suspense>
            <main className="relative z-10">
              {!unlocked && <HeroScreen onUnlock={handleUnlock} />}
              {unlocked && (
                <>
                  <MissionBriefing visible={unlocked} onRegister={handleRegister} />
                  <ZeroGravitySponsors />
                  <AboutSection />

                  {/* Team Showcase CTA moved to bottom of content */}

                  <TeamSection onRegister={handleRegister} />
                  <div id="schedule">
                    <ScheduleTimeline />
                  </div>
                  <TerminalFooter onOpenTerminal={handleOpenTerminal} />
                  {/* Team Showcase CTA (Meet the Legends) - moved here to bottom */}
                  <section className="py-4 px-4 flex flex-col items-center justify-center text-center bg-black/40 backdrop-blur-sm border-y border-white/5">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="max-w-2xl space-y-4"
                    >
                      <div className="space-y-1">
                        <h2 className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase italic">
                          Meet the <span className="text-cyan-400 text-glow-cyan">Legends</span>
                        </h2>
                        <p className="font-mono text-[10px] text-gray-500 uppercase tracking-[0.4em]">
                          THE_WARRIORS_BEHIND_TECH_ERA
                        </p>
                      </div>

                      <p className="text-gray-400 text-sm leading-relaxed max-w-lg mx-auto">
                        Explore our elite warriors, each bringing unique ultimate moves to the battlefield of innovation.
                      </p>

                      <Link
                        to="/team"
                        className="inline-flex items-center gap-2 px-5 py-2 bg-transparent border-2 border-cyan-400/50 text-cyan-400 text-xs hover:bg-cyan-400 hover:text-black font-black uppercase italic tracking-widest transition-all duration-300 group rounded-md shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_40px_rgba(34,211,238,0.5)]"
                      >
                        VIEW TEAM APEX
                        <span className="text-sm group-hover:translate-x-2 transition-transform">→</span>
                      </Link>
                      <div className="mt-6 pt-4 border-t border-primary/10 flex flex-col items-center gap-4">
                      <div className="flex gap-8">
                        {["TWITTER", "DISCORD", "GITHUB"].map((link) => (
                          <a
                            key={link}
                            href="#"
                            className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.3em] font-medium"
                          >
                            {link}
                          </a>
                        ))}
                      </div>
                      <p className="font-mono text-[10px] text-muted-foreground/40 tracking-widest uppercase text-center">
                        © TECH ERA 3.0 • POWERED BY APEX TECHNO WARRIORS • SYSTEM_STABLE
                      </p>
                    </div>
                    </motion.div>
                  </section>

                  
                </>
              )}
            </main>
          </motion.div>
        )}
      </AnimatePresence>
      <Suspense fallback={null}>
        <TerminalOverlay open={terminalOpen} onClose={handleCloseTerminal} />
      </Suspense>
    </div>
  );
};

export default Index;
