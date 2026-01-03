import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns';
import { it } from 'date-fns/locale';
import { motion } from 'framer-motion';
import { DayPlan } from '@/types/diet';
import { MealCard } from './MealCard';
import { cn } from '@/lib/utils';

interface DayViewProps {
  dayPlan: DayPlan;
  onConfirmMeal: (mealId: string, recipeId: string) => void;
  onSelectRecipe: (mealId: string, recipeId: string) => void;
}

function formatDayLabel(dateStr: string): string {
  const date = parseISO(dateStr);
  if (isToday(date)) return 'Oggi';
  if (isTomorrow(date)) return 'Domani';
  if (isYesterday(date)) return 'Ieri';
  return format(date, 'EEEE', { locale: it });
}

export function DayView({ dayPlan, onConfirmMeal, onSelectRecipe }: DayViewProps) {
  const date = parseISO(dayPlan.date);
  const dayLabel = formatDayLabel(dayPlan.date);
  const confirmedCount = dayPlan.meals.filter(m => m.confirmed).length;
  const totalMeals = dayPlan.meals.length;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-4"
    >
      <div className="flex items-end justify-between">
        <div>
          <h2 className={cn(
            "text-2xl font-bold capitalize",
            isToday(date) ? "text-gradient" : "text-foreground"
          )}>
            {dayLabel}
          </h2>
          <p className="text-muted-foreground">
            {format(date, 'd MMMM yyyy', { locale: it })}
          </p>
        </div>
        <div className="text-right">
          <span className="text-sm text-muted-foreground">
            {confirmedCount}/{totalMeals} pasti confermati
          </span>
          <div className="w-24 h-2 bg-muted rounded-full mt-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(confirmedCount / totalMeals) * 100}%` }}
              className="h-full bg-primary rounded-full"
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        {dayPlan.meals.map((meal, index) => (
          <motion.div
            key={meal.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <MealCard
              meal={meal}
              onConfirm={onConfirmMeal}
              onSelectRecipe={onSelectRecipe}
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
