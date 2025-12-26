import { use } from 'react';
import type { MovieCredits } from '@/types/movieCredits';
import Actors from './Actors';

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
                <Actors actors={actors} />
            </div>
        </div>
    );
};

export default Credits;
