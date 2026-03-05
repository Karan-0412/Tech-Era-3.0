import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPONSORS, Sponsor } from "@/data/sponsors";
import Matter from "matter-js";
import { useIsMobile } from "@/hooks/use-mobile";

const TIER_CONFIG = {
  Platinum: { size: 180, mass: 10, glow: "shadow-[0_0_30px_rgba(34,211,238,0.4)]", border: "border-primary/50" },
  Gold: { size: 140, mass: 6, glow: "shadow-[0_0_20px_rgba(217,70,239,0.3)]", border: "border-secondary/50" },
  Silver: { size: 100, mass: 3, glow: "shadow-[0_0_15px_rgba(255,255,255,0.2)]", border: "border-white/30" },
  Startup: { size: 75, mass: 1, glow: "shadow-[0_0_10px_rgba(255,255,255,0.1)]", border: "border-white/10" },
};

const ZeroGravitySponsors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const engineRef = useRef<Matter.Engine | null>(null);
  const requestRef = useRef<number>();
  const hoveredIdRef = useRef<string | null>(null);
  const isMobile = useIsMobile();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const sponsorsData = useMemo(() => SPONSORS, []);

  // Sync state and ref
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = containerRef.current.offsetWidth;
    const height = containerRef.current.offsetHeight;

    // Matter.js setup
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 0 },
    });
    engineRef.current = engine;

    // Create boundaries
    const thickness = 100;
    const walls = [
      Matter.Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
      Matter.Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
      Matter.Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true }),
    ];

    // Create sponsor bodies
    const bodies = sponsorsData.map((sponsor) => {
      const config = TIER_CONFIG[sponsor.tier];
      const size = isMobile ? config.size * 0.7 : config.size;
      const x = Math.random() * (width - size) + size / 2;
      const y = Math.random() * (height - size) + size / 2;

      const body = Matter.Bodies.circle(x, y, size / 2, {
        restitution: 0.7,
        frictionAir: 0.05,
        mass: config.mass,
        label: sponsor.name,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 3,
        y: (Math.random() - 0.5) * 3,
      });

      return body;
    });

    Matter.Composite.add(engine.world, [...walls, ...bodies]);

    // Mouse for repulsion
    const mouse = Matter.Mouse.create(containerRef.current);

    const update = () => {
      const allBodies = Matter.Composite.allBodies(engine.world).filter(b => !b.isStatic);
      const hoveredBody = allBodies.find(b => b.label === hoveredIdRef.current);

      allBodies.forEach(body => {
        // 1. Gentle floating force
        const forceMagnitude = 0.0001 * body.mass;
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude,
        });

        // 1.5. Center Attraction (Keeps them from wandering too far)
        const toCenter = Matter.Vector.sub({ x: width / 2, y: height / 2 }, body.position);
        const distCenter = Matter.Vector.magnitude(toCenter);
        if (distCenter > 50) {
          const attraction = Matter.Vector.mult(Matter.Vector.normalise(toCenter), 0.00002 * body.mass);
          Matter.Body.applyForce(body, body.position, attraction);
        }

        // 2. Mouse Repulsion
        if (mouse.position.x !== 0 && mouse.position.y !== 0) {
          const distMouse = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mouse.position));
          const repulsionRadius = 200;
          if (distMouse < repulsionRadius) {
            const force = Matter.Vector.normalise(Matter.Vector.sub(body.position, mouse.position));
            const strength = Math.pow(1 - distMouse / repulsionRadius, 2) * 0.02 * body.mass;
            Matter.Body.applyForce(body, body.position, Matter.Vector.mult(force, strength));
          }
        }

        // 3. Hovered Item Repulsion (Magnetic effect)
        if (hoveredBody && hoveredBody !== body) {
          const distHover = Matter.Vector.magnitude(Matter.Vector.sub(body.position, hoveredBody.position));
          const magneticRadius = 300;
          if (distHover < magneticRadius) {
            const force = Matter.Vector.normalise(Matter.Vector.sub(body.position, hoveredBody.position));
            const strength = Math.pow(1 - distHover / magneticRadius, 2) * 0.05 * body.mass;
            Matter.Body.applyForce(body, body.position, Matter.Vector.mult(force, strength));
          }
        }

        // Sync with DOM directly for performance
        const domNode = itemsRef.current[body.label];
        if (domNode) {
          const config = TIER_CONFIG[sponsorsData.find(s => s.name === body.label)?.tier || 'Silver'];
          const size = isMobile ? config.size * 0.7 : config.size;
          const x = body.position.x - size / 2;
          const y = body.position.y - size / 2;
          const angle = body.angle * (180 / Math.PI);
          
          domNode.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${angle}deg)`;
        }
      });

      Matter.Engine.update(engine, 1000 / 60);
      requestRef.current = requestAnimationFrame(update);
    };

    requestRef.current = requestAnimationFrame(update);

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      Matter.Engine.clear(engine);
    };
  }, [sponsorsData, isMobile]);

  return (
    <section id="sponsors" className="relative py-12 sm:py-24 px-4 overflow-hidden bg-black/40 min-h-[700px] sm:min-h-[900px] select-none">
      <div className="max-w-7xl mx-auto relative z-10 pointer-events-none mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-sm text-primary tracking-[0.4em] mb-3 uppercase">
            // ECOSYSTEM_NODES
          </p>
          <h2 className="font-mono text-3xl sm:text-4xl font-bold text-foreground">
            ZERO-GRAVITY <span className="text-primary text-glow-cyan">PARTNERS</span>
          </h2>
          <p className="mt-4 text-muted-foreground font-mono text-xs uppercase tracking-widest opacity-60">
            Interactive Neural Network • Hover to scan nodes
          </p>
        </motion.div>
      </div>

      <div 
        ref={containerRef} 
        className="absolute inset-0 z-0 cursor-crosshair touch-none"
      >
        {sponsorsData.map((sponsor) => {
          const config = TIER_CONFIG[sponsor.tier];
          const size = isMobile ? config.size * 0.7 : config.size;
          const isHovered = hoveredId === sponsor.name;

          return (
            <div
              key={sponsor.name}
              ref={(el) => (itemsRef.current[sponsor.name] = el)}
              className="absolute top-0 left-0 will-change-transform"
              style={{ width: size, height: size }}
            >
              <motion.div
                onMouseEnter={() => setHoveredId(sponsor.name)}
                onMouseLeave={() => setHoveredId(null)}
                animate={{ 
                  scale: isHovered ? 1.3 : 1,
                  zIndex: isHovered ? 50 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-full h-full rounded-full glass border p-4 flex items-center justify-center cursor-pointer group transition-all duration-300 ${config.border} ${isHovered ? config.glow : ''}`}
                style={{ 
                  backgroundColor: isHovered ? (sponsor.color ? `${sponsor.color}30` : 'rgba(255,255,255,0.15)') : 'rgba(255,255,255,0.05)',
                  boxShadow: isHovered ? `0 0 50px ${sponsor.color || '#06b6d4'}A0` : undefined,
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center p-2 pointer-events-none">
                  <img 
                    src={sponsor.logo} 
                    alt={sponsor.name}
                    className={`max-w-full max-h-full object-contain transition-all duration-500 ${isHovered ? 'filter-none grayscale-0' : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100'}`}
                  />
                </div>
                
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute -bottom-16 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-xl px-4 py-2 rounded-lg border border-primary/30 shadow-[0_0_20px_rgba(34,211,238,0.2)] z-50"
                    >
                      <div className="text-[10px] font-mono tracking-[0.3em] text-primary uppercase mb-1">{sponsor.tier} PARTNER</div>
                      <div className="text-xs font-bold text-white tracking-widest uppercase">{sponsor.name}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Decorative Scanner HUD Lines */}
      <div className="absolute inset-0 pointer-events-none z-[-1]">
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
        <motion.div 
          animate={{ y: ["0%", "100%", "0%"] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent shadow-[0_0_10px_rgba(6,182,212,0.5)]" 
        />
      </div>
    </section>
  );
};

export default ZeroGravitySponsors;
