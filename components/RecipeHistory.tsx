
import React from 'react';
import { RecipeHistoryItem } from '../types';
import { useLanguage } from '../LanguageProvider';
import { TrashIcon } from './icons';

interface RecipeHistoryProps {
    history: RecipeHistoryItem[];
    onClear: () => void;
}

const RecipeHistory: React.FC<RecipeHistoryProps> = ({ history, onClear }) => {
    const { t } = useLanguage();

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-lg text-gray-700 dark:text-gray-300">{t('recipeHistory.title')}</h3>
                {history.length > 0 && (
                    <button
                        onClick={onClear}
                        className="flex items-center gap-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 font-semibold px-3 py-1 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
                    >
                        <TrashIcon className="w-4 h-4" />
                        {t('recipeHistory.clearButton')}
                    </button>
                )}
            </div>
            {history.length === 0 ? (
                <div className="text-center py-6 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <p className="text-gray-500 dark:text-gray-400">{t('recipeHistory.empty')}</p>
                </div>
            ) : (
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 overflow-hidden">
                    <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-72 overflow-y-auto">
                        {history.map((item, index) => (
                            <li key={index} className="flex justify-between items-center px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700">
                                <span className="font-medium text-gray-800 dark:text-gray-100">{item.name}</span>
                                <span className="text-sm text-gray-500 dark:text-gray-400">{formatDate(item.date)}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default RecipeHistory;