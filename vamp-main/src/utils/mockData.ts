import { CandlestickData, TradeSignal } from '../types';

export const generateMockChartData = (count: number = 100, basePrice: number = 50000): CandlestickData[] => {
  const data: CandlestickData[] = [];
  let currentPrice = basePrice;
  const now = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date(now.getTime() - (count - i) * 15 * 60000);
    const volatility = currentPrice * 0.005;
    const open = currentPrice;
    const close = currentPrice + (Math.random() - 0.5) * volatility;
    const high = Math.max(open, close) + Math.random() * (volatility * 0.5);
    const low = Math.min(open, close) - Math.random() * (volatility * 0.5);
    const volume = Math.random() * 1000;

    data.push({
      time: date.toISOString(),
      open,
      high,
      low,
      close,
      volume,
    });
    currentPrice = close;
  }
  return data;
};

export const MOCK_SIGNALS: TradeSignal[] = [
  {
    id: '1',
    symbol: 'BTC/USDT',
    type: 'LONG',
    entry: 64200.50,
    sl: 63850.00,
    tp: [64800, 65500, 67000],
    rr: 3.5,
    confidence: 88,
    strategy: ['Liquidity Sweep', 'Order Block'],
    reasoning: 'Price swept the previous daily low liquidity and tapped into a 15m bullish order block. Strong displacement following the sweep suggests institutional buying.',
    timestamp: new Date().toISOString(),
    status: 'ACTIVE',
  },
  {
    id: '2',
    symbol: 'ETH/USDT',
    type: 'SHORT',
    entry: 3450.20,
    sl: 3485.00,
    tp: [3400, 3320, 3200],
    rr: 2.8,
    confidence: 72,
    strategy: ['Simplified SMC', 'FVG Fill'],
    reasoning: 'Bearish market structure break on the 5m timeframe after filling a 1H Fair Value Gap. Expecting a retracement to the discount zone.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    status: 'PENDING',
  },
  {
    id: '3',
    symbol: 'SOL/USDT',
    type: 'LONG',
    entry: 142.10,
    sl: 139.50,
    tp: [146, 152, 160],
    rr: 4.2,
    confidence: 91,
    strategy: ['Order Flow', 'Liquidity Sweep'],
    reasoning: 'Aggressive order flow shift on the 1m timeframe after a deep liquidity sweep of the London session low. High volume profile support at entry.',
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    status: 'TP1',
  }
];

export const STRATEGIES = [
  'Liquidity Sweep',
  'Simplified SMC',
  'Order Flow',
  'FVG (Fair Value Gap)',
  'BOS (Break of Structure)',
  'CHoCH (Change of Character)'
];

export const SYMBOLS = [
  'BTC/USDT',
  'ETH/USDT',
  'SOL/USDT',
  'BNB/USDT',
  'XRP/USDT',
  'ADA/USDT'
];
