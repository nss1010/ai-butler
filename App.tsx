import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from './LanguageProvider';
import Home from './components/Home';
import FamilySettings from './components/FamilySettings';
import FridgeManager from './components/FridgeManager';
import BottomNavBar from './components/BottomNavBar';
import MealPlanner from './components/MealPlanner';
import RecipeDisplay from './components/RecipeDisplay';
import RestaurantFinder from './components/RestaurantFinder';
import MultiRecipeDisplay from './components/MultiRecipeDisplay';
import ChatModal from './components/ChatModal';
import Header from './components/Header';
import { FamilyMember, Language, MealType, MealSuggestion, Recipe, RestaurantSuggestion, FridgeItem, ChatMessage, RecipeHistoryItem } from './types';
import * as geminiService from './services/geminiService';
import { getCategoryForItem } from './utils/categorize';
import { ChatBubbleLeftRightIcon } from './components/icons';

export type Tab = 'home' | 'settings' | 'fridge';
type View = 'home' | 'mealPlanner' | 'recipe' | 'restaurantFinder' | 'multiRecipe';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  // App State
  const [activeTab, setActiveTab] = useState<Tab>('home');
  const [currentView, setCurrentView] = useState<View>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [theme, setTheme] = useState<Theme>('light');

  // Data State
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
  const [foodTaboos, setFoodTaboos] = useState('');
  const [foodPreferences, setFoodPreferences] = useState('');
  const [fridgeContents, setFridgeContents] = useState<FridgeItem[]>([]);
  const [recipeHistory, setRecipeHistory] = useState<RecipeHistoryItem[]>([]);

  // Meal Planner State
  const [mealSuggestions, setMealSuggestions] = useState<MealSuggestion[]>([]);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [selectedMealName, setSelectedMealName] = useState<string | null>(null);
  const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
  const [loadingRecipeName, setLoadingRecipeName] = useState<string | null>(null);
  const [selectedMeals, setSelectedMeals] = useState<MealSuggestion[]>([]);

  // Multi Recipe State
  const [multiRecipes, setMultiRecipes] = useState<Recipe[]>([]);
  const [isMultiRecipeLoading, setIsMultiRecipeLoading] = useState(false);

  // Restaurant Finder State
  const [restaurantSuggestions, setRestaurantSuggestions] = useState<RestaurantSuggestion[]>([]);

  // Chat State
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Persist state to localStorage
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('familyMealPlannerState');
      if (savedState) {
        const { familyMembers, foodTaboos, foodPreferences, fridgeContents, language, recipeHistory, theme } = JSON.parse(savedState);
        setFamilyMembers(familyMembers || []);
        setFoodTaboos(foodTaboos || '');
        setFoodPreferences(foodPreferences || '');
        setFridgeContents(fridgeContents || []);
        setLanguage(language || 'en');
        setRecipeHistory(recipeHistory || []);
        setTheme(theme || 'light');
      }
    } catch (error) {
      console.error("Failed to load state from localStorage", error);
    }
  }, [setLanguage]);

  useEffect(() => {
    try {
      const stateToSave = JSON.stringify({ familyMembers, foodTaboos, foodPreferences, fridgeContents, language, recipeHistory, theme });
      localStorage.setItem('familyMealPlannerState', stateToSave);
    } catch (error) {
      console.error("Failed to save state to localStorage", error);
    }
  }, [familyMembers, foodTaboos, foodPreferences, fridgeContents, language, recipeHistory, theme]);

  // Apply theme class to root element
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
  }, [theme]);

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  // Navigation handlers
  const navigateBack = () => {
    setCurrentView('home');
    setActiveTab('home');
    setCurrentRecipe(null);
    setMealSuggestions([]);
    setRestaurantSuggestions([]);
    setSelectedMeals([]);
    setMultiRecipes([]);
  };

  const plannerBack = () => {
    setCurrentView('home');
    setMealSuggestions([]);
    setSelectedMeals([]);
  }

  // API Call Handlers
  const fetchMealSuggestions = useCallback(async (mealType: MealType) => {
    setIsLoading(true);
    setMealSuggestions([]);
    try {
      const fridgeItems = fridgeContents.map(i => i.item).join(', ');
      const suggestions = await geminiService.generateMealSuggestions(familyMembers, foodTaboos, foodPreferences, language, mealType, fridgeItems, recipeHistory);
      setMealSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to get meal suggestions:", error);
      alert("Sorry, I couldn't get meal suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [familyMembers, foodTaboos, foodPreferences, language, fridgeContents, recipeHistory]);

  const handleSelectMealType = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setSelectedMeals([]); // Reset selections when starting a new plan
    setCurrentView('mealPlanner');
    fetchMealSuggestions(mealType);
  };

  const handleSelectDineOut = (mealType: MealType) => {
    setSelectedMealType(mealType);
    setCurrentView('restaurantFinder');
  };

  const handleSearchRestaurants = async (location: string | { lat: number, lon: number }) => {
    if (!selectedMealType) return;
    setIsLoading(true);
    setRestaurantSuggestions([]);
    try {
      const suggestions = await geminiService.generateRestaurantRecommendations(familyMembers, foodTaboos, foodPreferences, location, language, selectedMealType);
      setRestaurantSuggestions(suggestions);
    } catch (error) {
      console.error("Failed to get restaurant recommendations:", error);
      alert("Sorry, I couldn't get restaurant recommendations. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectMeal = async (mealName: string) => {
    setLoadingRecipeName(mealName);
    try {
      const recipe = await geminiService.generateRecipe(mealName, familyMembers, foodTaboos, foodPreferences, language);
      setCurrentRecipe(recipe);
      setCurrentView('recipe');
      
      const newHistoryEntry: RecipeHistoryItem = { name: recipe.name, date: new Date().toISOString() };
      setRecipeHistory(prev => [newHistoryEntry, ...prev.filter(p => p.name !== recipe.name)].slice(0, 20));

    } catch (error) {
      console.error("Failed to get recipe:", error);
      alert("Sorry, I couldn't get the recipe. Please try again.");
    } finally {
      setLoadingRecipeName(null);
    }
  };

  // Family Profile Handlers
  const handleAddMember = (member: Omit<FamilyMember, 'id'>) => {
    setFamilyMembers([...familyMembers, { ...member, id: Date.now().toString() }]);
  };
  const handleUpdateMember = (updatedMember: FamilyMember) => {
    setFamilyMembers(familyMembers.map(m => m.id === updatedMember.id ? updatedMember : m));
  };
  const handleRemoveMember = (id: string) => {
    setFamilyMembers(familyMembers.filter(m => m.id !== id));
  };

  const handleClearRecipeHistory = () => {
    setRecipeHistory([]);
  };

  // Fridge Handlers
  const handleAddToFridge = (items: string[]) => {
    const newItems: FridgeItem[] = items
      .filter(item => !fridgeContents.some(fi => fi.item.toLowerCase() === item.toLowerCase()))
      .map(item => ({
        item,
        category: getCategoryForItem(item, language),
      }));

    if (newItems.length > 0) {
      setFridgeContents([...fridgeContents, ...newItems].sort((a, b) => a.item.localeCompare(b.item)));
    }
  };

  const handleToggleMealSelection = (meal: MealSuggestion) => {
    setSelectedMeals(prev =>
      prev.some(m => m.name === meal.name)
        ? prev.filter(m => m.name !== meal.name)
        : [...prev, meal]
    );
  };

  const handleViewMultiRecipe = async () => {
    setIsMultiRecipeLoading(true);
    setCurrentView('multiRecipe');
    setMultiRecipes([]);
    try {
      const recipes = await Promise.all(
        selectedMeals.map(meal => geminiService.generateRecipe(meal.name, familyMembers, foodTaboos, foodPreferences, language))
      );
      setMultiRecipes(recipes);
      
      const newHistoryEntries: RecipeHistoryItem[] = recipes.map(recipe => ({ name: recipe.name, date: new Date().toISOString() }));
      setRecipeHistory(prev => [...newHistoryEntries, ...prev.filter(p => !newHistoryEntries.some(n => n.name === p.name))].slice(0, 20));

    } catch (error) {
      console.error("Failed to get multiple recipes:", error);
      alert("Sorry, I couldn't get all the recipes. Please try again.");
    } finally {
      setIsMultiRecipeLoading(false);
    }
  };

  // Chat handlers
  const handleSendMessage = async (message: string) => {
    const userMessage: ChatMessage = { role: 'user', text: message };
    setChatHistory(prev => [...prev, userMessage]);
    setIsChatLoading(true);

    try {
      const fridgeItems = fridgeContents.map(i => i.item).join(', ');
      const responseText = await geminiService.generateChatResponse([...chatHistory, userMessage], message, familyMembers, foodTaboos, foodPreferences, language, fridgeItems);
      
      const suggestions = responseText.match(/\* .+/g)?.map(s => s.replace('* ', '')) || [];
      const modelMessage: ChatMessage = { role: 'model', text: responseText, suggestions };
      
      setChatHistory(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error("Chat API error:", error);
      const errorMessage: ChatMessage = { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again." };
      setChatHistory(prev => [...prev, errorMessage]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleSelectChatSuggestion = (mealName: string) => {
    setIsChatOpen(false);
    handleSelectMeal(mealName);
  };

  const languages = [
    { code: 'en' as Language, name: 'English' }, 
    { code: 'zh-HK' as Language, name: '繁體中文 (香港)' }, 
    { code: 'zh-CN' as Language, name: '简体中文 (中国)' },
    { code: 'zh-TW' as Language, name: '繁體中文 (台灣)' },
    { code: 'ja' as Language, name: '日本語' }, 
    { code: 'ko' as Language, name: '한국어' }, 
    { code: 'es' as Language, name: 'Español' },
    { code: 'fr' as Language, name: 'Français' }, 
    { code: 'it' as Language, name: 'Italiano' }, 
    { code: 'hi' as Language, name: 'हिन्दी' },
    { code: 'he' as Language, name: 'עִברִית' }, 
    { code: 'ms' as Language, name: 'Bahasa Melayu' }
  ];

  const renderContent = () => {
    if (currentView !== 'home' && activeTab === 'home') {
      switch (currentView) {
        case 'mealPlanner':
          return <MealPlanner
            suggestions={mealSuggestions}
            onSelectMeal={handleSelectMeal}
            onBack={plannerBack}
            isLoading={isLoading}
            mealType={selectedMealType}
            loadingRecipe={loadingRecipeName}
            onRefresh={(mt) => fetchMealSuggestions(mt)}
            selectedMeals={selectedMeals}
            onToggleSelection={handleToggleMealSelection}
            onViewMultiRecipe={handleViewMultiRecipe}
          />;
        case 'recipe':
          return currentRecipe && <RecipeDisplay recipe={currentRecipe} onBack={() => setCurrentView('mealPlanner')} fridgeContents={fridgeContents} onAddToFridge={handleAddToFridge} />;
        case 'restaurantFinder':
          return <RestaurantFinder suggestions={restaurantSuggestions} onBack={plannerBack} isLoading={isLoading} mealType={selectedMealType} onSearch={handleSearchRestaurants} />;
        case 'multiRecipe':
          return <MultiRecipeDisplay recipes={multiRecipes} isLoading={isMultiRecipeLoading} onBack={() => setCurrentView('mealPlanner')} fridgeContents={fridgeContents} onAddToFridge={handleAddToFridge} />;
        default:
          return <Home onSelectMealType={handleSelectMealType} onSelectDineOut={handleSelectDineOut} />;
      }
    }

    switch (activeTab) {
      case 'home':
        return <Home onSelectMealType={handleSelectMealType} onSelectDineOut={handleSelectDineOut} />;
      case 'settings':
        return <FamilySettings
          familyMembers={familyMembers}
          onAddMember={handleAddMember}
          onUpdateMember={handleUpdateMember}
          onRemoveMember={handleRemoveMember}
          foodTaboos={foodTaboos}
          onFoodTaboosChange={setFoodTaboos}
          foodPreferences={foodPreferences}
          onFoodPreferencesChange={setFoodPreferences}
          recipeHistory={recipeHistory}
          onClearRecipeHistory={handleClearRecipeHistory}
        />;
      case 'fridge':
        return <FridgeManager ingredients={fridgeContents} onIngredientsChange={setFridgeContents} />;
      default:
        return <Home onSelectMealType={handleSelectMealType} onSelectDineOut={handleSelectDineOut} />;
    }
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-900 h-screen font-sans text-gray-800 dark:text-gray-200 flex flex-col">
      <Header 
        language={language}
        onLanguageChange={handleLanguageChange}
        languages={languages}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8 flex-grow overflow-y-auto">
        {renderContent()}
      </main>

      {/* Chat FAB */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-24 right-6 bg-brand-primary text-white p-4 rounded-full shadow-lg hover:bg-brand-dark transition-transform transform hover:scale-110 z-40"
        aria-label="Open AI Meal Assistant"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8"/>
      </button>

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        history={chatHistory}
        onSendMessage={handleSendMessage}
        isLoading={isChatLoading}
        onSelectSuggestion={handleSelectChatSuggestion}
      />
      
      <BottomNavBar activeTab={activeTab} onTabChange={(tab) => { setCurrentView('home'); setActiveTab(tab); }} />
    </div>
  );
};

export default App;