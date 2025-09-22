
import React, { useState } from 'react';
import { RestaurantSuggestion, MealType } from '../types';
import { ArrowLeftIcon, MapPinIcon, MagnifyingGlassIcon } from './icons';
import Spinner from './Spinner';
import { useLanguage } from '../LanguageProvider';

interface RestaurantFinderProps {
    suggestions: RestaurantSuggestion[];
    onBack: () => void;
    isLoading: boolean;
    mealType: MealType | null;
    onSearch: (location: string | { lat: number, lon: number }) => void;
}

const RestaurantFinder: React.FC<RestaurantFinderProps> = ({ suggestions, onBack, isLoading, mealType, onSearch }) => {
    const { t } = useLanguage();
    const [location, setLocation] = useState('');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (location) {
            onSearch(location);
        }
    };

    const handleCurrentLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    onSearch({ lat: position.coords.latitude, lon: position.coords.longitude });
                },
                (error) => {
                    console.error("Error getting location", error);
                    alert("Could not get current location. Please enter it manually.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const mealTypeTitle = mealType ? t(`home.${mealType.toLowerCase().replace(' ', '')}`) : '';
    
    return (
        <div className="animate-fade-in">
            <div className="flex items-center mb-6">
                <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mr-4">
                    <ArrowLeftIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                </button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{t('restaurantFinder.title')}</h2>
                    <p className="text-gray-500 dark:text-gray-400">{t('restaurantFinder.subtitle')}</p>
                </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
                <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder={t('restaurantFinder.searchPlaceholder')}
                        className="flex-grow p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-brand-primary focus:outline-none dark:bg-gray-700 dark:text-gray-200 dark:placeholder-gray-400"
                    />
                    <button type="submit" disabled={!location || isLoading} className="bg-brand-primary text-white font-bold py-3 px-6 rounded-md hover:bg-brand-dark transition-colors disabled:bg-indigo-300 flex items-center justify-center gap-2">
                        <MagnifyingGlassIcon className="w-5 h-5"/>
                        {t('restaurantFinder.findButton')}
                    </button>
                </form>
                <div className="relative flex items-center justify-center my-4">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                    </div>
                    <div className="relative bg-white dark:bg-gray-800 px-2 text-sm text-gray-500 dark:text-gray-400">{t('restaurantFinder.or')}</div>
                </div>
                <button onClick={handleCurrentLocation} disabled={isLoading} className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                     <MapPinIcon className="w-5 h-5"/>
                    {t('restaurantFinder.useCurrentLocation')}
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center h-48">
                    <Spinner className="w-10 h-10 text-brand-primary" />
                    <p className="mt-4 text-gray-600 dark:text-gray-300">{t('restaurantFinder.loading')}</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                        <div key={index} className="bg-brand-light dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
                            <h3 className="font-bold text-lg text-brand-dark dark:text-indigo-300">{suggestion.type}</h3>
                            <p className="text-gray-600 dark:text-gray-400">{suggestion.reason}</p>
                            <button 
                                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(suggestion.type + ' near ' + (typeof location === 'string' ? location : 'me'))}`, '_blank')}
                                className="mt-3 text-sm text-brand-primary hover:text-brand-dark dark:hover:text-indigo-300 font-semibold"
                            >
                                {t('restaurantFinder.mapButton')} &rarr;
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RestaurantFinder;
