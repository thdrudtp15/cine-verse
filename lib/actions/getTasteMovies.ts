import { supabase } from '@/lib/utils/supabase';

export const getTasteMovies = async (tasteVector: string, excludeMovieIds: number[] = []) => {
    try {
        // tasteVector는 이미 JSON.stringify된 문자열이므로 그대로 사용
        const result = await supabase.rpc('match_movies', {
            taste_embedding: tasteVector,
            match_threshold: 0.7, // 임계값을 0.6에서 0.7로 높여서 더 정확한 추천만 받기
            match_count: 20, // 더 많이 가져온 후 필터링
        });

        if (result.error) {
            throw result.error;
        }

        // 위시리스트에 있는 영화 제외
        let filteredMovies = result.data || [];
        if (excludeMovieIds.length > 0) {
            filteredMovies = filteredMovies.filter((movie: any) => !excludeMovieIds.includes(movie.id));
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
