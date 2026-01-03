import { motion } from 'framer-motion';
import { CalendarDays, ShoppingCart, Refrigerator } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavigationProps {
  activeTab: 'piano' | 'spesa' | 'frigo';
  onTabChange: (tab: 'piano' | 'spesa' | 'frigo') => void;
}

const tabs = [
  { id: 'piano' as const, label: 'Piano', icon: CalendarDays },
  { id: 'spesa' as const, label: 'Spesa', icon: ShoppingCart },
  { id: 'frigo' as const, label: 'Frigo', icon: Refrigerator },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-lg border-t border-border z-50">
      <div className="max-w-lg mx-auto px-4">
        <div className="flex items-center justify-around py-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={cn(
                  "relative flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-accent rounded-xl"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className="w-5 h-5 relative z-10" />
                <span className="text-xs font-medium relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="h-safe-area-inset-bottom bg-card" />
    </nav>
  );
}
