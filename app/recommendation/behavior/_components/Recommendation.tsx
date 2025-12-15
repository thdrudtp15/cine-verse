'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorModal from '@/components/modal/ErrorModal';
import RecommendationModal from '@/components/modal/RecommendationModal';
import { useEffect } from 'react';
/**
 * 추천 API 호출 함수
 */
const getRecommendation = async (tasteMovies: TasteMovies[]) => {
    const response = await fetch('/api/recommendation', {
        method: 'POST',
        body: JSON.stringify(tasteMovies),
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '추천 요청에 실패했습니다.');
    }

    return await response.json();
};

/**
 * 행동분석 기반 영화 추천 컴포넌트
 */
interface TasteMovies {
    title: string;
    original_title: string;
    overview: string;
    tagline: string;
    genres: string;
    similarity: number;
}

const Recommendation = ({ tasteMovies }: { tasteMovies: TasteMovies[] }) => {
    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch, isError } = useQuery({
        queryKey: ['recommendation', tasteMovies],
        queryFn: () => getRecommendation(tasteMovies),
        enabled: false,
        retry: false, // 에러 발생 시 자동 재시도 방지
    });

    // 에러 메시지 추출
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

    const { recommendationList } = data || { recommendationList: [] };

    useEffect(() => {
        return () => {
            queryClient.resetQueries({ queryKey: ['recommendation'] });
        };
    }, []);

    return (
        <>
            {/* 에러 모달 - isError를 직접 사용 */}
            <ErrorModal
                isOpen={isError}
                onClose={() => queryClient.resetQueries({ queryKey: ['recommendation'] })}
                errorMessage={errorMessage}
            />
            {/* 추천 받기 버튼 */}
            <div className="flex flex-col gap-4">
                <button
                    onClick={() => refetch()}
                    disabled={isLoading}
                    className="px-6 py-3 rounded-lg bg-accent-primary hover:bg-accent-primary-hover text-white font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent-primary/30 hover:shadow-accent-primary/50"
                >
                    {isLoading ? '추천 받는중...' : '추천 받기'}
                </button>

                {/* 추천 결과 표시 */}
                {recommendationList.length > 0 && (
                    <RecommendationModal
                        recommendationList={recommendationList}
                        onClose={() => queryClient.resetQueries({ queryKey: ['recommendation'] })}
                    />
                )}
            </div>
        </>
    );
};

export default Recommendation;
