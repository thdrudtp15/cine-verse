const CreditsSkeleton = () => {
    return (
        <div className="content-container flex flex-col gap-4">
            <div className="overflow-x-auto">
                <div className="h-8 w-64 skeleton rounded-full animate-pulse mb-2" />
                <div className="w-fit rounded-lg overflow-hidden  flex gap-4">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="rounded-lg pb-4 w-40">
                            <div className="relative h-60 mb-4 rounded-lg overflow-hidden">
                                <div className="skeleton h-60 mb-4 rounded-lg overflow-hidden"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CreditsSkeleton;
