import { supabase } from '@/lib/utils/supabase';
import type { MovieListItem } from '@/types/movieList';

export const getTasteMovies = async (tasteVector: string, excludeMovieIds: number[] = []) => {
    try {
        const result = await supabase.rpc('match_movies', {
            taste_embedding: tasteVector,
            match_threshold: 0.7,
            match_count: 20,
        });

        if (result.error) {
            throw result.error;
        }

        // 위시리스트에 있는 영화 제외
        let filteredMovies = result.data || [];
        if (excludeMovieIds.length > 0) {
            filteredMovies = filteredMovies.filter((movie: MovieListItem) => !excludeMovieIds.includes(movie.id));
        }

        // 상위 10개만 반환
        return {
            ...result,
            data: filteredMovies.slice(0, 10),
        };
    } catch (error) {
        console.error(error);
        throw new Error('영화 추천 실패');
    }
};
