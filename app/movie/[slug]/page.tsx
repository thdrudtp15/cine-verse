import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import OverviewSkeleton from './_components/OverviewSkeleton';
import Overview from './_components/Overview';
import Credits from './_components/Credits';

import { getMovieDetail } from '@/lib/api/movies';
import { getMovieCredits as getMovieCreditsApi } from '@/lib/api/movies';

import type { MovieDetail } from '@/types/movieDetail';

const isMovieDetail = (movie: MovieDetail): movie is MovieDetail => {
    return (
        typeof movie === 'object' &&
        movie !== null &&
        'id' in movie &&
        'title' in movie &&
        'overview' in movie &&
        'poster_path' in movie &&
        'release_date' in movie &&
        'vote_average' in movie &&
        'vote_count' in movie
    );
};

const getMovie = unstable_cache(
    async (slug: string) => {
        const movie = await getMovieDetail(slug);

        if (!movie) {
            notFound();
        } else if (!isMovieDetail(movie)) {
            // 타입 불일치 시 404
            notFound();
        }
        return movie;
    },
    ['movie-detail'],
    { revalidate: 3600, tags: ['movie-detail'] }
);

const getMovieCredits = unstable_cache(
    async (slug: string) => {
        const credits = await getMovieCreditsApi(slug);
        return credits;
    },
    ['movie-credits'],
    { revalidate: 3600, tags: ['movie-credits'] }
);

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const movie = getMovie(slug);
    const credits = getMovieCredits(slug);

    return (
        <>
            <Suspense fallback={<OverviewSkeleton />}>
                <Overview data={movie} />
            </Suspense>
            <Suspense fallback={<OverviewSkeleton />}>
                <Credits data={credits} />
            </Suspense>
        </>
    );
};

export default Page;
