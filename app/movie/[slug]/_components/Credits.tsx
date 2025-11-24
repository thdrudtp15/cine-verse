import Image from 'next/image';

import { use } from 'react';
import type { MovieCredits } from '@/types/movieCredits';
import NotExistImage from '@/components/ui/NotExistImage';
import ExistImage from '@/components/ui/ExistImage';

const Credits = ({ data }: { data: Promise<MovieCredits> }) => {
    const credits = use(data);

    return (
        <div className="content-container">
            <div className="border-t border-(--border) pt-4"> </div>
            <h2 className="text-2xl font-bold mb-2">출연진</h2>
            <div className="overflow-x-auto">
                <div className="w-fit rounded-lg overflow-hidden  flex gap-4">
                    {credits.cast.map((actor) => {
                        return (
                            <article key={actor.id} className="rounded-lg pb-4 w-40">
                                <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
                                    {actor.profile_path ? (
                                        <ExistImage
                                            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                                            alt={actor.name}
                                            fill
                                            loading="lazy"
                                            className="object-cover object-center"
                                        />
                                    ) : (
                                        <NotExistImage />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold">{actor.name}</h3>
                                    <p className="text-sm text-(--foreground-muted)">{actor.character}</p>
                                </div>
                            </article>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Credits;
