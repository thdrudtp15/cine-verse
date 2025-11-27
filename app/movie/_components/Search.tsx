'use client';

import Keyword from './filter/Keyword';
import Genre from './filter/Genre';
import Rated from './filter/Rated';

const Search = () => {
    return (
        <div className="w-64">
            <div className="sticky top-20 flex flex-col gap-6">
                <Keyword />
                <Genre />
                <Rated />
            </div>
        </div>
    );
};

export default Search;
