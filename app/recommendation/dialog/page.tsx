import { Brain, Zap } from 'lucide-react';
import Recommendation from './_components/Recommendation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const SimpleRecommendationPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
        return redirect('/login');
    }

    return (
        <div className="content-container py-8">
            {/* 헤더 섹션 */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Brain className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground">LLM 기반 영화 추천</h1>
                </div>
                <p className="text-foreground-secondary mt-2">
                    Google Gemini AI를 활용하여 인기 영화를 추천합니다.
                </p>
            </div>

            {/* LLM 추천 설명 섹션 */}
            <div className="bg-background-elevated border border-border rounded-lg p-6 mb-8 shadow-lg shadow-black/20">
                <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary"></span>
                    LLM 추천이란?
                </h2>
                <p className="text-foreground-secondary mb-6 leading-relaxed">
                    LLM(Large Language Model) 기반 추천은 Google Gemini AI를 활용하여 인기 있는 영화를 추천하는
                    방식입니다. 복잡한 행동 분석 없이도 빠르게 영화 추천을 받을 수 있습니다.
                </p>
                <div className="flex items-start gap-4 p-4 bg-background-tertiary rounded-lg border border-border hover:border-accent-primary/30 transition-all duration-200">
                    <div className="w-10 h-10 rounded-lg bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center flex-shrink-0">
                        <Brain className="w-5 h-5 text-accent-primary" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground mb-1">Google Gemini AI</h3>
                        <p className="text-xs text-foreground-muted">최신 AI 기술을 활용한 지능형 영화 추천</p>
                    </div>
                </div>
            </div>

            {/* 추천 받기 섹션 */}
            <Recommendation />
        </div>
    );
};

export default SimpleRecommendationPage;
