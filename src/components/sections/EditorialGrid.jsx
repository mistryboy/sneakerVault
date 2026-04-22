import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    title: "Embracing the Night: The Stealth Origin",
    category: "Design",
    image: "https://images.unsplash.com/photo-1549298916-f52d724204b4?q=80&w=2013&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-2",
    rowSpan: "row-span-1 md:row-span-2",
  },
  {
    id: 2,
    title: "Carbon Core Deep Dive",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=1974&auto=format&fit=crop",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 3,
    title: "Street Culture & Altitude",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=1780&auto=format&fit=crop",
    colSpan: "col-span-1",
    rowSpan: "row-span-1",
  },
  {
    id: 4,
    title: "Athlete Series: Volume 01",
    category: "Editorial",
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2070&auto=format&fit=crop",
    colSpan: "col-span-1 md:col-span-3",
    rowSpan: "row-span-1",
  }
];

export default function EditorialGrid() {
  return (
    <section className="py-16 md:py-32 bg-vault-black px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-16 gap-6 md:gap-8">
            <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
            >
                <h2 className="font-heading text-3xl sm:text-5xl md:text-7xl font-black text-vault-cream uppercase tracking-tighter leading-none mb-2 md:mb-4">
                   Vault <br className="hidden md:block"/> <span className="text-transparent stroke-text">Archives</span>
                </h2>
            </motion.div>
            <motion.p 
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.8 }}
               className="font-body text-[10px] md:text-xs text-white/40 max-w-xs uppercase tracking-widest leading-relaxed text-left md:text-right"
            >
                Explore the stories, technology, and culture behind the industry's most definitive footwear.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-4">
          {articles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className={`relative group overflow-hidden bg-vault-charcoal cursor-pointer border border-white/5 hover:border-vault-purple/30 transition-colors ${article.colSpan} ${article.rowSpan}`}
            >
              <img 
                src={article.image} 
                alt={article.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100 grayscale group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vault-black via-vault-black/20 to-transparent opacity-80" />
              
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                 <div className="overflow-hidden mb-2">
                     <span className="block font-body text-[8px] md:text-[10px] text-vault-purple uppercase tracking-[0.3em] translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                         {article.category}
                     </span>
                 </div>
                 <h3 className="font-heading text-xl md:text-3xl font-black text-vault-cream uppercase tracking-tight transform group-hover:-translate-y-2 transition-transform duration-500">
                    {article.title}
                 </h3>
                 <div className="h-px w-0 bg-vault-purple mt-2 md:mt-4 group-hover:w-12 transition-all duration-700 ease-out" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
