import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export default function TechSpecs() {
  const containerRef = useRef(null);
  
  // Track the scroll progress over the 350vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Apply spring physics to the scroll progress to ensure buttery smooth inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001
  });

  // Main Shoe Parallax & Cinematic Transformation using Smooth Progress
  const shoeScale = useTransform(smoothProgress, [0, 0.2], [0.8, 1.2]);
  const shoeRotate = useTransform(smoothProgress, [0, 0.2], [-15, -5]);
  const shoeOpacity = useTransform(smoothProgress, [0, 0.05, 0.9, 1], [0, 1, 1, 1]);

  // Header Transformation
  const headerOpacity = useTransform(smoothProgress, [0, 0.1, 0.85, 0.9], [0, 1, 1, 1]);
  const headerY = useTransform(smoothProgress, [0, 0.1], [50, 0]);

  // Application State for Cinematic Steps
  const [step, setStep] = useState(0);

  useMotionValueEvent(smoothProgress, "change", (latest) => {
    if (latest < 0.25) setStep(0);
    else if (latest >= 0.25 && latest < 0.5) setStep(1);
    else if (latest >= 0.5 && latest < 0.75) setStep(2);
    else setStep(3);
  });

  return (
    <section ref={containerRef} className="relative h-[350vh] bg-vault-black font-inter">
      {/* Sticky Checkpoint Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Background Decor */}
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-white/5 w-full pointer-events-none" />
        <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-px bg-white/5 h-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10 w-full h-full flex flex-col justify-center">
          
          {/* Global Header */}
          <motion.div 
            style={{ opacity: headerOpacity, y: headerY }}
            className="absolute top-16 md:top-24 left-1/2 -translate-x-1/2 text-center w-full z-30 pointer-events-none"
          >
            <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-2 md:mb-4">
              Research & Development
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-black text-vault-cream tracking-tighter uppercase leading-none drop-shadow-2xl">
              Anatomy of <br /> <span className="text-transparent stroke-text">Velocity</span>
            </h2>
          </motion.div>

          {/* Central Shoe Layer */}
           <motion.div 
              style={{ scale: shoeScale, rotate: shoeRotate, opacity: shoeOpacity }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
            >
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] aspect-square bg-vault-purple/5 rounded-full blur-[100px]" />
               <img 
                 src="/clear-shoe.png" 
                 alt="Tech Spec Shoe"
                 className="relative z-10 w-[90%] md:w-[80%] max-w-[700px] object-contain drop-shadow-[0_30px_80px_rgba(168,85,247,0.4)] opacity-60 md:opacity-100"
               />
            </motion.div>

           {/* Floating Cinematic Cards - Decoupled Spring Animations */}
           <AnimatePresence>
              {step >= 1 && (
                <motion.div 
                  key="card-01"
                  initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute left-4 md:left-12 top-[22%] md:top-[25%] max-w-[200px] md:max-w-xs space-y-2 md:space-y-4 p-4 md:p-6 border border-vault-purple/30 bg-vault-charcoal/80 backdrop-blur-xl z-20 shadow-2xl"
                >
                   <div className="font-heading text-vault-purple text-lg md:text-2xl font-black">01</div>
                   <h4 className="font-heading text-sm md:text-xl text-vault-cream uppercase tracking-widest">Carbon Plate Tech</h4>
                   <p className="font-body text-[8px] md:text-xs text-white/60 leading-relaxed uppercase tracking-widest">Aerospace-grade kinetic carbon plating provides 40% more energy return per stride.</p>
                   <div className="absolute top-1/2 -right-12 w-12 h-px bg-vault-purple hidden md:block" />
                </motion.div>
              )}

              {step >= 2 && (
                <motion.div 
                  key="card-02"
                  initial={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, x: 50, filter: 'blur(10px)' }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute right-4 md:right-12 top-[50%] -translate-y-1/2 max-w-[200px] md:max-w-xs space-y-2 md:space-y-4 p-4 md:p-6 border border-vault-purple/30 bg-vault-charcoal/80 backdrop-blur-xl z-20 shadow-2xl"
                >
                   <div className="font-heading text-vault-purple text-lg md:text-2xl font-black">02</div>
                   <h4 className="font-heading text-sm md:text-xl text-vault-cream uppercase tracking-widest">Aero-Mesh Upper</h4>
                   <p className="font-body text-[8px] md:text-xs text-white/60 leading-relaxed uppercase tracking-widest">Ultra-breathable micro-woven fabric reduces weight by 22g while maximizing durability.</p>
                   <div className="absolute top-1/2 -left-12 w-12 h-px bg-vault-purple hidden md:block" />
                </motion.div>
              )}

              {step >= 3 && (
                <motion.div 
                  key="card-03"
                  initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
                  transition={{ type: "spring", stiffness: 100, damping: 20 }}
                  className="absolute left-4 md:left-12 bottom-[15%] max-w-[200px] md:max-w-xs space-y-2 md:space-y-4 p-4 md:p-6 border border-vault-purple/30 bg-vault-charcoal/80 backdrop-blur-xl z-20 shadow-2xl"
                >
                   <div className="font-heading text-vault-purple text-lg md:text-2xl font-black">03</div>
                   <h4 className="font-heading text-sm md:text-xl text-vault-cream uppercase tracking-widest">Impact Foam V3</h4>
                   <p className="font-body text-[8px] md:text-xs text-white/60 leading-relaxed uppercase tracking-widest">Nitrogen-infused heel cushioning absorbs 98% of hard-surface shock.</p>
                   <div className="absolute top-1/2 -right-12 w-12 h-px bg-vault-purple hidden md:block" />
                </motion.div>
              )}
           </AnimatePresence>

        </div>
      </div>
    </section>
  );
}
