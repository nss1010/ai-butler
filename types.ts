
// Fix: Provide full type definitions for the application.
export type FamilyAvatar = 'man' | 'woman' | 'child' | 'grandfather' | 'grandmother';

export interface FamilyMember {
    id: string;
    name: string;
    avatar: FamilyAvatar;
    ethnicity: string;
    allergies: string;
    restrictions: string;
}

export type MealType = 'Breakfast' | 'Lunch' | 'Afternoon Tea' | 'Dinner';

export interface MealSuggestion {
    name: string;
    description: string;
    tags: string[];
    usedFromFridge: string[];
}

export interface Recipe {
    name: string;
    description: string;
    prepTime: string;
    cookTime: string;
    servings: string;
    ingredients: string[];
    instructions: string[];
    coreIngredients: string[];
}

export interface RestaurantSuggestion {
    type: string;
    reason: string;
}

export type Language = 'en' | 'zh-HK' | 'zh-CN' | 'hi' | 'fr' | 'es' | 'it' | 'he' | 'ja' | 'ko' | 'ms' | 'zh-TW';

export interface ChatMessage {
    role: 'user' | 'model';
    text: string;
    suggestions?: string[];
}

export type FridgeCategory = 'meat' | 'vegetables' | 'fruits' | 'dairy' | 'pantry' | 'other' | 'frozenGoods' | 'iceCream';

export interface FridgeItem {
    item: string;
    category: FridgeCategory;
}

export interface RecipeHistoryItem {
    name: string;
    date: string;
}
