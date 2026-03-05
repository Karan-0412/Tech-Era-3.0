import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { EVENT_SPECS } from "@/data/eventData";

const textColorMap = {
  cyan: "text-primary",
  magenta: "text-secondary",
  green: "text-accent",
};

const borderColorMap = {
  cyan: "border-primary/50",
  magenta: "border-secondary/50",
  green: "border-accent/50",
};

const SpecCard = ({ spec, index }: { spec: typeof EVENT_SPECS[0]; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotateX: 10 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ type: "spring", stiffness: 80, delay: index * 0.15 }}
      className={`rounded-xl p-6 hover:scale-[1.02] transition-all duration-300 border-2 backdrop-blur-md bg-black/40 ${borderColorMap[spec.color]} hover:border-opacity-100 border-opacity-70`}
    >
      <div className={`text-3xl mb-3 ${textColorMap[spec.color]}`}>
        {spec.icon}
      </div>
      <div className="font-mono text-2xl font-bold text-foreground mb-0.5">
        {spec.title}
      </div>
      <div className={`font-mono text-sm tracking-widest ${textColorMap[spec.color]} mb-3`}>
        {spec.subtitle}
      </div>
      <p className="text-base text-muted-foreground leading-relaxed">
        {spec.description}
      </p>
    </motion.div>
  );
};

const AboutSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  return (
    <section className="relative pt-6 sm:pt-12 pb-12 sm:pb-24 px-6">
      <motion.div
        ref={titleRef}
        initial={{ opacity: 0, y: 20 }}
        animate={titleInView ? { opacity: 1, y: 0 } : {}}
        className="text-center mb-16"
      >
        <p className="font-mono text-sm text-primary tracking-[0.4em] mb-3">
          // SYSTEM_SPECS
        </p>
        <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
          EVENT <span className="text-primary">OVERVIEW</span>
        </h2>
      </motion.div>

      <div className="max-w-lg mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EVENT_SPECS.map((spec, i) => (
          <SpecCard key={spec.title} spec={spec} index={i} />
        ))}
      </div>
    </section>
  );
};

export default AboutSection;
