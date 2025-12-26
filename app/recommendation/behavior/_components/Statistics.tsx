import { BarChart3 } from 'lucide-react';
import { PieChart } from '@/components/ui/PieChart';

type StatisticsProps = {
    behaviorStats: {
        wish: number;
        provider: number;
        visit: number;
        video: number;
    };
};

const Statistics = ({ behaviorStats }: StatisticsProps) => {
    const totalInteractions = Object.values(behaviorStats).reduce((sum, count) => sum + count, 0);

    // 파이 차트 데이터
    const chartData = [
        {
            id: '위시리스트',
            label: '위시리스트',
            value: behaviorStats.wish,
            color: 'hsl(0, 97.90%, 63.30%)', // 핑크 계열
        },
        {
            id: '스트리밍 이동',
            label: '스트리밍 이동',
            value: behaviorStats.provider,
            color: 'hsl(213, 94%, 68%)', // 파란색 계열
        },
        {
            id: '페이지 방문',
            label: '페이지 방문',
            value: behaviorStats.visit,
            color: 'hsl(271, 91%, 65%)', // 노란색 계열
        },
        {
            id: '예고편 감상',
            label: '예고편 감상',
            value: behaviorStats.video,
            color: 'hsl(142, 71%, 45%)', // 초록색 계열
        },
    ].filter((item) => item.value > 0); // 값이 0인 항목 제외

    if (totalInteractions === 0) return null;

    return (
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
    );
};

export default Statistics;
