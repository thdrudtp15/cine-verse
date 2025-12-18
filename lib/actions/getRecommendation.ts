'use server';
import { GoogleGenAI } from '@google/genai';
import { getMovieSearchByQuery } from '@/lib/api/movies';
import { supabase } from '@/lib/utils/supabase';

import { GENRES } from '@/constants/constans';

import type { MovieListItem } from '@/types/movieList';
import type { Session } from 'next-auth';

const schema = {
    type: 'object',
    properties: {
        recommendation_movies: {
            type: 'array',
            items: {
                type: 'string',
            },
            minItems: 4,
            maxItems: 4,
        },
    },
    required: ['recommendation_movies'],
};

//===================
// 제미나이 모델을 이용한 영화 목록 추천
//===================
export const getRecommendationByGemini = async (content: string) => {
    const genai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });

    try {
        const response = await genai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: content,
            config: {
                thinkingConfig: {
                    thinkingBudget: 0, // Disables thinking
                },
                responseMimeType: 'application/json',
                responseSchema: schema,
            },
        });

        return response.text as string;
    } catch (error) {
        if (error instanceof Response && error.status === 401) {
            console.log('API 키 인증 실패');
            throw new Error('API 키 인증 실패');
        }
        if (error instanceof Response && error.status === 429) {
            console.log('요청 한도 초과');
            throw new Error('요청 한도 초과');
        }
        if (error instanceof Response && error.status === 500) {
            console.log('AI 서비스 일시 오류');
            throw new Error('AI 서비스 일시 오류');
        }
        throw new Error('Failed to get recommendation');
    }
};

//===================
// 영화 목록 추천 결과를 tmdb 영화 데이터로 변환
//===================
export const getRecommendationList = async (json: string) => {
    try {
        const parsedJson = JSON.parse(json);

        return await Promise.all(
            parsedJson.recommendation_movies.map(async (movie: string) => {
                const movieData = await getMovieSearchByQuery(movie);
                return movieData.results[0];
            })
        );
    } catch (error) {
        console.error(error);
        throw new Error('영화 추천을 실패하였습니다 + ' + error);
    }
};

//===================
// 영화 추천 내역 저장
//===================
export const saveRecommendationHistory = async (session: Session, recommendation_type: 'behavior' | 'dialog') => {
    try {
        const { data, error } = await supabase
            .from('recommendations_history')
            .insert({
                user_id: session.user.id,
                recommendation_type,
            })
            .select('id')
            .single();

        if (error) {
            console.error(error);
            throw new Error('영화 추천 내역 저장 실패: ' + error.message);
        }
        return data.id;
    } catch (error) {
        const message = error instanceof Error ? error.message : '알 수 없는 오류';
        throw new Error('영화 추천 내역 저장 실패: ' + message);
    }
};

//===================
// 영화 데이터 저장 및 영화 추천 데이터 리스트 저장
//===================
export const saveRecommendationList = async (recommendationHistoryId: string, recommendationList: MovieListItem[]) => {
    try {
        // 영화 데이터 supabase DB에 저장

        const getGenreData = (genre_ids: number[]) => {
            return genre_ids.map((genre_id: number) => {
                return GENRES.find((genre: { id: number }) => genre.id === genre_id);
            });
        };

        const saveRecommendationList = recommendationList.map((movie: MovieListItem) => ({
            title: movie.title,
            movie_id: movie.id,
            original_title: movie.original_title,
            overview: movie.overview,
            poster_path: movie.poster_path,
            genres: JSON.stringify(getGenreData(movie.genre_ids)),
        }));

        // 영화 추천 리스트 supabase DB에 저장
        const rows = recommendationList.map((movie: MovieListItem) => ({
            recommendations_history_id: recommendationHistoryId,
            movie_id: movie.id,
        }));

        const { error: movieDataSaveError } = await supabase
            .from('movies')
            .upsert(saveRecommendationList, { onConflict: 'movie_id' });

        const { error: errorSaveRecommendationList } = await supabase.from('recommendations_movie_list').insert(rows);

        if (movieDataSaveError) {
            console.error(movieDataSaveError);
            throw new Error('영화 데이터 저장 실패: ' + movieDataSaveError.message);
        }

        if (errorSaveRecommendationList) {
            console.error(errorSaveRecommendationList);
            throw new Error('영화 추천 리스트 저장 실패: ' + errorSaveRecommendationList.message);
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : '알 수 없는 오류';
        throw new Error('영화 추천 리스트 저장 실패: ' + message);
    }
};
