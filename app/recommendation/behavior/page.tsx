import { Sparkles, Clock, ExternalLink, Play, Heart } from 'lucide-react';
import Recommendation from './_components/Recommendation';
import { supabase } from '@/lib/utils/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';
import { unstable_cache } from 'next/cache';
import { getTasteVector } from '@/lib/utils/getTasteVector';
import { getTasteMovies } from '@/lib/actions/getTasteMovies';
import {
    getVisitsWeight,
    getWishesWeight,
    getProvidersWeight,
    getVideosWeight,
} from '@/lib/utils/getInteractionWeight';

export const dynamic = 'force-dynamic';

const behaviorItems = [
    {
        icon: Heart,
        title: '위시리스트 추가',
        description: '위시리스트 영화 분석',
    },
    {
        icon: Clock,
        title: '영화 상세 페이지 5초 이상 체류',
        description: '영화 상세 페이지 체류 시간 분석',
    },
    {
        icon: ExternalLink,
        title: '스트리밍 사이트 이동',
        description: '스트리밍 사이트 이동 분석',
    },
    {
        icon: Play,
        title: '예고편 감상',
        description: '영화 예고편 감상 분석',
    },
];

// const getUserBehaviorData = async (userId: string) => {
//     const data = await Promise.all([
//         supabase.from('interactions_providers').select('*, movie:movie_id(*)').eq('user_id', userId),
//         supabase.from('interactions_wishes').select('*, movie:movie_id(*)').eq('user_id', userId),
//         supabase.from('interactions_visits').select('*, movie:movie_id(*)').eq('user_id', userId),
//         supabase.from('interactions_videos').select('*, movie:movie_id(*)').eq('user_id', userId),
//     ]).then(([providersData, wishesData, visitsData, videosData]) => {
//         return [
//             getProvidersWeight(providersData.data || []),
//             getWishesWeight(wishesData.data || []),
//             getVisitsWeight(visitsData.data || []),
//             getVideosWeight(videosData.data || []),
//         ];
//     });
//     return data;
// };

/**
 * 행동분석 기반 영화 추천 페이지
 */
const BehaviorPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return redirect('/login');
    }

    // const data = await getUserBehaviorData(session.user.id);
    const { data: wishesData, error: wishesError } = await supabase
        .from('interactions_wishes')
        .select('*, movie:movie_id(*)')
        .eq('user_id', session.user.id);

    if (wishesError || !wishesData) {
        return <div className="content-container py-8">사용자 데이터 조회 실패</div>;
    }

    // 취향 벡터
    const tasteVector = getTasteVector(wishesData);

    // 취향에 맞는 영화들
    const { data: tasteMovies, error: tasteMoviesError } = await getTasteMovies(tasteVector.toString());

    if (tasteMoviesError) {
        return <div className="content-container py-8">영화 추천 실패</div>;
    }

    console.log(tasteMovies, '취향벡터 맞는 영화들');

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
            <div className="bg-background-elevated border border-border rounded-lg p-6 mb-8 shadow-lg shadow-black/20">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                    행동분석이란?
                </h2>
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                    사용자의 다양한 행동 패턴을 수집하고 분석하여 개인화된 영화 추천을 제공합니다.
                    <br />
                    아래의 행동 데이터를 통해 취향과 관심사를 파악합니다.
                </p>

                {/* 행동분석 항목 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {behaviorItems.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={index}
                                className="flex items-start gap-4 p-4 bg-background-tertiary rounded-lg border border-border hover:border-accent-primary/30 transition-all duration-200"
                            >
                                <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center flex-shrink-0">
                                    <Icon className="w-5 h-5 text-accent-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-xs text-foreground-muted">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 추천 받기 섹션 */}
            <Recommendation tasteMovies={tasteMovies} />
        </div>
    );
};

export default BehaviorPage;
