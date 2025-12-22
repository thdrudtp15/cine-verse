import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import {
    getRecommendationByGemini,
    getRecommendationList,
    saveRecommendationHistory,
    saveRecommendationList,
} from '@/lib/actions/getRecommendation';
import { getImbedText } from '@/lib/utils/getImbedText';
import { revalidateTag } from 'next/cache';

import type { Movies } from '@/types/database';

const getPrompt = (tasteMoviesText: string[]) => {
    return `You are an expert movie recommendation system.
            ${
                tasteMoviesText && tasteMoviesText.length > 0
                    ? `ANALYZE THESE MOVIES (DO NOT RECOMMEND ANY OF THESE):
                ${tasteMoviesText.join(', ')}
                Based on the genre, theme, and style of the movies above, recommend 5 COMPLETELY DIFFERENT movies.`
                    : 'Recommend 5 popular movies in the requested genre.'
            }

            CRITICAL RULES:
            1. All 5 movies must be UNIQUE (no duplicates).
            2. NONE of the 5 movies can be from the analyzed list.
            3. Titles MUST be in English.
            4. STRICT GENRE ENFORCEMENT: If the user provided romance movies, recommend ONLY romance movies. Do not include unrelated blockbuster movies (e.g., Avengers, Dark Knight).

            OUTPUT FORMAT:
            Return ONLY raw JSON. No markdown (no \`\`\`json), no preamble, no explanation.
            The JSON key should reflect the recommended genre.

            EXAMPLE OUTPUT:
            {
            "recommended_movies": ["Movie Title 1", "Movie Title 2", "Movie Title 3", "Movie Title 4", "Movie Title 5"]
            }

            BEGIN JSON NOW:`;
};

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.text();
    const tasteMovies = JSON.parse(body);
    const tasteMoviesText = tasteMovies.map((movie: Movies & { similarity?: number }) => getImbedText(movie));
    const prompt = getPrompt(tasteMoviesText);

    try {
        const recommendation = await getRecommendationByGemini(prompt);
        const recommendationList = await getRecommendationList(recommendation);
        const recommendationHistoryId = await saveRecommendationHistory(session, 'behavior');
        await saveRecommendationList(recommendationHistoryId, recommendationList);

        revalidateTag('recommendation_history', { expire: 0 });
        revalidateTag('recommendation_list', { expire: 0 });
        revalidateTag('user_stats_count', { expire: 0 });
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
