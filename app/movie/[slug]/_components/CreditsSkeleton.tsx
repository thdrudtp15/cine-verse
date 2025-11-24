const Cast = () => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-2 text-transparent skeleton animate-pulse w-fit">주요 출연진</h2>
            <div className="overflow-x-auto">
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
        </>
    );
};

const CreditsSkeleton = () => {
    return (
        <div className="content-container flex flex-col gap-4">
            <div className="border-t border-(--border) pt-4"></div>
            <Cast />
        </div>
    );
};

export default CreditsSkeleton;
