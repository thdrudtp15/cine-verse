import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

import Image from 'next/image';
import { User, Heart, Clock, Play, ExternalLink, Sparkles } from 'lucide-react';
import Link from 'next/link';

import MyPageTabs from '../_components/MyPageTabs';
import WishList from '../_components/WishList';
import Stats from '../_components/Stats';
import RecommendationHistory from '../_components/RecommendationHistory';
import { getUserStatsCount } from '@/lib/actions/getUserStatsCount';

import { notFound } from 'next/navigation';

const MyPage = async ({
    params,
    searchParams,
}: {
    params: Promise<{ tab: string }>;
    searchParams: Promise<{ page: string; recommendation_page: string }>;
}) => {
    const { tab } = await params;
    const { page } = await searchParams;
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        redirect('/login');
    }

    if (!['wishlist', 'history', 'stats', 'recommendation', 'overview'].includes(tab)) {
        notFound();
    }

    const statsCount = await getUserStatsCount(session.user.id);

    const user = session.user;

    return (
        <div className="min-h-screen bg-background content-container py-10">
            {/* 히어로 헤더 섹션 */}
            <div className="relative ">
                <div className="bg-background-elevated/80 backdrop-blur-xl border border-border rounded-3xl p-8 md:p-12 shadow-2xl shadow-black/40">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-8 md:gap-12">
                        {/* 프로필 이미지 */}
                        <div className="relative flex-shrink-0 group">
                            <div className="absolute inset-0 bg-gradient-to-br from-accent-primary via-accent-secondary to-purple-500 rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300" />
                            {user?.image ? (
                                <div className="relative">
                                    <Image
                                        src={user.image}
                                        alt={user.name || '프로필'}
                                        priority
                                        width={140}
                                        height={140}
                                        className="rounded-full border-4 border-accent-primary/60 relative z-10"
                                    />
                                </div>
                            ) : (
                                <div className="relative w-[140px] h-[140px] rounded-full bg-gradient-to-br from-accent-primary via-accent-secondary to-purple-500 flex items-center justify-center border-4 border-accent-primary/60 shadow-2xl shadow-accent-primary/30">
                                    <User className="w-16 h-16 text-white relative z-10" />
                                </div>
                            )}
                        </div>

                        {/* 사용자 정보 */}
                        <div className="flex-1 w-full">
                            <div className="mb-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-3">
                                    <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                                        {user?.name || '사용자'}
                                    </span>
                                </h1>
                                <div className="flex items-center gap-3 mb-4">
                                    <p className="text-foreground-secondary text-lg">{user?.email}</p>
                                </div>
                            </div>

                            {/* 빠른 통계 */}
                            <div className="flex flex-wrap gap-3 mb-6">
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-400/10 border border-red-400/30">
                                    <Heart className="w-4 h-4 text-red-400" />
                                    <span className="text-sm font-medium text-foreground">{statsCount.wishes}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-400/10 border border-blue-400/30">
                                    <Clock className="w-4 h-4 text-blue-400" />
                                    <span className="text-sm font-medium text-foreground">{statsCount.visits}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-purple-400/10 border border-purple-400/30">
                                    <Play className="w-4 h-4 text-purple-400" />
                                    <span className="text-sm font-medium text-foreground">{statsCount.videos}</span>
                                </div>
                                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-green-400/10 border border-green-400/30">
                                    <ExternalLink className="w-4 h-4 text-green-400" />
                                    <span className="text-sm font-medium text-foreground">{statsCount.providers}</span>
                                </div>
                            </div>

                            {/* 액션 버튼 */}
                            <div className="flex flex-wrap gap-3">
                                <Link
                                    href="/recommendation"
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary-hover hover:to-accent-secondary-hover text-white font-semibold transition-all duration-200 shadow-lg shadow-accent-primary/40 hover:shadow-accent-primary/60 hover:scale-105"
                                >
                                    <Sparkles className="w-5 h-5" />
                                    AI 추천 받기
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 통계 카드 섹션 */}
            <div className="content-container py-8">
                {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {statCards.map((stat, index) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={index}
                                className={`relative bg-background-elevated border ${stat.borderColor} rounded-xl p-6 hover:border-opacity-60 transition-all duration-300 group overflow-hidden`}
                            >
                              
                                <div
                                    className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                                />

                                <div className="relative z-10">
                                    <div
                                        className={`w-14 h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                                    >
                                        <Icon className={`w-7 h-7 ${stat.color}`} />
                                    </div>
                                    <p className="text-3xl font-bold text-foreground mb-2">{stat.value}</p>
                                    <p className="text-sm font-medium text-foreground-muted">{stat.label}</p>
                                </div>
                            </div>
                        );
                    })}
                </div> */}

                {/* 탭 기반 콘텐츠 */}
                <MyPageTabs statsCount={statsCount} userId={session.user.id} activeTab={tab} page={+page}>
                    {tab === 'wishlist' && <WishList userId={session.user.id} page={+page || 1} />}
                    {tab === 'stats' && <Stats statsCount={statsCount} />}
                    {tab === 'recommendation' && <RecommendationHistory page={+page || 1} />}
                </MyPageTabs>
            </div>
        </div>
    );
};

export default MyPage;
