import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabase';
import { getMovieDetail } from '@/lib/api/movies';
import type { MovieListItem } from '@/types/movieList';

type Params = {
    params: Promise<{ history_id: string }>;
};

export const GET = async (request: Request, { params }: Params) => {
    try {
        const { history_id } = await params;

        // recommendations_history 확인
        const { data: historyData, error: historyError } = await supabase
            .from('recommendations_history')
            .select('*')
            .eq('id', history_id)
            .single();

        if (historyError) {
            console.error('historyError:', historyError);
            throw new Error(historyError.message);
        }

        if (!historyData) {
            throw new Error('추천 내역을 찾을 수 없습니다');
        }

        // recommendations_movie_list에서 movie_id 목록 가져오기
        const { data: movieListData, error: movieListError } = await supabase
            .from('recommendations_movie_list')
            .select('movie_id')
            .eq('recommendations_history_id', history_id);

        if (movieListError) {
            console.error('movieListError:', movieListError);
            throw new Error(movieListError.message);
        }

        if (!movieListData || movieListData.length === 0) {
            return NextResponse.json({ 
                movies: [],
                prompt: historyData.prompt || null 
            });
        }

        // movie_list에서 movie_id 목록 가져오기
        const { data: movieDetailData, error: movieDetailError } = await supabase
            .from('movies')
            .select('id: movie_id, title, original_title, poster_path')
            .in(
                'movie_id',
                movieListData.map((movie: { movie_id: string }) => movie.movie_id)
            );
        if (movieDetailError) {
            console.error('movieDetailError:', movieDetailError);
            throw new Error(movieDetailError.message);
        }

        if (!movieDetailData || movieDetailData.length === 0) {
            return NextResponse.json({ 
                movies: [],
                prompt: historyData.prompt || null 
            });
        }

        // // 각 movie_id로 TMDB API 호출하여 영화 정보 가져오기
        // const movies: MovieListItem[] = [];
        // for (const item of movieListData) {
        //     if (item.movie_id) {
        //         try {
        //             const movieDetail = await getMovieDetail(item.movie_id.toString());
        //             movies.push({
        //                 adult: movieDetail.adult || false,
        //                 backdrop_path: movieDetail.backdrop_path || '',
        //                 genre_ids: movieDetail.genres?.map((g: { id: number }) => g.id) || [],
        //                 id: movieDetail.id,
        //                 original_language: movieDetail.original_language || 'ko',
        //                 original_title: movieDetail.original_title || movieDetail.title,
        //                 overview: movieDetail.overview || '',
        //                 popularity: movieDetail.popularity || 0,
        //                 poster_path: movieDetail.poster_path || '',
        //                 release_date: movieDetail.release_date || '',
        //                 title: movieDetail.title,
        //                 video: movieDetail.video || false,
        //                 vote_average: movieDetail.vote_average || 0,
        //                 vote_count: movieDetail.vote_count || 0,
        //             });
        //         } catch (error) {
        //             console.error(`Failed to fetch movie ${item.movie_id}:`, error);
        //         }
        //     }
        // }

        return NextResponse.json({ 
            movies: movieDetailData,
            prompt: historyData.prompt || null 
        });
    } catch (error) {
        console.error('API 에러:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Internal server error' },
            { status: 500 }
        );
    }
};
