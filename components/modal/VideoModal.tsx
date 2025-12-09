'use client';
import Modal from '@/components/ui/Modal';
import React, { useEffect, useRef } from 'react';
import type { VideoResult } from '@/types/movieVideos';
import type { YT } from '@/types/youtube';
import type { MovieDetail } from '@/types/movieDetail';

interface VideoModalProps {
    video: VideoResult | null;
    movie: MovieDetail;
    onClose: () => void;
}

const VideoModal = ({ video, movie, onClose }: VideoModalProps) => {
    const playerRef = useRef<YT.Player | null>(null);
    const currentTimeRef = useRef<number>(0);
    const pauseTimeRef = useRef<number>(0);

    const getProgress = () => {
        if (currentTimeRef.current === 0 || pauseTimeRef.current === 0) return 0;
        return Math.abs(Math.floor((pauseTimeRef.current / currentTimeRef.current) * 100));
    };

    const send = async () => {
        const progress = getProgress();
        if (progress < 50 || currentTimeRef.current === 0) return;

        const response = await fetch('/api/interactions/videos', {
            method: 'POST',
            body: JSON.stringify({
                movie: movie,
                progress: getProgress(),
            }),
        });
        if (!response.ok) {
            throw new Error('Failed to send video progress');
        }
    };

    const onPlayerStateChange = (event: YT.OnStateChangeEvent) => {
        if (event.data === 1) {
            // 영상의 길이
            if (currentTimeRef.current === 0) {
                currentTimeRef.current = playerRef.current?.getDuration() ?? 0;
            }
        }
        // 정지 시 현재 시간 저장
        if (event.data === 2) {
            pauseTimeRef.current = playerRef.current?.getCurrentTime() ?? 0;
        }
        // 영상 시청 완료 시
        if (event.data === 0) {
            pauseTimeRef.current = playerRef.current?.getCurrentTime() ?? 0;
        }
    };

    useEffect(() => {
        // YouTube API 로드 확인
        const initPlayer = () => {
            if (!video) return;

            playerRef.current = new window.YT.Player('youtube-player', {
                videoId: video?.key ?? '',
                events: {
                    onStateChange: onPlayerStateChange,
                },
            });
        };
        if (!window.YT) {
            window.onYouTubeIframeAPIReady = initPlayer;
        } else {
            initPlayer();
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
            send();
        };
    }, [video, movie]);

    if (video === null) return null;

    return (
        <Modal isOpen={video !== null} onClose={onClose} title={video.name}>
            <div id="youtube-player" className="w-full" />
        </Modal>
    );
};

export default React.memo(VideoModal);
