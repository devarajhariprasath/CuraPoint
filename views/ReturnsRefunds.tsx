
import React from 'react';
import { FileSearch, ArrowRight, CornerUpLeft, UserCircle, Receipt } from 'lucide-react';
import { LKR_FORMATTER } from '../constants.tsx';

const ReturnsRefunds: React.FC<{ type: 'RETURN' | 'REFUND' }> = ({ type }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${type === 'RETURN' ? 'bg-indigo-100 text-indigo-600' : 'bg-rose-100 text-rose-600'}`}>
          {type === 'RETURN' ? <CornerUpLeft size={32} /> : <Receipt size={32} />}
        </div>
        <h1 className="text-3xl font-black text-slate-800">
          {type === 'RETURN' ? 'Inventory Return' : 'Financial Refund'}
        </h1>
        <p className="text-slate-500">
          Search for an existing invoice to process a {type.toLowerCase()}.
        </p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-100 space-y-8">
        <div className="space-y-4">
          <label className="text-sm font-bold text-slate-400 uppercase tracking-widest px-1">Invoice Number</label>
          <div className="flex gap-4">
            <div className="flex-1 flex items-center bg-slate-50 px-6 py-4 rounded-2xl border border-slate-100 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
              <FileSearch className="text-slate-400 mr-4" size={24} />
              <input 
                type="text" 
                placeholder="INV-2024-00125" 
                className="bg-transparent border-none outline-none text-xl font-bold w-full placeholder:text-slate-300"
              />
            </div>
            <button className="px-8 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2">
              Find Invoice
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Mocked Search Result */}
        <div className="pt-8 border-t border-slate-100 space-y-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
                <UserCircle size={28} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-800">Amara Gunawardena</p>
                <p className="text-xs text-slate-500">Last visited: 2 days ago</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Total Value</p>
              <p className="text-2xl font-black text-emerald-600">{LKR_FORMATTER.format(4250.50)}</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
             <div className="flex justify-between items-center text-sm font-semibold text-slate-600 border-b border-slate-200 pb-3">
               <span>Items in Invoice</span>
               <span>Select for {type === 'RETURN' ? 'Return' : 'Refund'}</span>
             </div>
             {[
               { name: 'Panadol 500mg', qty: 20, price: 110 },
               { name: 'Cetirizine 10mg', qty: 10, price: 120 },
             ].map((item, idx) => (
               <div key={idx} className="flex justify-between items-center py-2">
                 <div>
                   <p className="font-bold text-slate-800">{item.name}</p>
                   <p className="text-xs text-slate-400">Qty: {item.qty} • Total: {LKR_FORMATTER.format(item.price)}</p>
                 </div>
                 <input type="checkbox" className="w-6 h-6 rounded-lg border-slate-300 text-indigo-600 focus:ring-indigo-500" />
               </div>
             ))}
          </div>

          <div className="flex gap-4">
            <button className="flex-1 py-4 border-2 border-slate-200 rounded-2xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button className={`flex-1 py-4 text-white rounded-2xl font-bold shadow-lg transition-all ${type === 'RETURN' ? 'bg-indigo-600 shadow-indigo-100 hover:bg-indigo-700' : 'bg-rose-600 shadow-rose-100 hover:bg-rose-700'}`}>
              Process {type}
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 p-6 rounded-3xl flex gap-4">
        <div className="p-3 bg-white rounded-2xl text-blue-600 shadow-sm">
          <Receipt size={24} />
        </div>
        <div>
          <h4 className="font-bold text-blue-800">Subscription Notice</h4>
          <p className="text-sm text-blue-600 leading-relaxed">
            As a <b>Premium Plus</b> subscriber, your return window is extended to 90 days for non-perishable goods. AI fraud detection is currently monitoring this terminal.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReturnsRefunds;
