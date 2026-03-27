import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { TradeFinder } from './components/TradeFinder';
import TradingViewWidget from './components/TradingViewWidget';
import { generateMockChartData } from './utils/mockData';
import { Screen, CandlestickData } from './types';
import { 
  Skull, 
  Search, 
  TrendingUp, 
  Bell, 
  BookOpen, 
  History, 
  PlayCircle, 
  Settings,
  Menu,
  X,
  Ghost,
  ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('DASHBOARD');
  const [chartData, setChartData] = useState<CandlestickData[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    setChartData(generateMockChartData(100));
    
    // Simulate live updates
    const interval = setInterval(() => {
      setChartData(prev => {
        const last = prev[prev.length - 1];
        const nextClose = last.close + (Math.random() - 0.5) * (last.close * 0.001);
        const next: CandlestickData = {
          time: new Date().toISOString(),
          open: last.close,
          close: nextClose,
          high: Math.max(last.close, nextClose) + Math.random() * 5,
          low: Math.min(last.close, nextClose) - Math.random() * 5,
          volume: Math.random() * 1000
        };
        return [...prev.slice(1), next];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'DASHBOARD':
        return <Dashboard />;
      case 'FINDER':
        return <TradeFinder />;
      case 'CHART':
        return (
          <div className="space-y-6 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center shrink-0">
              <h2 className="text-2xl font-bold tracking-tight">Advanced Analysis</h2>
              <div className="flex gap-2">
                <div className="glass-card px-4 py-2 flex items-center gap-2 border-vampire-green/20">
                  <div className="w-2 h-2 rounded-full bg-vampire-green green-glow animate-pulse" />
                  <span className="text-xs font-mono text-vampire-green uppercase tracking-wider">Live Market Data</span>
                </div>
              </div>
            </div>
            <div className="glass-card flex-1 border-vampire-blood/10 overflow-hidden relative">
              <TradingViewWidget symbol="BTCUSDT" interval="15" />
            </div>
          </div>
        );
      case 'ALERTS':
        return <AlertsScreen />;
      case 'JOURNAL':
        return <JournalScreen />;
      case 'BACKTEST':
        return <BacktestScreen />;
      case 'REPLAY':
        return <ReplayScreen />;
      case 'SETTINGS':
        return <SettingsScreen />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex bg-vampire-black overflow-hidden">
      <Sidebar 
        currentScreen={currentScreen} 
        setScreen={(s) => {
          setCurrentScreen(s);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />
      
      <main className={`flex-1 transition-all duration-500 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} p-4 md:p-8 overflow-y-auto h-screen relative`}>
        {(!isSidebarOpen || (isSidebarOpen && window.innerWidth < 1024)) && (
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed top-4 left-4 md:top-6 md:left-6 z-[60] w-10 h-10 md:w-12 md:h-12 bg-vampire-blood rounded-lg flex items-center justify-center blood-glow hover:scale-110 transition-transform"
          >
            <Skull className="text-white w-5 h-5 md:w-6 md:h-6" />
          </motion.button>
        )}

        {/* Background Decorative Elements */}
        <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-vampire-blood/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-64 w-[300px] h-[300px] bg-vampire-blood/5 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

const AlertsScreen = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold tracking-tight">Intelligence Alerts</h2>
      <button className="glass-card px-4 py-2 text-xs font-bold uppercase tracking-widest text-vampire-blood border-vampire-blood/20 hover:bg-vampire-blood/10 transition-colors">
        Clear All
      </button>
    </div>
    <div className="grid gap-4">
      {[
        { id: 1, type: 'WHALE', msg: 'Large BTC inflow detected at $64,200', time: '2m ago', priority: 'HIGH' },
        { id: 2, type: 'LIQUIDITY', msg: 'Liquidity sweep confirmed on ETH/USDT 15m', time: '5m ago', priority: 'MEDIUM' },
        { id: 3, type: 'VOLATILITY', msg: 'SOL/USDT volatility spike (+4.2%)', time: '12m ago', priority: 'LOW' },
        { id: 4, type: 'SIGNAL', msg: 'New High Probability LONG on BTC/USDT', time: '15m ago', priority: 'HIGH' },
      ].map(alert => (
        <motion.div 
          key={alert.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card p-4 flex items-center gap-4 border-l-4 border-l-vampire-blood"
        >
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${alert.priority === 'HIGH' ? 'bg-vampire-blood/20 text-vampire-blood' : 'bg-vampire-grey/20 text-vampire-text/40'}`}>
            <Bell className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-vampire-blood">{alert.type}</span>
              <span className="text-[10px] text-vampire-text/40 font-mono">{alert.time}</span>
            </div>
            <p className="text-sm font-medium">{alert.msg}</p>
          </div>
          <button className="text-vampire-text/20 hover:text-vampire-blood transition-colors">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
    </div>
  </div>
);

const JournalScreen = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">Hunter's Journal</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-card p-6 border-vampire-blood/10">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4">Log New Ritual</h3>
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Asset</label>
              <input type="text" placeholder="BTC/USDT" className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-vampire-blood" />
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Outcome</label>
              <select className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-vampire-blood">
                <option>PROFIT</option>
                <option>LOSS</option>
                <option>BREAKEVEN</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Notes</label>
              <textarea rows={4} placeholder="Describe the market shadows..." className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-vampire-blood resize-none" />
            </div>
            <button className="w-full py-3 bg-vampire-blood rounded-lg font-bold uppercase tracking-widest text-xs blood-glow">Record Entry</button>
          </div>
        </div>
      </div>
      <div className="lg:col-span-2 space-y-4">
        <div className="glass-card p-4 border-vampire-blood/10 flex justify-between items-center">
          <span className="text-sm font-bold">Recent Rituals</span>
          <div className="flex gap-4 text-[10px] font-bold uppercase tracking-widest">
            <span className="text-vampire-green">Win Rate: 68%</span>
            <span className="text-vampire-blood">Losses: 32%</span>
          </div>
        </div>
        {[1, 2, 3].map(i => (
          <div key={i} className="glass-card p-4 border-white/5 flex items-center gap-4">
            <div className={`w-2 h-12 rounded-full ${i % 2 === 0 ? 'bg-vampire-green' : 'bg-vampire-blood'}`} />
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="font-bold">BTC/USDT - Liquidity Sweep</span>
                <span className={`text-xs font-bold ${i % 2 === 0 ? 'text-vampire-green' : 'text-vampire-blood'}`}>{i % 2 === 0 ? '+$1,240' : '-$450'}</span>
              </div>
              <p className="text-xs text-vampire-text/40">Captured the 15m sweep perfectly. Exit at TP2 before reversal.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const BacktestScreen = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">Backtesting Engine</h2>
    <div className="glass-card p-8 border-vampire-blood/10 text-center space-y-6">
      <div className="max-w-md mx-auto space-y-4">
        <History className="w-16 h-16 text-vampire-blood/20 mx-auto" />
        <h3 className="text-xl font-bold">Simulate Historical Shadows</h3>
        <p className="text-sm text-vampire-text/40">Run your strategies against historical data to verify their lethality before entering the live market.</p>
        <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="text-left">
            <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Strategy</label>
            <select className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-2 text-sm">
              <option>SMC Liquidity</option>
              <option>Order Flow</option>
            </select>
          </div>
          <div className="text-left">
            <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Timeframe</label>
            <select className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-2 text-sm">
              <option>15M</option>
              <option>1H</option>
              <option>4H</option>
            </select>
          </div>
        </div>
        <button className="w-full py-4 bg-vampire-blood/10 border border-vampire-blood/30 rounded-xl font-bold uppercase tracking-widest text-sm text-vampire-blood hover:bg-vampire-blood hover:text-white transition-all">Start Simulation</button>
      </div>
    </div>
  </div>
);

const ReplayScreen = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">Market Replay</h2>
    <div className="glass-card aspect-video border-vampire-blood/10 flex flex-col items-center justify-center space-y-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-vampire-blood/5 animate-pulse" />
      <PlayCircle className="w-20 h-20 text-vampire-blood/20 relative z-10" />
      <h3 className="text-xl font-bold relative z-10">Shadow Replay Mode</h3>
      <p className="text-sm text-vampire-text/40 relative z-10">Relive past market movements bar-by-bar to sharpen your instincts.</p>
      <div className="flex gap-4 relative z-10 mt-4">
        <button className="px-6 py-2 bg-vampire-blood rounded-lg text-xs font-bold uppercase tracking-widest blood-glow">Select Date</button>
        <button className="px-6 py-2 glass-card border-white/10 text-xs font-bold uppercase tracking-widest">Load Session</button>
      </div>
    </div>
  </div>
);

const SettingsScreen = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold tracking-tight">System Configuration</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="glass-card p-6 border-vampire-blood/10 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <Settings className="w-4 h-4 text-vampire-blood" />
          General Settings
        </h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm">Dark Mode Ritual</span>
            <div className="w-10 h-5 bg-vampire-blood rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Blood Glow Effects</span>
            <div className="w-10 h-5 bg-vampire-blood rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm">Sound Notifications</span>
            <div className="w-10 h-5 bg-vampire-grey rounded-full relative">
              <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
      <div className="glass-card p-6 border-vampire-blood/10 space-y-6">
        <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-vampire-blood" />
          Security & API
        </h3>
        <div className="space-y-4">
          <p className="text-xs text-vampire-text/40">Your intelligence links are encrypted. No external APIs are currently active.</p>
          <button className="w-full py-2 border border-vampire-blood/20 rounded-lg text-[10px] font-bold uppercase tracking-widest text-vampire-blood">Reset Encryption Keys</button>
        </div>
      </div>
    </div>
  </div>
);
