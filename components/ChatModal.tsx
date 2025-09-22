
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { useLanguage } from '../LanguageProvider';
import { XMarkIcon, UserIcon, ChefHatIcon, MicrophoneIcon, PaperAirplaneIcon } from './icons';
import Spinner from './Spinner';

// Add SpeechRecognition types for cross-browser compatibility
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface ChatModalProps {
    isOpen: boolean;
    onClose: () => void;
    history: ChatMessage[];
    onSendMessage: (message: string) => void;
    isLoading: boolean;
    onSelectSuggestion: (mealName: string) => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, history, onSendMessage, isLoading, onSelectSuggestion }) => {
    const { t, t_raw, language } = useLanguage();
    const [input, setInput] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [history, isLoading]);
    
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.warn("Speech Recognition not supported by this browser.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = language;
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
            console.error("Speech recognition error:", event.error);
            setIsListening(false);
        };
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(prev => prev ? `${prev} ${transcript}` : transcript);
        };

        recognitionRef.current = recognition;

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, [language]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (input.trim() && !isLoading) {
            onSendMessage(input.trim());
            setInput('');
        }
    };

    const handlePromptClick = (prompt: string) => {
        onSendMessage(prompt);
    };

    const handleToggleListening = () => {
        if (!recognitionRef.current) return;
        if (isListening) {
            recognitionRef.current.stop();
        } else {
            setInput(''); // Clear input before starting
            recognitionRef.current.start();
        }
    };

    if (!isOpen) return null;

    const renderMessageContent = (msg: ChatMessage) => {
        if (!msg.suggestions || msg.suggestions.length === 0) {
            return <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.text}</p>;
        }

        const parts = msg.text.split(/(\* .+(?:\n|$))/g).filter(part => part.trim() !== '');
        
        return (
            <div>
                {parts.map((part, index) => {
                    const suggestion = msg.suggestions?.find(s => part.includes(s));
                    if (suggestion) {
                        return (
                             <div key={index} className="my-2">
                                <p className="font-semibold text-brand-dark dark:text-indigo-300 mb-1 ml-4">• {suggestion}</p>
                                <button
                                    onClick={() => onSelectSuggestion(suggestion)}
                                    className="ml-8 text-sm bg-brand-secondary text-white font-semibold py-1 px-3 rounded-full hover:bg-green-600 transition-colors"
                                >
                                    {t('chat.getRecipeFor', { mealName: suggestion })}
                                </button>
                            </div>
                        );
                    }
                    // Render non-suggestion parts of the text
                    const isSuggestionLine = msg.suggestions?.some(s => part.includes(s));
                    if (!isSuggestionLine && part.trim() !== '*') {
                         return <p key={index} className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{part.replace(/^\* /, '')}</p>;
                    }
                    return null;
                })}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg h-[80vh] max-h-[700px] flex flex-col transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-brand-dark dark:text-indigo-300">{t('chat.title')}</h2>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                        <XMarkIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                    {history.length === 0 && !isLoading ? (
                        <div className="text-center p-4">
                            <div className="inline-block p-3 bg-brand-light dark:bg-gray-700 rounded-full mb-4">
                               <ChefHatIcon className="w-10 h-10 text-brand-primary"/>
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100">{t('chat.welcome.title')}</h3>
                            <p className="text-gray-500 dark:text-gray-400 mt-2 mb-6">{t('chat.welcome.subtitle')}</p>
                            <div className="space-y-3 text-left">
                                {(t_raw('chat.welcome.prompts') as string[]).map((prompt, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => handlePromptClick(prompt)}
                                        className="w-full text-left p-3 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 hover:border-brand-primary dark:hover:border-brand-primary transition-colors text-sm text-gray-700 dark:text-gray-300"
                                    >
                                        {prompt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {history.map((msg, index) => (
                                <div key={index} className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
                                    {msg.role === 'model' && <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 text-white"><ChefHatIcon className="w-5 h-5"/></div>}
                                    <div className={`max-w-md p-3 rounded-2xl ${msg.role === 'user' ? 'bg-indigo-100 dark:bg-indigo-900/50 text-gray-800 dark:text-indigo-200 rounded-br-none' : 'bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-bl-none'}`}>
                                        {renderMessageContent(msg)}
                                    </div>
                                    {msg.role === 'user' && <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0"><UserIcon className="w-5 h-5 text-gray-600"/></div>}
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex items-start gap-3">
                                    <div className="w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0 text-white"><ChefHatIcon className="w-5 h-5"/></div>
                                    <div className="max-w-md p-3 rounded-2xl bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-bl-none">
                                        <Spinner className="w-5 h-5 text-brand-primary"/>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Input Form */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
                    <form onSubmit={handleSubmit} className="flex items-center gap-3">
                         <div className="relative flex-grow">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={isListening ? t('chat.voiceListening') : t('chat.placeholder')}
                                className="w-full p-3 border rounded-full focus:ring-2 focus:ring-brand-primary focus:outline-none pr-12 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 dark:placeholder-gray-400"
                                disabled={isLoading}
                            />
                            <button
                                type="button"
                                onClick={handleToggleListening}
                                disabled={!recognitionRef.current}
                                className={`absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 dark:text-gray-500 hover:text-brand-primary dark:hover:text-brand-primary focus:outline-none disabled:opacity-50 ${isListening ? 'text-red-500' : ''}`}
                                aria-label={t('chat.voiceInput')}
                            >
                                {isListening && <span className="absolute h-3 w-3 rounded-full bg-red-500 opacity-75 animate-ping"></span>}
                                <MicrophoneIcon className="w-6 h-6" />
                            </button>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading || !input.trim()}
                            className="bg-brand-primary text-white font-bold p-3 rounded-full disabled:bg-indigo-300 hover:bg-brand-dark transition-colors flex-shrink-0 w-12 h-12 flex items-center justify-center"
                            aria-label={t('chat.sendButton')}
                        >
                            <PaperAirplaneIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
             <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out forwards;
                }
                 @keyframes scaleIn {
                    from { transform: scale(0.95); opacity: 0; }
                    to { transform: scale(1); opacity: 1; }
                }
                .animate-scale-in {
                     animation: scaleIn 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ChatModal;
