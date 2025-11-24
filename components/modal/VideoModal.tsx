'use client';
import Modal from '@/components/ui/Modal';

import type { VideoResult } from '@/types/movieVideos';

interface VideoModalProps {
    video: VideoResult | null;
    onClose: () => void;
}

const VideoModal = ({ video, onClose }: VideoModalProps) => {
    if (video === null) return null;
    const videoUrl = video.site === 'YouTube' ? `https://www.youtube.com/embed/${video.key}` : '';

    return (
        <Modal isOpen={video !== null} onClose={onClose} title={video.name}>
            <div className="w-full h-100 max-w-2xl max-h-2xl">
                {videoUrl && <iframe src={videoUrl} width="100%" height="100%" allowFullScreen></iframe>}
            </div>
        </Modal>
    );
};

export default VideoModal;
