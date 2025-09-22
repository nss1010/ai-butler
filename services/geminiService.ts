
import { GoogleGenAI, Type } from "@google/genai";
import { FamilyMember, MealSuggestion, Recipe, RestaurantSuggestion, Language, MealType, ChatMessage, RecipeHistoryItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const model = "gemini-2.5-flash";

// Fix: Add missing 'zh-TW' language to satisfy the Language type.
const languageMap: { [key in Language]: string } = {
    'en': 'English',
    'zh-HK': 'Traditional Chinese (Cantonese)',
    'zh-CN': 'Simplified Chinese (Mandarin)',
    'hi': 'Hindi',
    'fr': 'French',
    'es': 'Spanish',
    'it': 'Italian',
    'he': 'Hebrew',
    'ja': 'Japanese',
    'ko': 'Korean',
    'ms': 'Malay',
    'zh-TW': 'Traditional Chinese (Taiwan)'
};

const generateFamilyContextPrompt = (members: FamilyMember[], taboos: string, preferences: string, fridgeContents?: string): string => {
    let contextPrompt = "";
    if (members.length === 0) {
        contextPrompt = "The user is a single adult. Please provide suggestions suitable for one person.\n";
    } else {
        contextPrompt = "This is the family profile with individual members:\n";
        members.forEach(member => {
            contextPrompt += `- ${member.name}: Prefers ${member.ethnicity || 'diverse'} cuisine. Allergies: ${member.allergies || 'none'}. Dietary Restrictions/Dislikes: ${member.restrictions || 'none'}.\n`;
        });
    }

    if (fridgeContents) {
        contextPrompt += `\nINGREDIENTS ON HAND (Please prioritize using these): ${fridgeContents}\n`;
    }

    if (taboos) {
        const tabooLabel = members.length > 0 ? "IMPORTANT OVERALL RESTRICTIONS (Taboos for the whole family that must be respected):" : "IMPORTANT RESTRICTIONS (Taboos that must be respected):";
        contextPrompt += `\n${tabooLabel} ${taboos}\n`;
    }

    if (preferences) {
        const preferenceLabel = members.length > 0 ? "OVERALL FAMILY PREFERENCES (Should be considered):" : "PREFERENCES (Should be considered):";
        contextPrompt += `\n${preferenceLabel} ${preferences}\n`;
    }
    
    return contextPrompt;
};

export const generateMealSuggestions = async (family: FamilyMember[], taboos: string, preferences: string, language: Language, mealType: MealType, fridgeContents: string, recipeHistory: RecipeHistoryItem[]): Promise<MealSuggestion[]> => {
    const familyContext = generateFamilyContextPrompt(family, taboos, preferences, fridgeContents);
    const targetLanguage = languageMap[language];

    let historyPrompt = "";
    if (recipeHistory && recipeHistory.length > 0) {
        historyPrompt = `\nRECENTLY COOKED MEALS (Avoid suggesting these or very similar dishes): ${recipeHistory.map(r => r.name).join(', ')}\n`;
    }

    const prompt = `
        You are a meal planner. Based on the context below, suggest 5 diverse and appealing ${mealType.toLowerCase()} ideas.
        If there are ingredients listed as 'ON HAND', you MUST strongly prioritize suggestions that use those items to help the user cook with what they have.

        For each suggestion, provide:
        1. A brief, enticing one-sentence description.
        2. An array of 2-3 short, relevant tags (e.g., "Healthy", "Quick to Make", "Kid-Friendly", "High-Protein", "Vegetarian").
        3. An array of strings named "usedFromFridge" listing which of the "INGREDIENTS ON HAND" are used in this suggestion. If none are used, return an empty array.

        Ensure all suggestions respect all allergies and restrictions mentioned.
        IMPORTANT: Your entire response, including meal names, descriptions, and tags, must be in ${targetLanguage}.

        Context:
        ${familyContext}
        ${historyPrompt}
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    suggestions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING, description: "The name of the meal." },
                                description: { type: Type.STRING, description: "A short, enticing description." },
                                tags: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "An array of 2-3 short, relevant tags like 'Healthy', 'Quick to Make', 'Kid-Friendly'."
                                },
                                usedFromFridge: {
                                    type: Type.ARRAY,
                                    items: { type: Type.STRING },
                                    description: "An array of ingredients from the user's 'ON HAND' list that are used in this recipe suggestion. This must be an array, which can be empty if no ingredients from the list are used."
                                }
                            },
                            required: ["name", "description", "tags", "usedFromFridge"]
                        }
                    }
                },
                 required: ["suggestions"]
            }
        }
    });

    const json = JSON.parse(response.text);
    return json.suggestions;
};

export const generateRecipe = async (mealName: string, family: FamilyMember[], taboos: string, preferences: string, language: Language): Promise<Recipe> => {
    const familyContext = generateFamilyContextPrompt(family, taboos, preferences);
    const targetLanguage = languageMap[language];
    const prompt = `
        You are a recipe writer. Generate a detailed, easy-to-follow recipe for "${mealName}".
        The recipe must be adapted to be safe and enjoyable for the user(s) described below. Pay close attention to all allergies and restrictions.
        IMPORTANT: Your entire response (recipe name, description, ingredients, instructions, etc.) must be in ${targetLanguage}.

        Context:
        ${familyContext}

        Provide the recipe with prep time, cook time, and number of servings suitable for ${family.length > 0 ? family.length : 1} person(s).
        List ingredients clearly and provide step-by-step instructions.
        Finally, provide a 'coreIngredients' array containing just the simple, generic name of each ingredient in ${targetLanguage} (e.g., 'Pork', 'Soy Sauce', 'Carrot') in the same order as the main 'ingredients' list. This is for programmatic matching.
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    name: { type: Type.STRING },
                    description: { type: Type.STRING },
                    prepTime: { type: Type.STRING },
                    cookTime: { type: Type.STRING },
                    servings: { type: Type.STRING },
                    ingredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    instructions: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING }
                    },
                    coreIngredients: {
                        type: Type.ARRAY,
                        items: { type: Type.STRING },
                        description: "A list of simple, generic ingredient names corresponding to the 'ingredients' list."
                    }
                },
                required: ["name", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions", "coreIngredients"]
            }
        }
    });
    
    return JSON.parse(response.text);
};

export const generateRestaurantRecommendations = async (family: FamilyMember[], taboos: string, preferences: string, location: string | { lat: number, lon: number }, language: Language, mealType: MealType): Promise<RestaurantSuggestion[]> => {
    const familyContext = generateFamilyContextPrompt(family, taboos, preferences);
    const targetLanguage = languageMap[language];

    const locationPrompt = typeof location === 'string'
        ? `in "${location}"`
        : `near the coordinates latitude: ${location.lat}, longitude: ${location.lon}`;

    const prompt = `
        You are a local food guide. A user is looking for ${mealType.toLowerCase()} options ${locationPrompt}.
        Here is their context:
        ${familyContext}

        Suggest 5 types of restaurants (e.g., "Family-style Italian", "Casual Vietnamese", "Taco Restaurant") that would be a good fit. 
        For each suggestion, provide a brief one-sentence reason why it's suitable, considering their preferences and restrictions for this specific mealtime.
        IMPORTANT: Your entire response, including the restaurant types and reasons, must be in ${targetLanguage}.
    `;

    const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    recommendations: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                type: { type: Type.STRING, description: "The type or cuisine of the restaurant." },
                                reason: { type: Type.STRING, description: "Why this is a good choice for the user(s)." }
                            },
                            required: ["type", "reason"]
                        }
                    }
                },
                required: ["recommendations"]
            }
        }
    });

    const json = JSON.parse(response.text);
    return json.recommendations;
};

export const generateChatResponse = async (
    history: ChatMessage[],
    newMessage: string,
    family: FamilyMember[],
    taboos: string,
    preferences: string,
    language: Language,
    fridgeContents: string
): Promise<string> => {
    const familyContext = generateFamilyContextPrompt(family, taboos, preferences, fridgeContents);
    const targetLanguage = languageMap[language];

    const systemInstruction = `You are a helpful and friendly AI Family Butler specializing in meal planning.
    Your goal is to have a conversation with the user to help them decide what to eat.
    - Analyze the user's request, their family profile, preferences, available ingredients, and any conversation history provided.
    - If the user provides a list of ingredients on hand, prioritize suggestions that use them.
    - Provide relevant and creative meal ideas or answer their questions about food.
    - When you suggest specific dishes, you MUST format them in a list where each dish name is prefixed with '* '. For example: '* Steamed Sea Bass'. This is critical for the app to create buttons.
    - Keep your responses concise and conversational.
    - Your entire response MUST be in ${targetLanguage}.

    Family Context:
    ${familyContext}`;

    const contents = history.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));
    contents.push({ role: 'user', parts: [{ text: newMessage }] });

    const response = await ai.models.generateContent({
        model,
        contents,
        config: {
            systemInstruction,
        }
    });

    return response.text;
};

const translateToEnglish = async (text: string): Promise<string> => {
    // Basic check if it's already English-like
    if (/^[a-zA-Z0-9\s.,'"]*$/.test(text)) {
        return text;
    }
    const response = await ai.models.generateContent({
        model,
        contents: `Translate the following food dish name to English: "${text}"`,
    });
    return response.text.trim();
};

export const generateRecipeImage = async (recipeName: string): Promise<string> => {
    const englishRecipeName = await translateToEnglish(recipeName);
    const prompt = `A delicious, mouth-watering, professional food photography of "${englishRecipeName}". The dish is beautifully plated on a clean, modern plate, sitting on a rustic wooden table. The lighting is bright and natural, highlighting the textures of the food. Steam might be gently rising from the dish. In the background, there are some fresh ingredients used in the recipe, slightly blurred. High resolution, vibrant colors, appetizing.`;

    const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt,
        config: {
            numberOfImages: 1,
            outputMimeType: 'image/jpeg',
            aspectRatio: '4:3',
        },
    });

    return response.generatedImages[0].image.imageBytes;
};
