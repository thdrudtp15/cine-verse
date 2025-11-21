import React from 'react';
import { Suspense } from 'react';
import { use } from 'react';
import { unstable_cache } from 'next/cache';

import Banner from '@/components/layout/banner/Banner';
import Wrapper from '@/components/content/Wrapper';

import Carousel from '@/components/carousel/Carousel';
import SectionHeader from '@/components/content/SectionHeader';
import SectionCategory from '@/components/content/SectionCategory';
import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';

import type { MovieListItem } from '@/types/movieList';

import { API_URL, OPTIONS } from '@/constants/constans';

// 캐시된 데이터 페칭 함수
const getPopularContent = unstable_cache(
    async (category: string): Promise<MovieListItem[]> => {
        const response = await fetch(`${API_URL}/${category}/popular?language=ko-KR&page=1`, OPTIONS);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${category} popular content`);
        }

        const data = await response.json();
        return data.results;
    },
    ['popular-content'], // 캐시 키
    {
        tags: ['popular-content'], // 캐시 태그 (revalidateTag로 무효화 가능)
        revalidate: 3600, // 1시간마다 재검증 (초 단위)
    }
);

const getTopRatedContent = unstable_cache(
    async (category: string): Promise<MovieListItem[]> => {
        const response = await fetch(`${API_URL}/${category}/top_rated?language=ko-KR&page=1`, OPTIONS);

        if (!response.ok) {
            throw new Error(`Failed to fetch ${category} popular content`);
        }

        const data = await response.json();
        return data.results;
    },
    ['top-rated-content'],
    {
        tags: ['top-rated-content'],
        revalidate: 3600, // 1시간마다 재검증 (초 단위)
    }
);

const ContentList = ({ data }: { data: Promise<MovieListItem[]> }) => {
    const result = use(data);

    if (!result) return null;

    return result.map((item: MovieListItem) => (
        <React.Fragment key={item.id}>
            <div className="md:flex-[0_0_25%] lg:flex-[0_0_20%] flex-[0_0_50%]">
                <Card content={item} />
            </div>
        </React.Fragment>
    ));
};

type HomeProps = {
    searchParams: Promise<{ popular_category: string; top_rated_category: string }>;
};

const Home = async ({ searchParams }: HomeProps) => {
    const { popular_category, top_rated_category } = await searchParams;

    const popularMovies = getPopularContent(popular_category || 'movie');
    const topRatedMovies = getTopRatedContent(top_rated_category || 'movie');

    return (
        <>
            <Banner />
            <Wrapper className="flex flex-col gap-4 mb-8">
                <SectionHeader title="인기 콘텐츠" link="/movies/popular">
                    <SectionCategory
                        categories={[
                            { name: '영화', link: 'movie' },
                            { name: 'TV', link: 'tv' },
                        ]}
                        active={popular_category || 'movie'}
                        target="popular_category"
                    />
                </SectionHeader>
                <Carousel>
                    <Suspense fallback={<Skeleton count={6} />}>
                        <ContentList data={popularMovies} />
                    </Suspense>
                </Carousel>
            </Wrapper>
            <Wrapper className="flex flex-col gap-4">
                <SectionHeader title="추천 명작" link="/movies/top_rated">
                    <SectionCategory
                        categories={[
                            { name: '영화', link: 'movie' },
                            { name: 'TV', link: 'tv' },
                        ]}
                        active={top_rated_category || 'movie'}
                        target="top_rated_category"
                    />
                </SectionHeader>
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
