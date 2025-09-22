import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { XMarkIcon, CheckCircleIcon } from './icons';

interface ShoppingListModalProps {
    groceryItems: string[];
    pantryItems: string[];
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
}

const ShoppingListModal: React.FC<ShoppingListModalProps> = ({ groceryItems, pantryItems, onClose, onConfirm, title }) => {
    const { t } = useLanguage();
    const modalTitle = title || t('recipe.shoppingListTitle');
    const totalItems = groceryItems.length + pantryItems.length;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-lg text-brand-dark dark:text-indigo-300">{modalTitle}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
                <div className="flex-grow overflow-y-auto p-6">
                    {totalItems > 0 ? (
                        <div className="space-y-6">
                            {groceryItems.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 border-b dark:border-gray-600 pb-1">{t('recipe.ingredients')}</h4>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {groceryItems.map((item, index) => (
                                            <li key={`grocery-${index}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                             {pantryItems.length > 0 && (
                                <div>
                                    <h4 className="font-semibold text-gray-800 dark:text-gray-100 mb-2 border-b dark:border-gray-600 pb-1">{t('recipe.pantryItems')}</h4>
                                    <ul className="space-y-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                                        {pantryItems.map((item, index) => (
                                            <li key={`pantry-${index}`}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 dark:text-gray-400">{t('recipe.shoppingListEmpty')}</p>
                    )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-900 p-4 flex justify-end gap-3 rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                       {t('recipe.closeButton')}
                    </button>
                    <button 
                        onClick={onConfirm}
                        disabled={totalItems === 0}
                        className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark disabled:bg-indigo-300 transition-colors flex items-center gap-2"
                    >
                        <CheckCircleIcon className="w-5 h-5"/>
                        {t('recipe.addToFridgeButton')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ShoppingListModal;