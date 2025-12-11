import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getRecommendation } from '@/lib/actions/recommendation';
import { getMovieSearchByQuery } from '@/lib/api/movies';
import { supabase } from '@/lib/utils/supabase';
import type { MovieDetail } from '@/types/movieDetail';

export const GET = async (request: Request) => {
    console.log('GET 요청이 들어왔습니다.');
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // let recommendationByGemini: string;

    // try {
    //     const result = await getRecommendation(`
    //            당신이 생각하는 가장 재미있는 액션 영화 6개를 추천해 주세요.
    //            응답은 반드시 JSON 형식으로, 키 이름은 'action_movies', 값은 문자열 배열로 구성해 주세요.
    //            어떤 설명이나 추가적인 문구 없이 순수한 JSON만 출력하세요.
    //         `);

    //     if (!result.text) {
    //         throw new Error('GEMINI API 오류');
    //     }

    //     recommendationByGemini = result.text;

    //     // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // } catch (error: any) {
    //     if (error.status === 401) {
    //         console.log('API 키 인증 실패');
    //         return NextResponse.json({ error: 'API 키 인증 실패' }, { status: 401 });
    //     }

    //     if (error.status === 429) {
    //         console.log('요청 한도 초과');
    //         return NextResponse.json({ error: '요청 한도 초과. 잠시 후 다시 시도해주세요.' }, { status: 429 });
    //     }

    //     if (error.status === 500) {
    //         console.log('AI 서비스 일시 오류');
    //         return NextResponse.json({ error: 'AI 서비스 일시 오류' }, { status: 500 });
    //     }
    //     console.log('영화 추천 실패 GEMINI API 오류');
    //     return NextResponse.json({ error: '영화 추천 실패 GEMINI API 오류: ' + error }, { status: 500 });
    // }

    let geminiRecommendation: { action_movies: string[] } = { action_movies: [] };
    let recommendationList: MovieDetail[] = [];

    //====================
    // 영화 추천 리스트 생성
    //====================
    try {
        // { action_movies: ['영화1', '영화2', '영화3', '영화4', '영화5', '영화6'] }
        geminiRecommendation =
            // JSON.parse(recommendationByGemini);
            {
                action_movies: [
                    'Mad Max: Fury Road',
                    'John Wick',
                    'The Dark Knight',
                    'Mission: Impossible – Fallout',
                    'Gladiator',
                    'Edge of Tomorrow',
                ],
            };

        recommendationList = await Promise.all(
            geminiRecommendation.action_movies.map(async (movie: string) => {
                const movieData = await getMovieSearchByQuery(movie);
                return movieData.results[0];
            })
        );
        // return NextResponse.json({ result });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: '영화 추천 실패: ' + error.message }, { status: 500 });
    }

    //====================
    // 영화 추천 내역 저장
    //====================

    let recommendationHistoryId;

    try {
        const { data, error } = await supabase
            .from('recommendations_history')
            .insert({
                user_id: session.user.id,
            })
            .select('id')
            .single();

        if (error) {
            console.error(error);
            throw new Error('영화 추천 내역 저장 실패: ' + error.message);
        }
        recommendationHistoryId = data.id;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: '영화 추천 내역 저장 실패: ' + error.message }, { status: 500 });
    }

    //====================
    // 영화 추천 리스트 저장
    //====================

    try {
        // 영화 데이터 supabase DB에 저장
        const saveRecommendationList = recommendationList.map((movie: MovieDetail) => ({
            title: movie.title,
            movie_id: movie.id,
            original_title: movie.original_title,
            overview: movie.overview,
            tagline: movie.tagline,
            genres: JSON.stringify(movie.genres),
        }));

        // 영화 추천 리스트 supabase DB에 저장
        const rows = recommendationList.map((movie: MovieDetail) => ({
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '영화 추천 및 내역, 리스트 저장 성공' }, { status: 200 });
};
