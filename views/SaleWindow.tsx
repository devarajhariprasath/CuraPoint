
import React, { useState } from 'react';
import { 
  ShoppingCart, 
  Search, 
  Plus, 
  Minus, 
  Trash2, 
  Pill, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  Calendar, 
  Tag,
  Lock
} from 'lucide-react';
import { MOCK_PRODUCTS, LKR_FORMATTER } from '../constants.tsx';
import { getSmartProductSuggestions } from '../services/geminiService';
import { useCart } from '../hooks/useCart';
import { useAppContext } from '../context/AppContext';

const SaleWindow: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const { isFeatureEnabled } = useAppContext();
  
  const { 
    cart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    updateItemDiscount,
    globalDiscount,
    setGlobalDiscount,
    subTotal,
    finalTotal,
    interactionWarning,
    isCheckingAI
  } = useCart();

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSmartSuggest = async () => {
    if (!searchTerm || !isFeatureEnabled('AI_ASSIST')) return;
    const suggestions = await getSmartProductSuggestions(searchTerm);
    setAiSuggestions(suggestions);
  };

  return (
    <div className="h-full flex flex-col md:flex-row p-6 gap-6">
      <div className="flex-1 flex flex-col space-y-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="flex-1 flex items-center bg-slate-50 px-4 py-2 rounded-xl border border-slate-100">
            <Search className="text-slate-400 mr-2" size={18} />
            <input 
              type="text" 
              placeholder="Search by name, category or scan barcode..." 
              className="bg-transparent border-none outline-none text-sm w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button 
            onClick={handleSmartSuggest}
            disabled={!isFeatureEnabled('AI_ASSIST')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-semibold shadow-sm ${
              isFeatureEnabled('AI_ASSIST') 
                ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed opacity-60'
            }`}
          >
            {isFeatureEnabled('AI_ASSIST') ? <Sparkles size={16} /> : <Lock size={16} />}
            AI Assist
          </button>
        </div>

        {aiSuggestions.length > 0 && (
          <div className="flex gap-2 items-center overflow-x-auto pb-2 animate-in slide-in-from-top duration-300">
            <span className="text-[10px] font-black text-slate-400 uppercase whitespace-nowrap tracking-wider">AI Suggested:</span>
            {aiSuggestions.map((s, idx) => (
              <button key={idx} onClick={() => setSearchTerm(s)} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-xs text-slate-600 hover:border-indigo-400 hover:text-indigo-600 transition-all font-medium">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 overflow-y-auto pb-6">
          {filteredProducts.map(product => {
            const isExpSoon = new Date(product.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000);
            return (
              <div key={product.id} onClick={() => addToCart(product)} className="bg-white p-4 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-100/30 transition-all cursor-pointer group flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <div className="p-2 bg-slate-50 rounded-lg text-emerald-600 group-hover:bg-emerald-50 transition-colors">
                      <Pill size={20} />
                    </div>
                    {product.isPrescriptionRequired && (
                      <span className="bg-amber-100 text-amber-700 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-tight">Rx Only</span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-800 leading-snug group-hover:text-emerald-700 transition-colors">{product.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{product.brand}</p>
                </div>
                
                <div className="space-y-2.5 mt-4">
                  <div className={`flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-lg w-fit ${isExpSoon ? 'bg-orange-50 text-orange-600 border border-orange-100' : 'bg-slate-50 text-slate-500 border border-slate-100'}`}>
                    <Calendar size={12} />
                    {product.expiryDate}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-700 font-black">{LKR_FORMATTER.format(product.price)}</span>
                    <span className="text-[10px] font-bold text-slate-400">STOCK: {product.stock}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full md:w-[420px] flex flex-col gap-6">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 flex flex-col h-full overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-800 flex items-center gap-2">
              <ShoppingCart size={22} className="text-emerald-600" />
              Invoice Cart
            </h2>
            <span className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
              {cart.length} Items
            </span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 space-y-4 py-12 opacity-50">
                <div className="p-6 bg-slate-50 rounded-full">
                  <ShoppingCart size={48} className="text-slate-200" />
                </div>
                <p className="text-sm font-bold tracking-tight">No products selected yet</p>
              </div>
            ) : (
              cart.map(item => (
                <div key={item.id} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-emerald-200 transition-all space-y-3 group shadow-sm hover:shadow-md">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-slate-800">{item.name}</h4>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{item.category}</p>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center bg-white rounded-xl border border-slate-200 p-1 shadow-sm">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"><Minus size={14} /></button>
                      <input type="number" readOnly value={item.quantity} className="w-10 text-center text-xs font-black bg-transparent outline-none" />
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg"><Plus size={14} /></button>
                    </div>

                    <div className="flex-1 flex items-center bg-white rounded-xl border border-slate-200 px-3 py-1.5 shadow-sm">
                      <Tag size={12} className="text-slate-300 mr-2" />
                      <input 
                        type="number" 
                        placeholder="Disc %"
                        className="w-full bg-transparent outline-none text-xs font-bold placeholder:text-slate-300"
                        value={item.discount || ''}
                        onChange={(e) => updateItemDiscount(item.id, parseFloat(e.target.value) || 0)}
                      />
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-black text-emerald-700">{LKR_FORMATTER.format(item.price * item.quantity * (1 - item.discount/100))}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {(interactionWarning || isCheckingAI) && (
            <div className="mx-6 mb-4 p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3 shadow-inner">
              {isCheckingAI ? <Sparkles size={16} className="text-amber-500 animate-pulse mt-1" /> : <AlertTriangle size={16} className="text-amber-500 mt-1" />}
              <div className="flex-1">
                <p className="text-[10px] font-black text-amber-600 uppercase tracking-widest mb-1">Pharmacist AI Alert</p>
                <p className="text-xs text-amber-800 leading-tight italic font-medium">{isCheckingAI ? "Analyzing combinations..." : interactionWarning}</p>
              </div>
            </div>
          )}

          <div className="p-6 bg-slate-900 text-white rounded-t-[2.5rem] space-y-4 shadow-2xl">
            <div className="space-y-3">
              <div className="flex justify-between text-[10px] text-slate-400 font-black uppercase tracking-[0.15em]">
                <span>Total Items (Sub)</span>
                <span>{LKR_FORMATTER.format(subTotal)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">Global Disc %</span>
                <input 
                  type="number" 
                  className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-1.5 w-20 text-right text-emerald-400 font-black outline-none focus:ring-1 focus:ring-emerald-500"
                  value={globalDiscount || ''}
                  onChange={(e) => setGlobalDiscount(Math.min(100, Math.max(0, parseFloat(e.target.value) || 0)))}
                />
              </div>

              <div className="flex justify-between pt-5 border-t border-slate-800 items-baseline">
                <span className="text-xs font-black uppercase tracking-widest text-emerald-500">Net Payable</span>
                <span className="text-4xl font-black text-white tracking-tighter">{LKR_FORMATTER.format(finalTotal)}</span>
              </div>
            </div>

            <button 
              disabled={cart.length === 0}
              className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-black py-4 rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]"
            >
              <CheckCircle2 size={22} />
              Process & Print Receipt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleWindow;
