import React, { useMemo } from 'react';
import { 
  ComposedChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine,
  Area
} from 'recharts';
import { CandlestickData } from '../types';

interface ChartProps {
  data: CandlestickData[];
  height?: number;
}

export const TradingChart: React.FC<ChartProps> = ({ data, height = 400 }) => {
  const chartData = useMemo(() => {
    return data.map(d => ({
      ...d,
      // Recharts doesn't have a native candlestick, so we simulate it with bars and lines
      // We'll use a Bar for the body and another for the wick (or just one bar with custom shape)
      // For simplicity in this mock, we'll use a Bar to represent the body and show high/low in tooltip
      color: d.close >= d.open ? '#0F3D2E' : '#8B0000',
      body: [d.open, d.close],
      wick: [d.low, d.high],
      displayTime: new Date(d.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));
  }, [data]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const d = payload[0].payload;
      return (
        <div className="glass-card p-3 border-vampire-blood/20 text-[10px] font-mono">
          <p className="text-vampire-text/60 mb-1">{new Date(d.time).toLocaleString()}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <span>O: <span className="text-vampire-text">${d.open.toFixed(2)}</span></span>
            <span>H: <span className="text-vampire-green">${d.high.toFixed(2)}</span></span>
            <span>L: <span className="text-vampire-blood">${d.low.toFixed(2)}</span></span>
            <span>C: <span className="text-vampire-text">${d.close.toFixed(2)}</span></span>
          </div>
          <p className="mt-1">Vol: <span className="text-vampire-text/80">{d.volume.toFixed(2)}</span></p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full relative" style={{ height }}>
      {/* Overlay: Liquidity Zones */}
      <div className="absolute top-10 left-0 w-full h-4 bg-vampire-blood/5 border-y border-vampire-blood/10 flex items-center px-4 z-10">
        <span className="text-[8px] font-bold text-vampire-blood uppercase tracking-widest">Sell Side Liquidity</span>
      </div>
      <div className="absolute bottom-20 left-0 w-full h-6 bg-vampire-green/5 border-y border-vampire-green/10 flex items-center px-4 z-10">
        <span className="text-[8px] font-bold text-vampire-green uppercase tracking-widest">Buy Side Liquidity</span>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8B0000" stopOpacity={0.1}/>
              <stop offset="95%" stopColor="#8B0000" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="displayTime" 
            stroke="#2A2A2A" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            interval={Math.floor(chartData.length / 6)}
          />
          <YAxis 
            domain={['auto', 'auto']} 
            stroke="#2A2A2A" 
            fontSize={10} 
            tickLine={false} 
            axisLine={false}
            orientation="right"
            tickFormatter={(val) => `$${val.toLocaleString()}`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#2A2A2A', strokeWidth: 1 }} />
          
          {/* Volume Area */}
          <Area 
            type="monotone" 
            dataKey="volume" 
            stroke="none" 
            fill="url(#colorVol)" 
            yAxisId={0} 
          />

          {/* Candlestick Simulation */}
          <Bar dataKey="close" barSize={8}>
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>

          {/* Simulated Order Block */}
          <ReferenceLine 
            y={chartData[Math.floor(chartData.length * 0.7)].low} 
            stroke="#0F3D2E" 
            strokeDasharray="3 3" 
            label={{ position: 'left', value: 'OB', fill: '#0F3D2E', fontSize: 8 }} 
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};
