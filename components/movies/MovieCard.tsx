import React from 'react';
import Image from 'next/image';

import type { MovieListItem } from '@/types/movieList';

const MovieCard = React.memo(({ movie, isPriority = false }: { movie: MovieListItem; isPriority: boolean }) => {
    return (
        <div className="rounded-lg overflow-hidden bg-gray-500/10 h-80 relative">
            <Image
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                fill
                quality={70}
                className="object-cover object-center"
                sizes="(max-width: 768px) 232px, (max-width: 1200px) 188.5px"
                priority={isPriority}
            />
        </div>
    );
});

MovieCard.displayName = 'MovieCard';

export default MovieCard;
