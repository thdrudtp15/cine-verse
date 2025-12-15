import { supabase } from '@/lib/utils/supabase';

export const getTasteMovies = async (tasteVector: string) => {
    try {
        const { data: movies, error } = await supabase.rpc('match_movies', {
            taste_embedding: tasteVector,
            match_threshold: 0.5,
            match_count: 5,
        });
        if (error) {
            console.error('Error fetching recommendations:', error);
            return [];
        }

        console.log('추천 영화 목록:', movies);

        return movies;
    } catch (e) {
        console.error(e);
        throw new Error('영화 추천 실패');
    }
};
