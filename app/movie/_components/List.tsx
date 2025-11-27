'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import { searchMovies } from '@/lib/api/movies';

import Card from '@/components/content/Card';

import type { MovieListItem } from '@/types/movieList';

const List = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get('query') || '';
    const keywords = searchParams.get('keywords') || '';
    const genre = searchParams.get('genres') || '';
    const rated = searchParams.get('rate') || '';

    const { data, isLoading, isError } = useQuery({
        queryKey: ['movies_discover', query, keywords, genre, rated],
        queryFn: () => searchMovies(query, keywords, genre, rated, 1),
    });

    return (
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data?.map((content: MovieListItem) => (
                <Card key={content.id} content={content} />
                // <div key={content.id}>ㅎㅇㅇ</div>
            ))}
        </div>
    );
};

export default List;
