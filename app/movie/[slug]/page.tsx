import Image from 'next/image';
import { API_URL, OPTIONS } from '@/constants/constans';
import { unstable_cache } from 'next/cache';
import { notFound } from 'next/navigation';
import { Suspense, use } from 'react';
import { Calendar, Clock, Star } from 'lucide-react';

import HeroSkeleton from './_components/HeroSkeleton';

import type { MovieDetail } from '@/types/movieDetail';

const getMovie = unstable_cache(
    async (slug: string) => {
        const response = await fetch(`${API_URL}/movie/${slug}?language=ko-KR`, OPTIONS);
        const data = await response.json();
        if (data.success === false) {
            notFound();
        }
        return data;
    },
    ['movie-detail'],
    { revalidate: 3600, tags: ['movie-detail'] }
);

const formatRuntime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}시간 ${mins}분` : `${mins}분`;
};

const MovieDetail = ({ data }: { data: Promise<MovieDetail> }) => {
    const movie = use(data);
    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null;
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

    console.log(movie);

    return (
        <div className="min-h-screen">
            {/* 히어로 섹션 백드롭 이미지 */}
            <div className="absolute w-full h-[70vh] min-h-[600px] z-1">
                {backdropUrl && (
                    <Image src={backdropUrl} alt={movie.title} fill priority className="object-cover object-center" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
            {/* 히어로 섹션 오버뷰 */}
            <div className="z-2 content-container relative flex flex-col gap-8 md:flex-row md:items-center py-12">
                <div className="w-80 h-110 rounded-lg overflow-hidden relative">
                    {posterUrl && (
                        <Image src={posterUrl} alt={movie.title} fill priority className="object-cover object-center" />
                    )}
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-4">
                        {movie.genres.map((genre) => (
                            <div
                                key={genre.id}
                                className="bg-accent-primary/10 border border-accent-primary/30 backdrop-blur-sm rounded-full px-4 py-1 text-sm text-accent-primary"
                            >
                                {genre.name}
                            </div>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold">
                        {movie.title} ({movie.original_title})
                    </h1>
                    <p className="text-md text-foreground-muted">{movie.overview || '개요가 없습니다.'}</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent-primary" />
                            <span className="text-sm text-foreground-secondary">{movie.release_date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4  text-accent-primary" />
                            <span className="text-sm text-foreground-secondary">{formatRuntime(movie.runtime)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-foreground-secondary text-yellow-500" />
                            <span className="text-sm text-foreground-secondary">
                                {Math.round(movie.vote_average * 10) / 10}
                            </span>
                        </div>
                        <div className="flex gap-4">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
    const { slug } = await params;
    const movie = getMovie(slug);

    return (
        <Suspense fallback={<HeroSkeleton />}>
            <MovieDetail data={movie} />
        </Suspense>
    );
};

export default Page;
