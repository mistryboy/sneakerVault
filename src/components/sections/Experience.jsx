import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function Experience() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animation values for the sneaker showcase
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.9]);
  const rotate = useTransform(scrollYProgress, [0, 1], [-10, 15]);
  const x = useTransform(scrollYProgress, [0, 0.5, 1], ["-20%", "0%", "20%"]);
  
  // Text reveal animations
  const text1_Opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [0, 1, 0]);
  const text2_Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [0, 1, 0]);
  const text3_Opacity = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [0, 1, 0]);

  // Text Y offset for smooth parallax feel
  const text1_Y = useTransform(scrollYProgress, [0.1, 0.2, 0.3], [30, 0, -30]);
  const text2_Y = useTransform(scrollYProgress, [0.4, 0.5, 0.6], [30, 0, -30]);
  const text3_Y = useTransform(scrollYProgress, [0.7, 0.8, 0.9], [30, 0, -30]);

  // Background glow pulsing
  const glow1_Scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.3, 0.8]);
  const glow2_Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 0.8, 1.2]);

  const sneakerImage = "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop";

  return (
    <section id="brand" ref={containerRef} className="relative h-[150vh] bg-vault-black overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        
        {/* Background Particles / Accents — Now with scroll-driven scale */}
        <div className="absolute inset-0 opacity-10">
            <motion.div style={{ scale: glow1_Scale }} className="absolute top-1/4 left-1/4 w-96 h-96 bg-vault-purple blur-[120px] rounded-full" />
            <motion.div style={{ scale: glow2_Scale }} className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vault-red blur-[120px] rounded-full" />
        </div>

        {/* Main Sneaker Showcase */}
        <motion.div 
          style={{ scale, rotate, x }}
          className="relative z-10 w-full max-w-4xl aspect-video flex items-center justify-center pointer-events-none"
        >
          <img 
            src={sneakerImage} 
            alt="Experience Technology"
            className="w-full h-full object-contain drop-shadow-[0_40px_100px_rgba(168,85,247,0.3)]"
          />
        </motion.div>

        {/* Floating Technical Specs — Now with Y parallax */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
            
            <motion.div style={{ opacity: text1_Opacity, y: text1_Y }} className="absolute text-center px-6 md:px-12 w-full">
                <span className="font-body text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase text-vault-purple mb-2 md:mb-4 block">Engineered for Velocity</span>
                <h3 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black text-vault-cream uppercase tracking-tighter">Carbon <span className="text-transparent stroke-text">Core</span></h3>
            </motion.div>

            <motion.div style={{ opacity: text2_Opacity, y: text2_Y }} className="absolute text-center px-6 md:px-12 w-full">
                <span className="font-body text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase text-vault-red mb-2 md:mb-4 block">Ultimate Comfort</span>
                <h3 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black text-vault-cream uppercase tracking-tighter">Cloud <span className="text-transparent stroke-text">Strike</span></h3>
            </motion.div>

            <motion.div style={{ opacity: text3_Opacity, y: text3_Y }} className="absolute text-center px-6 md:px-12 w-full">
                <span className="font-body text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.8em] uppercase text-vault-purple mb-2 md:mb-4 block">Futuristic Control</span>
                <h3 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black text-vault-cream uppercase tracking-tighter">Liquid <span className="text-transparent stroke-text">Flow</span></h3>
            </motion.div>

        </div>

        {/* Visual Decal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="absolute bottom-6 left-6 md:bottom-12 md:left-12"
        >
            <span className="font-body text-[6px] md:text-[8px] tracking-[0.5em] md:tracking-[1em] uppercase text-vault-cream/20">The SNEAKER VAULT Experience Prototype v.1.0</span>
        </motion.div>
      </div>
    </section>
  );
}
