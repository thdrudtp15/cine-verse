import { AlertCircle } from 'lucide-react';
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
            <Modal.ErrorContent>
            <div className="bg-background-elevated border border-border rounded-lg p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-error/10 border border-error/30 flex items-center justify-center flex-shrink-0">
                        <AlertCircle className="w-6 h-6 text-error" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">오류가 발생했습니다</h3>
                        <p className="text-foreground-secondary">{errorMessage}</p>
                    </div>
                </div>
                <div className="mt-6 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 rounded-lg bg-accent-primary hover:bg-accent-primary-hover text-white font-medium transition-colors duration-200"
                    >
                        확인
                    </button>
                </div>
            </div>
            </Modal.ErrorContent>
        </Modal>
    );
};

export default ErrorModal;
