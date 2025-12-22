'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import ErrorModal from '@/components/modal/ErrorModal';
import RecommendationModal from '@/components/modal/RecommendationModal';
import { useEffect, useState } from 'react';
import { SERVER_URL } from '@/constants/constans';

/**
 * 추천 API 호출 함수
 */
const getRecommendation = async (input: string) => {
    const response = await fetch(`${SERVER_URL}/api/recommendation/dialog`, {
        method: 'POST',
        body: JSON.stringify({ input }), // 빈 배열을 보내면 인기 영화 추천
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
 * LLM 기반 영화 추천 컴포넌트
 */
const Recommendation = () => {
    const [input, setInput] = useState('');

    const queryClient = useQueryClient();

    const { data, isLoading, error, refetch, isError } = useQuery({
        queryKey: ['recommendation', 'simple'],
        queryFn: () => {
            return getRecommendation(input);
        },
        enabled: false,
        retry: false, // 에러 발생 시 자동 재시도 방지
    });

    // 에러 메시지 추출
    const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';

    const { recommendationList } = data || { recommendationList: [] };

    useEffect(() => {
        return () => {
            queryClient.resetQueries({ queryKey: ['recommendation', 'simple'] });
        };
    }, []);

    return (
        <>
            {/* 에러 모달 - isError를 직접 사용 */}
            <ErrorModal
                isOpen={isError}
                onClose={() => queryClient.resetQueries({ queryKey: ['recommendation', 'simple'] })}
                errorMessage={errorMessage}
            />
            {/* 추천 받기 버튼 */}

            {/* 추천 받기 섹션 */}
            <div className="flex flex-col gap-4">
                <div className="space-y-2">
                    <label htmlFor="recommendation-input" className="text-sm font-medium text-foreground mb-2">
                        원하는 영화의 특징을 입력해주세요
                    </label>
                    <textarea
                        id="recommendation-input"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="예: 액션 영화, 로맨스 코미디, 스릴러, SF, 감동적인 스토리 등..."
                        className="w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-foreground placeholder:text-foreground-muted transition-all duration-300 outline-none hover:border-border-hover focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 resize-none min-h-[100px]"
                        rows={4}
                    />
                    <p className="text-xs text-foreground-muted">
                        원하는 장르, 분위기, 테마 등을 자유롭게 입력하세요. 입력하지 않으면 인기 영화를 추천합니다.
                    </p>
                </div>

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
                        onClose={() => queryClient.resetQueries({ queryKey: ['recommendation', 'simple'] })}
                    />
                )}
            </div>
        </>
    );
};

export default Recommendation;
