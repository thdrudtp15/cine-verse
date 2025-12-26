'use client';

import { Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Modal from '../ui/Modal';

type LoadingModalProps = {
    isOpen: boolean;
    message?: string;
};

/**
 * 영화 추천 로딩 모달 컴포넌트
 * Railway 스타일의 로딩 모달
 * 로딩 중에는 닫을 수 없음
 */
const LoadingModal = ({ isOpen, message = '영화를 추천하고 있습니다...' }: LoadingModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full p-8 md:p-12 border border-border rounded-xl bg-background-elevated/95 backdrop-blur-xl max-w-md shadow-2xl"
            >
                <div className="flex flex-col items-center justify-center gap-6">
                    {/* 로딩 아이콘 영역 */}
                    <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1, repeat: Infinity }}
                    >
                        <Brain className="w-15 h-15 text-accent-primary" strokeWidth={1.5} />
                    </motion.div>

                    {/* 메시지 영역 */}
                    <div className="text-center space-y-2">
                        <motion.h3
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                            }}
                            className="text-xl font-semibold text-foreground"
                        >
                            {message}
                        </motion.h3>
                        <p className="text-sm text-foreground-secondary">잠시만 기다려주세요...</p>
                    </div>
                </div>
            </motion.div>
        </Modal>
    );
};

export default LoadingModal;
