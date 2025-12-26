'use client';

import { useState } from 'react';
import { ChevronDown, Brain, BarChart3, PenLine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { getDate } from '@/lib/utils/getDate';
import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';
import type { MovieListItem } from '@/types/movieList';
import { useQuery } from '@tanstack/react-query';

import type { RecommendationsHistory } from '@/types/database';
import { SERVER_URL } from '@/constants/constans';

interface RecommendationItemProps {
    data: RecommendationsHistory;
}

const RecommendationItem = ({ data }: RecommendationItemProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: recommendationData,
        isLoading,
        error,
    } = useQuery({
        queryKey: ['recommendation', data.id],
        queryFn: async () => {
            const res = await fetch(`${SERVER_URL}/api/recommendation/${data.id}`, { method: 'GET' });
            if (!res.ok) {
                throw new Error('추천 데이터를 가져오는데 실패했습니다');
            }
            return res.json();
        },
        enabled: isOpen,
    });

    const movies = recommendationData?.movies || [];
    const movieCount = movies.length;
    const prompt = recommendationData?.prompt || data.prompt;

    return (
        <div className="border border-border rounded-lg bg-background-elevated overflow-hidden transition-all duration-200 hover:border-border-hover">
            {/* 헤더 - 클릭 가능 영역 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 hover:bg-background-tertiary transition-colors duration-200"
            >
                <div className="flex items-center gap-3 flex-1 text-left">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center border border-accent-primary/30">
                        {data.recommendation_type === 'behavior' ? (
                            <BarChart3 className="w-5 h-5 text-accent-primary" strokeWidth={1.5} />
                        ) : (
                            <Brain className="w-5 h-5 text-accent-primary" strokeWidth={1.5} />
                        )}
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-foreground">
                            {data.recommendation_type === 'behavior' ? 'AI 행동 추천' : 'AI 대화'}
                        </span>
                        <span className="text-xs text-foreground-muted">{getDate(data.created_at)}</span>
                    </div>
                    {movieCount > 0 && (
                        <span className="ml-auto text-xs text-foreground-secondary bg-background-tertiary px-2 py-1 rounded-md">
                            {movieCount}개 영화
                        </span>
                    )}
                </div>
                <ChevronDown
                    className={`w-5 h-5 text-foreground-secondary transition-transform duration-300 flex-shrink-0 ml-3 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* 아코디언 콘텐츠 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-4 pt-0 border-t border-divider">
                            {/* 프롬프트 표시 (AI 대화 타입일 때만) */}
                            {data.recommendation_type === 'dialog' && prompt && (
                                <div className="mb-4 pt-4">
                                    <div className="gap-3 p-3 rounded-lg bg-background-tertiary border border-border">
                                        <div className="flex gap-2 items-center mb-4">
                                            <div className="flex-shrink-0 p-1 rounded-full bg-accent-primary/20 flex items-center justify-center mt-0.5">
                                                <PenLine className="w-2 h-2 text-accent-primary" strokeWidth={2} />
                                            </div>
                                            <p className="text-sm font-medium">입력한 프롬프트</p>
                                        </div>
                                        <p className="text-sm text-foreground leading-relaxed break-words text-foreground-secondary">
                                            {prompt}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {isLoading ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                    <Skeleton />
                                </div>
                            ) : error ? (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-error">데이터를 불러오는데 실패했습니다</p>
                                </div>
                            ) : movies.length > 0 ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4">
                                    {movies.map((movie: MovieListItem) => (
                                        <Card key={movie.id} content={movie} height={100} />
                                    ))}
                                </div>
                            ) : (
                                <div className="py-8 text-center">
                                    <p className="text-sm text-foreground-secondary">추천된 영화가 없습니다</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default RecommendationItem;
