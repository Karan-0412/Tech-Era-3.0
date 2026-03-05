import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { SPONSORS, Sponsor } from "@/data/sponsors";

const SponsorCard = ({ sponsor, index }: { sponsor: Sponsor; index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const tierColors = {
    Platinum: "border-primary/50 text-primary shadow-[0_0_15px_rgba(var(--primary),0.2)]",
    Gold: "border-secondary/50 text-secondary shadow-[0_0_15px_rgba(var(--secondary),0.2)]",
    Silver: "border-accent/50 text-accent shadow-[0_0_15px_rgba(var(--accent),0.2)]",
  };

  return (
    <motion.a
      href={sponsor.url}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={`glass rounded-xl p-4 flex flex-col items-center justify-center gap-4 hover:scale-105 transition-all duration-300 border ${tierColors[sponsor.tier]}`}
    >
      <div className="w-full aspect-[2/1] relative overflow-hidden flex items-center justify-center p-2 bg-white/5 rounded-lg">
        <img 
          src={sponsor.logo} 
          alt={sponsor.name} 
          className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" 
        />
      </div>
      <div className="font-mono text-center">
        <div className="text-xs tracking-widest uppercase opacity-70 mb-1">{sponsor.tier}</div>
        <div className="text-sm font-bold text-foreground">{sponsor.name}</div>
      </div>
    </motion.a>
  );
};

const SponsorsSection = () => {
  const titleRef = useRef(null);
  const titleInView = useInView(titleRef, { once: true });

  const tiers = ["Platinum", "Gold", "Silver"] as const;

  return (
    <section id="sponsors" className="relative pt-6 sm:pt-12 pb-12 sm:pb-24 px-6 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <p className="font-mono text-sm text-primary tracking-[0.4em] mb-3 uppercase">
            // CORPORATE_PARTNERS
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            OUR <span className="text-primary">SPONSORS</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-12 sm:gap-16">
          {tiers.map((tier) => {
            const tierSponsors = SPONSORS.filter(s => s.tier === tier);
            if (tierSponsors.length === 0) return null;

            return (
              <div key={tier} className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className={`h-px flex-1 ${tier === 'Platinum' ? 'bg-primary/30' : tier === 'Gold' ? 'bg-secondary/30' : 'bg-accent/30'}`} />
                  <h3 className={`font-mono text-xl font-bold uppercase tracking-widest ${tier === 'Platinum' ? 'text-primary' : tier === 'Gold' ? 'text-secondary' : 'text-accent'}`}>
                    {tier} PARTNERS
                  </h3>
                  <div className={`h-px flex-1 ${tier === 'Platinum' ? 'bg-primary/30' : tier === 'Gold' ? 'bg-secondary/30' : 'bg-accent/30'}`} />
                </div>
                
                <div className={`grid gap-6 ${
                  tier === 'Platinum' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                    : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
                }`}>
                  {tierSponsors.map((sponsor, idx) => (
                    <SponsorCard key={sponsor.name} sponsor={sponsor} index={idx} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection;
