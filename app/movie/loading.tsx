import SearchSkeleton from './_components/SearchSkeleton';
import Skeleton from '@/components/content/Skeleton';

const Loading = () => {
    return (
        <div className="content-container flex pt-16 gap-4">
            <SearchSkeleton />
            <Skeleton count={12} />
        </div>
    );
};
export default Loading;
