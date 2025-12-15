'use client';
import React from 'react';
import { Heart, LoaderCircle } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { MovieDetail } from '@/types/movieDetail';

type Props = {
    movie: MovieDetail;
};

/**
 * 찜하기 버튼 컴포넌트
 *
 * 포스터 이미지 위에 표시되는 찜하기 버튼입니다.
 * 클릭 시 찜하기 상태를 토글합니다.
 */
const Wish = ({ movie }: Props) => {
    const queryClient = useQueryClient();

    // 찜하기 상태 조회
    const { data, isError, isLoading } = useQuery({
        queryKey: ['wish', movie.id],
        queryFn: async () => {
            const response = await fetch(`/api/wish/${movie.id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        },
        retry: (failureCount, error) => {
            if (error.message === 'Unauthorized') {
                return false;
            }
            return failureCount < 4;
        },
    });

    // 찜하기 토글 mutation
    const { mutate: toggleWish, isPending } = useMutation({
        mutationFn: async () => {
            queryClient.setQueryData(['wish', movie.id], { isWished: !data?.isWished });
            const response = await fetch(`/api/wish/${movie.id}`, {
                method: 'POST',
                body: JSON.stringify(movie),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to toggle wish');
            }
            return response.json();
        },
        onError: (error) => {
            console.log(error, 'error');
            queryClient.setQueryData(['wish', movie.id], { isWished: !data?.isWished });
        },
    });

    const isWished = data?.isWished ?? false;
    const isDisabled = isLoading || isPending;

    return (
        <button
            onClick={() => toggleWish()}
            disabled={isDisabled}
            className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-background/80 backdrop-blur-md  transition-all duration-200 hover:scale-110 shadow-lg flex items-center justify-center ${
                isWished ? '' : 'border-border hover:bg-background-elevated'
            } ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            aria-label={isWished ? '찜하기 해제' : '찜하기'}
        >
            {!isLoading && (
                <Heart
                    className={`w-5 h-5 transition-colors ${
                        isWished ? 'text-red-500 fill-red-500' : 'text-foreground-secondary'
                    }`}
                />
            )}
            {isLoading && <LoaderCircle className="w-5 h-5 animate-spin" />}
        </button>
    );
};

export default React.memo(Wish);
