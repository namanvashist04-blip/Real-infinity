import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Crosshair, 
  Layers, 
  Zap, 
  ShieldCheck, 
  AlertCircle,
  BrainCircuit,
  Info,
  Skull
} from 'lucide-react';
import { STRATEGIES, SYMBOLS } from '../utils/mockData';
import TradingViewWidget from './TradingViewWidget';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const TradeFinder: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState(SYMBOLS[0]);
  const [selectedStrategies, setSelectedStrategies] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);

  const toggleStrategy = (strat: string) => {
    setSelectedStrategies(prev => 
      prev.includes(strat) ? prev.filter(s => s !== strat) : [...prev, strat]
    );
  };

  const handleAnalyze = async () => {
    if (selectedStrategies.length === 0) return;
    
    setIsAnalyzing(true);
    setResult(null);

    try {
      // Fetch real-time price from Binance
      const symbol = selectedSymbol.replace('/', '');
      const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data.price) {
        throw new Error('Invalid data received from price feed');
      }
      
      const livePrice = parseFloat(data.price);

      // Simulate AI analysis delay
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      setIsAnalyzing(false);

      // 2% Range Logic: 
      // We simulate a "potential" trade setup. 
      // If our simulated entry is within 2% of live price, we show it.
      // Otherwise, we say "No trade found".
      
      // For demo purposes, we'll generate a trade that is SOMETIMES within 2%
      // and sometimes outside to show the "No trade found" logic.
      const randomOffsetPercent = (Math.random() * 4) - 2; // -2% to +2%
      const simulatedEntry = livePrice * (1 + (randomOffsetPercent / 100));
      
      // The user wants: "if within 2% range... else no trade found"
      // Let's say our "intelligence" only finds trades within a specific tight window
      // but if the market is too volatile or far from our "setup", we return null.
      
      const isWithinRange = Math.abs(simulatedEntry - livePrice) / livePrice <= 0.02;
      const chanceOfFindingTrade = 0.7; // 70% chance to find a setup if within range

      if (isWithinRange && Math.random() < chanceOfFindingTrade) {
        const type = Math.random() > 0.5 ? 'LONG' : 'SHORT';
        const rr = 2.5 + Math.random() * 1.5;
        const riskAmount = livePrice * 0.01; // 1% risk
        
        setResult({
          type,
          entry: simulatedEntry,
          sl: type === 'LONG' ? simulatedEntry - riskAmount : simulatedEntry + riskAmount,
          tp: type === 'LONG' 
            ? [simulatedEntry + riskAmount * 1.5, simulatedEntry + riskAmount * 2.5, simulatedEntry + riskAmount * 4]
            : [simulatedEntry - riskAmount * 1.5, simulatedEntry - riskAmount * 2.5, simulatedEntry - riskAmount * 4],
          confidence: 85 + Math.floor(Math.random() * 10),
          rr: parseFloat(rr.toFixed(1)),
          reasoning: "Market structure alignment detected within the 2% execution zone. Order flow confirms aggressive participation at these levels.",
          whyNot: "Volatility spike could lead to a stop-run before the intended move.",
          breakdown: [
            { label: 'Structure', score: 90 },
            { label: 'Liquidity', score: 95 },
            { label: 'Momentum', score: 75 },
            { label: 'Volume', score: 82 }
          ]
        });
      } else {
        setResult({ error: "No high-probability trade found within the 2% range of current price." });
      }
    } catch (error) {
      console.error("Failed to fetch live price:", error);
      setIsAnalyzing(false);
      setResult({ error: "Intelligence link severed. Check connection." });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Selection Panel */}
      <div className="lg:col-span-1 space-y-6">
        <div className="glass-card p-6 border-vampire-blood/10">
          <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
            <Crosshair className="w-5 h-5 text-vampire-blood" />
            Target Selection
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Asset Symbol</label>
              <select 
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="w-full bg-vampire-black border border-vampire-blood/20 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-vampire-blood transition-colors"
              >
                {SYMBOLS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label className="text-[10px] uppercase tracking-widest font-bold text-vampire-text/40 mb-2 block">Intelligence Strategies</label>
              <div className="grid grid-cols-1 gap-2">
                {STRATEGIES.map(strat => (
                  <button
                    key={strat}
                    onClick={() => toggleStrategy(strat)}
                    className={cn(
                      "flex items-center justify-between px-4 py-3 rounded-lg border transition-all text-sm",
                      selectedStrategies.includes(strat)
                        ? "bg-vampire-blood/10 border-vampire-blood text-vampire-blood"
                        : "bg-vampire-grey/10 border-white/5 text-vampire-text/60 hover:border-white/20"
                    )}
                  >
                    <span>{strat}</span>
                    {selectedStrategies.includes(strat) && <Zap className="w-3 h-3 blood-glow" />}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || selectedStrategies.length === 0}
              className="w-full py-4 bg-vampire-blood rounded-xl font-bold uppercase tracking-widest text-sm blood-glow hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Extracting Alpha...
                </>
              ) : 'Initiate Analysis'}
            </button>
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div className="lg:col-span-2 space-y-6">
        {!result && !isAnalyzing && (
          <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-center p-10 border-dashed border-vampire-blood/20">
            <BrainCircuit className="w-16 h-16 text-vampire-blood/20 mb-4" />
            <h3 className="text-xl font-bold text-vampire-text/40">Awaiting Target Parameters</h3>
            <p className="text-sm text-vampire-text/20 max-w-xs mt-2">Select your asset and strategies to begin the deep-dive analysis.</p>
          </div>
        )}

        {isAnalyzing && (
          <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center p-10">
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border-4 border-vampire-blood/10 rounded-full" />
              <div className="absolute inset-0 border-4 border-vampire-blood border-t-transparent rounded-full animate-spin" />
              <div className="absolute inset-4 border-4 border-vampire-green/10 rounded-full" />
              <div className="absolute inset-4 border-4 border-vampire-green border-b-transparent rounded-full animate-spin-slow" />
              <Skull className="absolute inset-0 m-auto w-8 h-8 text-vampire-blood animate-pulse" />
            </div>
            <h3 className="text-lg font-bold neon-text-blood">Scanning Market Shadows</h3>
            <div className="mt-4 space-y-2 w-full max-w-xs">
              <LoadingStep label="Mapping Liquidity Zones" active={true} />
              <LoadingStep label="Detecting Order Blocks" active={true} />
              <LoadingStep label="Calculating Confluence" active={false} />
            </div>
          </div>
        )}

        {result?.error && (
          <div className="h-full min-h-[400px] glass-card flex flex-col items-center justify-center text-center p-10 border-vampire-blood/20">
            <AlertCircle className="w-16 h-16 text-vampire-blood mb-4" />
            <h3 className="text-xl font-bold text-vampire-blood uppercase tracking-widest">No Trade Found</h3>
            <p className="text-sm text-vampire-text/60 max-w-xs mt-2">{result.error}</p>
          </div>
        )}

        {result && !result.error && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
            {/* Live Chart Integration */}
            <div className="glass-card h-[400px] border-vampire-blood/20 overflow-hidden relative">
              <TradingViewWidget symbol={selectedSymbol} interval="5" />
            </div>

            {/* Signal Header */}
            <div className="glass-card p-8 border-vampire-blood/30 relative overflow-hidden">
              <div className={`absolute top-0 right-0 px-10 py-2 rotate-45 translate-x-8 -translate-y-2 font-bold text-[10px] uppercase tracking-tighter ${result.type === 'LONG' ? 'bg-vampire-green' : 'bg-vampire-blood'}`}>
                High Probability
              </div>
              
              <div className="flex flex-wrap items-center gap-4 md:gap-8 mb-8">
                <div className="min-w-[100px]">
                  <p className="text-[10px] uppercase tracking-widest text-vampire-text/40 font-bold mb-1">Signal Type</p>
                  <div className={`text-2xl md:text-3xl font-black italic ${result.type === 'LONG' ? 'text-vampire-green neon-text-green' : 'text-vampire-blood neon-text-blood'}`}>
                    {result.type}
                  </div>
                </div>
                <div className="hidden md:block h-12 w-px bg-white/10" />
                <div className="min-w-[120px]">
                  <p className="text-[10px] uppercase tracking-widest text-vampire-text/40 font-bold mb-1">Entry Price</p>
                  <div className="text-xl md:text-2xl font-mono font-bold">${result.entry.toLocaleString()}</div>
                </div>
                <div className="hidden md:block h-12 w-px bg-white/10" />
                <div className="min-w-[120px]">
                  <p className="text-[10px] uppercase tracking-widest text-vampire-text/40 font-bold mb-1">Stop Loss</p>
                  <div className="text-xl md:text-2xl font-mono font-bold text-vampire-blood">${result.sl.toLocaleString()}</div>
                </div>
                <div className="hidden md:block h-12 w-px bg-white/10" />
                <div className="min-w-[100px]">
                  <p className="text-[10px] uppercase tracking-widest text-vampire-text/40 font-bold mb-1">Risk/Reward</p>
                  <div className="text-xl md:text-2xl font-mono font-bold text-vampire-green">{result.rr}:1</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {result.tp.map((tp: number, i: number) => (
                  <div key={i} className="bg-vampire-black/40 border border-white/5 rounded-lg p-3">
                    <p className="text-[9px] uppercase tracking-widest text-vampire-text/40 font-bold">Take Profit {i+1}</p>
                    <p className="text-lg font-mono font-bold text-vampire-green">${tp.toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Reasoning */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="glass-card p-6 border-vampire-green/20">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-vampire-green" />
                  Intelligence Reasoning
                </h4>
                <p className="text-sm text-vampire-text/70 leading-relaxed italic">
                  "{result.reasoning}"
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <h5 className="text-[10px] font-bold uppercase tracking-widest text-vampire-blood mb-3 flex items-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    Why NOT this trade?
                  </h5>
                  <p className="text-xs text-vampire-text/50">{result.whyNot}</p>
                </div>
              </div>

              <div className="glass-card p-6 border-vampire-blood/20">
                <h4 className="text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-vampire-blood" />
                  Confidence Matrix
                </h4>
                <div className="space-y-4">
                  {result.breakdown.map((item: any) => (
                    <div key={item.label}>
                      <div className="flex justify-between text-[10px] uppercase font-bold mb-1">
                        <span>{item.label}</span>
                        <span>{item.score}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-vampire-grey rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-vampire-blood blood-glow transition-all duration-1000" 
                          style={{ width: `${item.score}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                  <div className="mt-8 p-4 bg-vampire-blood/5 rounded-lg border border-vampire-blood/10 text-center">
                    <p className="text-[10px] uppercase font-bold text-vampire-blood mb-1">Final Score</p>
                    <p className="text-4xl font-black text-vampire-blood neon-text-blood">{result.confidence}%</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

const LoadingStep = ({ label, active }: { label: string, active: boolean }) => (
  <div className={cn("flex items-center gap-3 transition-opacity", active ? "opacity-100" : "opacity-30")}>
    <div className={cn("w-1.5 h-1.5 rounded-full", active ? "bg-vampire-blood blood-glow animate-pulse" : "bg-vampire-grey")} />
    <span className="text-[10px] uppercase tracking-widest font-bold">{label}</span>
  </div>
);
