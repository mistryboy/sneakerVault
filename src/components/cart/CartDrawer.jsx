import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

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

export default function CartDrawer() {
  const { cart, cartOpen, setCartOpen, updateCartQty, removeFromCart, totalPrice, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            variants={modalOverlay}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-[150] bg-black/70 backdrop-blur-sm"
            onClick={() => setCartOpen(false)}
          />
          <motion.aside
            variants={slideIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed top-0 right-0 bottom-0 z-[160] w-full max-w-md bg-vault-charcoal border-l border-white/[0.06] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-8 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-vault-purple" />
                <h3 className="font-heading text-lg font-black text-vault-cream uppercase tracking-wider">Your Cart</h3>
                <span className="w-6 h-6 bg-vault-purple text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              </div>
              <button onClick={() => setCartOpen(false)} className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-vault-purple hover:bg-vault-purple/10 transition-all duration-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                  <ShoppingBag className="w-16 h-16 text-white/5" />
                  <p className="font-body text-sm text-vault-cream/30">Your cart is empty</p>
                  <button 
                    onClick={() => {
                        setCartOpen(false);
                        navigate('/store');
                    }} 
                    className="font-heading text-[10px] uppercase tracking-widest text-vault-purple hover:underline"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  {cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize}`}
                      layout
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -30, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex gap-4 p-4 bg-vault-black/40 border border-white/[0.04]"
                    >
                      <div className="w-20 h-20 flex-shrink-0 bg-vault-black overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="font-heading text-xs font-bold text-vault-cream uppercase tracking-wider truncate">{item.name}</h4>
                          <p className="font-body text-[9px] text-vault-cream/30 mt-0.5">Size: {item.selectedSize}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-0 border border-white/10">
                            <button onClick={() => updateCartQty(item, -1)} className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-8 h-7 flex items-center justify-center font-heading text-[11px] font-bold text-vault-cream border-x border-white/10">{item.quantity}</span>
                            <button onClick={() => updateCartQty(item, 1)} className="w-7 h-7 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/5 transition-colors">
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-heading text-sm font-bold text-vault-cream">${item.price * item.quantity}</span>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item)} className="self-start text-white/20 hover:text-vault-red transition-colors duration-200">
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-white/[0.06] space-y-5">
                <div className="flex items-center justify-between">
                  <span className="font-body text-xs uppercase tracking-widest text-vault-cream/40">Subtotal</span>
                  <span className="font-heading text-2xl font-black text-vault-cream">${totalPrice}</span>
                </div>
                <p className="font-body text-[9px] text-vault-cream/20 tracking-wider uppercase">Shipping & taxes calculated at checkout</p>
                <button className="w-full py-5 bg-vault-purple text-white font-heading text-xs font-bold uppercase tracking-[0.4em] hover:bg-vault-cream hover:text-vault-black hover:shadow-[0_0_60px_rgba(168,85,247,0.2)] transition-all duration-500 active:scale-[0.98]">
                  Checkout
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
