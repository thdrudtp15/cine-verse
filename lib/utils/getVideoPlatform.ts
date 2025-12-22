import type { VideoResult } from '@/types/movieVideos';

export const getVideoPlatform = (video: VideoResult) => {
    switch (video.site) {
        case 'YouTube':
            return `https://www.youtube.com`;
        case 'Vimeo':
            return `https://www.vimeo.com`;
        case 'Dailymotion':
            return `https://www.dailymotion.com`;
        default:
            return null;
    }
};

export const getVideoThumbnail = (video: VideoResult) => {
    switch (video.site) {
        case 'YouTube':
            return `https://img.youtube.com`;
        case 'Vimeo':
            return `https://img.vimeo.com`;
        case 'Dailymotion':
            return `https://img.dailymotion.com`;
        default:
            return null;
    }
};
