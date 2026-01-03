import { format, parseISO, isToday } from 'date-fns';
import { it } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { DayPlan } from '@/types/diet';
import { cn } from '@/lib/utils';

interface WeekSelectorProps {
  weekPlan: DayPlan[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export function WeekSelector({ weekPlan, selectedDate, onSelectDate }: WeekSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {weekPlan.map((day) => {
        const date = parseISO(day.date);
        const isSelected = day.date === selectedDate;
        const today = isToday(date);
        const confirmedCount = day.meals.filter(m => m.confirmed).length;
        const allConfirmed = confirmedCount === day.meals.length;

        return (
          <motion.button
            key={day.id}
            onClick={() => onSelectDate(day.date)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
              "flex flex-col items-center min-w-[4.5rem] px-3 py-3 rounded-xl transition-all relative",
              isSelected
                ? "bg-primary text-primary-foreground shadow-glow"
                : "bg-card hover:bg-accent text-foreground border border-border"
            )}
          >
            <span className={cn(
              "text-xs font-medium uppercase tracking-wide",
              isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {format(date, 'EEE', { locale: it })}
            </span>
            <span className="text-lg font-bold mt-0.5">
              {format(date, 'd')}
            </span>
            {today && !isSelected && (
              <motion.div
                layoutId="today-dot"
                className="w-1.5 h-1.5 rounded-full bg-primary mt-1"
              />
            )}
            {allConfirmed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={cn(
                  "absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px]",
                  isSelected ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                )}
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
