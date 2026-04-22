import { motion } from 'framer-motion';

const phrases = [
  "SNEAKER VAULT",
  "★",
  "LIMITED DROPS",
  "★",
  "MOVE DIFFERENT",
  "★",
  "WEAR POWER",
  "★",
  "ENGINEERED FOR VELOCITY",
  "★",
  "STEP INTO THE FUTURE",
  "★",
];

const text = phrases.join("  ");
const repeated = `${text}  ${text}  `;

export default function MarqueeBand() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative w-full overflow-hidden bg-vault-purple py-4 md:py-6 group cursor-pointer hover:bg-[#9333ea] transition-colors duration-700"
    >
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
            ease: "linear",
          },
        }}
        whileHover={{ transition: { x: { duration: 40 } } }}
      >
        <span className="font-heading text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-[900] uppercase tracking-tight text-white group-hover:text-white/90 transition-colors duration-300">
          {repeated}
        </span>
      </motion.div>
    </motion.div>
  );
}
