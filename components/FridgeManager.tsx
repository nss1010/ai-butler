import React, { useState, useMemo } from 'react';
import { useLanguage } from '../LanguageProvider';
import { categorizedIngredients } from '../data/ingredients';
import { PlusIcon, XMarkIcon, ChevronDownIcon } from './icons';
import { FridgeItem, FridgeCategory } from '../types';

interface FridgeManagerProps {
    ingredients: FridgeItem[];
    onIngredientsChange: (ingredients: FridgeItem[]) => void;
}

interface AddIngredientModalProps {
    category: FridgeCategory;
    onClose: () => void;
    onAdd: (selectedItems: string[]) => void;
    existingIngredients: string[];
}

const AddIngredientModal: React.FC<AddIngredientModalProps> = ({ category, onClose, onAdd, existingIngredients }) => {
    const { t, language } = useLanguage();
    const [selected, setSelected] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState('');

    const allSuggestions = useMemo(() => {
        const langIngredients = categorizedIngredients[language] || categorizedIngredients.en;
        return langIngredients[category] || [];
    }, [language, category]);

    const availableSuggestions = useMemo(() => {
        const existingLower = new Set(existingIngredients.map(i => i.toLowerCase()));
        return allSuggestions
            .filter(ing => !existingLower.has(ing.toLowerCase()))
            .filter(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [allSuggestions, existingIngredients, searchTerm]);

    const handleToggle = (item: string) => {
        setSelected(prev => 
            prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
        );
    };

    const handleConfirm = () => {
        onAdd(selected);
    };

    const categoryName = t(`fridge.categories.${category}`);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md flex flex-col max-h-[90vh]" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 className="font-bold text-lg text-brand-dark dark:text-indigo-300">{t('fridge.modal.title', { category: categoryName })}</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
                        <XMarkIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </button>
                </div>
                <div className="p-4">
                    <input
                        type="search"
                        placeholder={t('fridge.modal.searchPlaceholder')}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none bg-white dark:bg-gray-700"
                        autoFocus
                    />
                </div>
                <div className="flex-grow overflow-y-auto px-4 py-2 border-t border-b dark:border-gray-700">
                    {availableSuggestions.length > 0 ? (
                        <div className="space-y-2">
                            {availableSuggestions.map(item => (
                                <label key={item} htmlFor={`item-${item}`} className="flex items-center p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        id={`item-${item}`}
                                        checked={selected.includes(item)}
                                        onChange={() => handleToggle(item)}
                                        className="h-5 w-5 rounded border-gray-300 text-brand-primary focus:ring-brand-primary"
                                    />
                                    <span className="ml-3 text-gray-700 dark:text-gray-300">{item}</span>
                                </label>
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-500 py-8">{t('fridge.modal.noResults')}</p>
                    )}
                </div>
                <div className="bg-gray-50 dark:bg-gray-800/50 p-4 flex justify-end gap-3 rounded-b-lg">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors">
                        {t('fridge.modal.cancelButton')}
                    </button>
                    <button onClick={handleConfirm} disabled={selected.length === 0} className="px-4 py-2 bg-brand-primary text-white rounded-lg hover:bg-brand-dark disabled:bg-indigo-300 transition-colors">
                        {t('fridge.modal.addButton', { count: selected.length })}
                    </button>
                </div>
            </div>
        </div>
    );
};

const AccordionSection: React.FC<{
    category: FridgeCategory;
    items: FridgeItem[];
    isOpen: boolean;
    onToggle: () => void;
    onOpenAddModal: () => void;
    onRemoveItem: (item: string) => void;
}> = ({ category, items, isOpen, onToggle, onOpenAddModal, onRemoveItem }) => {
    const { t } = useLanguage();
    const title = t(`fridge.categories.${category}`);

    return (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                aria-expanded={isOpen}
            >
                <h4 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h4>
                <div className="flex items-center gap-4">
                     <button
                        onClick={(e) => { e.stopPropagation(); onOpenAddModal(); }}
                        className="text-brand-primary hover:text-brand-dark dark:text-indigo-400 dark:hover:text-indigo-300"
                        aria-label={t('fridge.modal.ariaAdd', { category: title })}
                    >
                        <PlusIcon className="w-5 h-5" />
                    </button>
                    <ChevronDownIcon className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </div>
            </button>
            {isOpen && (
                <div className="px-4 pb-4">
                    <div className="flex flex-wrap gap-2 items-center min-h-[24px]">
                        {items.length === 0 ? (
                            <p className="text-gray-400 text-sm italic">{t('fridge.emptyShelf')}</p>
                        ) : (
                            items.map(item => (
                                <span key={item.item} className="bg-indigo-50 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-200 text-sm font-medium pl-3 pr-2 py-1 rounded-full flex items-center gap-1.5 border border-indigo-200 dark:border-indigo-800/50">
                                    {item.item}
                                    <button onClick={() => onRemoveItem(item.item)} className="text-indigo-400 hover:text-red-500 dark:text-indigo-500 dark:hover:text-red-400 transition-colors">
                                        <XMarkIcon className="w-4 h-4" />
                                    </button>
                                </span>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};


const FridgeManager: React.FC<FridgeManagerProps> = ({ ingredients, onIngredientsChange }) => {
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalCategory, setModalCategory] = useState<FridgeCategory | null>(null);
    const [openSections, setOpenSections] = useState<Record<string, boolean>>({
        frozenGoods: true, iceCream: true, meat: true, vegetables: true, fruits: true, dairy: true, other: true, pantry: true,
    });
    
    const handleOpenModal = (category: FridgeCategory) => {
        setModalCategory(category);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setModalCategory(null);
    };
    
    const handleAddItemsFromModal = (selectedItems: string[]) => {
        if (modalCategory) {
            const newFridgeItems: FridgeItem[] = selectedItems.map(item => ({
                item,
                category: modalCategory,
            }));
            onIngredientsChange([...ingredients, ...newFridgeItems].sort((a, b) => a.item.localeCompare(b.item)));
        }
        handleCloseModal();
    };


    const handleRemoveItem = (itemToRemove: string) => {
        onIngredientsChange(ingredients.filter(item => item.item !== itemToRemove));
    };
    
    const handleToggleSection = (category: string) => {
        setOpenSections(prev => ({...prev, [category]: !prev[category]}));
    };

    const freezerCategories: FridgeCategory[] = ['frozenGoods', 'iceCream'];
    const refrigeratorCategories: FridgeCategory[] = ['meat', 'vegetables', 'fruits', 'dairy', 'other'];
    const pantryCategories: FridgeCategory[] = ['pantry'];

    const renderCompartment = (title: string, categories: FridgeCategory[]) => (
        <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 p-4 bg-gray-100 dark:bg-gray-900/50">{title}</h3>
            {categories.map(cat => (
                 <AccordionSection
                    key={cat}
                    category={cat}
                    items={ingredients.filter(i => i.category === cat)}
                    isOpen={!!openSections[cat]}
                    onToggle={() => handleToggleSection(cat)}
                    onOpenAddModal={() => handleOpenModal(cat)}
                    onRemoveItem={handleRemoveItem}
                />
            ))}
        </div>
    );

    return (
        <div className="w-full max-w-2xl mx-auto animate-fade-in">
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md overflow-hidden">
                {renderCompartment(t('fridge.freezer'), freezerCategories)}
                {renderCompartment(t('fridge.refrigerator'), refrigeratorCategories)}
                {renderCompartment(t('fridge.pantry'), pantryCategories)}
            </div>

             {isModalOpen && modalCategory && (
                <AddIngredientModal
                    category={modalCategory}
                    onClose={handleCloseModal}
                    onAdd={handleAddItemsFromModal}
                    existingIngredients={ingredients.map(i => i.item)}
                />
            )}
        </div>
    );
};

export default FridgeManager;