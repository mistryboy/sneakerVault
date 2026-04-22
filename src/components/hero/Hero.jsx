import { motion, AnimatePresence } from 'framer-motion';
import Sneaker360 from './Sneaker360';
import { Search, User, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const relatedProducts = [
  { name: "Running Edge", price: "$165", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop" },
  { name: "Maxim Wear", price: "$114", img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1974&auto=format&fit=crop" },
  { name: "Geer to Glare", price: "$250", img: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1964&auto=format&fit=crop" }
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};

const lineReveal = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const heroCollection = [
  {
    id: "hero-1",
    title: "JIT JET BLACK",
    name: "JIT JET BLACK",
    price: 899.99,
    displayPrice: "$899.99",
    desc: "Engineered with dual-layer carbon fiber plates and zero-gravity foam technology.",
    image: "/hero-sneaker.png",
    category: "Running",
    style: "Carbon-Tech",
    rating: 4.9,
    reviews: 256,
    tag: "EXCLUSIVE",
    colors: ["#EF4444", "#050505"],
    sizes: [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12],
    inStock: true,
    newRelease: true
  },
];

export default function Hero() {
  const { totalItems, setCartOpen, addToCart } = useCart();
  const { user, setAuthModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroCollection.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + heroCollection.length) % heroCollection.length);
  };

  const activeDrop = heroCollection[currentIndex];

  const navLinks = [
    { name: 'Products', href: '/store' },
    { name: 'Drops', href: '/#drops' },
    { name: 'Vault', href: '/#vault' },
    { name: 'Brand', href: '/#brand' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/') {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        navigate(href);
      }
    } else {
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <section className="relative w-full h-screen bg-black overflow-hidden font-inter text-white">

      {/* Navigation Layer */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-0 left-0 right-0 z-[100] px-6 md:px-12 lg:px-20 py-6 md:py-8 pointer-events-auto"
      >
        <div className="max-w-[1600px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span onClick={() => { navigate('/'); window.scrollTo(0, 0); }} className="font-heading text-xl md:text-2xl font-[900] tracking-tight uppercase cursor-pointer text-white select-none">
              SNEAKER<span className="text-white/30">VAULT</span>
            </span>
          </div>

          {/* Centered Nav Links */}
          <nav className="hidden lg:flex items-center gap-10 xl:gap-14 absolute left-1/2 -translate-x-1/2">
            {navLinks.map(item => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="relative font-body text-[11px] uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all duration-500 group py-1"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-white/60 transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center gap-5 md:gap-7">
            {user ? (
              <button onClick={logout} className="w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm text-white flex items-center justify-center font-heading text-[10px] font-bold hover:bg-white hover:text-black transition-all duration-300 border border-white/10 hover:border-white/0">
                {user.initial}
              </button>
            ) : (
              <button onClick={() => setAuthModalOpen(true)} className="w-9 h-9 rounded-full bg-white/[0.05] backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer">
                <User className="w-4 h-4 text-white/50" />
              </button>
            )}

            <button onClick={() => setCartOpen(true)} className="relative w-9 h-9 rounded-full bg-white/[0.05] backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group cursor-pointer">
              <ShoppingBag className="w-4 h-4 text-white/50 group-hover:text-white transition-colors duration-300" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black rounded-full text-[8px] flex items-center justify-center font-bold shadow-lg">{totalItems}</span>
              )}
            </button>

            <button className="lg:hidden w-9 h-9 rounded-full bg-white/[0.05] backdrop-blur-sm flex items-center justify-center border border-white/10 hover:bg-white/10 transition-all duration-300" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-4 h-4 text-white/60" /> : <Menu className="w-4 h-4 text-white/60" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] overflow-hidden">

        {/* Spotlight Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[1000px] max-h-[1000px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />

        {/* Massive Dynamic Background Typography */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex justify-center items-center pointer-events-none z-0">
          <AnimatePresence mode="wait">
            <motion.h1
              key={activeDrop.title}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 0.12, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 1.05 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="font-heading text-[11vw] md:text-[13vw] font-bold text-white tracking-[0.15em] uppercase leading-none whitespace-nowrap blur-[2px] select-none"
            >
              {activeDrop.title}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Minimal Left-Side Tagline */}
        <div className="hidden lg:flex absolute top-1/2 left-12 -translate-y-1/2 z-30 opacity-40 pointer-events-none">
          <p
            className="font-body text-[10px] tracking-[0.4em] uppercase text-white whitespace-nowrap"
            style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
          >
            SNEAKER VAULT // COLLECTION '26
          </p>
        </div>

        {/* Left Semi-Circle Arrow */}
        <div onClick={handlePrev} className="absolute left-0 top-1/2 -translate-y-1/2 -ml-[250px] md:-ml-[400px] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-white/10 flex items-center justify-end pr-10 cursor-pointer hover:border-white/30 transition-colors group z-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/50 group-hover:text-white group-hover:-translate-x-2 transition-all duration-300">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
        </div>

        {/* Right Semi-Circle Arrow */}
        <div onClick={handleNext} className="absolute right-0 top-1/2 -translate-y-1/2 -mr-[250px] md:-mr-[400px] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full border border-white/10 flex items-center justify-start pl-10 cursor-pointer hover:border-white/30 transition-colors group z-50">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all duration-300">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>

        {/* Center Canvas for Sneaker360 */}
        <div className="relative z-20 w-full h-full max-w-[1400px] mx-auto flex items-center justify-center pointer-events-none">
          <div className="w-[80%] md:w-[60%] lg:w-[45%] h-[60%] relative mt-12 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeDrop.id}
                initial={{ opacity: 0, x: 120, scale: 0.9, rotate: -5 }}
                animate={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                  y: [0, -15, 0],
                  rotate: [-15, -12, -15]
                }}
                exit={{ opacity: 0, x: -120, scale: 1.1, rotate: -25 }}
                transition={{
                  duration: 0.6, ease: [0.22, 1, 0.36, 1],
                  y: { repeat: Infinity, duration: 4, ease: "easeInOut" },
                  rotate: { repeat: Infinity, duration: 6, ease: "easeInOut" }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <Sneaker360 image={activeDrop.image} />
              </motion.div>
            </AnimatePresence>
            {/* Dynamic Floor Drop Shadow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`shadow-${activeDrop.id}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.9,
                  scale: [1, 0.95, 1]
                }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.6, ease: [0.22, 1, 0.36, 1],
                  scale: { repeat: Infinity, duration: 4, ease: "easeInOut" }
                }}
                className="absolute -bottom-10 md:-bottom-20 left-1/2 -translate-x-1/2 w-[60%] h-6 bg-black/80 blur-2xl rounded-[100%]"
              />
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Left Footer Data */}
        <div className="absolute bottom-8 md:bottom-16 left-6 md:left-16 lg:left-24 z-30 max-w-xs md:max-w-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDrop.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <h4 className="font-body text-4xl md:text-6xl font-light text-white mb-4 md:mb-6 tracking-tighter drop-shadow-lg">
                {activeDrop.displayPrice}
              </h4>
              <div className="hidden md:block border-t border-white/20 w-12 mb-4" />
              <p className="font-body text-[11px] md:text-xs text-white/50 leading-loose normal-case">
                {activeDrop.desc}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Bottom Right Footer Action */}
        <div className="absolute bottom-8 md:bottom-16 right-6 md:right-16 lg:right-24 z-30">
          <button
            onClick={() => addToCart(activeDrop)}
            className="group flex items-center justify-center bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] cursor-pointer"
          >
            <span className="font-heading text-[10px] md:text-xs font-black uppercase tracking-widest">
              ADD TO CART
            </span>
          </button>
        </div>

      </div>



      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[150] bg-vault-black flex flex-col p-10 lg:hidden"
          >
            <div className="flex justify-between items-center mb-16">
              <span className="font-heading text-lg font-black tracking-tighter uppercase text-vault-purple">MENU</span>
              <button onClick={() => setMenuOpen(false)} className="text-white hover:text-vault-purple transition-colors">
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-heading text-4xl font-black uppercase text-vault-cream hover:text-vault-purple flex items-center justify-between group"
                >
                  {link.name}
                  <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
