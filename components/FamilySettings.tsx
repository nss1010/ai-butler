import React from 'react';
import { FamilyMember, RecipeHistoryItem } from '../types';
import { useLanguage } from '../LanguageProvider';
import FamilyProfile from './FamilyProfile';
import RecipeHistory from './RecipeHistory';

interface FamilySettingsProps {
    familyMembers: FamilyMember[];
    onAddMember: (member: Omit<FamilyMember, 'id'>) => void;
    onUpdateMember: (member: FamilyMember) => void;
    onRemoveMember: (id: string) => void;
    foodTaboos: string;
    onFoodTaboosChange: (value: string) => void;
    foodPreferences: string;
    onFoodPreferencesChange: (value: string) => void;
    recipeHistory: RecipeHistoryItem[];
    onClearRecipeHistory: () => void;
}

const TagSelector: React.FC<{ title: string; options: string[]; value: string; onValueChange: (value: string) => void }> = ({ title, options, value, onValueChange }) => {
    const handleTagClick = (tag: string) => {
        const values = value ? value.split(',').map(s => s.trim()) : [];
        if (!values.some(v => v.toLowerCase() === tag.toLowerCase())) {
            onValueChange(value ? `${value}, ${tag}` : tag);
        }
    };

    return (
        <div className="mb-3">
            <h4 className="font-semibold text-sm text-gray-600 dark:text-gray-400 mb-2">{title}</h4>
            <div className="flex flex-wrap gap-2">
                {options.map(option => (
                    <button
                        key={option}
                        onClick={() => handleTagClick(option)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full hover:bg-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-200 dark:hover:bg-indigo-900 transition-colors"
                    >
                        + {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

const FamilySettings: React.FC<FamilySettingsProps> = ({
    familyMembers,
    onAddMember,
    onUpdateMember,
    onRemoveMember,
    foodTaboos,
    onFoodTaboosChange,
    foodPreferences,
    onFoodPreferencesChange,
    recipeHistory,
    onClearRecipeHistory,
}) => {
    const { t, t_raw } = useLanguage();

    const restrictionsOptions = (t_raw('familySettings.restrictionsOptions') || []) as string[];
    const preferencesOptions = (t_raw('familySettings.preferencesOptions') || []) as string[];

    return (
        <div className="animate-fade-in space-y-8">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('familySettings.title')}</h2>
            </div>
            
            <FamilyProfile 
                members={familyMembers}
                onAddMember={onAddMember}
                onUpdateMember={onUpdateMember}
                onRemoveMember={onRemoveMember}
            />
            
            <div className="border-t pt-6 dark:border-gray-700">
                <label className="block font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">{t('familySettings.foodTaboos')}</label>
                <TagSelector 
                    title={t('familySettings.restrictionsTitle')} 
                    options={restrictionsOptions} 
                    value={foodTaboos} 
                    onValueChange={onFoodTaboosChange} 
                />
                <textarea
                    value={foodTaboos}
                    onChange={(e) => onFoodTaboosChange(e.target.value)}
                    placeholder={t('familySettings.foodTaboosPlaceholder')}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    rows={3}
                />
            </div>
            
            <div>
                <label className="block font-semibold text-lg mb-2 text-gray-700 dark:text-gray-300">{t('familySettings.foodPreferences')}</label>
                <TagSelector 
                    title={t('familySettings.preferencesTitle')} 
                    options={preferencesOptions} 
                    value={foodPreferences} 
                    onValueChange={onFoodPreferencesChange} 
                />
                <textarea
                    value={foodPreferences}
                    onChange={(e) => onFoodPreferencesChange(e.target.value)}
                    placeholder={t('familySettings.foodPreferencesPlaceholder')}
                    className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
                    rows={3}
                />
            </div>

            <RecipeHistory history={recipeHistory} onClear={onClearRecipeHistory} />
        </div>
    );
};

export default FamilySettings;