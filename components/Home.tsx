import React, { useState } from 'react';
import { BreakfastIcon, LunchIcon, AfternoonTeaIcon, DinnerIcon, HomeIcon, RestaurantIcon, StarIcon } from './icons';
import { useLanguage } from '../LanguageProvider';
import { MealType } from '../types';

interface HomeProps {
    onSelectMealType: (mealType: MealType) => void;
    onSelectDineOut: (mealType: MealType) => void;
}

type Scene = 'home' | 'out';

const Home: React.FC<HomeProps> = ({ onSelectMealType, onSelectDineOut }) => {
    const { t } = useLanguage();
    const [scene, setScene] = useState<Scene>('home');

    const actionCards: { type: MealType, icon: React.FC<React.SVGProps<SVGSVGElement>>, title: string, desc: string }[] = [
        { type: 'Breakfast', icon: BreakfastIcon, title: t('home.breakfast'), desc: t('home.breakfastDesc') },
        { type: 'Lunch', icon: LunchIcon, title: t('home.lunch'), desc: t('home.lunchDesc') },
        { type: 'Afternoon Tea', icon: AfternoonTeaIcon, title: t('home.afternoonTea'), desc: t('home.afternoonTeaDesc') },
        { type: 'Dinner', icon: DinnerIcon, title: t('home.dinner'), desc: t('home.dinnerDesc') },
    ];

    const handleCardClick = (mealType: MealType) => {
        if (scene === 'home') {
            onSelectMealType(mealType);
        } else {
            onSelectDineOut(mealType);
        }
    };

    return (
        <div className="text-center animate-fade-in">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('home.title')}</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">{t('home.subtitle')}</p>

            <div className="mb-8 flex justify-center">
                <div className="bg-gray-200 dark:bg-gray-700 p-1 rounded-full flex items-center space-x-1 shadow-inner">
                    <button 
                        onClick={() => setScene('home')} 
                        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${scene === 'home' ? 'bg-white text-brand-primary shadow dark:bg-brand-primary dark:text-white' : 'text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600'}`}
                    >
                         <HomeIcon className="w-5 h-5"/> {t('home.cookAtHome')}
                    </button>
                    <button 
                        onClick={() => setScene('out')} 
                        className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 transition-all duration-300 ${scene === 'out' ? 'bg-white text-brand-primary shadow dark:bg-brand-primary dark:text-white' : 'text-gray-600 hover:bg-gray-300 dark:text-gray-400 dark:hover:bg-gray-600'}`}
                    >
                        <RestaurantIcon className="w-5 h-5" /> {t('home.dineOut')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {actionCards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div 
                            key={card.type} 
                            onClick={() => handleCardClick(card.type)}
                            className="cursor-pointer bg-brand-light dark:bg-gray-800 p-6 rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all border border-gray-200 dark:border-gray-700 dark:hover:shadow-lg dark:hover:shadow-brand-primary/20 flex flex-col items-center"
                        >
                            <Icon className="w-16 h-16 mb-4 text-brand-primary" />
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">{card.title}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">{scene === 'home' ? card.desc : t('home.dineOutDescDynamic', { meal: card.title.toLowerCase() })}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-10">
                <div className="bg-gradient-to-r from-brand-primary to-brand-dark text-white p-6 rounded-lg shadow-lg text-left flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <StarIcon className="w-10 h-10 text-yellow-300 flex-shrink-0" />
                        <div>
                            <h3 className="font-bold text-lg">{t('home.featuredPartner.title')}</h3>
                            <p className="text-indigo-200 text-sm">{t('home.featuredPartner.description')}</p>
                            <p className="font-semibold mt-1">{t('home.featuredPartner.restaurantName')}</p>
                        </div>
                    </div>
                    <button onClick={() => alert('Feature to show partner restaurant details coming soon!')} className="bg-white text-brand-primary dark:text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0">
                        {t('home.featuredPartner.cta')}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;