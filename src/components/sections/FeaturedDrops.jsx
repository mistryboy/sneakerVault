import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { Loader } from 'lucide-react';

const defaultDrops = [
  {
    id: 'default-1',
    name: "Aero-MAX V2",
    style: "Future-Core",
    price: 280,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
    color: "vault-purple"
  },
  {
    id: 'default-2',
    name: "GHOST RUNNER",
    style: "Stealth-Tech",
    price: 240,
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop",
    color: "vault-red"
  },
  {
    id: 'default-3',
    name: "TITAN HIGH",
    style: "Luxury-Street",
    price: 320,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2012&auto=format&fit=crop",
    color: "vault-purple"
  },
  {
    id: 'default-4',
    name: "NEON VELOCITY",
    style: "Tech-Performance",
    price: 195,
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop",
    color: "vault-red"
  }
];

// Section header animation
const headerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function FeaturedDrops() {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { products, loading } = useProducts();
  const { scrollYProgress } = useScroll({
    target: targetRef
  });

  let drops = products.filter(p => p.newRelease).slice(0, 8);
  if (drops.length === 0) {
     if (products.length > 0) {
         drops = products.slice(0, 8);
     } else if (!loading) {
         drops = defaultDrops;
     }
  }

  // Translates the container strictly by its whole width minus the viewport width.
  // This physically guarantees the final card locks exactly against the right edge of your screen.
  const x = useTransform(scrollYProgress, [0, 1], ["calc(0% + 0vw)", "calc(-100% + 100vw)"]);

  return (
    <section id="drops" ref={targetRef} className="relative h-[300vh] bg-vault-charcoal">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        
        {/* Section Title Background Decal */}
        <div className="absolute top-1/2 left-6 md:left-20 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <h2 className="font-heading text-[6rem] sm:text-[10rem] md:text-[15rem] font-black uppercase text-white leading-none">
            LIMITED DROPS
          </h2>
        </div>

        <div className="flex flex-col w-full h-full justify-center pt-24">
            {/* Header — Fade In */}
            <motion.div
              variants={headerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="px-6 md:px-20 mb-8 md:mb-12 flex flex-col md:flex-row items-start md:items-end justify-between relative z-10 gap-6 md:gap-0"
            >
                <div>
                   <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-2 md:mb-4">
                        Seasonal Exclusive
                   </span>
                   <h3 className="font-heading text-4xl md:text-6xl font-black text-vault-cream tracking-tighter uppercase leading-none">
                        Featured <br />
                        <span className="text-transparent stroke-text">Releases</span>
                   </h3>
                </div>
                <div className="max-w-xs md:text-right">
                    <p className="font-body text-[10px] md:text-xs text-vault-cream/30 leading-relaxed uppercase tracking-widest">
                        Available now for a limited time. Engineered with the latest carbon-fiber tech.
                    </p>
                </div>
            </motion.div>

            {/* Horizontal Scroll Track */}
            <motion.div style={{ x }} className="flex w-max gap-6 md:gap-12 px-6 md:px-20">
              {drops.map((drop, i) => (
                <motion.div 
                  key={drop.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -8 }}
                  className="group relative flex-shrink-0 w-[85vw] sm:w-[450px] aspect-[4/5] bg-vault-black/50 border border-white/5 overflow-hidden transition-all duration-700 hover:border-vault-purple/30 hover:shadow-[0_30px_80px_rgba(168,85,247,0.08)]"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                      src={drop.image}
                      alt={drop.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                  </div>

                  {/* Gradient Glow */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-${drop.color}/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />

                  {/* Info Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 flex flex-col justify-end">
                    <div className="overflow-hidden">
                        <span className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-vault-purple block mb-2 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                            {drop.style}
                        </span>
                    </div>
                    <div className="overflow-hidden mb-4">
                        <h4 className="font-heading text-xl md:text-3xl font-black text-vault-cream uppercase tracking-tight transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-200">
                            {drop.name}
                        </h4>
                    </div>
                    
                    <div className="flex items-center justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-300">
                        <span className="font-body text-lg text-vault-cream/60">${drop.price}</span>
                        <button onClick={() => navigate('/store')} className="pointer-events-auto px-6 py-2 bg-vault-cream text-vault-black font-heading text-[10px] font-bold uppercase tracking-widest hover:bg-vault-purple hover:text-white hover:shadow-[0_0_25px_rgba(168,85,247,0.3)] transition-all duration-300">
                            Register Interest
                        </button>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* View All Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => navigate('/store')}
                className="group relative flex-shrink-0 w-[85vw] sm:w-[450px] aspect-[4/5] bg-vault-purple flex flex-col items-center justify-center gap-6 cursor-pointer overflow-hidden"
              >
                 <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1925&auto=format&fit=crop')] bg-cover bg-center grayscale group-hover:scale-110 transition-transform duration-[2s]" />
                 <h4 className="relative z-10 font-heading text-3xl md:text-5xl font-black text-white uppercase tracking-tighter text-center group-hover:scale-105 transition-transform duration-700">
                    Explore <br /> All Drops
                 </h4>
                 <div className="relative z-10 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:bg-white group-hover:text-vault-purple group-hover:scale-110 group-hover:rotate-90 transition-all duration-500">
                     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                 </div>
              </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}
