import Image from 'next/image';
import React from 'react';

import Link from 'next/link';

import NotExistImage from '@/components/ui/NotExistImage';

import type { MovieListItem } from '@/types/movieList';
import type { TvListItem } from '@/types/tvList';

const isMovie = (content: MovieListItem | TvListItem): content is MovieListItem => {
    return 'title' in content;
};

const CardOverlay = React.memo(({ content }: { content: MovieListItem | TvListItem }) => {
    return (
        <Link
            href={`/${isMovie(content) ? 'movie' : 'tv'}/${content.id}`}
            className="absolute p-4
            rounded-lg
            inset-0 bg-gradient-to-t from-black via-black/20 to-black/10
            hover:backdrop-blur-sm duration-300 hover:bg-black/50
            overflow-hidden
            
        "
        >
            <p className="opacity-0 line-clamp-4 text-shadow-lg group-hover:opacity-100 transition-opacity duration-300 text-(--foreground) text-sm">
                {isMovie(content) ? content.overview : content.overview}
            </p>

            <div className="transition-opacity absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-(--foreground) text-2xl font-bold">
                    {isMovie(content) ? content.title : content.name}
                </h3>
                <p className="text-(--foreground-muted) text-sm">
                    {isMovie(content) ? content.release_date : content.first_air_date}
                </p>
            </div>
        </Link>
    );
});

CardOverlay.displayName = 'CardOverlay';

const Card = React.memo(({ content }: { content: MovieListItem | TvListItem }) => {
    return (
        <div className="rounded-lg group bg-gray-500/10 h-100 relative overflow-hidden transition-all duration-300">
            {content.poster_path && (
                <Image
                    src={`https://image.tmdb.org/t/p/w500${content.poster_path}`}
                    alt={isMovie(content) ? content.title : content.name}
                    fill
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 419px, (max-width: 1200px) 309.5px, (max-width: 1024px) 345px"
                />
            )}
            {!content.poster_path && <NotExistImage />}
            <CardOverlay content={content} />
        </div>
    );
});

Card.displayName = 'Card';

export default Card;
