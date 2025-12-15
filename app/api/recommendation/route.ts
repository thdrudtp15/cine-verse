import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getRecommendation } from '@/lib/actions/recommendation';
import { getMovieSearchByQuery } from '@/lib/api/movies';
import { supabase } from '@/lib/utils/supabase';
import { GENRES } from '@/constants/constans';
import { getImbedText } from '@/lib/utils/getImbedText';

import type { MovieListItem } from '@/types/movieList';
import type { Movies } from '@/types/database';

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.text();
    const tasteMovies = JSON.parse(body);
    const tasteMoviesText = tasteMovies.map((movie: Movies & { similarity?: number }) => movie.original_title);
    let recommendationByGemini: string;

    console.log(tasteMoviesText, 'tasteMoviesText');

    try {
        const result = await getRecommendation(`
               당신은 최고의 영화 추천 전문가입니다.
          
             ${tasteMoviesText ? `다음 영화와 유사한 영화를 추천해주세요\n${tasteMoviesText.join('\n')}` : ''}

               응답은 반드시 JSON 형식으로, 키 이름은 'action_movies', 값은 문자열 배열로 구성해 주세요.
               영화 제목은 반드시 영화의 영문 제목을 사용해주세요
               어떤 설명이나 추가적인 문구 없이마크다운 코드 블록 없이, 순수한 텍스트 형태의 JSON 데이터 자체만 출력하세요.


            `);

        if (!result.text) {
            throw new Error('GEMINI API 오류');
        }

        console.log(result.text, 'result.text');

        recommendationByGemini = result.text;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error.status === 401) {
            console.log('API 키 인증 실패');
            return NextResponse.json({ error: 'API 키 인증 실패' }, { status: 401 });
        }

        if (error.status === 429) {
            console.log('요청 한도 초과');
            return NextResponse.json({ error: '요청 한도 초과. 잠시 후 다시 시도해주세요.' }, { status: 429 });
        }

        if (error.status === 500) {
            console.log('AI 서비스 일시 오류');
            return NextResponse.json({ error: 'AI 서비스 일시 오류' }, { status: 500 });
        }
        console.log('영화 추천 실패 GEMINI API 오류');
        return NextResponse.json({ error: '영화 추천 실패 GEMINI API 오류: ' + error }, { status: 500 });
    }

    let geminiRecommendation: { action_movies: string[] } = { action_movies: [] };
    let recommendationList: MovieListItem[] = [];

    //====================
    // 영화 추천 리스트 생성
    //====================
    try {
        // { action_movies: ['영화1', '영화2', '영화3', '영화4', '영화5', '영화6'] }
        geminiRecommendation = JSON.parse(recommendationByGemini);

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
        return NextResponse.json({ error: '영화 추천 실패입니다.: ' + error.message }, { status: 500 });
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

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '영화 추천 및 내역, 리스트 저장 성공', recommendationList }, { status: 200 });
};
