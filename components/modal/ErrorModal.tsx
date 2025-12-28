'use client';

import { AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import Modal from '../ui/Modal';

type ErrorModalProps = {
    isOpen: boolean;
    onClose: () => void;
    errorMessage?: string;
    title?: string;
};

/**
 * 에러 모달 컴포넌트
 * Railway 스타일의 에러 모달
 */
const ErrorModal = ({ isOpen, onClose, errorMessage = '오류가 발생했습니다.', title = '오류' }: ErrorModalProps) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={title}>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full p-8 md:p-12 border border-border rounded-xl bg-background-elevated/95 backdrop-blur-xl max-w-md shadow-2xl"
            >
                <div className="flex flex-col items-center justify-center gap-6">
                    {/* 에러 아이콘 영역 */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                    >
                        <div className="w-8 h-8 rounded-full bg-error/10 border border-error/30 flex items-center justify-center">
                            <AlertCircle className="w-8 h-8 text-error" strokeWidth={1.5} />
                        </div>
                    </motion.div>

                    {/* 메시지 영역 */}
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
                        <p className="text-sm text-foreground-secondary leading-relaxed text-center">{errorMessage}</p>
                    </div>

                    {/* 확인 버튼 */}
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 cursor-pointer rounded-lg w-full bg-accent-primary hover:bg-accent-primary-hover text-white font-medium transition-all duration-200 mt-2"
                    >
                        확인
                    </button>
                </div>
            </motion.div>
        </Modal>
    );
};

export default ErrorModal;
