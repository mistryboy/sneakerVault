import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function CTA() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen bg-vault-black flex items-center justify-center overflow-hidden">
      
      {/* Dynamic Background Glow — Subtle pulse */}
      <div className="absolute inset-0 z-0">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.05, 0.08, 0.05],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-vault-purple blur-[200px] rounded-full"
          />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 text-center px-8"
      >
          <motion.span variants={fadeUp} className="font-body text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[1em] uppercase text-vault-purple block mb-6 md:mb-8">
              The Journey Begins
          </motion.span>
          
          <motion.h2 variants={scaleIn} className="font-heading text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black text-vault-cream uppercase tracking-tightest leading-[0.9] md:leading-[0.8] mb-8 md:mb-12">
              Step Into <br />
              <span className="text-transparent stroke-text">The Future.</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <button onClick={() => navigate('/store')} className="w-full md:w-auto group relative px-8 py-5 md:px-12 md:py-6 bg-vault-cream text-vault-black font-heading text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] transition-all duration-500 hover:bg-vault-purple hover:text-white hover:shadow-[0_0_50px_rgba(168,85,247,0.25)] hover:scale-105 cursor-pointer">
                  Shop Full Collection
              </button>
              <button className="w-full md:w-auto group font-heading text-[10px] md:text-xs uppercase tracking-[0.3em] text-vault-cream/40 hover:text-vault-purple transition-all duration-500 px-8 py-5 md:px-12 md:py-6 border border-white/5 hover:border-vault-purple/30 hover:shadow-[0_0_30px_rgba(168,85,247,0.08)] relative overflow-hidden">
                  <span className="relative z-10">Join The Vault Club</span>
                  <div className="absolute inset-0 bg-vault-purple/5 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
              </button>
          </motion.div>
      </motion.div>

      {/* Subtle Decal */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay: 1 }}
        className="absolute bottom-6 md:bottom-12 w-full text-center px-6"
      >
          <p className="font-body text-[6px] md:text-[8px] tracking-[0.2em] md:tracking-[0.4em] uppercase text-vault-cream/20 flex flex-wrap items-center justify-center gap-2 md:gap-4">
              <span>© 2026 SNEAKER VAULT</span>
              <span className="hidden md:block w-1 h-1 bg-vault-purple rounded-full" />
              <span>Engineered in the Void</span>
          </p>
      </motion.div>

    </section>
  );
}
