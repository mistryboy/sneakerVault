import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const collections = [
  {
    title: "The Volt Series",
    count: "12 Models",
    image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    size: "large"
  },
  {
    title: "Stealth Core",
    count: "08 Models",
    image: "https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=2070&auto=format&fit=crop",
    size: "small"
  },
  {
      title: "Neon City",
      count: "05 Models",
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=2070&auto=format&fit=crop",
      size: "small"
  },
  {
    title: "Ancestral Tech",
    count: "15 Models",
    image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?q=80&w=1974&auto=format&fit=crop",
    size: "large"
  }
];

// Stagger container for header elements
const headerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 }
  }
};
const headerChild = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// Stats counter animation
const statVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function Collections() {
  const navigate = useNavigate();
  return (
    <section id="vault" className="bg-vault-black py-16 md:py-32 px-6 md:px-20">
      <div className="max-w-7xl mx-auto">
        
        {/* Header — Staggered Reveal */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8"
        >
            <motion.div variants={headerChild} className="max-w-xl">
                <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-2 md:mb-4">
                    Product Architecture
                </span>
                <h3 className="font-heading text-4xl md:text-6xl font-black text-vault-cream tracking-tighter uppercase leading-[0.9] md:leading-[0.8]">
                    The <br />
                    <span className="text-transparent stroke-text">Vault Collections</span>
                </h3>
            </motion.div>
            <div className="flex gap-12">
                <motion.div variants={statVariant} className="flex flex-col group cursor-default">
                    <span className="font-heading text-3xl font-black text-vault-cream group-hover:text-vault-purple transition-colors duration-500">240+</span>
                    <span className="font-body text-[9px] uppercase tracking-widest text-vault-cream/30">Total Models</span>
                </motion.div>
                <motion.div variants={statVariant} className="flex flex-col group cursor-default">
                    <span className="font-heading text-3xl font-black text-vault-cream group-hover:text-vault-purple transition-colors duration-500">08</span>
                    <span className="font-body text-[9px] uppercase tracking-widest text-vault-cream/30">Core Series</span>
                </motion.div>
            </div>
        </motion.div>

        {/* Bento-style Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 h-auto lg:h-[800px]">
          {collections.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 50, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.12, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative overflow-hidden bg-vault-charcoal cursor-pointer min-h-[300px] md:min-h-0 ${
                col.size === 'large' ? 'md:col-span-12 lg:col-span-7' : 'md:col-span-6 lg:col-span-5'
              }`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-[1.5s] group-hover:scale-110">
                <img 
                  src={col.image} 
                  alt={col.title}
                  className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-80 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-vault-black via-transparent to-transparent opacity-80" />
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  className="font-body text-[8px] md:text-[10px] tracking-[0.3em] uppercase text-vault-purple mb-2"
                >
                    {col.count}
                </motion.span>
                <h4 className="font-heading text-2xl md:text-4xl font-black text-vault-cream uppercase tracking-tighter mb-4 md:mb-6 group-hover:text-vault-purple transition-colors duration-300">
                    {col.title}
                </h4>
                
                <div className="w-0 h-[2px] bg-vault-purple transition-all duration-500 group-hover:w-24" />
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 border-[0px] group-hover:border-[1px] border-vault-purple/30 transition-all duration-300" />
              
              {/* Corner accent on hover */}
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[0px] border-t-vault-purple border-r-[0px] border-r-vault-purple group-hover:border-t-[40px] group-hover:border-r-[40px] border-l-transparent border-b-transparent border-l-[0px] border-b-[0px] group-hover:border-l-[40px] group-hover:border-b-[40px] transition-all duration-700 opacity-20" />
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 flex justify-center"
        >
            <button
               onClick={() => navigate('/store')}
               className="group relative px-10 py-5 md:px-14 md:py-7 border border-white/10 hover:border-vault-purple/50 transition-all duration-500 overflow-hidden cursor-pointer hover:shadow-[0_0_50px_rgba(168,85,247,0.15)] hover:scale-105 active:scale-95"
            >
                <span className="relative z-10 font-heading text-[10px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] text-vault-cream transition-colors duration-500 group-hover:text-white flex items-center gap-4">
                    Explore The Archive
                    <svg className="w-4 h-4 transform group-hover:translate-x-2 transition-transform duration-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </span>
                <div className="absolute inset-0 bg-vault-purple translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]" />
            </button>
        </motion.div>
      </div>
    </section>
  );
}
