import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const drops = [
  { id: 1, date: "DEC 15", name: "AERO-MAX 'NOVA'", status: "Upcoming", color: "group-hover:text-vault-purple", glow: "hover:shadow-[0_0_100px_rgba(168,85,247,0.2)] hover:bg-vault-black hover:z-10 hover:border-vault-purple/30" },
  { id: 2, date: "DEC 28", name: "STEALTH ZERO", status: "Waitlist Open", color: "group-hover:text-vault-cream", glow: "hover:shadow-[0_0_100px_rgba(255,255,255,0.05)] hover:bg-vault-black hover:z-10 hover:border-white/30" },
  { id: 3, date: "JAN 04", name: "LIQUID GOLD", status: "Classified", color: "group-hover:text-vault-red", glow: "hover:shadow-[0_0_100px_rgba(239,68,68,0.15)] hover:bg-vault-black hover:z-10 hover:border-vault-red/30" },
  { id: 4, date: "JAN 12", name: "CARBON V4", status: "Members Only", color: "group-hover:text-vault-purple", glow: "hover:shadow-[0_0_100px_rgba(168,85,247,0.2)] hover:bg-vault-black hover:z-10 hover:border-vault-purple/30" },
];

export default function DropCalendar() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  return (
    <section ref={containerRef} className="relative py-20 md:py-40 border-y border-white/5 bg-vault-black overflow-hidden flex flex-col justify-center min-h-[60vh]">
      
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-vault-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-vault-black to-transparent z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-8 relative z-20 w-full mb-8 md:mb-16">
          <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-white/30 block mb-2 md:mb-4">
              Release Radar
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black text-vault-cream uppercase tracking-tighter leading-none">
              Vault <span className="text-transparent stroke-text">Calendar</span>
          </h2>
      </div>

      <motion.div style={{ x }} className="w-full flex flex-col relative z-20 whitespace-nowrap overflow-hidden">
         {drops.map((drop, i) => (
            <motion.div 
               key={drop.id}
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               className={`group flex flex-col md:flex-row md:items-center justify-between border-b border-white/5 py-8 md:py-12 px-6 md:px-[10%] cursor-crosshair relative transition-all duration-700 ${drop.glow}`}
            >
               <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-16 w-full md:w-1/2">
                   <div className="font-body text-[10px] md:text-sm font-bold uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-colors">
                       {drop.date}
                   </div>
                   <h3 className={`font-heading text-2xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/80 transition-colors duration-500 ${drop.color}`}>
                       {drop.name}
                   </h3>
               </div>
               
               <div className="mt-4 md:mt-0 flex items-center justify-between gap-6 md:gap-12">
                   <div className="flex-1 border-b border-dashed border-white/20 w-12 md:w-32 hidden md:block opacity-0 group-hover:opacity-100 transition-opacity" />
                   <span className="font-body text-[8px] md:text-xs font-bold uppercase tracking-[0.3em] text-vault-purple border border-vault-purple/30 px-4 py-2 md:px-6 md:py-2 rounded-full group-hover:bg-vault-purple group-hover:text-white transition-all">
                       {drop.status}
                   </span>
               </div>
            </motion.div>
         ))}
      </motion.div>
    </section>
  );
}
