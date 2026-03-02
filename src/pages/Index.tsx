import { useState, useCallback, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BootSequence from "@/components/BootSequence";
import HeroScreen from "@/components/HeroScreen";
import MissionBriefing from "@/components/MissionBriefing";
import AboutSection from "@/components/AboutSection";
import TeamSection from "@/components/TeamSection";
import ScheduleTimeline from "@/components/ScheduleTimeline";
import TerminalFooter from "@/components/TerminalFooter";

// Lazy load heavy components
const MeshBackground = lazy(() => import("@/components/MeshBackground"));
const SpeakerCarousel = lazy(() => import("@/components/SpeakerCarousel"));
const TerminalOverlay = lazy(() => import("@/components/TerminalOverlay"));

const Index = () => {
  const [booted, setBooted] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  const handleBootComplete = useCallback(() => setBooted(true), []);
  const handleUnlock = useCallback(() => setUnlocked(true), []);
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
                  <AboutSection />
                  <div id="speakers">
                    <Suspense fallback={null}>
                      <SpeakerCarousel />
                    </Suspense>
                  </div>
                  <TeamSection onRegister={handleRegister} />
                  <div id="schedule">
                    <ScheduleTimeline />
                  </div>
                  <TerminalFooter onOpenTerminal={handleOpenTerminal} />
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
