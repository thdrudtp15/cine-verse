'use server';
import { GoogleGenAI } from '@google/genai';

export const getRecommendation = async (content: string) => {
    const genai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });

    console.log('하이요');

    return await genai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: content,
        config: {
            thinkingConfig: {
                thinkingBudget: 0, // Disables thinking
            },
        },
    });
};
