import useParams from '@/hooks/useParams';
import { useSearchParams } from 'next/navigation';

import Section from './Section';

const SORT_OPTIONS = [
    { value: 'popularity.desc', label: '인기순' },
    { value: 'primary_release_date.desc', label: '최신순' },
    { value: 'vote_average.desc', label: '평점순' },
] as const;

const Sort = () => {
    const currentSort = useSearchParams()?.get('sort') || 'popularity.desc';
    const { setParams } = useParams();

    return (
        <Section title="정렬">
            <div className="relative w-full flex flex-wrap gap-2">
                {SORT_OPTIONS.map((option) => (
                    <button
                        key={option.value}
                        className={`${
                            currentSort === option.value
                                ? 'bg-accent-primary text-background'
                                : 'bg-background-elevated text-foreground'
                        } px-4 py-2 rounded-full cursor-pointer`}
                        onClick={() => {
                            setParams('sort', option.value);
                        }}
                    >
                        {option.label}
                    </button>
                ))}
            </div>
        </Section>
    );
};

export default Sort;
