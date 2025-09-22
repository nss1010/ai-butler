import React, { useState } from 'react';
import { MealSuggestion, MealType } from '../types';
import { ArrowLeftIcon, BookOpenIcon, SwapIcon, CubeIcon, CheckIcon, PhotoIcon } from './icons';
import Spinner from './Spinner';
import { useLanguage } from '../LanguageProvider';
import * as geminiService from '../services/geminiService';

interface MealPlannerProps {
    suggestions: MealSuggestion[];
    onSelectMeal: (mealName: string) => void;
    onBack: () => void;
    isLoading: boolean;
    mealType: MealType | null;
    loadingRecipe: string | null;
    onRefresh: (mealType: MealType) => void;
    selectedMeals: MealSuggestion[];
    onToggleSelection: (meal: MealSuggestion) => void;
    onViewMultiRecipe: () => void;
}

const MealPlanner: React.FC<MealPlannerProps> = ({ suggestions, onSelectMeal, onBack, isLoading, mealType, loadingRecipe, onRefresh, selectedMeals, onToggleSelection, onViewMultiRecipe }) => {
    const { t } = useLanguage();
    const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
    const [loadingImageName, setLoadingImageName] = useState<string | null>(null);

    const titleMap = {
        'Breakfast': t('mealPlanner.titleBreakfast'),
        'Lunch': t('mealPlanner.titleLunch'),
        'Afternoon Tea': t('mealPlanner.titleAfternoonTea'),
        'Dinner': t('mealPlanner.titleDinner'),
    }

    const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, meal: MealSuggestion) => {
        // Prevent toggling when a button inside the card is clicked
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        onToggleSelection(meal);
    };

    const handleGenerateImage = async (mealName: string) => {
        if (loadingImageName) return; // Prevent multiple requests
        setLoadingImageName(mealName);
        try {
            const base64ImageBytes = await geminiService.generateRecipeImage(mealName);
            const url = `data:image/jpeg;base64,${base64ImageBytes}`;
            setImageUrls(prev => ({ ...prev, [mealName]: url }));
        } catch (error) {
            console.error("Failed to generate image:", error);
            alert("Sorry, I couldn't generate an image for this meal. Please try again.");
        } finally {
            setLoadingImageName(null);
        }
    };


    return (
        <div className="animate-fade-in">
             <style>{`
                @keyframes slide-up {
                    from { transform: translateY(100%); }
                    to { transform: translateY(0); }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
            `}</style>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                    <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4">
                        <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{mealType ? titleMap[mealType] : t('mealPlanner.title')}</h2>
                        <p className="text-gray-500 dark:text-gray-400">{t('mealPlanner.subtitle')}</p>
                    </div>
                </div>
                 <button 
                    onClick={() => mealType && onRefresh(mealType)} 
                    disabled={isLoading}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    aria-label={t('mealPlanner.refreshButtonLabel')}
                >
                    <SwapIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
            </div>

            {isLoading && !suggestions.length ? (
                 <div className="flex flex-col items-center justify-center h-64">
                    <Spinner className="w-10 h-10 text-brand-primary" />
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{t('mealPlanner.loading')}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {suggestions.map((meal) => {
                        const isSelected = selectedMeals.some(m => m.name === meal.name);
                        const imageUrl = imageUrls[meal.name];
                        const isLoadingImage = loadingImageName === meal.name;

                        return (
                            <div 
                                key={meal.name} 
                                className={`relative bg-brand-light dark:bg-gray-800 p-4 rounded-lg border transition-all duration-200 cursor-pointer ${isSelected ? 'border-brand-primary ring-2 ring-brand-primary/50' : 'border-gray-200 dark:border-gray-700 hover:shadow-md'}`}
                                onClick={(e) => handleCardClick(e, meal)}
                            >
                                <div className="absolute top-3 right-3 z-10">
                                    <div className={`w-6 h-6 rounded-md flex items-center justify-center border-2 transition-all duration-200 ${isSelected ? 'bg-brand-primary border-brand-primary' : 'bg-white dark:bg-gray-900 dark:border-gray-600 border-gray-300'}`}>
                                        {isSelected && <CheckIcon className="w-4 h-4 text-white" />}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    {/* Image Column */}
                                    <div className="w-full sm:w-48 flex-shrink-0">
                                        {imageUrl ? (
                                            <img src={imageUrl} alt={meal.name} className="w-full h-full object-cover rounded-md aspect-video sm:aspect-square" />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 dark:bg-gray-700 rounded-md flex flex-col items-center justify-center text-center p-2 aspect-video sm:aspect-square border-2 border-dashed border-gray-300 dark:border-gray-600">
                                                {isLoadingImage ? (
                                                    <>
                                                        <Spinner className="w-8 h-8 text-brand-primary" />
                                                        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">Generating...</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <PhotoIcon className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-1" />
                                                        <button
                                                            onClick={(e) => { e.stopPropagation(); handleGenerateImage(meal.name); }}
                                                            className="text-xs bg-white dark:bg-gray-800 text-brand-primary dark:text-indigo-300 font-semibold py-1 px-2 rounded-md border border-brand-primary/50 dark:border-indigo-400/50 hover:bg-indigo-50 dark:hover:bg-gray-700 transition-colors"
                                                        >
                                                            {t('mealPlanner.previewImageButton')}
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {/* Text Content Column */}
                                    <div className="flex-grow flex flex-col">
                                        <h3 className="font-bold text-lg text-brand-dark dark:text-indigo-300 pr-8">{meal.name}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-3 text-sm flex-grow">{meal.description}</p>
                                        
                                        <div className="space-y-3">
                                            {meal.usedFromFridge && meal.usedFromFridge.length > 0 && (
                                                <div className="bg-green-100 dark:bg-green-900/50 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-200 text-sm p-2 rounded-md flex items-start gap-2">
                                                    <CubeIcon className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-600 dark:text-green-400" />
                                                    <div>
                                                        <span className="font-semibold">{t('mealPlanner.usesFromFridge')}:</span>
                                                        <span className="ml-1">{meal.usedFromFridge.join(', ')}</span>
                                                    </div>
                                                </div>
                                            )}

                                            {meal.tags && meal.tags.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {meal.tags.map((tag, index) => (
                                                        <span key={index} className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="mt-4 sm:mt-auto sm:self-end">
                                            <button 
                                                onClick={() => onSelectMeal(meal.name)} 
                                                disabled={loadingRecipe !== null}
                                                className="bg-brand-primary hover:bg-brand-dark text-white font-semibold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors w-36 disabled:bg-indigo-300"
                                            >
                                            {loadingRecipe === meal.name ? (
                                                <Spinner className="w-5 h-5 text-white"/>
                                            ) : (
                                                <>
                                                    <BookOpenIcon className="w-5 h-5"/>
                                                    {t('mealPlanner.getRecipeButton')}
                                                </>
                                            )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            )}

            {selectedMeals.length > 0 && (
                <div className="fixed bottom-16 left-0 right-0 bg-white dark:bg-gray-800 dark:border-t dark:border-gray-700 p-4 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 animate-slide-up">
                    <div className="max-w-4xl mx-auto flex justify-between items-center">
                        <p className="font-semibold text-brand-dark dark:text-indigo-300">{t('multiRecipe.selected', { count: selectedMeals.length })}</p>
                        <button 
                            onClick={onViewMultiRecipe} 
                            className="bg-brand-secondary hover:bg-green-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                        >
                            {t('multiRecipe.viewButton')}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MealPlanner;