import React from 'react';
import { supabase } from '@/lib/utils/supabase';
import { unstable_cache } from 'next/cache';
import RecommendationItem from './RecommendationItem';

const getRecommendationHistory = async () =>
    await supabase.from('recommendations_history').select('*').order('created_at', { ascending: false });

const RecommendationHistory = async () => {
    const { data, error } = await getRecommendationHistory();

    if (error) {
        return <div>Error: {error.message}</div>;
    }

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
        </div>
    );
};

export default RecommendationHistory;
