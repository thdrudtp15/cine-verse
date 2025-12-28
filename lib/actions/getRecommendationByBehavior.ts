'use server';

import { getUserBehaviorData } from './getUserBehaviorData';
import { getTasteVector } from '../utils/getTasteVector';
import { getTasteMovies } from './getTasteMovies';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { SERVER_URL } from '@/constants/constans';

import type { MovieListItem } from '@/types/movieList';

type State = {
    recommendationList: MovieListItem[];
    error: string | null;
};

export const clearError = async (prevState: State, _formData: FormData): Promise<State> => {
    return {
        recommendationList: prevState.recommendationList,
        error: null,
    };
};

export const getRecommendationByBehavior = async (prevState: State, formData: FormData) => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return {
            recommendationList: [],
            error: '로그인이 필요합니다.',
        };
    }
    try {
        const data = await getUserBehaviorData(session.user.id);
        const tasteVector = getTasteVector(data.flat());
        const tasteMovies = await getTasteMovies(tasteVector.toString());

        const result = await fetch(`${SERVER_URL}/api/recommendation/behavior`, {
            method: 'POST',
            body: JSON.stringify(tasteMovies.data),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!result.ok) {
            throw new Error('추천 요청에 실패했습니다.');
        }

        return {
            recommendationList: await result.json(),
            error: null,
        };
    } catch (error) {
        return {
            recommendationList: [],
            error: error instanceof Error ? error.message : '알 수 없는 오류',
        };
    }
};
