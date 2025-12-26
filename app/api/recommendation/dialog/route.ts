import { NextResponse } from 'next/server';
import {
    getRecommendationByGemini,
    getRecommendationList,
    saveRecommendationHistory,
    saveRecommendationList,
    saveMovieListData,
} from '@/lib/actions/getRecommendation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { revalidateTag } from 'next/cache';

const getPrompt = (input: string) => {
    return `You are a personalized Movie Recommendation Engine that analyzes user behavior patterns.
        [USER INPUT]
        "${input}"

        [TASK]
        1. Combine the [USER BEHAVIOR DATA] and [USER INPUT] to understand the user's current intent.
        2. If the user input is brief, prioritize the preferences found in [USER BEHAVIOR DATA].
        3. Recommend 5 real, existing movies that provide a high degree of satisfaction based on these patterns.

        [CRITICAL RULES]
        - NEVER recommend generic action/superhero blockbusters (e.g., Marvel, DC, Avengers) unless specifically requested.
        - If behavior data suggests a preference for a specific genre (like Romance), stay strictly within that genre.
        - All movie titles must be in English.
        - Output MUST be a single JSON object. No markdown, no intro/outro.

        [OUTPUT SCHEMA]
        {
        "user_intent_analysis": "Brief analysis of what the user wants based on behavior and input",
        "recommendations": [
            {
            "title": "English Movie Title",
            "year": "Release Year",
            "style_match": "Explain why this matches their behavioral pattern (e.g., 'Matches your preference for slow-paced romance')"
            }
        ]
        }

        BEGIN JSON NOW:`;
};

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);

    const { input } = await request.json();
    const prompt = getPrompt(input);

    try {
        const recommendation = await getRecommendationByGemini(prompt);
        const recommendationList = await getRecommendationList(recommendation);
        await saveMovieListData(recommendationList);

        if (session) {
            const recommendationHistoryId = await saveRecommendationHistory(session, 'dialog', input);
            await saveRecommendationList(recommendationHistoryId, recommendationList);
            revalidateTag('recommendation_history', { expire: 0 });
            revalidateTag('recommendation_list', { expire: 0 });
            revalidateTag('user_stats_count', { expire: 0 });
        }

        return NextResponse.json(
            { message: '영화 추천 및 내역, 리스트 저장 성공', recommendationList },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : '알 수 없는 오류' },
            { status: 500 }
        );
    }
};
