import { Heart, BarChart3, Sparkles } from 'lucide-react';
import Link from 'next/link';

type TabType = 'overview' | 'wishlist' | 'history' | 'stats' | 'recommendation';

interface MyPageTabsProps {
    statsCount: {
        wishes: number;
        visits: number;
        videos: number;
        providers: number;
        recommendationHistoryBehavior: number;
        recommendationHistoryDialog: number;
    };
    userId: string;
    activeTab: string;
    page: number;
    children: React.ReactNode;
}

const MyPageTabs = ({ statsCount, activeTab, children }: MyPageTabsProps) => {
    const tabs = [
        // { id: 'overview' as TabType, label: '개요', icon: Film },
        { id: 'wishlist' as TabType, label: '위시리스트', icon: Heart, count: statsCount.wishes },
        // { id: 'history' as TabType, label: '최근 본 영화', icon: Clock, count: statsCount.visits },
        { id: 'stats' as TabType, label: '통계', icon: BarChart3 },
        {
            id: 'recommendation' as TabType,
            label: '추천내역',
            icon: Sparkles,
            count: statsCount.recommendationHistoryBehavior + statsCount.recommendationHistoryDialog,
        },
    ];

    return (
        <div className="bg-background-elevated border border-border rounded-2xl overflow-hidden shadow-lg shadow-black/20">
            {/* 탭 헤더 */}
            <div className="border-b border-border bg-background-tertiary/50">
                <div className="flex overflow-x-auto scrollbar-hide">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        return (
                            <Link
                                key={tab.id}
                                href={`/mypage/${tab.id}`}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 relative ${
                                    activeTab === tab.id
                                        ? 'text-accent-primary bg-background-elevated'
                                        : 'text-foreground-secondary hover:text-foreground hover:bg-background-tertiary'
                                }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{tab.label}</span>
                                {tab.count !== undefined && (
                                    <span
                                        className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                                            activeTab === tab.id
                                                ? 'bg-accent-primary/20 text-accent-primary'
                                                : 'bg-background-tertiary text-foreground-muted'
                                        }`}
                                    >
                                        {tab.count}
                                    </span>
                                )}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary" />
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* 탭 콘텐츠 */}
            <div className="p-6 md:p-8">{children}</div>
        </div>
    );
};

export default MyPageTabs;
