import { unstable_cache } from 'next/cache';
import { supabase } from '../utils/supabase';

export const getUserStatsCount = unstable_cache(
    async (userId: string) => {
        const [wishes, visits, videos, providers, recommendationHistoryBehavior, recommendationHistoryDialog] =
            await Promise.all([
                supabase.from('interactions_wishes').select('*', { count: 'exact', head: true }).eq('user_id', userId),
                supabase.from('interactions_visits').select('*', { count: 'exact', head: true }).eq('user_id', userId),
                supabase.from('interactions_videos').select('*', { count: 'exact', head: true }).eq('user_id', userId),
                supabase
                    .from('interactions_providers')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', userId),
                supabase
                    .from('recommendations_history')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', userId)
                    .eq('recommendation_type', 'behavior'),
                supabase
                    .from('recommendations_history')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', userId)
                    .eq('recommendation_type', 'dialog'),
            ]);

        return {
            wishes: wishes.count || 0,
            visits: visits.count || 0,
            videos: videos.count || 0,
            providers: providers.count || 0,
            recommendationHistoryBehavior: recommendationHistoryBehavior.count || 0,
            recommendationHistoryDialog: recommendationHistoryDialog.count || 0,
        };
    },
    ['user_stats_count'],
    { tags: ['user_stats_count'], revalidate: 60 * 60 * 24 }
);
