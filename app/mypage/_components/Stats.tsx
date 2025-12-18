import { BarChart3, Film } from 'lucide-react';

interface StatsProps {
    statsCount: {
        wishes: number;
        visits: number;
        videos: number;
        providers: number;
        recommendationHistoryBehavior: number;
        recommendationHistoryDialog: number;
    };
}

const Stats = ({ statsCount }: StatsProps) => {
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-background-tertiary border border-border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5 text-accent-primary" />
                        활동 통계
                    </h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">총 활동 수</span>
                            <span className="text-xl font-bold text-foreground">
                                {statsCount.wishes + statsCount.visits + statsCount.videos + statsCount.providers}
                            </span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">위시리스트</span>
                            <span className="text-lg font-semibold text-red-400">{statsCount.wishes}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">방문 기록</span>
                            <span className="text-lg font-semibold text-blue-400">{statsCount.visits}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">예고편 시청</span>
                            <span className="text-lg font-semibold text-purple-400">{statsCount.videos}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">스트리밍 이동</span>
                            <span className="text-lg font-semibold text-green-400">{statsCount.providers}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-background-tertiary border border-border rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                        <Film className="w-5 h-5 text-accent-primary" />
                        추천 통계
                    </h4>
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">행동 분석 추천</span>
                            <span className="text-xl font-bold text-foreground">
                                {statsCount.recommendationHistoryBehavior}
                            </span>
                        </div>
                        <div className="h-px bg-border" />
                        <div className="flex justify-between items-center">
                            <span className="text-foreground-secondary">대화형 추천</span>
                            <span className="text-xl font-bold text-foreground">
                                {statsCount.recommendationHistoryDialog}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stats;
