import React from 'react';

type MovieSkeletonProps = {
    count?: number;
};

const MovieSkeleton = React.memo(({ count = 1 }: MovieSkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-lg overflow-hidden bg-gray-500/10 h-80 animate-pulse"
                    role="status"
                    aria-label="로딩 중..."
                >
                    <div className="w-full h-full bg-gradient-to-br from-gray-700/60 to-gray-700/90" />
                </div>
            ))}
        </>
    );
});

MovieSkeleton.displayName = 'MovieSkeleton';

export default MovieSkeleton;
