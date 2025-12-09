'use client';

import Image from 'next/image';
import { use, useState } from 'react';
import { getVideoThumbnail } from '@/lib/utils/getVideoPlatform';
import VideoModal from '@/components/modal/VideoModal';
import { PlayIcon } from 'lucide-react';
import Empty from '@/components/ui/Empty';

import type { VideoResult, MovieVideos } from '@/types/movieVideos';
import type { MovieDetail } from '@/types/movieDetail';

const Videos = ({ data, movie }: { data: Promise<MovieVideos>; movie: Promise<MovieDetail> }) => {
    const videos = use(data);
    const movieData = use(movie);

    const [currentVideo, setCurrentVideo] = useState<VideoResult | null>(null);

    return (
        <>
            <div className="content-container w-full">
                <h2 className="text-2xl font-bold mb-2">예고편 및 트레일러</h2>
                {videos.results.length === 0 ? (
                    <Empty title="동영상이 없습니다." />
                ) : (
                    <div className="overflow-x-auto rounded-lg">
                        <div className="flex gap-4 w-fit pb-4">
                            {videos.results.map((video) => (
                                <div
                                    key={video.id}
                                    className="w-160 h-90 rounded-lg overflow-hidden relative cursor-pointer"
                                    onClick={() => setCurrentVideo(video)}
                                >
                                    <Image
                                        src={`${getVideoThumbnail(video)}/vi/${video.key}/0.jpg`}
                                        alt={video.name}
                                        fill
                                        className="object-cover object-center"
                                    />
                                    <div className="absolute inset-0 group hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                                        <div className="rounded-full bg-gray-500/20 p-4">
                                            <PlayIcon className="w-10 h-10 text-white group-hover:scale-110 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
            <VideoModal video={currentVideo} movie={movieData} onClose={() => setCurrentVideo(null)} />
        </>
    );
};

export default Videos;
