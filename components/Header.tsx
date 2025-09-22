import React from 'react';
import { useLanguage } from '../LanguageProvider';
import { Language } from '../types';
import { SunIcon, MoonIcon, LanguageIcon, ChefHatIcon } from './icons';

interface HeaderProps {
    language: Language;
    onLanguageChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    languages: { code: Language; name: string }[];
    theme: 'light' | 'dark';
    onThemeChange: (theme: 'light' | 'dark') => void;
}

const Header: React.FC<HeaderProps> = ({ language, onLanguageChange, languages, theme, onThemeChange }) => {
    const { t } = useLanguage();

    const handleThemeToggle = () => {
        onThemeChange(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <header className="fixed top-0 left-0 right-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm shadow-md z-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* App Title/Logo */}
                    <div className="flex items-center gap-2">
                         <ChefHatIcon className="w-8 h-8 text-brand-primary" />
                        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-100">{t('appName')}</h1>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <LanguageIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 absolute top-1/2 left-2 -translate-y-1/2 pointer-events-none" />
                            <select
                                id="language-select"
                                value={language}
                                onChange={onLanguageChange}
                                className="pl-8 pr-4 py-1.5 text-sm border-gray-300 focus:outline-none focus:ring-brand-primary focus:border-brand-primary rounded-md shadow-sm bg-white dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600 appearance-none"
                                aria-label="Select Language"
                            >
                                {languages.map(lang => (
                                    <option key={lang.code} value={lang.code}>
                                        {lang.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <button
                            onClick={handleThemeToggle}
                            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;