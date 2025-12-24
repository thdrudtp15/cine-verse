import React from 'react';
import { supabase } from '@/lib/utils/supabase';
import { unstable_cache } from 'next/cache';
import RecommendationItem from './RecommendationItem';
import Pagination from '@/components/ui/Pagination';

const ITEM_PER_PAGE = 6;

const getRecommendationHistory = unstable_cache(
    async (page: number) => {
        const { data, error, count } = await supabase
            .from('recommendations_history')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range((page - 1) * ITEM_PER_PAGE, page * ITEM_PER_PAGE - 1);

        if (error) {
            return { data: [], count: 0 };
        }

        return { data, count: count };
    },
    ['recommendation_history'],
    { tags: ['recommendation_history'], revalidate: 60 * 60 * 24 }
);

const RecommendationHistory = async ({ page }: { page: number }) => {
    const { data, count } = await getRecommendationHistory(page);

    const totalPages = Math.ceil((count || 0) / ITEM_PER_PAGE);

    if (!data || data.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-accent-primary/10 flex items-center justify-center mx-auto mb-4">
                    <svg
                        className="w-10 h-10 text-accent-primary/50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                    </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">추천 내역이 없습니다</h3>
                <p className="text-foreground-secondary">AI 추천을 받아보세요!</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {data.map((item) => (
                <RecommendationItem key={item.id} data={item} />
            ))}
            <Pagination totalPages={totalPages} currentPage={page} />
        </div>
    );
};

export default RecommendationHistory;
