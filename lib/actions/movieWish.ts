'use server';
import { supabase } from '@/lib/utils/supabase';
import type { Movies } from '@/types/database';

export const movieWish = async (movie: Movies, userId: string) => {
    const { data: existingData, error } = await supabase
        .from('interactions_wishes')
        .select('*')
        .eq('movie_id', movie.id)
        .eq('user_id', userId)
        .single();

    if (existingData) {
        // 이미 찜한 경우 제거
        const { error } = await supabase
            .from('interactions_wishes')
            .delete()
            .eq('movie_id', movie.id)
            .eq('user_id', userId);

        if (error) {
            console.error('찜하기 제거 실패:', error);
        }

        return false;
    } else {
        // 찜하기 추가
        const { data, error } = await supabase
            .from('interactions_wishes')
            .insert({
                movie_id: movie.id,
                user_id: userId,
            })
            .select()
            .single();

        if (error) {
            console.error('찜하기 추가 실패:', error);
            throw new Error('찜하기 추가 실패');
        }

        return true;
    }
};
