import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Recipe, FridgeItem } from '../types';
import { ArrowLeftIcon, ChevronDownIcon, ShoppingCartIcon, PhotoIcon, SwapIcon } from './icons';
import { useLanguage } from '../LanguageProvider';
import Spinner from './Spinner';
import ShoppingListModal from './ShoppingListModal';
import { getCategoryForItem } from '../utils/categorize';
import * as geminiService from '../services/geminiService';

interface MultiRecipeDisplayProps {
    recipes: Recipe[];
    isLoading: boolean;
    onBack: () => void;
    fridgeContents: FridgeItem[];
    onAddToFridge: (items: string[]) => void;
}

const AccordionItem: React.FC<{
    recipe: Recipe;
    isOpen: boolean;
    onToggle: () => void;
    imageUrl?: string;
    imageStatus: 'idle' | 'loading' | 'error' | 'success';
    onGenerateImage: () => void;
}> = ({ recipe, isOpen, onToggle, imageUrl, imageStatus, onGenerateImage }) => {
    const { t } = useLanguage();
    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none transition-colors"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-bold text-brand-dark dark:text-indigo-300">{recipe.name}</h3>
                <ChevronDownIcon className={`w-6 h-6 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in-slow">
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{recipe.description}</p>

                    <div className="mb-4 w-full aspect-video rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                        {imageUrl ? (
                            <img src={imageUrl} alt={recipe.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex flex-col items-center justify-center text-center p-4">
                                {imageStatus === 'loading' ? (
                                    <>
                                        <Spinner className="w-8 h-8 text-brand-primary" />
                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">{t('recipe.generatingImage')}</p>
                                    </>
                                ) : imageStatus === 'error' ? (
                                    <div className="text-center">
                                        <p className="text-red-500 dark:text-red-400 mb-2 font-semibold">Failed to generate image.</p>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onGenerateImage(); }}
                                            className="flex items-center gap-2 bg-white dark:bg-gray-800 text-brand-primary dark:text-indigo-300 font-semibold py-1 px-3 rounded-md border border-brand-primary/50 dark:border-indigo-400/50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                           <SwapIcon className="w-4 h-4" />
                                            Retry
                                        </button>
                                    </div>
                                ) : (
                                    <PhotoIcon className="w-10 h-10 text-gray-400 dark:text-gray-500" />
                                )}
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('recipe.ingredients')}</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700 dark:text-gray-300">
                                {recipe.ingredients.map((ing, index) => <li key={index}>{ing}</li>)}
                            </ul>
                        </div>
                        <div>
                             <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">{t('recipe.instructions')}</h4>
                            <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                                {recipe.instructions.map((step, index) => <li key={index}>{step}</li>)}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const MultiRecipeDisplay: React.FC<MultiRecipeDisplayProps> = ({ recipes, isLoading, onBack, fridgeContents, onAddToFridge }) => {
    const { t, language } = useLanguage();
    const [openRecipeName, setOpenRecipeName] = useState<string | null>(null);
    const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
    const [isShoppingListVisible, setIsShoppingListVisible] = useState(false);
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
    const [imageGenStatus, setImageGenStatus] = useState<Record<string, 'idle' | 'loading' | 'error' | 'success'>>({});

    const handleGenerateImage = useCallback(async (mealName: string) => {
        setImageGenStatus(prev => ({ ...prev, [mealName]: 'loading' }));
        try {
            const base64ImageBytes = await geminiService.generateRecipeImage(mealName);
            const url = `data:image/jpeg;base64,${base64ImageBytes}`;
            setImageUrls(prev => ({ ...prev, [mealName]: url }));
            setImageGenStatus(prev => ({ ...prev, [mealName]: 'success' }));
        } catch (error) {
            console.error(`Failed to generate image for ${mealName}:`, error);
            setImageGenStatus(prev => ({ ...prev, [mealName]: 'error' }));
        }
    }, []);

    useEffect(() => {
        if (recipes.length > 0 && !openRecipeName) {
            setOpenRecipeName(recipes[0].name);
        }
    }, [recipes, openRecipeName]);

    useEffect(() => {
        if (recipes && recipes.length > 0) {
            recipes.forEach(recipe => {
                if (!imageUrls[recipe.name] && !imageGenStatus[recipe.name]) {
                    handleGenerateImage(recipe.name);
                }
            });
        }
    }, [recipes, imageUrls, imageGenStatus, handleGenerateImage]);

    const combinedIngredients = useMemo(() => {
        const combined = new Map<string, { full: string, core: string }>();
        recipes.forEach(recipe => {
            if (recipe.ingredients.length === recipe.coreIngredients.length) {
                recipe.ingredients.forEach((ingredient, index) => {
                    const core = recipe.coreIngredients[index];
                    if (!combined.has(core.toLowerCase())) {
                        combined.set(core.toLowerCase(), { full: ingredient, core: core });
                    }
                });
            }
        });
        return Array.from(combined.values());
    }, [recipes]);

     const categorizedIngredients = useMemo(() => {
        const groceries: { full: string, core: string }[] = [];
        const pantry: { full: string, core: string }[] = [];
        combinedIngredients.forEach(item => {
            const category = getCategoryForItem(item.core, language);
            if (category === 'pantry') {
                pantry.push(item);
            } else {
                groceries.push(item);
            }
        });
        return { groceries, pantry };
    }, [combinedIngredients, language]);

    useEffect(() => {
        const initialState: Record<string, boolean> = {};
        const fridgeItemsLower = new Set(fridgeContents.map(i => i.item.toLowerCase()));

        combinedIngredients.forEach(item => {
            const coreIngredient = item.core.toLowerCase();
            const isInFridge = [...fridgeItemsLower].some(fridgeItem => 
                coreIngredient.includes(fridgeItem) || fridgeItem.includes(coreIngredient)
            );
            initialState[item.full] = isInFridge;
        });
        setCheckedState(initialState);
    }, [combinedIngredients, fridgeContents]);
    
    const handleCheckChange = (ingredient: string) => {
        setCheckedState(prev => ({ ...prev, [ingredient]: !prev[ingredient] }));
    };

    const { shoppingListGroceries, shoppingListPantry } = useMemo(() => {
        const groceries = categorizedIngredients.groceries
            .map(i => i.full)
            .filter(ing => !checkedState[ing]);
        const pantry = categorizedIngredients.pantry
            .map(i => i.full)
            .filter(ing => !checkedState[ing]);
        return { shoppingListGroceries: groceries, shoppingListPantry: pantry };
    }, [categorizedIngredients, checkedState]);

    const shoppingListTotalCount = shoppingListGroceries.length + shoppingListPantry.length;

    const shoppingListCoreItems = useMemo(() => {
        const allUnchecked = new Set([...shoppingListGroceries, ...shoppingListPantry]);
        return combinedIngredients
            .filter(item => allUnchecked.has(item.full))
            .map(item => item.core);
    }, [combinedIngredients, shoppingListGroceries, shoppingListPantry]);

    const handleAddItemsToFridge = () => {
        onAddToFridge(shoppingListCoreItems);
        const newCheckedState = { ...checkedState };
        [...shoppingListGroceries, ...shoppingListPantry].forEach(item => {
            newCheckedState[item] = true;
        });
        setCheckedState(newCheckedState);
        setIsShoppingListVisible(false);
    };

     const renderIngredientList = (items: { full: string, core: string }[]) => (
         <ul className="space-y-3">
            {items.map((item, index) => (
               <li key={index}>
                    <label className="flex items-center cursor-pointer group">
                        <input
                            type="checkbox"
                            checked={checkedState[item.full] || false}
                            onChange={() => handleCheckChange(item.full)}
                            className="h-5 w-5 rounded border-gray-400 text-brand-primary focus:ring-brand-primary focus:ring-offset-0 dark:bg-gray-700 dark:border-gray-500"
                        />
                        <span className={`ml-3 transition-colors duration-200 ${checkedState[item.full] ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300 group-hover:text-brand-dark dark:group-hover:text-indigo-300'}`}>{item.full}</span>
                    </label>
                </li>
            ))}
        </ul>
    );

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-64">
                <Spinner className="w-10 h-10 text-brand-primary" />
                <p className="mt-4 text-gray-600 dark:text-gray-300">{t('multiRecipe.loading')}</p>
            </div>
        );
    }
    
    return (
        <div className="animate-fade-in">
             <style>{`.animate-fade-in-slow { animation: fadeIn 0.5s ease-out forwards; } @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                    <h2 className="text-3xl font-bold text-brand-dark dark:text-indigo-300">{t('multiRecipe.title')}</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 space-y-6">
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

                <div className="lg:col-span-2 space-y-4">
                     {recipes.map(recipe => (
                        <AccordionItem 
                            key={recipe.name}
                            recipe={recipe} 
                            isOpen={openRecipeName === recipe.name} 
                            onToggle={() => setOpenRecipeName(openRecipeName === recipe.name ? null : recipe.name)}
                            imageUrl={imageUrls[recipe.name]}
                            imageStatus={imageGenStatus[recipe.name] || 'idle'}
                            onGenerateImage={() => handleGenerateImage(recipe.name)}
                        />
                    ))}
                </div>
            </div>

            {isShoppingListVisible && (
                <ShoppingListModal
                    groceryItems={shoppingListGroceries}
                    pantryItems={shoppingListPantry}
                    onClose={() => setIsShoppingListVisible(false)}
                    onConfirm={handleAddItemsToFridge}
                    title={t('multiRecipe.combinedShoppingList')}
                />
            )}
        </div>
    );
};

export default MultiRecipeDisplay;