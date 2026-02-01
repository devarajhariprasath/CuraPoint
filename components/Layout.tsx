
import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  CreditCard, 
  UserRound, 
  RotateCcw, 
  History, 
  Settings,
  LogOut,
  Bell,
  Search,
  Store,
  Crown
} from 'lucide-react';
import { ViewType } from '../types';
import { useAppContext } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  setActiveView: (view: ViewType) => void;
}

const NavItem: React.FC<{ 
  icon: React.ElementType; 
  label: string; 
  active: boolean; 
  onClick: () => void;
  badge?: number;
}> = ({ icon: Icon, label, active, onClick, badge }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
      active 
        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' 
        : 'text-slate-500 hover:bg-slate-100'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium">{label}</span>
    {badge && (
      <span className="ml-auto bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
        {badge}
      </span>
    )}
  </button>
);

const Layout: React.FC<LayoutProps> = ({ children, activeView, setActiveView }) => {
  const { user, tier } = useAppContext();

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 space-y-8 z-20 shadow-xl shadow-slate-100">
        <div className="flex items-center space-x-3 px-2">
          <div className="bg-emerald-600 p-2 rounded-lg">
            <Store className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">CuraPoint</span>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mb-3">Main Menu</p>
          <NavItem icon={LayoutDashboard} label="Dashboard" active={activeView === 'DASHBOARD'} onClick={() => setActiveView('DASHBOARD')} />
          <NavItem icon={ShoppingCart} label="Sale Window" active={activeView === 'SALE'} onClick={() => setActiveView('SALE')} />
          <NavItem icon={CreditCard} label="Payments" active={activeView === 'PAYMENT'} onClick={() => setActiveView('PAYMENT')} />
          <NavItem icon={UserRound} label="Cashier" active={activeView === 'CASHIER'} onClick={() => setActiveView('CASHIER')} />
          
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4 mt-8 mb-3">Operations</p>
          <NavItem icon={RotateCcw} label="Returns" active={activeView === 'RETURNS'} onClick={() => setActiveView('RETURNS')} badge={2} />
          <NavItem icon={History} label="Refunds" active={activeView === 'REFUNDS'} onClick={() => setActiveView('REFUNDS')} />
        </nav>

        <div className="pt-6 border-t border-slate-100">
          <NavItem icon={Settings} label="Settings" active={false} onClick={() => {}} />
          <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors mt-2 font-medium">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center bg-slate-100 px-4 py-2 rounded-xl w-96 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
            <Search className="text-slate-400 mr-2" size={18} />
            <input type="text" placeholder="Quick search..." className="bg-transparent border-none outline-none text-sm w-full" />
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-tighter gap-1.5 border border-emerald-100 shadow-sm shadow-emerald-50">
              <Crown size={12} />
              {tier} Subscription
            </div>
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Bell size={22} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center space-x-3 border-l pl-6 border-slate-200">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-800 leading-none">{user.name}</p>
                <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wider mt-1">{user.role}</p>
              </div>
              <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover ring-2 ring-emerald-50" alt="Avatar" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-50/50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
