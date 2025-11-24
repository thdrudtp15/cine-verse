const VideosSkeleton = () => {
    return (
        <div className="content-container w-full">
            <div className="h-8 w-64 skeleton rounded-full animate-pulse mb-2" />
            <div className="overflow-x-auto">
                <div className="flex gap-4 w-fit pb-4">
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="w-160 h-90 rounded-lg skeleton animate-pulse relative overflow-hidden"
                        ></div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default VideosSkeleton;
