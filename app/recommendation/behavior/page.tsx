import { Sparkles } from 'lucide-react';
import Recommendation from './_components/Recommendation';
import { supabase } from '@/lib/utils/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { getTasteVector } from '@/lib/utils/getTasteVector';
import { getTasteMovies } from '@/lib/actions/getTasteMovies';
import {
    getVisitsWeight,
    getWishesWeight,
    getProvidersWeight,
    getVideosWeight,
    type WeightedInteraction,
} from '@/lib/utils/getInteractionWeight';

import Guide from './_components/Guide';
import Statistics from './_components/Statistics';
export const dynamic = 'force-dynamic';

const getUserBehaviorData = async (userId: string): Promise<WeightedInteraction[][]> => {
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

/**
 * 행동분석 기반 영화 추천 페이지
 */
const BehaviorPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return redirect('/login');
    }

    const data = await getUserBehaviorData(session.user.id);

    // 모든 배열을 하나로 합치기
    const flattenedData: WeightedInteraction[] = data.flat();

    // 행동 통계 데이터 생성
    const behaviorStats = {
        provider: data[0].length,
        wish: data[1].length,
        visit: data[2].length,
        video: data[3].length,
    };

    // 취향 벡터
    const tasteVector = getTasteVector(flattenedData);

    // 취향에 맞는 영화들
    const { data: tasteMovies, error: tasteMoviesError } = await getTasteMovies(tasteVector.toString());

    if (tasteMoviesError) {
        return <div className="content-container py-8">영화 추천 실패</div>;
    }

    return (
        <div className="content-container py-8">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground">행동분석 영화 추천</h1>
                </div>
                <p className="text-foreground-secondary mt-2">
                    사용자의 행동 패턴을 분석하여 맞춤형 영화를 추천합니다.
                </p>
            </div>
            <Guide />
            <Statistics behaviorStats={behaviorStats} />
            <Recommendation tasteMovies={tasteMovies} />
        </div>
    );
};

export default BehaviorPage;
