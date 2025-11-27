'use client';

import { useSearchParams } from 'next/navigation';
import Keyword from './filter/Keyword';
import Genre from './filter/Genre';
import Rated from './filter/Rated';

const Search = () => {
    return (
        <div className="w-64 flex flex-col gap-4">
            <Keyword />
            <Genre />
            <Rated />
        </div>
    );
};

export default Search;
