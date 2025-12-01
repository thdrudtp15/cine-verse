import { use } from 'react';
import type { MovieDetail } from '@/types/movieDetail';
import type { MovieKeywords } from '@/types/movieKeywords';
import Link from 'next/link';

type SideBarProps = {
    data: Promise<MovieDetail>;
    keywords: Promise<MovieKeywords>;
};

const SideBar = ({ data, keywords }: SideBarProps) => {
    const movieData = use(data);
    const keywordsData = use(keywords);

    return (
        <aside className="w-full md:w-64 relative ">
            <div className="flex flex-col gap-4 sticky top-24">
                {/* <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">제작 비용</h2>
                </div> */}
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-bold">키워드</h2>
                    <div className="flex flex-wrap gap-2">
                        {keywordsData.keywords.length > 0 &&
                            keywordsData.keywords.map((keyword) => (
                                <Link
                                    href={`/movie?keywords=${keyword.id}`}
                                    key={keyword.id}
                                    className="bg-accent-primary/10 border border-accent-primary/30
                                           backdrop-blur-sm rounded-full px-4 py-1 text-sm 
                                           text-accent-primary cursor-pointer 
                                           transition-all duration-300
                                           hover:bg-accent-primary/20 
                                           hover:text-accent-primary-hover
                                           "
                                >
                                    {keyword.name}
                                </Link>
                            ))}
                        {keywordsData.keywords.length === 0 && (
                            <p className="text-sm text-foreground-muted">키워드가 없습니다.</p>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SideBar;
