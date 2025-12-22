const RecommendationSkeleton = () => {
    return (
        <div className="content-container">
            <div className="h-8 w-48 skeleton rounded-full animate-pulse mb-2" />
            <div className="overflow-x-auto rounded-lg">
                <div className="w-fit overflow-hidden flex gap-4 pb-2">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="w-80">
                            <div className="relative h-120 w-80 mb-4 rounded-lg overflow-hidden">
                                <div className="skeleton h-120 w-80 rounded-lg animate-pulse" />
                            </div>
                            <div className="h-6 skeleton rounded-full animate-pulse mb-2" />
                            <div className="h-4 skeleton rounded-full animate-pulse w-3/4" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default RecommendationSkeleton;
