
import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Language } from './types';
import { translations } from './translations';

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, replacements?: { [key: string]: string | number }) => string;
    t_raw: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');

    const t = useCallback((key: string, replacements?: { [key: string]: string | number }): string => {
        const langDict = translations[language] || translations['en'];
        // Fix: Ensure the resolved value is a string or number before processing. Fallback to the key for objects or other types.
        const translationValue = key.split('.').reduce((obj, k) => obj && obj[k], langDict) || key;
        
        let text = (typeof translationValue === 'string' || typeof translationValue === 'number') ? String(translationValue) : key;
        
        if (replacements) {
            Object.keys(replacements).forEach(placeholder => {
                text = text.replace(`{${placeholder}}`, String(replacements[placeholder]));
            });
        }

        return text;
    }, [language]);

    const t_raw = useCallback((key: string): any => {
        const langDict = translations[language] || translations['en'];
        return key.split('.').reduce((obj, k) => obj && typeof obj === 'object' ? obj[k] : undefined, langDict) || [];
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, t_raw }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
