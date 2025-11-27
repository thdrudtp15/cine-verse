import { useQuery } from '@tanstack/react-query';
import { movieGenres } from '@/lib/api/movies';

import useParams from '@/hooks/useParams';
import { useSearchParams } from 'next/navigation';

import type { Genre } from '@/types/genre';

const GenreSkeleton = () => {
    return (
        <>
            <div className="w-18 h-10 skeleton rounded-full animate-pulse"></div>
            <div className="w-18 h-10 skeleton rounded-full animate-pulse"></div>
            <div className="w-18 h-10 skeleton rounded-full animate-pulse"></div>
            <div className="w-18 h-10 skeleton rounded-full animate-pulse"></div>
            <div className="w-18 h-10 skeleton rounded-full animate-pulse"></div>
        </>
    );
};

const Genre = () => {
    const { data: genreList, isLoading } = useQuery({
        queryKey: ['movieGenres'],
        queryFn: movieGenres,
    });

    const genres = useSearchParams().get('genres')?.split(',') || [];

    const { setParams, deleteParams } = useParams();

    return (
        <div className="flex flex-col gap-4">
            <div className="relative w-full flex flex-wrap gap-2">
                {!isLoading &&
                    genreList?.map((genre: Genre) => (
                        <button
                            className={`${
                                genres.includes(genre.id.toString())
                                    ? 'bg-accent-primary text-background'
                                    : 'bg-background-elevated text-foreground'
                            } px-4 py-2 rounded-full cursor-pointer`}
                            onClick={() => {
                                if (genres.includes(genre.id.toString())) {
                                    if (genres.length === 1) {
                                        deleteParams('genres');
                                        return;
                                    }
                                    console.log(genres.length, '길이');
                                    setParams('genres', genres.filter((g) => g !== genre.id.toString()).join(','));
                                    return;
                                }

                                setParams('genres', [...genres, genre.id.toString()].join(','));
                            }}
                            key={genre.id}
                        >
                            {genre.name}
                        </button>
                    ))}
                {isLoading && <GenreSkeleton />}
            </div>
        </div>
    );
};

export default Genre;
