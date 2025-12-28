import { Sparkles } from 'lucide-react';
import Recommendation from './_components/Recommendation';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

import { getUserStatsCount } from '@/lib/actions/getUserStatsCount';

import Guide from './_components/Guide';
import Statistics from './_components/Statistics';

export const dynamic = 'force-dynamic';

/**
 * 행동분석 기반 영화 추천 페이지
 */
const BehaviorPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return redirect('/login');
    }

    const statsCount = await getUserStatsCount(session.user.id);
    const behaviorStats = {
        provider: statsCount.providers,
        wish: statsCount.wishes,
        visit: statsCount.visits,
        video: statsCount.videos,
    };

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
            <Recommendation />
        </div>
    );
};

export default BehaviorPage;
