
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  Package, 
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { LKR_FORMATTER } from '../constants.tsx';

const data = [
  { name: '08 AM', sales: 4000 },
  { name: '10 AM', sales: 7500 },
  { name: '12 PM', sales: 12000 },
  { name: '02 PM', sales: 9000 },
  { name: '04 PM', sales: 15000 },
  { name: '06 PM', sales: 18000 },
  { name: '08 PM', sales: 11000 },
];

const StatCard: React.FC<{ 
  title: string; 
  value: string; 
  trend: number; 
  icon: React.ElementType; 
  color: string;
}> = ({ title, value, trend, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-2xl ${color} bg-opacity-10 text-${color.split('-')[1]}-600`}>
        <Icon size={24} />
      </div>
      <div className={`flex items-center text-xs font-bold ${trend > 0 ? 'text-emerald-500' : 'text-rose-500'}`}>
        {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        {Math.abs(trend)}%
      </div>
    </div>
    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{title}</h3>
    <p className="text-2xl font-black text-slate-800">{value}</p>
  </div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Vihar Pharmacy Overview</h1>
          <p className="text-slate-500 font-medium">Borella Branch • Terminal #01</p>
        </div>
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button className="px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold transition-all">Today</button>
          <button className="px-6 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">Week</button>
          <button className="px-6 py-2 text-slate-500 hover:bg-slate-50 rounded-xl text-sm font-bold transition-all">Month</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={LKR_FORMATTER.format(124500)} trend={12} icon={TrendingUp} color="bg-emerald-500" />
        <StatCard title="Total Patients" value="156" trend={8} icon={Users} color="bg-indigo-500" />
        <StatCard title="New Stock" value="45 Units" trend={-2} icon={Package} color="bg-amber-500" />
        <StatCard title="Expiring Soon" value="12 Items" trend={4} icon={AlertCircle} color="bg-rose-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-xl font-bold text-slate-800">Hourly Sales Performance</h2>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-emerald-500 rounded-full"></span>
                In-Store
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 10}} dy={10} />
                <YAxis hide />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="sales" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white flex flex-col justify-between overflow-hidden relative">
          <div className="relative z-10">
            <h2 className="text-xl font-bold mb-6">Recent Prescriptions</h2>
            <div className="space-y-6">
              {[
                { name: 'Dilshan Silva', time: '5 mins ago', status: 'Success' },
                { name: 'S. Kularatne', time: '12 mins ago', status: 'Success' },
                { name: 'Kamal Perera', time: '28 mins ago', status: 'Pending' },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                      {p.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{p.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">{p.time}</p>
                    </div>
                  </div>
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-black uppercase ${p.status === 'Success' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <button className="relative z-10 w-full mt-8 py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-sm font-bold border border-white/10 transition-all">
            View All Activity
          </button>
          {/* Decorative radial gradient */}
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500 opacity-20 blur-[100px]"></div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
