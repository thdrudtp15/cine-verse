const OverviewSkeleton = () => {
    return (
        <div>
            <div className="absolute inset-0 w-full h-[70vh] min-h-[600px] z-1"></div>
            <div className="content-container flex flex-col gap-8 md:flex-row md:items-center py-12 z-2">
                <div className="w-80 h-110 rounded-lg relative skeleton animate-pulse duration-300 animate-pulse"></div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-2">
                        {['액션', '코미디', '공포'].map((genre, index) => (
                            <div
                                key={index}
                                className="skeleton rounded-full px-4 py-1 text-sm animate-pulse text-transparent w-fit"
                            >
                                {genre}
                            </div>
                        ))}
                    </div>
                    <h1 className="skeleton w-[80%] px-4 py-1 text-4xl font-bold animate-pulse text-transparent">-</h1>
                    <div className="flex flex-col gap-2">
                        <div className="h-4 skeleton animate-pulse w-full"></div>
                        <div className="h-4 skeleton animate-pulse w-3/4"></div>
                        <div className="h-4 skeleton animate-pulse w-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverviewSkeleton;
