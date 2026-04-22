import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, X, ShoppingBag } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed top-24 right-8 z-[300] flex flex-col gap-4 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className="pointer-events-auto"
          >
            <div className={`relative group w-80 glass-dark p-4 overflow-hidden border-l-4 ${
              toast.type === 'success' ? 'border-vault-purple' : 'border-red-500'
            }`}>
              {/* Type-specific glow background */}
              <div className={`absolute inset-0 opacity-10 blur-2xl -z-10 ${
                toast.type === 'success' ? 'bg-vault-purple' : 'bg-red-500'
              }`} />

              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {toast.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-vault-purple" />
                  ) : toast.type === 'cart' ? (
                    <ShoppingBag className="w-5 h-5 text-vault-purple" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
                
                <div className="flex-1">
                  <p className="font-heading text-[10px] font-black tracking-widest uppercase text-vault-cream/40 mb-1">
                    {toast.type === 'success' ? 'Notification' : toast.type === 'cart' ? 'Vault Update' : 'System Alert'}
                  </p>
                  <p className="font-body text-xs text-white leading-relaxed">
                    {toast.message}
                  </p>
                </div>

                <button 
                  onClick={() => removeToast(toast.id)}
                  className="text-white/20 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Progress bar timer */}
              <motion.div 
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{ duration: 5, ease: 'linear' }}
                className={`absolute bottom-0 left-0 h-[1px] ${
                  toast.type === 'success' ? 'bg-vault-purple/40' : 'bg-red-500/40'
                }`}
              />
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
