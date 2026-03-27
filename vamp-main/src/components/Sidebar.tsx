import React from 'react';
import { 
  LayoutDashboard, 
  Search, 
  TrendingUp, 
  Bell, 
  BookOpen, 
  History, 
  PlayCircle, 
  Settings,
  Skull
} from 'lucide-react';
import { Screen } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentScreen: Screen;
  setScreen: (screen: Screen) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentScreen, setScreen, isOpen, onToggle }) => {
  const menuItems = [
    { id: 'DASHBOARD', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'FINDER', icon: Search, label: 'Trade Finder' },
    { id: 'CHART', icon: TrendingUp, label: 'Analysis' },
    { id: 'ALERTS', icon: Bell, label: 'Alerts' },
    { id: 'JOURNAL', icon: BookOpen, label: 'Journal' },
    { id: 'BACKTEST', icon: History, label: 'Backtest' },
    { id: 'REPLAY', icon: PlayCircle, label: 'Replay' },
    { id: 'SETTINGS', icon: Settings, label: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      <div 
        className={cn(
          "w-64 h-screen bg-vampire-black border-r border-vampire-blood/20 flex flex-col p-4 fixed left-0 top-0 z-50 transition-transform duration-500 ease-in-out",
          !isOpen && "-translate-x-full"
        )}
      >
      <button 
        onClick={onToggle}
        className="flex items-center gap-3 mb-10 px-2 hover:opacity-80 transition-opacity text-left w-full"
      >
        <div className="w-10 h-10 bg-vampire-blood rounded-lg flex items-center justify-center blood-glow shrink-0">
          <Skull className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold tracking-tighter neon-text-blood text-vampire-blood whitespace-nowrap">
          VAMPIRE<span className="text-vampire-text">TRADE</span>
        </h1>
      </button>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id as Screen)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
              currentScreen === item.id 
                ? "bg-vampire-blood/10 text-vampire-blood border border-vampire-blood/20" 
                : "text-vampire-text/50 hover:text-vampire-text hover:bg-white/5"
            )}
          >
            <item.icon className={cn(
              "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
              currentScreen === item.id ? "text-vampire-blood" : "text-inherit"
            )} />
            <span className="font-medium text-sm">{item.label}</span>
            {currentScreen === item.id && (
              <div className="ml-auto w-1.5 h-1.5 rounded-full bg-vampire-blood blood-glow" />
            )}
          </button>
        ))}
      </nav>

      <div className="mt-auto p-4 glass-card border-vampire-blood/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-vampire-blood to-vampire-black border border-vampire-blood/30" />
          <div>
            <p className="text-xs font-bold">Vashist Dimple</p>
            <p className="text-[10px] text-vampire-blood font-mono uppercase tracking-widest">Elite Hunter</p>
          </div>
        </div>
      </div>
    </div>
  </>
);
};
