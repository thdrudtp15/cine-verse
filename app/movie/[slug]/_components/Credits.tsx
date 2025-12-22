import Link from 'next/link';

import { use } from 'react';
import type { MovieCredits } from '@/types/movieCredits';
import NotExistImage from '@/components/ui/NotExistImage';
import ExistImage from '@/components/ui/ExistImage';

const Credits = ({ data }: { data: Promise<MovieCredits> }) => {
    const credits = use(data);

    const actorsMap = new Map();
    credits.cast.forEach((actor) => {
        actorsMap.set(actor.id, actor);
    });

    const actors = Array.from(actorsMap.values());

    return (
        <div className="content-container">
            <h2 className="text-2xl font-bold mb-2">주요 출연진</h2>
            <div className="overflow-x-auto rounded-lg">
                <div className="w-fit  overflow-hidden flex gap-4 pb-2">
                    {actors.map((actor) => {
                        return (
                            <Link key={actor.id} href={`/person/${actor.id}`} className="rounded-lg w-40">
                                <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
                                    {actor.profile_path ? (
                                        <ExistImage
                                            src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                                            alt={actor.name}
                                            fill
                                            loading="lazy"
                                            className="object-cover object-center"
                                            sizes="300px"
                                        />
                                    ) : (
                                        <NotExistImage />
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold line-clamp-1">{actor.name}</h3>
                                    <p className="text-sm text-(--foreground-muted) line-clamp-1">{actor.character}</p>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Credits;
