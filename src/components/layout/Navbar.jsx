import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, User } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems, setCartOpen } = useCart();
  const { user, setAuthModalOpen, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Products', href: '/store' },
    { name: 'Drops', href: '/#drops' },
    { name: 'Vault', href: '/#vault' },
    { name: 'Brand', href: '/#brand' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    
    // If it's the exact same page path, and it has a hash, manually scroll.
    if (href.startsWith('/#')) {
      const hash = href.split('#')[1];
      if (location.pathname === '/') {
        // We are already on the home page, scroll directly
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        // Navigate to home page with hash
        navigate(href);
      }
    } else {
      // Normal navigate
      navigate(href);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 md:px-8 py-4 md:py-6 flex items-center justify-between ${
          scrolled ? 'bg-vault-black/80 backdrop-blur-xl py-4' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-8 h-8 rounded-full bg-vault-purple shadow-neon-purple flex items-center justify-center group-hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-shadow duration-500">
                <div className="w-3 h-3 bg-vault-black rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
            </div>
          <span className="font-heading text-base md:text-lg font-black tracking-widest text-vault-cream uppercase group-hover:text-white transition-colors duration-300">
            SNEAKER<span className="text-vault-purple">VAULT</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.6 }}
              className="font-heading text-[10px] uppercase tracking-widest text-vault-cream/60 hover:text-vault-purple transition-colors duration-300 relative group cursor-pointer"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-vault-purple transition-all duration-300 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <div onClick={logout} className="relative group cursor-pointer w-6 h-6 rounded-full bg-vault-purple text-white flex items-center justify-center font-heading text-[10px] font-bold hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all duration-300">
              {user.initial}
              <div className="absolute top-10 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-vault-black border border-white/10 px-3 py-2 rounded-md flex items-center gap-2 pointer-events-none group-hover:pointer-events-auto">
                  <span className="font-body text-[8px] uppercase tracking-widest text-white/60 whitespace-nowrap">Sign Out</span>
              </div>
            </div>
          ) : (
            <button onClick={() => setAuthModalOpen(true)} className="group cursor-pointer">
               <User className="w-5 h-5 text-vault-cream group-hover:text-vault-purple group-hover:scale-110 transition-all duration-300" />
            </button>
          )}
          <motion.button 
            key={totalItems}
            initial={{ scale: 1 }}
            animate={{ scale: totalItems > 0 ? [1, 1.25, 1] : 1 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            onClick={() => setCartOpen(true)} 
            className="relative group cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5 text-vault-cream group-hover:text-vault-purple group-hover:scale-110 transition-all duration-300" />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-3 h-3 bg-vault-purple text-[8px] flex items-center justify-center rounded-full text-white font-bold group-hover:scale-125 transition-transform duration-300"
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
          <button 
            className="md:hidden text-vault-cream hover:text-vault-purple transition-colors duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[110] bg-vault-black flex flex-col items-center justify-center gap-8 p-8"
          >
            <motion.button
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute top-8 right-8 text-vault-cream hover:text-vault-purple hover:rotate-90 transition-all duration-500"
                onClick={() => setMenuOpen(false)}
            >
                <X className="w-8 h-8" />
            </motion.button>
            {navLinks.map((link, i) => (
              <motion.a
                initial={{ opacity: 0, y: 30, x: -20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-heading text-3xl md:text-4xl font-black uppercase text-vault-cream hover:text-vault-purple hover:translate-x-4 transition-all duration-400 cursor-pointer"
              >
                {link.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
