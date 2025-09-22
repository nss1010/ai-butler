import { FridgeCategory, Language } from '../types';
import { categorizedIngredients } from '../data/ingredients';

export const getCategoryForItem = (itemName: string, language: Language): FridgeCategory => {
    const lowerItemName = itemName.toLowerCase();
    
    // Check current language first for better accuracy
    const currentLangCategories = categorizedIngredients[language] || categorizedIngredients.en;
    if (currentLangCategories) {
        for (const category in currentLangCategories) {
            const items = currentLangCategories[category as FridgeCategory] || [];
            if (items.some(item => lowerItemName.includes(item.toLowerCase()) || item.toLowerCase().includes(lowerItemName))) {
                return category as FridgeCategory;
            }
        }
    }

    // Fallback to searching all languages
    for (const langCode in categorizedIngredients) {
        const langCategories = categorizedIngredients[langCode as Language];
        if (langCategories) {
            for (const category in langCategories) {
                const items = langCategories[category as FridgeCategory] || [];
                if (items.some(item => item.toLowerCase() === lowerItemName)) {
                    return category as FridgeCategory;
                }
            }
        }
    }

    return 'other'; // Default category
};
