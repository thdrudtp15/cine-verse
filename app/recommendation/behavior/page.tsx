import { Sparkles, BarChart3 } from 'lucide-react';
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
import { PieChart } from '@/components/ui/PieChart';
import Guide from './_components/Guide';

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

    const totalInteractions = Object.values(behaviorStats).reduce((sum, count) => sum + count, 0);

    // 파이 차트 데이터
    const chartData = [
        {
            id: '위시리스트',
            label: '위시리스트',
            value: behaviorStats.wish,
            color: 'hsl(293, 70%, 50%)',
        },
        {
            id: '스트리밍 이동',
            label: '스트리밍 이동',
            value: behaviorStats.provider,
            color: 'hsl(293, 70%, 50%)',
        },
        {
            id: '페이지 방문',
            label: '페이지 방문',
            value: behaviorStats.visit,
            color: 'hsl(293, 70%, 50%)',
        },
        {
            id: '예고편 감상',
            label: '예고편 감상',
            value: behaviorStats.video,
            color: 'hsl(293, 70%, 50%)',
        },
    ].filter((item) => item.value > 0); // 값이 0인 항목 제외

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

            {/* 행동분석 설명 섹션 */}
            <Guide />

            {/* 사용자 행동 통계 섹션 */}
            {totalInteractions > 0 && (
                <div className="bg-background-elevated border border-border rounded-lg p-6 mb-8 shadow-lg shadow-black/20 ">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center">
                            <BarChart3 className="w-5 h-5 text-accent-primary" />
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-foreground">나의 행동 통계</h2>
                            <p className="text-sm text-foreground-secondary">
                                총 {totalInteractions}개의 행동이 기록되었습니다
                            </p>
                        </div>
                    </div>

                    <div className="mx-auto">
                        {/* 파이 차트 */}
                        <div className="bg-background-tertiary rounded-lg p-6 border border-border/50">
                            <h3 className="text-lg font-semibold text-foreground mb-4">행동 유형별 분포</h3>
                            <PieChart data={chartData} />
                        </div>
                    </div>
                </div>
            )}

            {/* 추천 받기 섹션 */}
            <Recommendation tasteMovies={tasteMovies} />
        </div>
    );
};

export default BehaviorPage;
