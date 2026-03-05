import { useEffect, useRef, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SPONSORS, Sponsor } from "@/data/sponsors";
import Matter from "matter-js";
import { useIsMobile } from "@/hooks/use-mobile";

const SPONSOR_SIZE = 95;
const SPONSOR_MASS = 4;
const SPONSOR_GLOW = "shadow-[0_0_15px_rgba(34,211,238,0.4)]";

const ZeroGravitySponsors = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const engineRef = useRef<Matter.Engine | null>(null);
  const requestRef = useRef<number>();
  const hoveredIdRef = useRef<string | null>(null);
  const isMobile = useIsMobile();
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const sponsorsData = useMemo(() => SPONSORS, []);

  // Sync state and ref
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);

  // Dimensions observer
  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!containerRef.current || dimensions.width === 0) return;

    const { width, height } = dimensions;

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
      const size = isMobile ? SPONSOR_SIZE * 0.7 : SPONSOR_SIZE;

      // Better starting position generation with padding
      const padding = 10;
      const x = Math.random() * (width - size - padding * 2) + size / 2 + padding;
      const y = Math.random() * (height - size - padding * 2) + size / 2 + padding;

      const body = Matter.Bodies.circle(x, y, size / 2, {
        restitution: 0.7,
        frictionAir: 0.05,
        mass: SPONSOR_MASS,
        label: sponsor.name,
      });

      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * 1.5,
        y: (Math.random() - 0.5) * 1.5,
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
        const forceMagnitude = 0.00003 * body.mass;
        Matter.Body.applyForce(body, body.position, {
          x: (Math.random() - 0.5) * forceMagnitude,
          y: (Math.random() - 0.5) * forceMagnitude,
        });

        // 1.5. Center Attraction (Keeps them from wandering too far)
        const toCenter = Matter.Vector.sub({ x: width / 2, y: height / 2 }, body.position);
        const distCenter = Matter.Vector.magnitude(toCenter);
        if (distCenter > 10) {
          const attractionStrength = isMobile ? 0.00004 : 0.00002;
          const attraction = Matter.Vector.mult(Matter.Vector.normalise(toCenter), attractionStrength * body.mass);
          Matter.Body.applyForce(body, body.position, attraction);
        }

        // 2. Mouse Repulsion
        if (mouse.position.x !== 0 && mouse.position.y !== 0) {
          const distMouse = Matter.Vector.magnitude(Matter.Vector.sub(body.position, mouse.position));
          const repulsionRadius = isMobile ? 60 : 100;
          if (distMouse < repulsionRadius) {
            const force = Matter.Vector.normalise(Matter.Vector.sub(body.position, mouse.position));
            const strength = Math.pow(1 - distMouse / repulsionRadius, 2) * 0.015 * body.mass;
            Matter.Body.applyForce(body, body.position, Matter.Vector.mult(force, strength));
          }
        }

        // 3. Hovered Item Repulsion (Magnetic effect)
        if (hoveredBody && hoveredBody !== body) {
          const distHover = Matter.Vector.magnitude(Matter.Vector.sub(body.position, hoveredBody.position));
          const magneticRadius = isMobile ? 100 : 180;
          if (distHover < magneticRadius) {
            const force = Matter.Vector.normalise(Matter.Vector.sub(body.position, hoveredBody.position));
            const strength = Math.pow(1 - distHover / magneticRadius, 2) * 0.06 * body.mass;
            Matter.Body.applyForce(body, body.position, Matter.Vector.mult(force, strength));
          }
        }

        // Safety check: force inside walls if they escape
        if (body.position.x < 0) Matter.Body.setPosition(body, { x: 10, y: body.position.y });
        if (body.position.x > width) Matter.Body.setPosition(body, { x: width - 10, y: body.position.y });
        if (body.position.y < 0) Matter.Body.setPosition(body, { x: body.position.x, y: 10 });
        if (body.position.y > height) Matter.Body.setPosition(body, { x: body.position.x, y: height - 10 });

        // Sync with DOM directly for performance
        const domNode = itemsRef.current[body.label];
        if (domNode) {
          const size = isMobile ? SPONSOR_SIZE * 0.7 : SPONSOR_SIZE;
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
  }, [sponsorsData, isMobile, dimensions]);

  return (
    <section id="sponsors" className="relative pt-8 pb-4 px-4 overflow-hidden bg-black/40 border-y border-white/5 select-none">
      <div className="max-w-7xl mx-auto relative z-10 pointer-events-none mb-6">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="font-mono text-[10px] text-primary tracking-[0.4em] mb-1.5 uppercase">
            // ECOSYSTEM_NODES
          </p>
          <h2 className="font-mono text-2xl sm:text-3xl font-bold text-foreground">
            OUR <span className="text-primary text-glow-cyan">SPONSORS</span>
          </h2>
        </motion.div>
      </div>

      <div
        ref={containerRef}
        className="relative h-[160px] z-0 cursor-crosshair touch-none overflow-hidden max-w-2xl mx-auto"
      >
        {sponsorsData.map((sponsor) => {
          const size = isMobile ? SPONSOR_SIZE * 0.7 : SPONSOR_SIZE;
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
                  scale: isHovered ? 1.2 : 1,
                  zIndex: isHovered ? 50 : 1
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-full h-full rounded-full flex items-center justify-center cursor-pointer group transition-all duration-300 ${isHovered ? SPONSOR_GLOW : ''}`}
                style={{
                  backgroundColor: isHovered ? (sponsor.color ? `${sponsor.color}30` : 'rgba(255,255,255,0.15)') : 'transparent',
                  boxShadow: isHovered ? `0 0 30px ${sponsor.color || '#06b6d4'}80` : undefined,
                  border: isHovered ? '1px solid rgba(255,255,255,0.2)' : 'none'
                }}
              >
                <div className="relative w-full h-full flex items-center justify-center p-1 pointer-events-none">
                  <img
                    src={sponsor.logo}
                    alt={sponsor.name}
                    className={`max-w-full max-h-full object-contain transition-all duration-500 ${isHovered ? 'filter-none grayscale-0' : 'grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100'}`}
                  />
                </div>

                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8, y: -5 }}
                      animate={{ opacity: 1, scale: 1, y: -25 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-xl px-2 py-0.5 rounded border border-primary/30 shadow-lg z-50 pointer-events-none"
                    >
                      <div className="text-[9px] font-bold text-white tracking-widest uppercase leading-none">{sponsor.name}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>

      {/* Decorative Grid Background - Sparse */}
      <div className="absolute inset-0 pointer-events-none z-[-1] opacity-[0.03]">
        <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, #06b6d4 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
      </div>
    </section>
  );
};

export default ZeroGravitySponsors;
