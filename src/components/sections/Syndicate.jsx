import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const statements = [
  { 
    id: 1, 
    quote: "The Aero-Max V2 literally shaved seconds off my sprint. The kinetic return is undeniably real.", 
    author: "X. GRAV", 
    role: "Elite Sprinter" 
  },
  { 
    id: 2, 
    quote: "I've never felt a high-top this light. The stealth capabilities feel like walking in a vacuum.", 
    author: "M. DASH", 
    role: "Urban Explorer" 
  },
  { 
    id: 3, 
    quote: "Destroyed my PR on day one out of the box. Vault engineering is entirely on another level.", 
    author: "T. REZNOR", 
    role: "Marathon Pro" 
  },
  { 
    id: 4, 
    quote: "Aesthetic perfection meets actual, provable high-stakes performance. Nothing else competes.", 
    author: "H. CHEN", 
    role: "Streetwear Icon" 
  }
];

export default function Syndicate() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax the background logo
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-40 bg-vault-charcoal overflow-hidden flex items-center min-h-[80vh]">
      
      {/* Massive Background Typography */}
      <motion.div 
         style={{ y }} 
         className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none"
      >
          <h2 className="font-heading text-[20vw] font-black text-white uppercase whitespace-nowrap tracking-tighter">
              THE SYNDICATE
          </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-10 w-full">
        <div className="flex flex-col md:flex-row gap-12 md:gap-32">
            
            {/* Title block */}
            <div className="md:w-1/3">
                <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-4 md:mb-6">
                    Field Reports
                </span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-vault-cream tracking-tighter uppercase leading-none mb-4 md:mb-6">
                    The<br />
                    <span className="text-transparent stroke-text">Syndicate</span>
                </h3>
                <p className="font-body text-xs text-white/40 leading-relaxed uppercase tracking-widest">
                    Unfiltered data from the athletes and pioneers who have pushed Vault architecture to its absolute limits.
                </p>
            </div>

            {/* Scrolling Feedback List */}
            <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
               {statements.map((item, i) => (
                  <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.15, duration: 0.8 }}
                    className="p-6 md:p-8 bg-vault-black/50 border border-white/5 hover:border-vault-purple/30 transition-all duration-500 group relative"
                  >
                     {/* Decorative Accent */}
                     <div className="absolute top-0 left-0 w-2 h-full bg-vault-purple/20 group-hover:bg-vault-purple transition-colors duration-500" />
                     
                     <p className="font-heading text-base md:text-xl text-vault-cream/90 leading-snug tracking-wide uppercase mb-6 md:mb-8">
                         &quot;{item.quote}&quot;
                     </p>
                     
                     <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-4">
                        <span className="font-body text-xs font-bold text-vault-purple uppercase tracking-widest">{item.author}</span>
                        <span className="font-body text-[10px] text-white/30 uppercase tracking-[0.2em]">{item.role}</span>
                     </div>
                  </motion.div>
               ))}
            </div>

        </div>
      </div>
    </section>
  );
}
