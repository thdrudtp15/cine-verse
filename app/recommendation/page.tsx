import Link from 'next/link';
import { Sparkles, Brain, BarChart3, ArrowRight, FlaskConical } from 'lucide-react';

const RecommendationPage = () => {
    return (
        <div className="content-container py-8">
            {/* 헤더 섹션 */}
            <div className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold text-foreground">영화 추천</h1>
                </div>
                <p className="text-foreground-secondary mt-2 text-lg">
                    당신만을 위한 맞춤형 영화 추천 서비스를 경험해보세요.
                </p>
            </div>

            {/* 추천 방식 카드 그리드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LLM 추천 카드 */}
                <Link
                    href="/recommendation/dialog"
                    className="group bg-background-elevated border border-border rounded-lg p-8 shadow-lg shadow-black/20 hover:border-accent-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent-primary/10"
                >
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-accent-primary/10 border border-accent-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-primary/20 transition-colors">
                            <Brain className="w-7 h-7 text-accent-primary" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-foreground mb-2">LLM 기반 추천</h2>
                            <p className="text-foreground-secondary leading-relaxed">
                                Google Gemini AI를 활용한 지능형 영화 추천 시스템입니다. 당신이 좋아하는 영화를 분석하여
                                유사한 장르와 테마의 영화를 추천합니다.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-primary font-medium group-hover:gap-3 transition-all">
                        <span>추천 받기</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                </Link>

                {/* 행동 분석 추천 카드 */}
                <div className="relative overflow-hidden group bg-background-elevated border border-border rounded-lg p-8 shadow-lg shadow-black/20 hover:border-accent-secondary/50 transition-all duration-300 hover:shadow-xl hover:shadow-accent-secondary/10">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="w-14 h-14 rounded-xl bg-accent-secondary/10 border border-accent-secondary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-secondary/20 transition-colors">
                            <BarChart3 className="w-7 h-7 text-accent-secondary" />
                        </div>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold text-foreground mb-2">행동 분석 추천</h2>
                            <p className="text-foreground-secondary leading-relaxed">
                                사용자의 행동 패턴을 분석하여 개인화된 영화를 추천합니다. 영화 상세 페이지 체류 시간,
                                스트리밍 사이트 이동, 예고편 감상 등의 데이터를 기반으로 합니다.
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-accent-secondary font-medium group-hover:gap-3 transition-all">
                        <span>추천 받기</span>
                        <ArrowRight className="w-5 h-5" />
                    </div>
                    <div className="group-hover:opacity-100 opacity-0 gap-4 transition-opacity duration-300 absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <FlaskConical className="w-6 h-6 text-white" />
                        <span className="text-white text-lg font-medium">개발 중</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecommendationPage;
