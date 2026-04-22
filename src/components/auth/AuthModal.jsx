import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const modalOverlay = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.3 } },
};

export default function AuthModal() {
  const { authModalOpen, setAuthModalOpen, login, register } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!authModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
        if (activeTab === 'login') {
          await login(email, password);
        } else {
          if (!name) return;
          await register(name, email, password);
        }
    } finally {
        setIsSubmitting(false);
        // Reset forms
        setName('');
        setEmail('');
        setPassword('');
    }
  };

  return (
    <AnimatePresence>
      {authModalOpen && (
        <motion.div
          variants={modalOverlay}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          onClick={() => setAuthModalOpen(false)}
        >
          <motion.div
            variants={slideUp}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md bg-vault-charcoal border border-white/[0.06] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/[0.06]">
              <span className="font-heading text-lg font-black tracking-widest text-vault-cream uppercase">
                SNEAKER<span className="text-vault-purple">VAULT</span>
              </span>
              <button
                onClick={() => setAuthModalOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-white/10 text-white/40 hover:text-white hover:border-vault-purple hover:bg-vault-purple/10 transition-all duration-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/[0.06]">
              <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 py-4 font-heading text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'login'
                    ? 'text-vault-purple border-b-2 border-vault-purple bg-vault-purple/5'
                    : 'text-vault-cream/40 hover:text-vault-cream'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-4 font-heading text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  activeTab === 'register'
                    ? 'text-vault-purple border-b-2 border-vault-purple bg-vault-purple/5'
                    : 'text-vault-cream/40 hover:text-vault-cream'
                }`}
              >
                Create Account
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <AnimatePresence mode="wait">
                {activeTab === 'register' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-2 overflow-hidden"
                  >
                    <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="John Doe"
                        className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 pl-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-vault-purple/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 font-body"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-2">
                <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="athlete@sneaker-vault.com"
                    className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 pl-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-vault-purple/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 font-body"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between px-1">
                    <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40">Password</label>
                    {activeTab === 'login' && (
                        <a href="#" className="font-body text-[10px] text-vault-purple hover:underline">Forgot password?</a>
                    )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 pl-12 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-vault-purple/50 focus:shadow-[0_0_15px_rgba(168,85,247,0.1)] transition-all duration-300 font-body"
                  />
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-vault-purple text-white font-heading text-xs font-bold uppercase tracking-[0.4em] hover:bg-vault-cream hover:text-vault-black hover:shadow-[0_0_60px_rgba(168,85,247,0.2)] transition-all duration-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-vault-cream" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    activeTab === 'login' ? 'Sign In' : 'Create Account'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
