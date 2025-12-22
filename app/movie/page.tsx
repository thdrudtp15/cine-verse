import Search from './_components/Search';
import List from './_components/List';
import Skeleton from '@/components/content/Skeleton';
import SearchSkeleton from './_components/SearchSkeleton';
import { Suspense } from 'react';

const Page = async () => {
    return (
        <div className="content-container flex pt-16 gap-4">
            <Suspense fallback={<SearchSkeleton />}>
                <Search />
            </Suspense>
            <Suspense fallback={<Skeleton count={12} />}>
                <List />
            </Suspense>
        </div>
    );
};

export default Page;
