import { DayPlan, Meal, Recipe, Ingredient } from '@/types/diet';
import { SEASONAL_INGREDIENTS, getSeason } from '@/data/seasonal';

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).substr(2, 9)}`;

const getRandomItem = (items: string[]) => items[Math.floor(Math.random() * items.length)];

const adjustIngredientsForSeason = (ingredients: Ingredient[], date: Date): Ingredient[] => {
  const season = getSeason(date);
  const seasonalOptions = SEASONAL_INGREDIENTS[season];

  // Helper to pick random n items
  const pickRandom = (arr: string[], count: number) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  return ingredients.flatMap(ing => {
    const lowerName = ing.name.toLowerCase();
    
    // Check for generic 'Verdure' or 'Frutta'
    const isVeggie = lowerName.includes('verdure') || lowerName.includes('verdura');
    const isFruit = lowerName.includes('frutta');

    if (isVeggie || isFruit) {
        const options = isVeggie ? seasonalOptions.verdura : seasonalOptions.frutta;
        
        // 40% chance to split into 2 ingredients if quantity > 100g
        if (ing.quantity >= 100 && Math.random() > 0.6) {
            const [item1, item2] = pickRandom(options, 2);
            const halfQty = Math.floor(ing.quantity / 2);
            
            return [
                { ...ing, id: generateId('i'), name: item1, quantity: halfQty },
                { ...ing, id: generateId('i'), name: item2, quantity: ing.quantity - halfQty }
            ];
        }

        // Single replacement
        const replacement = getRandomItem(options);
        return [{ ...ing, name: replacement }];
    }

    return [ing];
  });
};

const adjustRecipeForSeason = (recipe: Recipe, date: Date): Recipe => {
  const newIngredients = adjustIngredientsForSeason(recipe.ingredients, date);
  
  // Update name if it contained generic terms
  let newName = recipe.name;
  const oldVeggies = recipe.ingredients.find(i => i.name.toLowerCase().includes('verdure'))?.name;
  const newVeggie = newIngredients.find(i => i.id === recipe.ingredients.find(x => x.name.toLowerCase().includes('verdure'))?.id)?.name;
  
  // Simple check to update recipe name if it was "Carne con verdure" -> "Carne con Broccoli"
  // This is a bit tricky to do perfectly with string replacement, so we'll leave the name mostly alone 
  // unless we can be smart. For now, let's just update ingredients.
  // Actually, if we swapped "Verdure" for "Broccoli", let's update the name in a simple way
  
  if (recipe.name.includes('Verdure') && newVeggie && newVeggie !== 'Verdure') {
      newName = recipe.name.replace('Verdure', newVeggie);
  }
  if (recipe.name.includes('Frutta') && newIngredients.some(i => i.name !== 'Frutta' && i.unit === 'g')) { // finding the fruit ingredient
       // This logic is fuzzy, let's keep it simple.
  }

  return {
    ...recipe,
    id: generateId('r'),
    name: newName,
    ingredients: newIngredients
  };
};

export const generateNextWeekPlan = (currentWeek: DayPlan[], startDate: Date): DayPlan[] => {
  // Sort current week by date to ensure order
  const sortedDays = [...currentWeek].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  // Assuming currentWeek is 7 days. If not, we take what we have.
  // New start date is already provided.
  
  return sortedDays.map((day, index) => {
    const newDate = new Date(startDate);
    newDate.setDate(newDate.getDate() + index);
    const dateStr = newDate.toISOString().split('T')[0];

    const newMeals: Meal[] = day.meals.map(meal => ({
      ...meal,
      id: generateId('meal'),
      confirmed: false, // Reset confirmation
      selectedRecipeId: undefined, // Reset selection if we want fresh choice, or keep previous? user asked to "replicare".
      // Usually replicating means keeping the structure/recipes.
      recipes: meal.recipes.map(recipe => adjustRecipeForSeason(recipe, newDate))
    }));

    return {
      id: generateId('day'),
      date: dateStr,
      meals: newMeals
    };
  });
};
