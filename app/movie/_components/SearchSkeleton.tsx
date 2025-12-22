import React from 'react';

const SearchSkeleton = () => {
    return (
        <div className="w-64">
            <div className="sticky top-20 flex flex-col gap-6">
                {/* Keyword 섹션 */}
                <div className="flex flex-col gap-2">
                    <div className="h-7 w-20 bg-background-elevated rounded-lg animate-pulse" />
                    <div className="h-10 w-full bg-background-elevated rounded-lg animate-pulse" />
                    <div className="flex gap-2 flex-wrap mt-2">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-8 w-20 bg-background-elevated rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>

                {/* Genre 섹션 */}
                <div className="flex flex-col gap-2">
                    <div className="h-7 w-16 bg-background-elevated rounded-lg animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="h-9 w-20 bg-background-elevated rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>

                {/* Sort 섹션 */}
                <div className="flex flex-col gap-2">
                    <div className="h-7 w-12 bg-background-elevated rounded-lg animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-9 w-20 bg-background-elevated rounded-full animate-pulse" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchSkeleton;





