'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import useOnClickOutside from '@/hooks/useOutsideClick';
import { XIcon } from 'lucide-react';

type ModalProps = {
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
};

const Modal = ({ children, isOpen, onClose, title }: ModalProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useOnClickOutside({ ref: modalRef, onClickOutside: onClose });

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={modalRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 z-[9999] p-4 bg-black/90 backdrop-blur-sm flex items-center justify-center"
                    onClick={onClose}
                >
                    <div className="relative aspect-video w-full max-w-2xl flex flex-col">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">{title}</h2>
                            <XIcon className="w-6 h-6 text-white cursor-pointer" onClick={onClose} />
                        </div>

                        {children}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
