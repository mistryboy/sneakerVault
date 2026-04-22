import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag, X, Plus, Minus, SlidersHorizontal, ChevronDown, ArrowLeft, Search, Star, Heart, Eye, Loader } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

// Product list driven from Firestore Db via context.

const categories = ["All", "Running", "Lifestyle", "Training", "Heritage"];
const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated", value: "rating" },
  { label: "Newest", value: "newest" },
];

// ─── ANIMATION VARIANTS ──────────────────────────────────────────
const pageTransition = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const staggerGrid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const cardReveal = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const slideIn = {
  hidden: { x: "100%" },
  visible: { x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { x: "100%", transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const modalContent = {
  hidden: { opacity: 0, scale: 0.92, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.3 } },
};


// ─── PRODUCT CARD ─────────────────────────────────────────────────
function ProductCard({ product, onAddToCart, onQuickView, onWishlist, wishlisted }) {
  return (
    <motion.div
      variants={cardReveal}
      layout
      className="group relative flex flex-col bg-vault-charcoal/50 border border-white/[0.04] overflow-hidden cursor-pointer hover:border-vault-purple/30 transition-all duration-700"
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-vault-black/50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
          loading="lazy"
        />

        {/* Tag Badge */}
        {product.tag && (
          <div className={`absolute top-4 left-4 px-3 py-1.5 text-[9px] font-heading font-bold uppercase tracking-widest ${
            product.tag === 'SALE'
              ? 'bg-vault-red text-white'
              : product.tag === 'EXCLUSIVE' || product.tag === 'LIMITED'
              ? 'bg-vault-purple text-white'
              : 'bg-vault-cream text-vault-black'
          }`}>
            {product.tag}
          </div>
        )}

        {/* Hover Actions Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-vault-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="absolute bottom-0 left-0 right-0 p-5 flex items-center justify-between transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
            className="flex-1 mr-2 py-3 bg-vault-cream text-vault-black font-heading text-[10px] font-bold uppercase tracking-widest hover:bg-vault-purple hover:text-white transition-all duration-300 active:scale-95"
          >
            Add to Cart
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onQuickView(product); }}
            className="w-11 h-11 border border-white/20 flex items-center justify-center hover:bg-vault-purple hover:border-vault-purple text-white/60 hover:text-white transition-all duration-300"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => { e.stopPropagation(); onWishlist(product.id); }}
          className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-vault-black/50 backdrop-blur-sm border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-vault-purple hover:border-vault-purple"
        >
          <Heart className={`w-4 h-4 transition-colors duration-300 ${wishlisted ? 'fill-vault-purple text-vault-purple' : 'text-white/60'}`} />
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2">
        <span className="font-body text-[9px] tracking-[0.3em] uppercase text-vault-purple">
          {product.style}
        </span>
        <h4 className="font-heading text-base font-bold text-vault-cream uppercase tracking-tight group-hover:text-vault-purple transition-colors duration-300">
          {product.name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <span className="font-heading text-lg font-black text-vault-cream">${product.price}</span>
          {product.rating && (
            <div className="flex items-center gap-1.5">
              <Star className="w-3 h-3 text-vault-purple fill-vault-purple" />
              <span className="font-body text-[10px] text-vault-cream/50">{product.rating}</span>
            </div>
          )}
        </div>
        {/* Color Dots */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-2 mt-2">
            {product.colors.map((color, i) => (
              <div
                key={i}
                className="w-3.5 h-3.5 rounded-full border border-white/10 hover:scale-125 transition-transform duration-200 cursor-pointer"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── QUICK VIEW MODAL ─────────────────────────────────────────────
function QuickViewModal({ product, onClose, onAddToCart }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <motion.div
      variants={modalOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        variants={modalContent}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-vault-charcoal border border-white/[0.06] grid grid-cols-1 lg:grid-cols-2"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-50 w-10 h-10 flex items-center justify-center bg-vault-black/50 border border-white/10 text-white/60 hover:text-white hover:bg-vault-purple hover:border-vault-purple transition-all duration-300"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Section */}
        <div className="relative aspect-square lg:aspect-auto bg-vault-black/50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {product.tag && (
            <div className={`absolute top-6 left-6 px-4 py-2 text-[10px] font-heading font-bold uppercase tracking-widest ${
              product.tag === 'SALE' ? 'bg-vault-red text-white' : 'bg-vault-purple text-white'
            }`}>
              {product.tag}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className="p-6 md:p-10 lg:p-14 flex flex-col justify-center gap-6">
          <div>
            <span className="font-body text-[8px] md:text-[10px] tracking-[0.5em] uppercase text-vault-purple block mb-2 md:mb-3">
              {product.style} · {product.category}
            </span>
            <h2 className="font-heading text-2xl sm:text-4xl lg:text-5xl font-black text-vault-cream uppercase tracking-tighter leading-[0.9] md:leading-[0.85]">
              {product.name}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-heading text-2xl md:text-3xl font-black text-vault-cream">${product.price}</span>
            {product.rating && (
              <div className="flex items-center gap-1.5 ml-auto">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-vault-purple fill-vault-purple' : 'text-white/10'}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-vault-cream/40 block mb-3">Color</span>
              <div className="flex gap-3">
                {product.colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-2 transition-all duration-300 ${
                      selectedColor === i ? 'border-vault-purple scale-110 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'border-white/10 hover:border-white/30'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-body text-[10px] tracking-[0.3em] uppercase text-vault-cream/40">Size</span>
              <span className="font-body text-[10px] text-vault-purple cursor-pointer hover:underline">Size Guide</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 md:py-2.5 text-[10px] md:text-[11px] font-heading font-bold border transition-all duration-300 ${
                    selectedSize === size
                      ? 'bg-vault-purple border-vault-purple text-white shadow-[0_0_20px_rgba(168,85,247,0.2)]'
                      : 'border-white/10 text-vault-cream/60 hover:border-vault-purple/50 hover:text-vault-cream'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <span className="font-body text-[10px] tracking-[0.3em] uppercase text-vault-cream/40 block mb-3">Quantity</span>
            <div className="flex items-center gap-0 w-fit border border-white/10">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-vault-cream/60 hover:text-vault-cream hover:bg-white/5 transition-all duration-200">
                <X className="w-3 h-3 md:w-4 md:h-4 rotate-45" />
              </button>
              <span className="w-12 h-10 md:w-14 md:h-11 flex items-center justify-center font-heading text-xs md:text-sm font-bold text-vault-cream border-x border-white/10">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center text-vault-cream/60 hover:text-vault-cream hover:bg-white/5 transition-all duration-200">
                <Plus className="w-3 h-3 md:w-4 md:h-4" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => {
              onAddToCart({ ...product, selectedSize: selectedSize || product.sizes[0], quantity });
              onClose();
            }}
            className="group relative w-full py-5 bg-vault-cream text-vault-black font-heading text-xs font-bold uppercase tracking-[0.4em] transition-all duration-500 hover:bg-vault-purple hover:text-white hover:shadow-[0_0_60px_rgba(168,85,247,0.25)] hover:scale-[1.02] active:scale-[0.98] overflow-hidden mt-2"
          >
            <span className="relative z-10">Add to Cart — ${product.price * quantity}</span>
          </button>

          {/* Extra Info */}
          <div className="flex items-center gap-6 mt-2">
            <span className="font-body text-[9px] tracking-widest uppercase text-vault-cream/20">Free Shipping</span>
            <span className="w-1 h-1 bg-vault-purple/40 rounded-full" />
            <span className="font-body text-[9px] tracking-widest uppercase text-vault-cream/20">30-Day Returns</span>
            <span className="w-1 h-1 bg-vault-purple/40 rounded-full" />
            <span className="font-body text-[9px] tracking-widest uppercase text-vault-cream/20">Authentic</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}


// Cart drawer handled globally.

// ─── FILTER DROPDOWN ──────────────────────────────────────────────
function FilterDropdown({ label, options, value, onChange, isOpen, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`flex items-center gap-2 px-5 py-3 border text-[10px] font-heading uppercase tracking-widest transition-all duration-300 ${
          isOpen ? 'border-vault-purple/50 text-vault-purple bg-vault-purple/5' : 'border-white/10 text-vault-cream/50 hover:border-white/20 hover:text-vault-cream'
        }`}
      >
        {label}: <span className="text-vault-cream">{value}</span>
        <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 mt-2 min-w-[200px] bg-vault-charcoal border border-white/10 z-50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
          >
            {options.map((opt) => {
              const optValue = typeof opt === 'string' ? opt : opt.value;
              const optLabel = typeof opt === 'string' ? opt : opt.label;
              return (
                <button
                  key={optValue}
                  onClick={() => onChange(optValue)}
                  className={`w-full text-left px-5 py-3 text-[10px] font-heading uppercase tracking-widest transition-all duration-200 ${
                    value === optLabel || value === optValue
                      ? 'bg-vault-purple/10 text-vault-purple'
                      : 'text-vault-cream/50 hover:bg-white/[0.03] hover:text-vault-cream'
                  }`}
                >
                  {optLabel}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


// ─── MAIN STORE PAGE ──────────────────────────────────────────────
export default function StorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [openFilter, setOpenFilter] = useState(null);
  const [priceRange, setPriceRange] = useState("All");
  const containerRef = useRef(null);
  
  const { products, loading } = useProducts();
  const { addToCart, totalItems, setCartOpen } = useCart();

  // Close dropdowns on click outside
  useEffect(() => {
    const handler = (e) => {
      if (!e.target.closest('.relative')) setOpenFilter(null);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  if (loading) {
     return (
        <div className="min-h-screen bg-vault-black flex items-center justify-center">
            <Loader className="w-8 h-8 animate-spin text-vault-purple" />
        </div>
     );
  }

  // Filter & Sort Products
  const filteredProducts = products
    .filter((p) => {
      const matchCategory = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.style.toLowerCase().includes(searchQuery.toLowerCase());
      const matchPrice =
        priceRange === "All" ? true :
        priceRange === "under150" ? p.price < 150 :
        priceRange === "150-250" ? p.price >= 150 && p.price <= 250 :
        priceRange === "250-350" ? p.price >= 250 && p.price <= 350 :
        priceRange === "above350" ? p.price > 350 : true;
      return matchCategory && matchSearch && matchPrice;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "newest") return b.id - a.id;
      return 0;
    });

  // Cart Functions inherited from Context
  const toggleWishlist = (id) => {
    setWishlist((prev) => prev.includes(id) ? prev.filter((wid) => wid !== id) : [...prev, id]);
  };

  const priceOptions = [
    { label: "All Prices", value: "All" },
    { label: "Under $150", value: "under150" },
    { label: "$150 – $250", value: "150-250" },
    { label: "$250 – $350", value: "250-350" },
    { label: "Above $350", value: "above350" },
  ];

  const sortLabel = sortOptions.find((s) => s.value === sortBy)?.label || "Featured";
  const priceLabel = priceOptions.find((p) => p.value === priceRange)?.label || "All Prices";

  return (
    <motion.div
      ref={containerRef}
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen bg-vault-black text-vault-cream"
    >
      {/* ─── STICKY HEADER ─────────────────────────────────────── */}
      <header className="sticky top-0 z-[100] bg-vault-black/90 backdrop-blur-xl border-b border-white/[0.04]">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 py-5 flex items-center justify-between">
          {/* Back + Logo */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="group flex items-center gap-2 text-vault-cream/40 hover:text-vault-purple transition-colors duration-300"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="font-body text-[8px] md:text-[10px] uppercase tracking-widest hidden sm:inline">Back</span>
            </Link>
            <div className="w-px h-6 bg-white/10" />
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-7 h-7 rounded-full bg-vault-purple shadow-neon-purple flex items-center justify-center group-hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-shadow duration-500">
                <div className="w-2.5 h-2.5 bg-vault-black rotate-45 group-hover:rotate-[135deg] transition-transform duration-500" />
              </div>
              <span className="font-heading text-sm font-black tracking-widest text-vault-cream uppercase hidden md:inline">
                SNEAKER<span className="text-vault-purple">VAULT</span>
              </span>
            </Link>
          </div>

          {/* Search */}
          <div className="relative flex-1 max-w-md mx-8 hidden md:block">
            <input
              type="text"
              placeholder="Search sneakers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 px-5 py-3 pl-11 text-[11px] text-white placeholder:text-white/20 focus:outline-none focus:border-vault-purple/50 focus:shadow-[0_0_20px_rgba(168,85,247,0.08)] transition-all duration-500 font-body tracking-wider"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setCartOpen(true)}
            className="relative group flex items-center gap-2 md:gap-3 px-4 py-2.5 md:px-5 md:py-3 border border-white/10 hover:border-vault-purple/40 transition-all duration-300 hover:shadow-[0_0_25px_rgba(168,85,247,0.08)]"
          >
            <ShoppingBag className="w-3.5 h-3.5 md:w-4 md:h-4 text-vault-cream/60 group-hover:text-vault-purple transition-colors duration-300" />
            <span className="font-heading text-[8px] md:text-[10px] uppercase tracking-widest text-vault-cream/60 group-hover:text-vault-cream transition-colors duration-300 hidden sm:inline">Cart</span>
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 w-5 h-5 bg-vault-purple text-white text-[9px] font-bold rounded-full flex items-center justify-center"
              >
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>
      </header>

      {/* ─── PAGE HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute inset-0 z-0">
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.04, 0.07, 0.04] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-vault-purple blur-[250px] rounded-full"
          />
        </div>
        <div className="relative z-10 max-w-[1600px] mx-auto px-6 md:px-16 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-body text-[8px] md:text-[10px] tracking-[0.5em] md:tracking-[1em] uppercase text-vault-purple block mb-4 md:mb-6"
          >
            The Archive
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-3xl sm:text-5xl md:text-7xl lg:text-[6.5rem] font-black text-vault-cream uppercase tracking-tightest leading-[0.9] md:leading-[0.85] mb-4 md:mb-6"
          >
            Full <span className="text-transparent stroke-text">Collection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-body text-xs text-vault-cream/30 tracking-widest uppercase max-w-lg mx-auto"
          >
            {products.length} premium sneakers — curated for those who demand excellence
          </motion.p>
        </div>
      </section>

      {/* ─── CATEGORY TABS ─────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 md:px-6 md:py-3 font-heading text-[9px] md:text-[10px] uppercase tracking-widest transition-all duration-400 border ${
                activeCategory === cat
                  ? 'bg-vault-purple border-vault-purple text-white shadow-[0_0_30px_rgba(168,85,247,0.15)]'
                  : 'border-white/10 text-vault-cream/40 hover:border-white/20 hover:text-vault-cream'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>
      </div>

      {/* ─── FILTERS BAR ───────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center gap-4 justify-between"
        >
          <div className="flex items-center gap-4">
            <SlidersHorizontal className="w-4 h-4 text-vault-cream/20" />
            <FilterDropdown
              label="Price"
              options={priceOptions}
              value={priceLabel}
              onChange={(v) => { setPriceRange(v); setOpenFilter(null); }}
              isOpen={openFilter === 'price'}
              onToggle={() => setOpenFilter(openFilter === 'price' ? null : 'price')}
            />
            <FilterDropdown
              label="Sort"
              options={sortOptions}
              value={sortLabel}
              onChange={(v) => { setSortBy(v); setOpenFilter(null); }}
              isOpen={openFilter === 'sort'}
              onToggle={() => setOpenFilter(openFilter === 'sort' ? null : 'sort')}
            />
          </div>
          <span className="font-body text-[10px] tracking-widest uppercase text-vault-cream/20">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''}
          </span>
        </motion.div>
      </div>

      {/* ─── PRODUCT GRID ──────────────────────────────────────── */}
      <div className="max-w-[1600px] mx-auto px-6 md:px-16 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${sortBy}-${priceRange}-${searchQuery}`}
            variants={staggerGrid}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                  onQuickView={setQuickViewProduct}
                  onWishlist={toggleWishlist}
                  wishlisted={wishlist.includes(product.id)}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full py-32 text-center"
              >
                <p className="font-heading text-3xl font-black text-vault-cream/10 uppercase tracking-wider mb-4">No Results</p>
                <p className="font-body text-xs text-vault-cream/20 tracking-wider">Try adjusting your filters or search term</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ─── FOOTER ────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.04] py-12">
        <div className="max-w-[1600px] mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-heading text-sm font-black tracking-widest text-vault-cream/30 uppercase hover:text-vault-purple transition-colors duration-300">
            SNEAKER<span className="text-vault-purple">VAULT</span>
          </Link>
          <p className="font-body text-[8px] tracking-[0.4em] uppercase text-vault-cream/15 flex items-center gap-4">
            <span>© 2026 SNEAKER VAULT</span>
            <span className="w-1 h-1 bg-vault-purple/40 rounded-full" />
            <span>Engineered in the Void</span>
          </p>
        </div>
      </footer>

      {/* ─── QUICK VIEW MODAL ──────────────────────────────────── */}
      <AnimatePresence>
        {quickViewProduct && (
          <QuickViewModal
            product={quickViewProduct}
            onClose={() => setQuickViewProduct(null)}
            onAddToCart={addToCart}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
