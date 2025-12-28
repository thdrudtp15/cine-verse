import { Suspense } from 'react';
import OverviewSkeleton from './_components/OverviewSkeleton';
import CreditsSkeleton from './_components/CreditsSkeleton';
import VideosSkeleton from './_components/VideosSkeleton';
import RecommendationSkeleton from './_components/RecommendationSkeleton';
import SideBarSkeleton from './_components/SideBarSkeleton';

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense
            fallback={
                <div className="flex flex-col gap-4">
                    <OverviewSkeleton />
                    <div className="content-container">
                        <div className="border-t border-(--border) pt-4"></div>
                        <div className="flex gap-4 md:flex-row flex-col">
                            <div className="flex-1 flex flex-col gap-8 overflow-hidden ">
                                <CreditsSkeleton />
                                <VideosSkeleton />
                                <RecommendationSkeleton />
                            </div>
                            <SideBarSkeleton />
                        </div>
                    </div>
                </div>
            }
        >
            {children}
        </Suspense>
    );
};

export default Layout;
