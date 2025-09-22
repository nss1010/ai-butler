import React from 'react';
import { HomeIcon, Cog6ToothIcon, FridgeIcon } from './icons';
import { useLanguage } from '../LanguageProvider';
import { Tab } from '../App';

interface BottomNavBarProps {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeTab, onTabChange }) => {
    const { t } = useLanguage();

    const tabs: { id: Tab, icon: React.FC<React.SVGProps<SVGSVGElement>>, label: string }[] = [
        { id: 'settings', icon: Cog6ToothIcon, label: t('tabs.settings') },
        { id: 'home', icon: HomeIcon, label: t('tabs.home') },
        { id: 'fridge', icon: FridgeIcon, label: t('tabs.fridge') },
    ];

    return (
        <footer className="bg-white dark:bg-gray-800 dark:border-t dark:border-gray-700 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-30 h-16 flex-shrink-0">
            <nav className="flex justify-around items-center h-full max-w-4xl mx-auto px-4">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex flex-col items-center justify-center w-24 h-full pt-1 transition-colors duration-200 ${isActive ? 'text-brand-primary' : 'text-gray-500 dark:text-gray-400 hover:text-brand-primary'}`}
                            aria-current={isActive ? 'page' : undefined}
                        >
                            <Icon className="w-7 h-7 mb-0.5" />
                            <span className="text-xs font-semibold">{tab.label}</span>
                        </button>
                    );
                })}
            </nav>
        </footer>
    );
};

export default BottomNavBar;