
import React, { useState } from 'react';
import Layout from './components/Layout';
import SaleWindow from './views/SaleWindow';
import CashierWindow from './views/CashierWindow';
import ReturnsRefunds from './views/ReturnsRefunds';
import Dashboard from './views/Dashboard';
import { ViewType } from './types';
import { AppProvider } from './context/AppContext';

const AppContent: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('DASHBOARD');

  const renderView = () => {
    switch (activeView) {
      case 'DASHBOARD': return <Dashboard />;
      case 'SALE': return <SaleWindow />;
      case 'CASHIER': return <CashierWindow />;
      case 'RETURNS': return <ReturnsRefunds type="RETURN" />;
      case 'REFUNDS': return <ReturnsRefunds type="REFUND" />;
      case 'PAYMENT':
        return (
          <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-md w-full text-center space-y-6">
              <div className="p-8 bg-white rounded-[3rem] border border-slate-200 shadow-xl space-y-6">
                <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <span className="text-4xl font-black">Rs</span>
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800">Quick Payment</h2>
                  <p className="text-slate-500">Scan QR or use terminal to pay</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 border border-slate-200 rounded-2xl flex flex-col items-center gap-2 hover:border-emerald-500 transition-all">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">HelaPay</span>
                    <img src="https://picsum.photos/seed/helapay/40/40" className="w-10 h-10 rounded-lg" alt="HelaPay" />
                  </button>
                  <button className="p-4 border border-slate-200 rounded-2xl flex flex-col items-center gap-2 hover:border-emerald-500 transition-all">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">LankaPay</span>
                    <img src="https://picsum.photos/seed/lankapay/40/40" className="w-10 h-10 rounded-lg" alt="LankaPay" />
                  </button>
                </div>
                <button onClick={() => setActiveView('SALE')} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">
                  Back to Sale
                </button>
              </div>
            </div>
          </div>
        );
      default: return <Dashboard />;
    }
  };

  return (
    <Layout activeView={activeView} setActiveView={setActiveView}>
      {renderView()}
    </Layout>
  );
};

const App: React.FC = () => (
  <AppProvider>
    <AppContent />
  </AppProvider>
);

export default App;
