'use client';
import Modal from '../ui/Modal';
import type { MovieListItem } from '@/types/movieList';
import { XIcon } from 'lucide-react';
import Card from '@/components/content/Card';

const RecommendationModal = ({
    recommendationList,
    onClose,
}: {
    recommendationList: MovieListItem[];
    onClose: () => void;
}) => {
    return (
        <Modal isOpen={true} onClose={onClose}>
            <Modal.RecommendationContent>
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                    <div>
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent mb-2">
                            이런 영화는 어떠세요?
                        </h2>
                        <p className="text-sm text-gray-400">
                            {recommendationList.length}개의 추천 영화를 발견했습니다
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                        aria-label="닫기"
                    >
                        <XIcon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh] pr-2 custom-scrollbar">
                    {recommendationList.map((movie) => (
                        <div key={movie.id} className="transform transition-transform duration-300 hover:scale-105">
                            <Card content={movie as MovieListItem} height={100} />
                        </div>
                    ))}
                </div>
            </Modal.RecommendationContent>
        </Modal>
    );
};

export default RecommendationModal;
