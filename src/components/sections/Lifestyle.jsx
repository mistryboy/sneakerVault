import { motion } from 'framer-motion';

const images = [
  {
    url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop",
    title: "Urban Rhythm",
    desc: "Designed for the concrete jungle."
  },
  {
    url: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop",
    title: "Night Vision",
    desc: "Thrive where others fade."
  },
  {
    url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=1964&auto=format&fit=crop",
    title: "Future Bound",
    desc: "Step into the unknown."
  }
];

// Staggered header
const headerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};
const headerChild = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

// Quote reveal
const quoteVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  }
};

export default function Lifestyle() {
  return (
    <section id="brand" className="bg-vault-charcoal py-16 md:py-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-16">
        
        {/* Title — Staggered */}
        <motion.div
          variants={headerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="mb-12 md:mb-20 text-center"
        >
            <motion.span variants={headerChild} className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-2 md:mb-4">
                Lifestyle & Vision
            </motion.span>
            <motion.h3 variants={headerChild} className="font-heading text-3xl md:text-6xl font-black text-vault-cream tracking-tighter uppercase leading-none">
                Redefining the <span className="text-transparent stroke-text">Pace</span>
            </motion.h3>
        </motion.div>

        {/* Cinematic Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {images.map((img, i) => (
                <motion.div
                    key={img.title}
                    initial={{ opacity: 0, y: 60, scale: 0.92 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: i * 0.2, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="group relative flex flex-col gap-6"
                >
                    <div className="aspect-[3/4] md:aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-1000 relative">
                        <img 
                          src={img.url} 
                          alt={img.title} 
                          className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-110"
                        />
                        {/* Hover overlay shimmer */}
                        <div className="absolute inset-0 bg-gradient-to-t from-vault-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </div>
                    <div>
                        <h4 className="font-heading text-lg md:text-xl font-black text-vault-cream uppercase tracking-tight mb-2 group-hover:text-vault-purple transition-colors duration-500">
                            {img.title}
                        </h4>
                        <p className="font-body text-[10px] md:text-xs text-vault-cream/30 uppercase tracking-widest group-hover:text-vault-cream/50 transition-colors duration-500">
                            {img.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>

        {/* Brand Statement — Cinematic Reveal */}
        <motion.div
          variants={quoteVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 max-w-4xl mx-auto text-center"
        >
          <p className="font-heading text-lg md:text-3xl font-light text-vault-cream/60 leading-relaxed px-4 md:px-0">
                "We don't just build sneakers. We construct <span className="text-vault-purple font-black">gateways</span> to a world where limits are merely suggestions."
            </p>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-[1px] bg-vault-purple mx-auto mt-12"
            />
        </motion.div>

      </div>
    </section>
  );
}
