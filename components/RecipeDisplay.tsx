

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Recipe, FridgeItem } from '../types';
import { ArrowLeftIcon, ShoppingCartIcon, PhotoIcon, SwapIcon } from './icons';
import { useLanguage } from '../LanguageProvider';
import ShoppingListModal from './ShoppingListModal';
import { getCategoryForItem } from '../utils/categorize';
import * as geminiService from '../services/geminiService';
import Spinner from './Spinner';

interface RecipeDisplayProps {
    recipe: Recipe;
    onBack: () => void;
    fridgeContents: FridgeItem[];
    onAddToFridge: (items: string[]) => void;
}

const RecipeDisplay: React.FC<RecipeDisplayProps> = ({ recipe, onBack, fridgeContents, onAddToFridge }) => {
    const { t, language } = useLanguage();
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
    const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imageGenStatus, setImageGenStatus] = useState<'idle' | 'loading' | 'error'>('idle');

    const categorizedIngredients = useMemo(() => {
        const groceries: string[] = [];
        const pantry: string[] = [];
        if (recipe.coreIngredients && recipe.coreIngredients.length === recipe.ingredients.length) {
            recipe.ingredients.forEach((ingredient, index) => {
                const coreIngredient = recipe.coreIngredients[index];
                const category = getCategoryForItem(coreIngredient, language);
                if (category === 'pantry') {
                    pantry.push(ingredient);
                } else {
                    groceries.push(ingredient);
                }
            });
        } else {
            // Fallback if core ingredients are not available
            return { groceries: recipe.ingredients, pantry: [] };
        }
        return { groceries, pantry };
    }, [recipe, language]);

    const handleGenerateImage = useCallback(async () => {
        if (!recipe || imageGenStatus === 'loading') return;
        setImageGenStatus('loading');
        try {
            const base64ImageBytes = await geminiService.generateRecipeImage(recipe.name);
            const url = `data:image/jpeg;base64,${base64ImageBytes}`;
            setImageUrl(url);
        } catch (error) {
            console.error("Failed to generate image:", error);
            setImageGenStatus('error');
        }
    }, [recipe, imageGenStatus]);

    useEffect(() => {
        // Automatically generate image when the component loads if it hasn't started yet.
        if (recipe && !imageUrl && imageGenStatus === 'idle') {
            handleGenerateImage();
        }
    }, [recipe, imageUrl, imageGenStatus, handleGenerateImage]);


    useEffect(() => {
        const initialState: Record<string, boolean> = {};
        const fridgeItemsLower = new Set(fridgeContents.map(i => i.item.toLowerCase()));
        
        if (recipe.coreIngredients && recipe.coreIngredients.length === recipe.ingredients.length) {
            recipe.ingredients.forEach((ingredient, index) => {
                const coreIngredient = recipe.coreIngredients[index].toLowerCase();
                const isInFridge = [...fridgeItemsLower].some(fridgeItem => 
                    coreIngredient.includes(fridgeItem) || fridgeItem.includes(coreIngredient)
                );
                initialState[ingredient] = isInFridge;
            });
        } else {
            console.warn("coreIngredients not available or mismatch length. Using fuzzy matching on full ingredient text.");
            recipe.ingredients.forEach(ingredient => {
                const ingredientLower = ingredient.toLowerCase();
                initialState[ingredient] = [...fridgeItemsLower].some(fridgeItem => ingredientLower.includes(fridgeItem));
            });
        }
        setCheckedState(initialState);
    }, [recipe, fridgeContents]);

    const handleCheckChange = (ingredient: string) => {
        setCheckedState(prev => ({ ...prev, [ingredient]: !prev[ingredient] }));
    };

    const { shoppingListGroceries, shoppingListPantry } = useMemo(() => {
        const groceries = categorizedIngredients.groceries.filter(ing => !checkedState[ing]);
        const pantry = categorizedIngredients.pantry.filter(ing => !checkedState[ing]);
        return { shoppingListGroceries: groceries, shoppingListPantry: pantry };
    }, [categorizedIngredients, checkedState]);
    
    const shoppingListTotalCount = shoppingListGroceries.length + shoppingListPantry.length;

    const shoppingListCoreItems = useMemo(() => {
        if (!recipe.coreIngredients || recipe.coreIngredients.length !== recipe.ingredients.length) return [];
        const allUnchecked = [...shoppingListGroceries, ...shoppingListPantry];
        return recipe.ingredients
            .map((ingredient, index) => ({ ingredient, core: recipe.coreIngredients[index] }))
            .filter(item => allUnchecked.includes(item.ingredient))
            .map(item => item.core);
    }, [recipe.ingredients, recipe.coreIngredients, shoppingListGroceries, shoppingListPantry]);
    
    const handleAddItemsToFridge = () => {
        onAddToFridge(shoppingListCoreItems);
        const newCheckedState = { ...checkedState };
        [...shoppingListGroceries, ...shoppingListPantry].forEach(item => {
            newCheckedState[item] = true;
        });
        setCheckedState(newCheckedState);
        setIsShoppingListVisible(false);
    };

    const renderIngredientList = (ingredients: string[]) => (
         <ul className="space-y-3">
            {ingredients.map((ing, index) => (
               <li key={index}>
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={checkedState[ing] || false}
                            onChange={() => handleCheckChange(ing)}
                            className="h-5 w-5 rounded border-gray-400 text-brand-primary focus:ring-brand-primary focus:ring-offset-0 transition-all duration-200 dark:bg-gray-700 dark:border-gray-500"
                        />
                        <span className={`ml-3 transition-colors duration-200 ${checkedState[ing] ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-dark dark:group-hover:text-indigo-300'}`}>{ing}</span>
                    </label>
                </li>
            ))}
        </ul>
    );

    return (
        <div className="animate-fade-in">
             <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark dark:text-indigo-300">{recipe.name}</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">{recipe.description}</p>
                </div>
            </div>
            
            <div className="mb-8 w-full aspect-[4/3] rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                {imageUrl ? (
                    <img src={imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center text-center p-4">
                        {imageGenStatus === 'loading' ? (
                            <>
                                <Spinner className="w-10 h-10 text-brand-primary" />
                                <p className="mt-4 text-gray-600 dark:text-gray-300">{t('recipe.generatingImage')}</p>
                            </>
                        ) : imageGenStatus === 'error' ? (
                            <div className="text-center">
                                <p className="text-red-500 dark:text-red-400 mb-2 font-semibold">Failed to generate image.</p>
                                <button
                                    onClick={handleGenerateImage}
                                    className="flex items-center gap-2 bg-white dark:bg-gray-800 text-brand-primary dark:text-indigo-300 font-semibold py-1 px-3 rounded-md border border-brand-primary/50 dark:border-indigo-400/50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                   <SwapIcon className="w-4 h-4" />
                                    Retry
                                </button>
                            </div>
                        ) : (
                            <PhotoIcon className="w-16 h-16 text-gray-400 dark:text-gray-500" />
                        )}
                    </div>
                )}
            </div>

            <div className="bg-brand-light dark:bg-gray-800 grid grid-cols-2 md:grid-cols-3 gap-4 text-center p-4 rounded-lg mb-8 border border-gray-200 dark:border-gray-700">
                <div>
                    <p className="font-bold text-brand-primary dark:text-indigo-400">{t('recipe.prepTime')}</p>
                    <p className="text-gray-700 dark:text-gray-300">{recipe.prepTime}</p>
                </div>
                 <div>
                    <p className="font-bold text-brand-primary dark:text-indigo-400">{t('recipe.cookTime')}</p>
                    <p className="text-gray-700 dark:text-gray-300">{recipe.cookTime}</p>
                </div>
                <div className="col-span-2 md:col-span-1">
                    <p className="font-bold text-brand-primary dark:text-indigo-400">{t('recipe.servings')}</p>
                    <p className="text-gray-700 dark:text-gray-300">{recipe.servings}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-brand-secondary dark:border-emerald-700 pb-2">{t('recipe.ingredients')}</h3>
                        {renderIngredientList(categorizedIngredients.groceries)}
                    </div>
                     {categorizedIngredients.pantry.length > 0 && (
                        <div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-brand-secondary dark:border-emerald-700 pb-2">{t('recipe.pantryItems')}</h3>
                            {renderIngredientList(categorizedIngredients.pantry)}
                        </div>
                    )}

                     <button
                        onClick={() => setIsShoppingListVisible(true)}
                        disabled={shoppingListTotalCount === 0}
                        className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-2 bg-brand-secondary text-white font-semibold rounded-lg hover:bg-green-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow"
                    >
                        <ShoppingCartIcon className="w-5 h-5" />
                        {t('recipe.shoppingListButton')} ({shoppingListTotalCount})
                    </button>
                </div>
                <div className="md:col-span-2">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4 border-b-2 border-brand-secondary dark:border-emerald-700 pb-2">{t('recipe.instructions')}</h3>
                    <ol className="space-y-4">
                        {recipe.instructions.map((step, index) => (
                           <li key={index} className="flex items-start">
                                <span className="mr-3 font-bold text-brand-primary dark:text-indigo-300 bg-indigo-100 dark:bg-gray-700 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">{index + 1}</span>
                                <span className="pt-1 text-gray-700 dark:text-gray-300">{step}</span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            {isShoppingListVisible && (
                <ShoppingListModal
                    groceryItems={shoppingListGroceries}
                    pantryItems={shoppingListPantry}
                    onClose={() => setIsShoppingListVisible(false)}
                    onConfirm={handleAddItemsToFridge}
                />
            )}
        </div>
    );
};

export default RecipeDisplay;