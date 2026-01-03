import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ShoppingCart, Trash2, Refrigerator } from 'lucide-react';
import { DayPlan, ShoppingItem, FridgeItem } from '@/types/diet';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ShoppingListProps {
  weekPlan: DayPlan[];
  fridgeItems: FridgeItem[];
  onMoveToFridge: (items: Omit<FridgeItem, 'id'>[]) => void;
}

export function ShoppingList({ weekPlan, fridgeItems, onMoveToFridge }: ShoppingListProps) {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());

  const shoppingItems = useMemo(() => {
    const itemsMap = new Map<string, ShoppingItem>();

    // 1. Calculate required items from meals
    weekPlan.forEach((day) => {
      day.meals
        .filter((meal) => meal.confirmed)
        .forEach((meal) => {
          const recipe = meal.recipes.find(r => r.id === meal.selectedRecipeId) || meal.recipes[0];
          recipe.ingredients.forEach((ing) => {
            // Use a key that combines name and unit to avoid merging incompatible units for now
            // Normalize name to lowercase for aggregation to avoid "Pasta" vs "pasta" issues
            const normalizedName = ing.name.trim();
            const key = `${normalizedName.toLowerCase()}-${ing.unit}`;
            
            const existing = itemsMap.get(key);
            if (existing) {
              existing.quantity += ing.quantity;
            } else {
              itemsMap.set(key, {
                id: key,
                name: normalizedName, // Keep original casing of first occurrence
                quantity: ing.quantity,
                unit: ing.unit,
                checked: false,
                category: getCategoryForIngredient(ing.name),
              });
            }
          });
        });
    });

    let initialList = Array.from(itemsMap.values());

    // 2. Subtract fridge inventory
    return initialList.map(item => {
        // Find matching item in fridge (case insensitive)
        // We also check for unit match. If units differ, we skip for safety (future improvement: conversions)
        const fridgeItem = fridgeItems.find(f => 
            f.name.toLowerCase() === item.name.toLowerCase() && 
            f.unit === item.unit
        );

        if (fridgeItem) {
            const needed = item.quantity;
            const available = fridgeItem.quantity;
            const remainingNeeded = needed - available;

            if (remainingNeeded <= 0) {
                return null; // Fully covered by fridge
            }

            return { ...item, quantity: remainingNeeded };
        }

        return item;
    })
    .filter((item): item is ShoppingItem => item !== null)
    .sort((a, b) => a.category.localeCompare(b.category));
  }, [weekPlan, fridgeItems]);

  const toggleItem = (itemId: string) => {
    setCheckedItems((prev) => {
      const next = new Set(prev);
      if (next.has(itemId)) {
        next.delete(itemId);
      } else {
        next.add(itemId);
      }
      return next;
    });
  };

  const clearChecked = () => {
    setCheckedItems(new Set());
  };

  const moveCheckedToFridge = () => {
    const itemsToMove = shoppingItems.filter(item => checkedItems.has(item.id));
    
    const fridgeItems: Omit<FridgeItem, 'id'>[] = itemsToMove.map(item => ({
      name: item.name,
      quantity: item.quantity,
      unit: item.unit,
      category: getCategoryAsFridgeCategory(item.category),
    }));

    onMoveToFridge(fridgeItems);
    setCheckedItems(new Set());
    
    toast({
      title: "Articoli aggiunti al frigo! 🎉",
      description: `${itemsToMove.length} articoli spostati nel frigorifero`,
    });
  };

  const groupedItems = useMemo(() => {
    const groups: Record<string, ShoppingItem[]> = {};
    shoppingItems.forEach((item) => {
      if (!groups[item.category]) {
        groups[item.category] = [];
      }
      groups[item.category].push(item);
    });
    return groups;
  }, [shoppingItems]);

  const checkedCount = checkedItems.size;
  const totalItems = shoppingItems.length;

  if (shoppingItems.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
          <ShoppingCart className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-1">Nessun articolo</h3>
        <p className="text-sm text-muted-foreground">
          Conferma i tuoi pasti per generare la lista della spesa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">
            {checkedCount}/{totalItems} completati
          </span>
          <div className="w-32 h-2 bg-muted rounded-full mt-1 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(checkedCount / totalItems) * 100}%` }}
              className="h-full bg-primary rounded-full"
            />
          </div>
        </div>
        {checkedCount > 0 && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={clearChecked}>
              <Trash2 className="w-4 h-4 mr-1" />
              Resetta
            </Button>
            <Button size="sm" onClick={moveCheckedToFridge}>
              <Refrigerator className="w-4 h-4 mr-1" />
              Sposta in frigo
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              {getCategoryLabel(category)}
            </h3>
            <div className="space-y-2">
              <AnimatePresence>
                {items.map((item) => {
                  const isChecked = checkedItems.has(item.id);
                  return (
                    <motion.button
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      onClick={() => toggleItem(item.id)}
                      className={cn(
                        "w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left",
                        isChecked
                          ? "bg-accent/50 border border-primary/30"
                          : "bg-card border border-border hover:border-primary/50"
                      )}
                    >
                      <div
                        className={cn(
                          "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                          isChecked
                            ? "bg-primary border-primary"
                            : "border-muted-foreground"
                        )}
                      >
                        {isChecked && <Check className="w-3 h-3 text-primary-foreground" />}
                      </div>
                      <span className={cn("flex-1", isChecked && "line-through text-muted-foreground")}>
                        {item.name}
                      </span>
                      <span className={cn(
                        "font-medium text-sm",
                        isChecked ? "text-muted-foreground" : "text-foreground"
                      )}>
                        {item.quantity} {item.unit}
                      </span>
                    </motion.button>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {checkedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-24 left-4 right-4 max-w-lg mx-auto"
        >
          <Button 
            className="w-full shadow-lg" 
            size="lg"
            onClick={moveCheckedToFridge}
          >
            <Refrigerator className="w-5 h-5 mr-2" />
            Sposta {checkedCount} articoli in frigo
          </Button>
        </motion.div>
      )}
    </div>
  );
}

function getCategoryForIngredient(name: string): string {
  const lower = name.toLowerCase();
  if (['pollo', 'manzo', 'maiale', 'salmone', 'merluzzo', 'tonno', 'uova', 'tacchino'].some(k => lower.includes(k))) {
    return 'proteine';
  }
  if (['latte', 'yogurt', 'formaggio', 'parmigiano', 'feta', 'mozzarella', 'philadelphia', 'actimel'].some(k => lower.includes(k))) {
    return 'latticini';
  }
  if (['mela', 'banana', 'mirtilli', 'fragole', 'limone', 'arancia', 'avocado', 'frutta'].some(k => lower.includes(k))) {
    return 'frutta';
  }
  if (['pomodor', 'zucchin', 'peperon', 'spinaci', 'cetriolo', 'insalata', 'prezzemolo', 'verdur'].some(k => lower.includes(k))) {
    return 'verdure';
  }
  return 'altro';
}

function getCategoryAsFridgeCategory(category: string): FridgeItem['category'] {
  if (['proteine', 'latticini', 'frutta', 'verdure'].includes(category)) {
    return category as FridgeItem['category'];
  }
  return 'altro';
}

function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    proteine: '🥩 Proteine',
    latticini: '🧀 Latticini',
    frutta: '🍎 Frutta',
    verdure: '🥬 Verdure',
    altro: '🛒 Altro',
  };
  return labels[category] || category;
}
