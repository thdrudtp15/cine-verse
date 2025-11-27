import React from 'react';
import { Suspense } from 'react';
import { use } from 'react';
import { unstable_cache } from 'next/cache';

import Banner from '@/components/layout/banner/Banner';
import Wrapper from '@/components/content/Wrapper';

import Carousel from '@/components/carousel/Carousel';
import SectionHeader from '@/components/content/SectionHeader';
import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';
import Empty from '@/components/ui/Empty';

import type { MovieListItem } from '@/types/movieList';

import { popularContent, topRatedContent } from '@/lib/api/movies';

const getPopularContent = unstable_cache(
    async (category: string) => {
        const popularContentList = await popularContent(category);
        if (!popularContentList) {
            console.error(`Failed to fetch ${category} popular content`);
            return [];
        }
        return popularContentList;
    },
    ['popular-content'],
    {
        tags: ['popular-content'],
        revalidate: 3600, // 1시간마다 재검증 (초 단위)
    }
);

const getTopRatedContent = unstable_cache(
    async (category: string) => {
        const topRatedContentList = await topRatedContent(category);
        if (!topRatedContentList) {
            console.error(`Failed to fetch ${category} top rated content`);
            return [];
        }
        return topRatedContentList;
    },
    ['top-rated-content'],
    {
        tags: ['top-rated-content'],
        revalidate: 3600, // 1시간마다 재검증 (초 단위)
    }
);

const ContentList = ({ data }: { data: Promise<MovieListItem[]> }) => {
    const result = use(data);

    if (!result || result.length === 0) return <Empty />;

    return result.map((item: MovieListItem) => (
        <React.Fragment key={item.id}>
            <div className="md:flex-[0_0_25%] lg:flex-[0_0_20%] flex-[0_0_50%]">
                <Card content={item} />
            </div>
        </React.Fragment>
    ));
};

const Home = async () => {
    const popularMovies = getPopularContent('movie');
    const topRatedMovies = getTopRatedContent('movie');

    // use를 사용해 컴포넌트 재활용?
    return (
        <>
            <Banner />
            <Wrapper className="flex flex-col gap-4 mb-20">
                <SectionHeader title="인기 콘텐츠" link="/movie"></SectionHeader>
                <Carousel>
                    <Suspense fallback={<Skeleton count={6} />}>
                        <ContentList data={popularMovies} />
                    </Suspense>
                </Carousel>
            </Wrapper>
            <Wrapper className="flex flex-col gap-4">
                <SectionHeader title="추천 명작" link="/movie"></SectionHeader>
                <Carousel>
                    <Suspense fallback={<Skeleton count={6} />}>
                        <ContentList data={topRatedMovies} />
                    </Suspense>
                </Carousel>
            </Wrapper>
        </>
    );
};

export default Home;
