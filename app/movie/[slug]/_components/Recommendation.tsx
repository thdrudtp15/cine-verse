import Link from 'next/link';
import { use } from 'react';
import type { MovieListResponse } from '@/types/movieList';
import NotExistImage from '@/components/ui/NotExistImage';
import ExistImage from '@/components/ui/ExistImage';

const Recommendation = ({ data }: { data: Promise<MovieListResponse> }) => {
    const recommendations = use(data);

    console.log(recommendations.results, '추천 영화');

    return (
        <div className="content-container">
            <h2 className="text-2xl font-bold mb-2">추천 영화</h2>
            <div className="overflow-x-auto rounded-lg">
                <div className="w-fit  overflow-hidden flex gap-4 pb-2">
                    {recommendations.results.map((movie) => {
                        return (
                            <Link key={movie.id} href={`/movie/${movie.id}`}>
                                <div className="relative h-100 w-60 mb-4 rounded-lg overflow-hidden">
                                    {movie.poster_path ? (
                                        <ExistImage
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            fill
                                            loading="lazy"
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <NotExistImage />
                                    )}
                                </div>
                                <div className="text-lg font-bold line-clamp-1">{movie.title}</div>
                                <div className="text-sm text-(--foreground-muted) line-clamp-1">{movie.overview}</div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Recommendation;
