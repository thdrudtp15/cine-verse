import React from 'react';
import { Suspense } from 'react';
import { use } from 'react';

import Banner from '@/components/layout/banner/Banner';
import Wrapper from '@/components/content/Wrapper';

import Carousel from '@/components/carousel/Carousel';
import SectionHeader from '@/components/content/SectionHeader';
import Card from '@/components/content/Card';
import Skeleton from '@/components/content/Skeleton';

import type { MovieListItem } from '@/types/movieList';

import { API_URL, OPTIONS } from '@/constants/constans';

const Movies = ({ data }: { data: Promise<MovieListItem[]> }) => {
    const result = use(data);

    return result.map((item: MovieListItem) => (
        <React.Fragment key={item.id}>
            <div className="md:flex-[0_0_25%] lg:flex-[0_0_20%] flex-[0_0_50%]">
                <Card content={item} />
            </div>
        </React.Fragment>
    ));
};

type HomeProps = {
    searchParams: Promise<{ popular_category: string; free_category: string }>;
};

const Home = async ({ searchParams }: HomeProps) => {
    const popularMovies = fetch(`${API_URL}/tv/popular?language=ko-KR&page=1`, OPTIONS)
        .then((res) => res.json())
        .then((data) => {
            return data.results;
        })
        .catch((error) => {
            console.error(error);
        });

    return (
        <>
            <Banner />
            <Wrapper className="flex flex-col gap-4">
                <SectionHeader title="인기" link="/movies/popular" />
                <Carousel>
                    <Suspense fallback={<Skeleton count={6} />}>
                        <Movies data={popularMovies} />
                    </Suspense>
                </Carousel>
            </Wrapper>
            {/* <MovieList>
                <MovieList.Header title="평점 높은 영화" link="/movies/popular" />
                <Suspense fallback={<MovieSkeleton count={6} />}>
                    <Movies data={topRatedMovies} />
                </Suspense>
            </MovieList>
            <MovieList>
                <MovieList.Header title="개봉 예정 영화" link="/movies/popular" />
                <Suspense fallback={<MovieSkeleton count={6} />}>
                    <Movies data={upcomingMovies} />
                </Suspense>
            </MovieList> */}
        </>
    );
};

export default Home;
