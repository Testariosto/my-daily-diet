import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChefHat, Clock, ChevronDown, ChevronUp, Pencil, X, Save, Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Meal, Ingredient } from '@/types/diet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface MealCardProps {
  meal: Meal;
  onConfirm: (mealId: string, recipeId: string) => void;
  onSelectRecipe: (mealId: string, recipeId: string) => void;
  onUpdateRecipe?: (mealId: string, recipeId: string, updatedIngredients: Ingredient[]) => void;
}

const mealTypeLabels: Record<Meal['type'], string> = {
  colazione: 'Colazione',
  spuntino: 'Spuntino',
  pranzo: 'Pranzo',
  merenda: 'Merenda',
  cena: 'Cena',
};

const mealTypeIcons: Record<Meal['type'], string> = {
  colazione: '🌅',
  spuntino: '🥜',
  pranzo: '☀️',
  merenda: '🍎',
  cena: '🌙',
};

export function MealCard({ meal, onConfirm, onSelectRecipe, onUpdateRecipe }: MealCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const selectedRecipe = meal.recipes.find(r => r.id === meal.selectedRecipeId) || meal.recipes[0];
  const [editedIngredients, setEditedIngredients] = useState<Ingredient[]>(selectedRecipe.ingredients);

  useEffect(() => {
    setEditedIngredients(selectedRecipe.ingredients);
  }, [selectedRecipe]);

  const hasAlternatives = meal.recipes.length > 1;

  const handleSave = () => {
    if (onUpdateRecipe) {
        onUpdateRecipe(meal.id, selectedRecipe.id, editedIngredients);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedIngredients(selectedRecipe.ingredients);
    setIsEditing(false);
  };

  const updateIngredient = (index: number, field: keyof Ingredient, value: string | number) => {
    const newIngredients = [...editedIngredients];
    newIngredients[index] = { ...newIngredients[index], [field]: value };
    setEditedIngredients(newIngredients);
  };

  const addIngredient = () => {
    const newId = `new-${Date.now()}`;
    setEditedIngredients([...editedIngredients, { id: newId, name: '', quantity: 0, unit: 'g' }]);
  };

  const removeIngredient = (index: number) => {
    const newIngredients = editedIngredients.filter((_, i) => i !== index);
    setEditedIngredients(newIngredients);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "glass-card rounded-xl p-4 transition-all duration-300",
        meal.confirmed && !isEditing && "ring-2 ring-primary/50 bg-accent/30"
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
          {meal.confirmed && !isEditing && (
            <Badge className="bg-primary text-primary-foreground gap-1">
              <Check className="w-3 h-3" />
              Confermato
            </Badge>
          )}
          {!isEditing && !meal.confirmed && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => { setIsEditing(true); setIsExpanded(true); }}>
                  <Pencil className="w-4 h-4" />
              </Button>
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
                <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
                    <ChefHat className="w-4 h-4 text-primary" />
                    Ingredienti
                    </h4>
                    {isEditing && (
                        <Button variant="ghost" size="sm" onClick={addIngredient} className="h-6 gap-1 text-xs">
                            <Plus className="w-3 h-3" /> Aggiungi
                        </Button>
                    )}
                </div>
                
                {isEditing ? (
                    <div className="space-y-2">
                        {editedIngredients.map((ing, idx) => (
                            <div key={ing.id} className="flex gap-2 items-center">
                                <Input 
                                    value={ing.name} 
                                    onChange={(e) => updateIngredient(idx, 'name', e.target.value)}
                                    className="h-8 text-sm"
                                    placeholder="Ingrediente"
                                />
                                <Input 
                                    type="number"
                                    value={ing.quantity} 
                                    onChange={(e) => updateIngredient(idx, 'quantity', parseFloat(e.target.value) || 0)}
                                    className="h-8 w-20 text-sm text-right"
                                />
                                <span className="text-xs text-muted-foreground w-8">{ing.unit}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive/80" onClick={() => removeIngredient(idx)}>
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                        <div className="flex gap-2 mt-4">
                            <Button size="sm" onClick={handleSave} className="flex-1">
                                <Save className="w-4 h-4 mr-2" /> Salva modifiche
                            </Button>
                            <Button size="sm" variant="outline" onClick={handleCancel} className="flex-1">
                                <X className="w-4 h-4 mr-2" /> Annulla
                            </Button>
                        </div>
                    </div>
                ) : (
                    <ul className="space-y-1">
                    {selectedRecipe.ingredients.map((ing) => (
                        <li key={ing.id} className="text-sm text-muted-foreground flex justify-between">
                        <span>{ing.name}</span>
                        <span className="font-medium">{ing.quantity} {ing.unit}</span>
                        </li>
                    ))}
                    </ul>
                )}
              </div>

              {/* Alternative recipes */}
              {hasAlternatives && !isEditing && (
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
              {!meal.confirmed && !isEditing && (
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
