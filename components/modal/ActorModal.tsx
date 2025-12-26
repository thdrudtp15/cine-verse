'use client';

import { useQuery } from '@tanstack/react-query';
import { motion } from 'motion/react';
import { Calendar, MapPin, Film, XIcon, Loader2 } from 'lucide-react';
import Modal from '../ui/Modal';
import { getActor } from '@/lib/api/actor';
import ExistImage from '../ui/ExistImage';
import NotExistImage from '../ui/NotExistImage';

type ActorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    id: string;
};

type ActorData = {
    name: string;
    biography: string;
    profile_path: string | null;
    birthday: string | null;
    place_of_birth: string | null;
    known_for_department: string;
    popularity: number;
};

const ActorModal = ({ isOpen, onClose, title, id }: ActorModalProps) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['actor', id],
        queryFn: () => getActor(id),
        enabled: isOpen && !!id,
    });

    const actor = data as ActorData | undefined;

    if (!isOpen) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full p-6 md:p-8 border border-border rounded-xl bg-background-elevated/95 backdrop-blur-xl max-w-4xl shadow-2xl max-h-[90vh] overflow-y-auto custom-scrollbar"
            >
                {/* 헤더 */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-border/50">
                    <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                        {title}
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 group"
                        aria-label="닫기"
                    >
                        <XIcon className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                </div>

                {/* 로딩 상태 */}
                {isLoading && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <Loader2 className="w-12 h-12 text-accent-primary animate-spin" />
                        <p className="text-foreground-secondary">배우 정보를 불러오는 중...</p>
                    </div>
                )}

                {/* 에러 상태 */}
                {isError && (
                    <div className="flex flex-col items-center justify-center py-12 gap-4">
                        <p className="text-error">배우 정보를 불러오는데 실패했습니다.</p>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 rounded-lg bg-accent-primary hover:bg-accent-primary-hover text-white font-medium transition-colors duration-200"
                        >
                            닫기
                        </button>
                    </div>
                )}

                {/* 배우 정보 */}
                {actor && !isLoading && !isError && (
                    <div className="space-y-6">
                        {/* 프로필 섹션 */}
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* 프로필 이미지 */}
                            <div className="flex-shrink-0">
                                <div className="relative w-48 h-[16rem] md:w-56 md:h-[16rem] rounded-lg overflow-hidden border border-border shadow-lg">
                                    {actor.profile_path ? (
                                        <ExistImage
                                            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                                            alt={actor.name}
                                            fill
                                            className="object-cover"
                                            sizes="224px"
                                        />
                                    ) : (
                                        <NotExistImage />
                                    )}
                                </div>
                            </div>

                            {/* 기본 정보 */}
                            <div className="flex-1 space-y-4">
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground mb-2">{actor.name}</h3>
                                    {actor.known_for_department && (
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-primary/10 border border-accent-primary/30">
                                            <Film className="w-4 h-4 text-accent-primary" />
                                            <span className="text-sm text-foreground-secondary">
                                                {actor.known_for_department}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                {/* 생년월일 */}
                                {actor.birthday && (
                                    <div className="flex items-center gap-2 text-foreground-secondary">
                                        <Calendar className="w-5 h-5" />
                                        <span>
                                            {new Date(actor.birthday).toLocaleDateString('ko-KR', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </span>
                                    </div>
                                )}

                                {/* 출생지 */}
                                {actor.place_of_birth && (
                                    <div className="flex items-center gap-2 text-foreground-secondary">
                                        <MapPin className="w-5 h-5" />
                                        <span>{actor.place_of_birth}</span>
                                    </div>
                                )}

                                {/* 인기도 */}
                            </div>
                        </div>

                        {/* 약력 */}
                        {actor.biography && (
                            <div className="pt-4 border-t border-border/50">
                                <h4 className="text-xl font-semibold text-foreground mb-3">약력</h4>
                                <div className="prose prose-invert max-w-none">
                                    <p className="text-foreground-secondary leading-relaxed whitespace-pre-line">
                                        {actor.biography || '약력 정보가 없습니다.'}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </motion.div>
        </Modal>
    );
};

export default ActorModal;
