import {
    getVisitsWeight,
    getWishesWeight,
    getProvidersWeight,
    getVideosWeight,
    type WeightedInteraction,
} from '@/lib/utils/getInteractionWeight';
import { supabase } from '../utils/supabase';

export const getUserBehaviorData = async (userId: string): Promise<WeightedInteraction[][]> => {
    const data = await Promise.all([
        supabase.from('interactions_providers').select('*, movie:movie_id(*)').eq('user_id', userId),
        supabase.from('interactions_wishes').select('*, movie:movie_id(*)').eq('user_id', userId),
        supabase.from('interactions_visits').select('*, movie:movie_id(*)').eq('user_id', userId),
        supabase.from('interactions_videos').select('*, movie:movie_id(*)').eq('user_id', userId),
    ]).then(([providersData, wishesData, visitsData, videosData]) => {
        return [
            getProvidersWeight(providersData.data || []),
            getWishesWeight(wishesData.data || []),
            getVisitsWeight(visitsData.data || []),
            getVideosWeight(videosData.data || []),
        ];
    });
    return data;
};
