import React from 'react';

type SkeletonProps = {
    count?: number;
};

const Skeleton = React.memo(({ count = 1 }: SkeletonProps) => {
    return (
        <>
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="md:flex-[0_0_25%] lg:flex-[0_0_20%] flex-[0_0_50%] rounded-lg group bg-gray-500/10 h-60 relative overflow-hidden transition-all duration-300 animate-pulse"
                    aria-label="로딩 중..."
                >
                    {/* 이미지 스켈레톤 */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-700/60 to-gray-700/90" />

                    {/* 하단 정보 영역 스켈레톤 */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
                        {/* 제목 스켈레톤 */}
                        <div className="h-7 bg-gray-600/40 rounded w-3/4 animate-pulse shadow-lg" />
                        {/* 날짜 스켈레톤 */}
                        <div className="h-4 bg-gray-600/30 rounded w-1/2 animate-pulse shadow-lg" />
                    </div>
                </div>
            ))}
        </>
    );
});

Skeleton.displayName = 'Skeleton';

export default Skeleton;
