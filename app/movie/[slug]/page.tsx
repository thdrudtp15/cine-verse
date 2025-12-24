import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import Overview from './_components/Overview';
import Credits from './_components/Credits';
import Videos from './_components/Videos';
import SideBar from './_components/SideBar';
import Recommendation from './_components/Recommendation';
import Duration from './_components/Duration';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { getMovieDetail } from '@/lib/api/movies';
import { getMovieCredits as getMovieCreditsApi } from '@/lib/api/movies';
import { getMovieVideos as getMovieVideosApi } from '@/lib/api/movies';
import { getMovieKeywords as getMovieKeywordsApi } from '@/lib/api/movies';
import { getMovieRecommendations as getMovieRecommendationsApi } from '@/lib/api/movies';
import { getMovieWatchProviders as getMovieWatchProvidersApi } from '@/lib/api/movies';

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

        if (!isMovieDetail(movie)) {
            // 타입 불일치 시 404
            notFound();
        } else if (!movie) {
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

const getMovieKeywords = unstable_cache(
    async (slug: string) => {
        const keywords = await getMovieKeywordsApi(slug);
        return keywords;
    },
    ['movie-keywords'],
    { revalidate: 3600, tags: ['movie-keywords'] }
);

const getMovieVideos = unstable_cache(
    async (slug: string) => {
        const videos = await getMovieVideosApi(slug);
        return videos;
    },
    ['movie-videos'],
    { revalidate: 3600, tags: ['movie-videos'] }
);

const getMovieRecommendations = unstable_cache(
    async (slug: string) => {
        const recommendations = await getMovieRecommendationsApi(slug);
        return recommendations;
    },
    ['movie-recommendations'],
    { revalidate: 3600, tags: ['movie-recommendations'] }
);

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const session = await getServerSession(authOptions);

    if (Number.isNaN(Number(slug))) {
        console.log(slug, '숫자가 아닙니다');
        notFound();
    }

    const movie = getMovie(slug);
    const credits = getMovieCredits(slug);
    const videos = getMovieVideos(slug);
    const keywords = getMovieKeywords(slug);
    const recommendations = getMovieRecommendations(slug);
    const watchProviders = getMovieWatchProvidersApi(slug);

    return (
        <div className="flex flex-col gap-4">
            <Duration movie={movie} session={session} />
            <Overview data={movie} watchProviders={watchProviders} session={session} />
            <div className="content-container">
                <div className="border-t border-(--border) pt-4"></div>
                <div className="flex gap-4 md:flex-row flex-col">
                    <div className="flex-1 flex flex-col gap-8 overflow-hidden ">
                        <Credits data={credits} />
                        <Videos data={videos} movie={movie} />
                        <Recommendation data={recommendations} />
                    </div>
                    <SideBar data={movie} keywords={keywords} />
                </div>
            </div>
        </div>
    );
};

export default Page;
