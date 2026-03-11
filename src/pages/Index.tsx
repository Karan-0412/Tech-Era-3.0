import { useState, useCallback, Suspense, lazy } from "react";
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
                  <TeamSection onRegister={handleRegister} />
                  <AboutSection />

                  {/* Team Showcase CTA moved to bottom of content */}
                  <div id="schedule">
                    <ScheduleTimeline />
                  </div>
                  <TerminalFooter />
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
                      <div className="mt-8 pt-6 border-t border-primary/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/apex-technowarriors/posts/?feedView=allap"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/apex_techno_warriors/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
            <a
              href="mailto:apex.techno.warriors@gmail.com"
              className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              apex.techno.warriors@gmail.com
            </a>
          </div>
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
