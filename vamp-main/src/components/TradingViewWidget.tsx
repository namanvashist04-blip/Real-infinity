import React, { useEffect, useRef, memo } from 'react';

interface TradingViewWidgetProps {
  symbol: string;
  interval?: string;
  theme?: 'light' | 'dark';
  autosize?: boolean;
}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ 
  symbol, 
  interval = '5', 
  theme = 'dark',
  autosize = true 
}) => {
  const container = useRef<HTMLDivElement>(null);
  const widgetId = useRef(`tradingview_${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    if (!container.current) return;

    // Clean up previous widget if any
    container.current.innerHTML = '';
    
    const widgetContainer = document.createElement('div');
    widgetContainer.id = widgetId.current;
    widgetContainer.style.height = "100%";
    widgetContainer.style.width = "100%";
    container.current.appendChild(widgetContainer);

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    
    // Format symbol for TradingView (e.g., BTC/USDT -> BINANCE:BTCUSDT)
    const formattedSymbol = symbol.includes(':') ? symbol : `BINANCE:${symbol.replace('/', '')}`;

    script.innerHTML = JSON.stringify({
      "autosize": autosize,
      "symbol": formattedSymbol,
      "interval": interval,
      "timezone": "Etc/UTC",
      "theme": theme,
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "allow_symbol_change": true,
      "calendar": false,
      "support_host": "https://www.tradingview.com",
      "backgroundColor": "#0B0B0B",
      "gridColor": "rgba(42, 42, 42, 0.06)",
      "hide_side_toolbar": false,
      "container_id": widgetId.current
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, [symbol, interval, theme, autosize]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "100%", width: "100%" }} />
  );
};

export default memo(TradingViewWidget);
