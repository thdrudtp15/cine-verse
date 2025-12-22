import useParams from '@/hooks/useParams';
import { useSearchParams } from 'next/navigation';

import type { Genre } from '@/types/genre';

import Section from './Section';
import { GENRES } from '@/constants/constans';

const Genre = () => {
    const genres = useSearchParams()?.get('genres')?.split(',') || [];

    const { setParams, deleteParams } = useParams();

    return (
        <Section title="장르">
            <div className="relative w-full flex flex-wrap gap-2">
                {GENRES?.map((genre: Genre) => (
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
            </div>
        </Section>
    );
};

export default Genre;
