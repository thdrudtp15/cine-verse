const HeroSkeleton = () => {
    return (
        <div className="min-h-screen">
            <div className="absolute inset-0 w-full h-[70vh] min-h-[600px] z-1"></div>
            <div className="content-container flex flex-col gap-8 md:flex-row md:items-center py-12 z-2">
                <div className="w-80 h-110 rounded-lg relative bg-gray-600/40 animate-pulse duration-300 animate-pulse"></div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-4">
                        {['액션', '코미디', '공포'].map((genre, index) => (
                            <div
                                key={index}
                                className="bg-gray-600/40 rounded-full px-4 py-1 text-sm animate-pulse shadow-lg text-transparent"
                            >
                                {genre}
                            </div>
                        ))}
                    </div>
                    <h1 className="bg-gray-600/40 rounded-full px-4 py-1 text-4xl font-bold animate-pulse shadow-lg text-transparent w-fit">
                        캐리비안의 해적: 죽은 자는 말이 없다.
                    </h1>

                    <div className="flex flex-col gap-2">
                        <div className="h-4 w-full bg-gray-600/40 rounded-full animate-pulse shadow-lg"></div>
                        <div className="h-4 w-full bg-gray-600/30 rounded-full animate-pulse shadow-lg"></div>
                        <div className="h-4 w-full bg-gray-600/40 rounded-full animate-pulse shadow-lg"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSkeleton;
