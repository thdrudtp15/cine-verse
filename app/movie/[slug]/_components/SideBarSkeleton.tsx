const SideBarSkeleton = () => {
    return (
        <aside className="w-64 relative">
            <div className="flex flex-col gap-4 sticky top-24">
                <div className="flex flex-col gap-2">
                    <div className="h-8 w-32 skeleton rounded-full animate-pulse" />
                    <div className="flex flex-wrap gap-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="skeleton rounded-full px-4 py-1 text-sm animate-pulse text-transparent w-fit"
                            >
                                키워드
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBarSkeleton;
