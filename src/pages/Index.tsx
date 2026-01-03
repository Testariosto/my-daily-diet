import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Salad } from 'lucide-react';
import { DayPlan, FridgeItem } from '@/types/diet';
import { sampleWeekPlan, sampleFridge } from '@/data/sampleDiet';
import { Navigation } from '@/components/Navigation';
import { WeekSelector } from '@/components/WeekSelector';
import { DayView } from '@/components/DayView';
import { ShoppingList } from '@/components/ShoppingList';
import { FridgeInventory } from '@/components/FridgeInventory';

const Index = () => {
  const [activeTab, setActiveTab] = useState<'piano' | 'spesa' | 'frigo'>('piano');
  const [weekPlan, setWeekPlan] = useState<DayPlan[]>(sampleWeekPlan);
  const [fridgeItems, setFridgeItems] = useState<FridgeItem[]>(sampleFridge);
  const [selectedDate, setSelectedDate] = useState(weekPlan[0]?.date || '');

  const selectedDay = weekPlan.find(d => d.date === selectedDate);

  const handleConfirmMeal = useCallback((mealId: string, recipeId: string) => {
    setWeekPlan(prev => prev.map(day => ({
      ...day,
      meals: day.meals.map(meal =>
        meal.id === mealId
          ? { ...meal, confirmed: true, selectedRecipeId: recipeId }
          : meal
      ),
    })));
  }, []);

  const handleSelectRecipe = useCallback((mealId: string, recipeId: string) => {
    setWeekPlan(prev => prev.map(day => ({
      ...day,
      meals: day.meals.map(meal =>
        meal.id === mealId
          ? { ...meal, selectedRecipeId: recipeId }
          : meal
      ),
    })));
  }, []);

  const handleAddFridgeItem = useCallback((item: Omit<FridgeItem, 'id'>) => {
    const newItem: FridgeItem = {
      ...item,
      id: `f${Date.now()}`,
    };
    setFridgeItems(prev => [...prev, newItem]);
  }, []);

  const handleAddMultipleFridgeItems = useCallback((items: Omit<FridgeItem, 'id'>[]) => {
    const newItems = items.map((item, index) => ({
      ...item,
      id: `f${Date.now()}-${index}`,
    }));
    setFridgeItems(prev => [...prev, ...newItems]);
  }, []);

  const handleRemoveFridgeItem = useCallback((id: string) => {
    setFridgeItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const handleUpdateFridgeQuantity = useCallback((id: string, quantity: number) => {
    setFridgeItems(prev => prev.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  }, []);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-lg border-b border-border">
        <div className="max-w-lg mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Salad className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">DietTracker</h1>
              <p className="text-xs text-muted-foreground">La tua dieta sotto controllo</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {activeTab === 'piano' && (
            <motion.div
              key="piano"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <WeekSelector
                weekPlan={weekPlan}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
              />
              {selectedDay && (
                <DayView
                  dayPlan={selectedDay}
                  onConfirmMeal={handleConfirmMeal}
                  onSelectRecipe={handleSelectRecipe}
                />
              )}
            </motion.div>
          )}

          {activeTab === 'spesa' && (
            <motion.div
              key="spesa"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Lista della spesa</h2>
                <p className="text-muted-foreground">Basata sui pasti confermati</p>
              </div>
              <ShoppingList weekPlan={weekPlan} onMoveToFridge={handleAddMultipleFridgeItems} />
            </motion.div>
          )}

          {activeTab === 'frigo' && (
            <motion.div
              key="frigo"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-foreground">Il mio frigorifero</h2>
                <p className="text-muted-foreground">Tieni traccia di cosa hai in casa</p>
              </div>
              <FridgeInventory
                items={fridgeItems}
                onAddItem={handleAddFridgeItem}
                onRemoveItem={handleRemoveFridgeItem}
                onUpdateQuantity={handleUpdateFridgeQuantity}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
