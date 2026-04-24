import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PackagePlus, Loader, ShieldAlert, List, Trash2, Edit2, X } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminPage() {
  const navigate = useNavigate();
  const { products, loading: productsLoading, addProduct, updateProduct, deleteProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'inventory'
  const [editingId, setEditingId] = useState(null);

  const initialForm = {
    name: '',
    price: '',
    originalPrice: '',
    image: '',
    hoverImage: '',
    sizes: 'UK 6, UK 7, UK 8, UK 9, UK 10, UK 11',
    category: 'Volt Series',
    description: '',
    newRelease: false,
    inStock: true
  };

  const [formData, setFormData] = useState(initialForm);

  const handlePasscodeSubmit = (e) => {
    e.preventDefault();
    if (passcode === "sneakerVault12") {
      setIsAuthenticated(true);
    } else {
      setErrorMsg("Access Denied.");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const sizesArray = formData.sizes.split(',').map(s => s.trim());
      
      const payload = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        image: formData.image,
        hoverImage: formData.hoverImage || formData.image,
        sizes: sizesArray,
        category: formData.category,
        description: formData.description,
        newRelease: formData.newRelease,
        inStock: formData.inStock,
      };

      if (editingId) {
        updateProduct(editingId, payload);
        setSuccess('Product thoroughly modified.');
        setEditingId(null);
        setActiveTab('inventory');
      } else {
        payload.id = 'p' + Date.now();
        payload.createdAt = new Date().toISOString();
        addProduct(payload);
        setSuccess('Product successfully deployed to the Vault.');
      }
      
      setTimeout(() => setSuccess(''), 3000);
      setFormData(initialForm);

    } catch (error) {
      console.error("Error updating products: ", error);
      alert('Action failed: ' + error.message);
    }
    setLoading(false);
  };

  const handleDeleteItem = (id, name) => {
    if (window.confirm(`WARNING: Are you absolutely sure you want to permanently delete "${name}" from the Vault?`)) {
      try {
        deleteProduct(id);
        setSuccess(`"${name}" was securely purged.`);
        setTimeout(() => setSuccess(''), 3000);
      } catch (err) {
        alert("Failed to delete: " + err.message);
      }
    }
  };

  const handleEditInit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      image: product.image,
      hoverImage: product.hoverImage,
      sizes: product.sizes.join(', '),
      category: product.category,
      description: product.description,
      newRelease: product.newRelease,
      inStock: product.inStock
    });
    setEditingId(product.id);
    setActiveTab('upload');
    window.scrollTo(0,0);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData(initialForm);
    setActiveTab('inventory');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-vault-charcoal flex items-center justify-center pt-24 font-inter text-white">
        <div className="flex flex-col items-center gap-6 w-full max-w-sm text-center px-4">
            <ShieldAlert className="w-16 h-16 text-vault-purple" />
            <h1 className="font-heading text-4xl uppercase tracking-tighter font-black">Archive Access</h1>
            <p className="font-body text-xs text-white/50 tracking-widest uppercase mb-4">Enter vault passcode to proceed.</p>
            
            <form onSubmit={handlePasscodeSubmit} className="w-full space-y-4">
              <input 
                 type="password" 
                 value={passcode} 
                 onChange={(e) => { setPasscode(e.target.value); setErrorMsg(""); }}
                 className="w-full bg-white/[0.02] border border-white/10 px-4 py-4 text-center text-sm text-white focus:border-vault-purple focus:outline-none transition-colors tracking-[0.3em] font-mono" 
                 placeholder="PASSCODE" 
               />
               {errorMsg && <p className="text-vault-red text-xs font-heading font-bold uppercase tracking-widest mt-2">{errorMsg}</p>}
               
              <button 
                type="submit"
                className="w-full mt-4 px-8 py-4 bg-vault-purple border border-vault-purple text-vault-cream hover:bg-vault-cream hover:text-vault-black hover:shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all font-heading text-xs font-bold uppercase tracking-widest"
              >
                Unlock Vault
              </button>
            </form>

            <button 
              onClick={() => navigate('/')} 
              className="mt-6 px-8 py-3 border border-white/5 text-white/40 hover:bg-white/5 hover:text-white transition-all font-heading text-[10px] font-bold uppercase tracking-widest"
            >
              Return Home
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-vault-black py-32 px-8 font-inter text-white">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-6 mb-8 border-b border-white/5 pb-8">
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-vault-purple/10 flex items-center justify-center">
                    <PackagePlus className="w-6 h-6 text-vault-purple" />
                </div>
                <div>
                    <h1 className="font-heading text-4xl font-black uppercase tracking-tighter text-vault-cream">Archive <span className="text-transparent stroke-text">Control</span></h1>
                    <p className="font-body text-[10px] tracking-widest uppercase text-white/40 mt-1">Push and Manage models directly in Firestore</p>
                </div>
            </div>
            
            <button 
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-white/10 text-white/40 hover:bg-white/5 hover:text-white transition-all font-heading text-[10px] font-bold uppercase tracking-widest"
            >
              Return to Site
            </button>
        </div>

        {/* Tab Selection */}
        <div className="flex gap-4 mb-8">
            <button
               onClick={() => { setActiveTab('upload'); if(!editingId) setFormData(initialForm); }}
               className={`flex-1 py-4 border font-heading text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'upload' ? 'bg-vault-purple border-vault-purple text-white shadow-neon-purple' : 'border-white/10 text-white/40 hover:bg-white/5'}`}
            >
                <span className="flex items-center justify-center gap-2"><PackagePlus className="w-4 h-4" /> {editingId ? 'Edit Product' : 'Deploy New'}</span>
            </button>
             <button
               onClick={() => setActiveTab('inventory')}
               className={`flex-1 py-4 border font-heading text-[10px] font-bold uppercase tracking-widest transition-all ${activeTab === 'inventory' ? 'bg-vault-purple border-vault-purple text-white shadow-neon-purple' : 'border-white/10 text-white/40 hover:bg-white/5'}`}
            >
                <span className="flex items-center justify-center gap-2"><List className="w-4 h-4" /> Manage Inventory</span>
            </button>
        </div>

        <AnimatePresence mode="wait">
            {success && (
                <motion.div initial={{opacity: 0, y:-10}} animate={{opacity: 1, y:0}} exit={{opacity: 0}} className="mb-8 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-heading text-xs font-bold uppercase tracking-widest text-center">
                    {success}
                </motion.div>
            )}
        </AnimatePresence>

        {activeTab === 'upload' ? (
            <motion.form initial={{opacity: 0}} animate={{opacity: 1}} onSubmit={handleSubmit} className="bg-vault-charcoal p-10 border border-white/[0.03] shadow-2xl space-y-8 relative">
                {editingId && (
                  <div className="absolute top-0 left-0 right-0 py-2 bg-vault-purple/20 border-b border-vault-purple/30 text-center font-heading text-[10px] uppercase tracking-widest text-vault-purple">
                     Editing Mode Active
                     <button type="button" onClick={cancelEdit} className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-vault-red"><X className="w-4 h-4" /></button>
                  </div>
                )}
                <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${editingId ? 'pt-8' : ''}`}>
                    <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Product Name</label>
                        <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="e.g. Aero-MAX V3" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-vault-black border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors">
                            <option>Volt Series</option>
                            <option>Stealth Core</option>
                            <option>Neon City</option>
                            <option>Ancestral Tech</option>
                            <option>Lifestyle</option>
                            <option>Running</option>
                            <option>Training</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Price ($)</label>
                        <input type="number" name="price" required value={formData.price} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="280" />
                    </div>
                    <div className="space-y-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Original Price ($) (Optional)</label>
                        <input type="number" name="originalPrice" value={formData.originalPrice} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="320" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Main Image URL</label>
                        <input type="url" name="image" required value={formData.image} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Hover Image URL (Optional)</label>
                        <input type="url" name="hoverImage" value={formData.hoverImage} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="https://images.unsplash.com/..." />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Available Sizes (Comma separated)</label>
                        <input type="text" name="sizes" required value={formData.sizes} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                        <label className="font-body text-[10px] tracking-widest uppercase text-vault-cream/40 px-1">Description</label>
                        <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full bg-white/[0.02] border border-white/10 px-4 py-3 text-sm text-white focus:border-vault-purple focus:outline-none transition-colors" placeholder="Engineered for maximum velocity..."></textarea>
                    </div>
                    
                    <div className="flex items-center gap-8 md:col-span-2 pt-4 border-t border-white/5">
                       <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="newRelease" checked={formData.newRelease} onChange={handleChange} className="w-5 h-5 accent-vault-purple" />
                            <span className="font-body text-xs uppercase tracking-widest text-white/80">Mark as New Release</span>
                       </label>
                       <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} className="w-5 h-5 accent-vault-purple" />
                            <span className="font-body text-xs uppercase tracking-widest text-white/80">In Stock</span>
                       </label>
                    </div>
                </div>

                <div className="pt-6">
                    <button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-4 py-5 bg-vault-purple text-white font-heading text-sm font-bold uppercase tracking-[0.3em] hover:bg-vault-cream hover:text-vault-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? <Loader className="w-5 h-5 animate-spin" /> : <PackagePlus className="w-5 h-5" />}
                        {loading ? 'Processing...' : editingId ? 'Update Product' : 'Deploy Product'}
                    </button>
                </div>
            </motion.form>
        ) : (
             <motion.div initial={{opacity: 0}} animate={{opacity: 1}} className="bg-vault-charcoal border border-white/[0.03] shadow-2xl p-6">
                {productsLoading ? (
                    <div className="py-20 flex justify-center"><Loader className="w-8 h-8 animate-spin text-vault-purple" /></div>
                ) : products.length === 0 ? (
                    <div className="py-20 text-center text-white/30 font-heading tracking-widest uppercase">Vault is currently empty.</div>
                ) : (
                    <div className="divide-y divide-white/5">
                        {products.map(product => (
                            <div key={product.id} className="py-6 flex items-center gap-6 group hover:bg-white/[0.02] -mx-6 px-6 transition-colors">
                                <div className="w-20 h-20 bg-vault-black/50 flex-shrink-0 relative overflow-hidden">
                                     <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                                     {product.newRelease && <div className="absolute top-0 right-0 w-3 h-3 bg-vault-purple" />}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-heading text-lg font-black uppercase text-vault-cream mb-1">{product.name}</h4>
                                    <div className="font-body text-[10px] tracking-widest uppercase text-white/40 flex items-center gap-4">
                                         <span className="text-vault-purple">${product.price}</span>
                                         <span>ID: {product.id}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                     <button 
                                        onClick={() => handleEditInit(product)}
                                        className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white border-white hover:text-vault-black transition-all"
                                        title="Edit Product"
                                      >
                                          <Edit2 className="w-4 h-4" />
                                     </button>
                                     <button 
                                        onClick={() => handleDeleteItem(product.id, product.name)}
                                        className="w-10 h-10 border border-white/10 flex items-center justify-center text-vault-red/50 hover:bg-vault-red hover:border-vault-red hover:text-white transition-all"
                                        title="Delete Product"
                                      >
                                          <Trash2 className="w-4 h-4" />
                                     </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </motion.div>
        )}
      </div>
    </div>
  );
}
