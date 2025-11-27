'use client';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'motion/react';

import { searchMovies } from '@/lib/api/movies';

import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';

import type { MovieListItem } from '@/types/movieList';

// 무한 스크롤 + react-window-infinite-loader

const List = () => {
    const observerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(observerRef);

    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const keywords = searchParams.get('keywords') || '';
    const genre = searchParams.get('genres') || '';
    const rated = searchParams.get('rate') || '';

    const {
        data: data,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies_discovers', query, keywords, genre, rated],
        queryFn: ({ pageParam = 1 }) => searchMovies(query, keywords, genre, rated, pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.page + 1,
        initialPageParam: 1,
    });

    useEffect(() => {
        if (!isInView) return;
        fetchNextPage();
    }, [isInView]);

    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {!isLoading &&
                data?.pages
                    .flatMap((page) => page.results)
                    .map((content: MovieListItem) => <Card key={content.id} content={content} />)}
            {(isLoading || isFetchingNextPage) && <Skeleton count={12} />}
            <div ref={observerRef} />
        </div>
    );
};

export default List;
