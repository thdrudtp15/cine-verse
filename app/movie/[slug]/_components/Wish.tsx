'use client';
import React from 'react';
import { Heart } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

type Props = {
    movie_id: number;
};

/**
 * 찜하기 버튼 컴포넌트
 *
 * 포스터 이미지 위에 표시되는 찜하기 버튼입니다.
 * 클릭 시 찜하기 상태를 토글합니다.
 */
const Wish = ({ movie_id }: Props) => {
    const queryClient = useQueryClient();

    // 찜하기 상태 조회
    const { data, isError, isLoading } = useQuery({
        queryKey: ['wish', movie_id],
        queryFn: async () => {
            const response = await fetch(`/api/wish/${movie_id}`, {
                method: 'GET',
            });
            if (!response.ok) {
                throw new Error('Failed to fetch wish status');
            }
            return response.json();
        },
    });

    // 찜하기 토글 mutation
    const { mutate: toggleWish, isPending } = useMutation({
        mutationFn: async () => {
            const response = await fetch(`/api/wish/${movie_id}`, {
                method: 'POST',
            });
            if (!response.ok) {
                throw new Error('Failed to toggle wish');
            }
            return response.json();
        },
        onSuccess: () => {
            queryClient.setQueryData(['wish', movie_id], { isWished: !data?.isWished });
        },
        onError: (error) => {
            console.log(error, 'error');
            queryClient.setQueryData(['wish', movie_id], { isWished: data?.isWished });
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
            <Heart
                className={`w-5 h-5 transition-colors ${
                    isWished ? 'text-red-500 fill-red-500' : 'text-foreground-secondary'
                }`}
            />
            {isError && (
                <span className="sr-only" role="alert">
                    찜하기 상태를 불러올 수 없습니다
                </span>
            )}
        </button>
    );
};

export default React.memo(Wish);
