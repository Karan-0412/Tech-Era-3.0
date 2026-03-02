import { useRef, useEffect, useState, memo } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring } from "framer-motion";

/* ── Main Component ─────────────────────────────────── */
interface MissionBriefingProps {
  visible: boolean;
  onRegister: () => void;
}

const EVENT_DATE = new Date("2026-03-15T09:00:00");

const calculateTimeLeft = () => {
  const now = new Date().getTime();
  const distance = EVENT_DATE.getTime() - now;

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return { days, hours, minutes, seconds };
};

const formatNumber = (value: number) => value.toString().padStart(2, "0");

// Isolated countdown timer component to prevent parent re-renders
const CountdownTimer = memo(() => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex items-end justify-center gap-2 sm:gap-3 rounded-full border border-primary/40 bg-black/40 px-4 py-3 sm:px-6 sm:py-3.5 shadow-[0_10px_40px_rgba(6,182,212,0.35)] overflow-hidden">
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/15 to-cyan-500/0"
      />
      {[
        { label: "Days", value: timeLeft.days },
        { label: "Hrs", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
      ].map((item, index, arr) => (
        <div key={item.label} className="flex items-end gap-2 sm:gap-3">
          <div className="flex flex-col items-center min-w-[2.4ch]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={item.value}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{
                  duration: 0.2,
                  ease: [0.22, 0.61, 0.36, 1],
                }}
                className="font-mono tabular-nums text-lg sm:text-2xl font-semibold text-cyan-300 leading-none"
              >
                {formatNumber(item.value)}
              </motion.span>
            </AnimatePresence>
            <span className="mt-1 text-[9px] sm:text-[10px] tracking-[0.22em] text-[#A0A6AD] uppercase">
              {item.label}
            </span>
          </div>
          {index < arr.length - 1 && (
            <span className="mb-3 text-sm sm:text-base text-[#4B5563]">:</span>
          )}
        </div>
      ))}
    </div>
  );
});

CountdownTimer.displayName = "CountdownTimer";

const MissionBriefing = ({ visible, onRegister }: MissionBriefingProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const cardX = useMotionValue(0);
  const cardY = useMotionValue(0);
  const smoothX = useSpring(cardX, { stiffness: 120, damping: 20, mass: 0.3 });
  const smoothY = useSpring(cardY, { stiffness: 120, damping: 20, mass: 0.3 });

  const handleCardMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (event.clientY - rect.top - rect.height / 2) / rect.height;
    cardX.set(x * 10);
    cardY.set(y * 10);
  };

  const handleCardMouseLeave = () => {
    cardX.set(0);
    cardY.set(0);
  };

  if (!visible) return null;

  return (
    <section
      ref={ref}
      className="relative min-h-[100dvh] flex items-start sm:items-center justify-start sm:justify-center pt-20 sm:py-16 px-4 sm:px-6 overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 0.61, 0.36, 1] }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#0b1020,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#020308_95%)]" />
        <div className="absolute -top-40 -left-40 w-80 h-80 rounded-full bg-cyan-200/5 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-[-4rem] w-96 h-96 rounded-full bg-indigo-400/8 blur-3xl" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--neon-cyan) / 0.6) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--neon-cyan) / 0.6) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="pointer-events-none absolute rounded-full bg-white/8"
          style={{
            width: 2,
            height: 2,
            left: `${10 + ((i * 7) % 80)}%`,
            top: `${15 + ((i * 9) % 70)}%`,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: [-6, 6, -6],
          }}
          transition={{
            duration: 18 + i,
            repeat: Infinity,
            ease: [0.22, 0.61, 0.36, 1],
            delay: i * 0.4,
          }}
        />
      ))}

      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center justify-center text-center gap-8 sm:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 0.61, 0.36, 1] }}
          className="inline-flex items-center gap-3 rounded-full border border-cyan-500/40 bg-cyan-500/5 px-4 py-1.5 backdrop-blur-md shadow-[0_0_32px_rgba(34,211,238,0.15)]"
        >
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-cyan-300">
            Hosted by Apex Techno Warriors
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ delay: 0.05, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="relative inline-block font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight leading-tight text-white"
        >
          <span className="relative z-10">
            <span className="font-semibold tracking-[0.08em]">TECH </span>
            <span className="bg-gradient-to-r from-indigo-200 via-indigo-300 to-indigo-100 bg-clip-text text-transparent font-semibold tracking-[0.12em]">
              ERA 3.0
            </span>
          </span>
          <span className="pointer-events-none absolute inset-x-[-14%] -inset-y-4 -z-10 rounded-full bg-[radial-gradient(circle_at_center,rgba(129,140,248,0.2),transparent_70%)]" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.12, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <CountdownTimer />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.16, duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
          className="w-full max-w-xs sm:max-w-sm"
        >
          <motion.button
            whileTap={{ scale: 0.96, y: 0 }}
            transition={{ duration: 0.18, ease: [0.22, 0.61, 0.36, 1] }}
            onClick={onRegister}
            className="group relative flex w-full items-center justify-center overflow-hidden rounded-full border border-cyan-400/50 bg-[radial-gradient(circle_at_top_left,#22d3ee_0,#1d1530_40%,#020617_85%)] px-7 py-3 sm:py-4 font-mono text-[11px] sm:text-xs font-semibold uppercase tracking-[0.32em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.9)]"
          >
            <motion.span
              aria-hidden
              initial={{ opacity: 0.4, x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: [0.22, 0.61, 0.36, 1],
              }}
              className="pointer-events-none absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-cyan-300/60 to-transparent"
            />
            <span className="absolute inset-0 border border-white/10 opacity-20 mix-blend-screen" />
            <span className="relative z-10 flex items-center gap-2.5">
              <span className="h-px w-4 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-cyan-300" />
              <span>Register now</span>
              <span className="text-[0.7rem] text-cyan-300">&#9658;&#9658;</span>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default MissionBriefing;
