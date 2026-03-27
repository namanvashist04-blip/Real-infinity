import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Zap, 
  Target, 
  ShieldAlert,
  ChevronRight
} from 'lucide-react';
import { MOCK_SIGNALS } from '../utils/mockData';
import { TradeSignal } from '../types';

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Market Overview</h2>
          <p className="text-vampire-text/50 text-sm">Welcome back, Hunter. The blood is in the water.</p>
        </div>
        <div className="flex gap-4">
          <div className="glass-card px-4 py-2 flex items-center gap-2 border-vampire-green/20">
            <div className="w-2 h-2 rounded-full bg-vampire-green green-glow animate-pulse" />
            <span className="text-xs font-mono text-vampire-green uppercase tracking-wider">Live Feed</span>
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          label="Active Signals" 
          value="12" 
          change="+3" 
          icon={Activity} 
          color="blood" 
        />
        <StatCard 
          label="Win Rate" 
          value="74.2%" 
          change="+2.1%" 
          icon={Target} 
          color="green" 
        />
        <StatCard 
          label="Total Profit" 
          value="4.28 BTC" 
          change="+0.12" 
          icon={Zap} 
          color="blood" 
        />
        <StatCard 
          label="Risk Exposure" 
          value="Low" 
          change="Safe" 
          icon={ShieldAlert} 
          color="green" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Signals */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <Zap className="w-5 h-5 text-vampire-blood" />
              Recent Intelligence
            </h3>
            <button className="text-xs text-vampire-blood hover:underline uppercase tracking-widest font-bold">View All</button>
          </div>
          <div className="space-y-3">
            {MOCK_SIGNALS.map((signal) => (
              <SignalRow key={signal.id} signal={signal} />
            ))}
          </div>
        </div>

        {/* Sentiment & Whale Activity */}
        <div className="space-y-6">
          <div className="glass-card p-6 border-vampire-blood/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-vampire-blood" />
              Market Sentiment
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between text-xs mb-1">
                <span>Bullish</span>
                <span className="text-vampire-green">68%</span>
              </div>
              <div className="w-full h-2 bg-vampire-grey rounded-full overflow-hidden flex">
                <div className="h-full bg-vampire-green green-glow" style={{ width: '68%' }} />
                <div className="h-full bg-vampire-blood blood-glow" style={{ width: '32%' }} />
              </div>
              <p className="text-[10px] text-vampire-text/40 text-center italic">
                "Fear is subsiding. Greed is rising in the shadows."
              </p>
            </div>
          </div>

          <div className="glass-card p-6 border-vampire-green/10">
            <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Whale Activity</h3>
            <div className="space-y-3">
              <WhaleAlert 
                time="2m ago" 
                msg="500 BTC moved from unknown wallet to Binance" 
                type="bearish" 
              />
              <WhaleAlert 
                time="15m ago" 
                msg="12,000 ETH withdrawn from Coinbase" 
                type="bullish" 
              />
              <WhaleAlert 
                time="45m ago" 
                msg="Large buy order detected at $63,500" 
                type="bullish" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ label, value, change, icon: Icon, color }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className={`glass-card p-5 border-${color === 'blood' ? 'vampire-blood' : 'vampire-green'}/10 relative overflow-hidden group`}
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 bg-${color === 'blood' ? 'vampire-blood' : 'vampire-green'}/5 rounded-full blur-2xl group-hover:bg-${color === 'blood' ? 'vampire-blood' : 'vampire-green'}/10 transition-colors`} />
    <div className="flex justify-between items-start mb-4">
      <div className={`p-2 rounded-lg bg-${color === 'blood' ? 'vampire-blood' : 'vampire-green'}/10`}>
        <Icon className={`w-5 h-5 text-${color === 'blood' ? 'vampire-blood' : 'vampire-green'}`} />
      </div>
      <span className={`text-[10px] font-bold px-2 py-1 rounded bg-${color === 'blood' ? 'vampire-green' : 'vampire-blood'}/10 text-${color === 'blood' ? 'vampire-green' : 'vampire-blood'}`}>
        {change}
      </span>
    </div>
    <p className="text-vampire-text/40 text-xs uppercase tracking-widest font-bold mb-1">{label}</p>
    <p className="text-2xl font-bold tracking-tight">{value}</p>
  </motion.div>
);

const SignalRow: React.FC<{ signal: TradeSignal }> = ({ signal }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ x: 5 }}
      className="glass-card p-4 flex items-center gap-4 hover:border-vampire-blood/30 cursor-pointer transition-all border-l-4 border-l-vampire-blood"
    >
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-bold">{signal.symbol}</span>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${signal.type === 'LONG' ? 'bg-vampire-green/20 text-vampire-green' : 'bg-vampire-blood/20 text-vampire-blood'}`}>
            {signal.type}
          </span>
          <span className="text-[10px] text-vampire-text/40 font-mono">{signal.timestamp.split('T')[1].slice(0, 5)}</span>
        </div>
        <div className="flex gap-3 text-xs text-vampire-text/60">
          <span>Entry: <span className="text-vampire-text font-mono">${signal.entry.toLocaleString()}</span></span>
          <span>TP: <span className="text-vampire-green font-mono">${signal.tp[0].toLocaleString()}</span></span>
          <span>SL: <span className="text-vampire-blood font-mono">${signal.sl.toLocaleString()}</span></span>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xs font-bold mb-1">Confidence</div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-1.5 bg-vampire-grey rounded-full overflow-hidden">
            <div className="h-full bg-vampire-blood blood-glow" style={{ width: `${signal.confidence}%` }} />
          </div>
          <span className="text-xs font-bold text-vampire-blood">{signal.confidence}%</span>
        </div>
      </div>
      <ChevronRight className="w-5 h-5 text-vampire-text/20" />
    </motion.div>
  );
};

const WhaleAlert = ({ time, msg, type }: any) => (
  <div className="flex gap-3 items-start">
    <div className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${type === 'bullish' ? 'bg-vampire-green green-glow' : 'bg-vampire-blood blood-glow'}`} />
    <div>
      <p className="text-[11px] leading-tight text-vampire-text/80">{msg}</p>
      <span className="text-[9px] text-vampire-text/30 font-mono uppercase">{time}</span>
    </div>
  </div>
);
