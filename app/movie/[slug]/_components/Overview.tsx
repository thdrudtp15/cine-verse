import { use } from 'react';
import { Calendar, Clock, Star, Play } from 'lucide-react';
import Image from 'next/image';
import getRuntime from '@/lib/utils/getRuntime';

import type { MovieDetail } from '@/types/movieDetail';
import type { WatchProviders } from '@/types/watchProviders';

import ExistImage from '@/components/ui/ExistImage';
import NotExistImage from '@/components/ui/NotExistImage';
import Wish from './Wish';
import ProviderItem from './ProviderItem';

type Props = {
    data: Promise<MovieDetail>;
    watchProviders: Promise<WatchProviders>;
};

const Overview = ({ data, watchProviders }: Props) => {
    const movie = use(data);
    const watchProvidersData = use(watchProviders);
    const { data: watchProvidersDataList, link } = watchProvidersData;

    const backdropUrl = movie.backdrop_path ? `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}` : null;
    const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : null;

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
                <div className="w-80 h-110 rounded-lg overflow-hidden relative group">
                    {posterUrl && (
                        <ExistImage
                            src={posterUrl}
                            alt={movie.title}
                            width={320}
                            height={480}
                            priority
                            className="object-cover object-center"
                        />
                    )}
                    {!posterUrl && <NotExistImage />}
                    <Wish movie_id={movie.id} />
                </div>
                <div className="flex-1 flex flex-col gap-4">
                    <div className="flex gap-2 flex-wrap items-center">
                        {movie.genres.map((genre) => (
                            <div
                                key={genre.id}
                                className="bg-accent-primary/10 border border-accent-primary/30 backdrop-blur-sm rounded-full px-4 py-1 text-sm text-accent-primary text-nowrap"
                            >
                                {genre.name}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-start gap-3">
                        <h1 className="text-4xl font-bold flex-1">
                            {movie.title} ({movie.original_title})
                        </h1>
                    </div>
                    <p className="text-md text-foreground-secondary">{movie.overview || '개요가 없습니다.'}</p>
                    <div className="flex gap-4 flex-wrap items-center">
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
                    </div>
                    {/* Watch Providers 섹션 */}
                    {watchProvidersDataList && watchProvidersDataList.length > 0 && (
                        <div className="flex flex-col gap-3 pt-2">
                            <div className="flex items-center gap-2">
                                <Play className="w-4 h-4 text-accent-primary" />
                                <h3 className="text-sm font-semibold text-foreground">시청 가능 서비스</h3>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {watchProvidersDataList?.map((provider) => (
                                    <ProviderItem
                                        key={provider.provider_id}
                                        movie={movie}
                                        link={link}
                                        provider={provider}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                    {!watchProvidersDataList ||
                        (watchProvidersDataList.length === 0 && (
                            <div className="text-sm text-foreground-secondary">시청 가능 서비스 없음</div>
                        ))}
                </div>
            </div>
        </>
    );
};

export default Overview;
