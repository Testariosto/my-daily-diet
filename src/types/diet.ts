export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories?: number;
}

export interface Recipe {
  id: string;
  name: string;
  ingredients: Ingredient[];
  instructions?: string;
  prepTime?: number;
  imageUrl?: string;
}

export interface Meal {
  id: string;
  type: 'colazione' | 'pranzo' | 'cena' | 'spuntino';
  recipes: Recipe[];
  selectedRecipeId?: string;
  confirmed: boolean;
}

export interface DayPlan {
  id: string;
  date: string;
  meals: Meal[];
}

export interface FridgeItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  expiryDate?: string;
  category: 'verdure' | 'frutta' | 'proteine' | 'latticini' | 'altro';
}

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  checked: boolean;
  category: string;
}
