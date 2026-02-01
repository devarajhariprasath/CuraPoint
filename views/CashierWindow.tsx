
import React from 'react';
import { ShieldCheck, LogOut, Clock, Landmark, DollarSign, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import { LKR_FORMATTER } from '../constants.tsx';

const CashierWindow: React.FC = () => {
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Cashier Desk</h1>
          <p className="text-slate-500">Manage your terminal sessions and petty cash</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-2xl font-bold shadow-lg shadow-red-100 hover:bg-red-600 transition-all">
          <LogOut size={20} />
          Close Shift
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl">
            <Landmark size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Initial Cash</p>
            <p className="text-2xl font-black text-slate-800">{LKR_FORMATTER.format(5000)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Sales Today</p>
            <p className="text-2xl font-black text-slate-800">{LKR_FORMATTER.format(48250)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-4 bg-slate-50 text-slate-400 rounded-2xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Shift Time</p>
            <p className="text-xl font-bold text-slate-800">04:25:12</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center gap-2">
            <ShieldCheck size={20} className="text-emerald-500" />
            <h2 className="text-lg font-bold text-slate-800">Petty Cash Log</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {[
                { type: 'OUT', reason: 'Tea & Coffee', amount: 250, time: '10:15 AM' },
                { type: 'OUT', reason: 'Cleaning supplies', amount: 1200, time: '11:30 AM' },
                { type: 'IN', reason: 'Change added', amount: 5000, time: '09:00 AM' },
              ].map((log, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                  <div className="flex items-center gap-3">
                    {log.type === 'IN' ? (
                      <ArrowUpCircle className="text-emerald-500" size={20} />
                    ) : (
                      <ArrowDownCircle className="text-rose-500" size={20} />
                    )}
                    <div>
                      <p className="text-sm font-bold text-slate-800">{log.reason}</p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase">{log.time}</p>
                    </div>
                  </div>
                  <p className={`font-bold ${log.type === 'IN' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {log.type === 'IN' ? '+' : '-'} {LKR_FORMATTER.format(log.amount)}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold hover:border-emerald-300 hover:text-emerald-500 transition-all">
              + Add Transaction
            </button>
          </div>
        </div>

        <div className="bg-emerald-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <p className="text-emerald-400 text-xs font-black uppercase tracking-widest mb-2">Terminal #01 Balance</p>
              <h3 className="text-5xl font-black">{LKR_FORMATTER.format(52050)}</h3>
              <p className="mt-4 text-emerald-100 text-sm max-w-[250px]">
                This is the total expected cash in the drawer including the float.
              </p>
            </div>
            <div className="space-y-3 mt-8">
              <div className="flex justify-between items-center text-sm border-b border-emerald-800 pb-2">
                <span>Card Payments</span>
                <span className="font-bold">Rs. 12,400.00</span>
              </div>
              <div className="flex justify-between items-center text-sm border-b border-emerald-800 pb-2">
                <span>Digital Wallets</span>
                <span className="font-bold">Rs. 8,250.00</span>
              </div>
            </div>
          </div>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-800 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-700 rounded-full blur-3xl opacity-20 -ml-24 -mb-24"></div>
        </div>
      </div>
    </div>
  );
};

export default CashierWindow;
