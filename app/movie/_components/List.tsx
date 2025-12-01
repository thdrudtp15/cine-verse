'use client';
import React, { useEffect, useRef } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useInView } from 'motion/react';

import { searchMovies } from '@/lib/api/movies';

import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';
import Empty from '@/components/ui/Empty';

import type { MovieListItem } from '@/types/movieList';

// 무한 스크롤 + react-window-infinite-loader

const List = () => {
    const observerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(observerRef);

    const searchParams = useSearchParams();
    const query = searchParams?.get('query') || '';
    const keywords = searchParams?.get('keywords') || '';
    const genre = searchParams?.get('genres') || '';
    const rated = searchParams?.get('rate') || '';

    const {
        data: data,
        fetchNextPage,
        isLoading,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery({
        queryKey: ['movies_discovers', query, keywords, genre, rated],
        queryFn: ({ pageParam = 1 }) => searchMovies(query, keywords, genre, rated, pageParam),
        getNextPageParam: (lastPage, pages) => {
            console.log(lastPage, 'lastPage');
            console.log(pages, 'pages');
            return lastPage.total_pages > lastPage.page ? lastPage.page + 1 : undefined;
        },
        initialPageParam: 1,
    });

    useEffect(() => {
        if (!isInView || !hasNextPage || isLoading) return;

        fetchNextPage();
    }, [isInView, hasNextPage]);

    const uniqueData = new Map<string, MovieListItem>();
    data?.pages.forEach((page) => {
        page.results.forEach((content: MovieListItem) => {
            uniqueData.set(`${content.id}-${content.title}`, content);
        });
    });

    return (
        <div
            className={`flex-1 ${
                isLoading || uniqueData.size > 0 ? 'grid' : 'block'
            } grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4`}
        >
            {!isLoading &&
                uniqueData.size > 0 &&
                Array.from(uniqueData.values()).map((content: MovieListItem, index: number) => (
                    <Card key={`${content.id}-${content.title}`} content={content} priority={index < 6} />
                ))}
            {(isLoading || isFetchingNextPage) && <Skeleton count={12} />}
            {!isLoading && uniqueData.size === 0 && <Empty className="h-[500px]" />}
            <div ref={observerRef} />
        </div>
    );
};

export default List;
