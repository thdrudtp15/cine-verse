import React from 'react';
import Banner from '@/components/layout/banner/Banner';
import MovieList from '@/components/movies/MovieList';
import MovieSkeleton from '@/components/movies/MovieSkeleton';
import MovieCard from '@/components/movies/MovieCard';
import { Suspense } from 'react';
import { MovieListItem } from '@/types/movieList';

const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
const OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.TMDB_ACCESS_TOKEN}`,
    },
};

const Trends = async () => {
    const data = await fetch(`${API_URL}/movie/popular?language=ko-KR&page=1`, OPTIONS)
        .then((res) => res.json())
        .then((data) => {
            return data.results;
        })
        .catch((error) => {
            console.error(error);
        });

    return data.map((item: MovieListItem) => (
        <React.Fragment key={item.id}>
            <MovieCard movie={item} isPriority={true} />
        </React.Fragment>
    ));
};

const Home = async () => {
    // TODO: 실제 API에서 데이터 가져오기
    return (
        <>
            <Banner />
            <MovieList>
                <MovieList.Header title="트렌드" link="/movies/popular" />
                <MovieList.Grid>
                    <Suspense fallback={<MovieSkeleton count={6} />}>
                        <Trends />
                    </Suspense>
                </MovieList.Grid>
            </MovieList>
        </>
    );
};

export default Home;
