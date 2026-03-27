export interface CandlestickData {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface TradeSignal {
  id: string;
  symbol: string;
  type: 'LONG' | 'SHORT';
  entry: number;
  sl: number;
  tp: number[];
  rr: number;
  confidence: number;
  strategy: string[];
  reasoning: string;
  timestamp: string;
  status: 'PENDING' | 'ACTIVE' | 'TP1' | 'TP2' | 'TP3' | 'SL' | 'CLOSED';
}

export interface MarketSentiment {
  bullish: number;
  bearish: number;
  neutral: number;
  overall: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
}

export type Screen = 'DASHBOARD' | 'FINDER' | 'CHART' | 'ALERTS' | 'JOURNAL' | 'BACKTEST' | 'REPLAY' | 'SETTINGS';
