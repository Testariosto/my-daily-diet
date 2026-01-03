import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChefHat, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Meal, Recipe } from '@/types/diet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MealCardProps {
  meal: Meal;
  onConfirm: (mealId: string, recipeId: string) => void;
  onSelectRecipe: (mealId: string, recipeId: string) => void;
}

const mealTypeLabels: Record<Meal['type'], string> = {
  colazione: 'Colazione',
  pranzo: 'Pranzo',
  cena: 'Cena',
  spuntino: 'Spuntino',
};

const mealTypeIcons: Record<Meal['type'], string> = {
  colazione: '🌅',
  pranzo: '☀️',
  cena: '🌙',
  spuntino: '🍎',
};

export function MealCard({ meal, onConfirm, onSelectRecipe }: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const selectedRecipe = meal.recipes.find(r => r.id === meal.selectedRecipeId) || meal.recipes[0];
  const hasAlternatives = meal.recipes.length > 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-xl p-4 transition-all duration-300",
        meal.confirmed && "ring-2 ring-primary/50 bg-accent/30"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{mealTypeIcons[meal.type]}</span>
          <div>
            <h3 className="font-semibold text-foreground">
              {mealTypeLabels[meal.type]}
            </h3>
            <p className="text-sm text-muted-foreground font-medium">
              {selectedRecipe.name}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {selectedRecipe.prepTime !== undefined && (
            <Badge variant="secondary" className="gap-1">
              <Clock className="w-3 h-3" />
              {selectedRecipe.prepTime}min
            </Badge>
          )}
          {meal.confirmed && (
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Check className="w-3 h-3" />
              Confermato
            </Badge>
          )}
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Ingredients */}
              <div className="bg-muted/50 rounded-lg p-3">
                <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <ChefHat className="w-4 h-4 text-primary" />
                  Ingredienti
                </h4>
                <ul className="space-y-1">
                  {selectedRecipe.ingredients.map((ing) => (
                    <li key={ing.id} className="text-sm text-muted-foreground flex justify-between">
                      <span>{ing.name}</span>
                      <span className="font-medium">{ing.quantity} {ing.unit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Alternative recipes */}
              {hasAlternatives && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Ricette alternative
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {meal.recipes.map((recipe) => (
                      <button
                        key={recipe.id}
                        onClick={() => onSelectRecipe(meal.id, recipe.id)}
                        className={cn(
                          "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                          recipe.id === selectedRecipe.id
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80 text-muted-foreground"
                        )}
                      >
                        {recipe.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Confirm button */}
              {!meal.confirmed && (
                <Button
                  onClick={() => onConfirm(meal.id, selectedRecipe.id)}
                  className="w-full"
                  size="sm"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Conferma pasto
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full mt-3 pt-3 border-t border-border flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {isExpanded ? (
          <>
            <ChevronUp className="w-4 h-4" />
            Nascondi dettagli
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" />
            Mostra dettagli
          </>
        )}
      </button>
    </motion.div>
  );
}
