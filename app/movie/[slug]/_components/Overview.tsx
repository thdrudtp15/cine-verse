import { use } from 'react';
import { Calendar, Clock, Star } from 'lucide-react';
import Image from 'next/image';
import getRuntime from '@/lib/utils/getRuntime';
import type { MovieDetail } from '@/types/movieDetail';

const Overview = ({ data }: { data: Promise<MovieDetail> }) => {
    const movie = use(data);
    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null;
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

    console.log(movie);

    return (
        <>
            {/* 히어로 섹션 백드롭 이미지 */}
            <div className="absolute w-full h-130 z-1">
                {backdropUrl && (
                    <Image src={backdropUrl} alt={movie.title} fill priority className="object-cover object-top" />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50" />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
            {/* 히어로 섹션 오버뷰 */}
            <div className="z-2 content-container relative flex flex-col gap-8 md:flex-row md:items-center py-12 ">
                <div className="w-80 h-110 rounded-lg overflow-hidden relative">
                    {posterUrl && (
                        <Image
                            src={posterUrl}
                            alt={movie.title}
                            width={320}
                            height={480}
                            priority
                            className="object-cover object-center"
                        />
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
                    <p className="text-md text-foreground-secondary">{movie.overview || '개요가 없습니다.'}</p>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-accent-primary" />
                            <span className="text-sm text-foreground-secondary">{movie.release_date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4  text-accent-primary" />
                            <span className="text-sm text-foreground-secondary">{getRuntime(movie.runtime)}</span>
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
        </>
    );
};

export default Overview;
