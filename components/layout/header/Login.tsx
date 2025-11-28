'use client';

import { useState, useRef, useCallback } from 'react';
import { signIn, signOut } from 'next-auth/react';
import Image from 'next/image';
import { LogOut, User, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import type { Session } from 'next-auth';
import useOnClickOutside from '@/hooks/useOutsideClick';

/**
 * 로그인 컴포넌트
 *
 * - 로그인 상태가 아닐 때: Google 로그인 버튼 표시
 * - 로그인 상태일 때: 프로필 이미지와 드롭다운 메뉴 표시
 */
const Login = ({ session }: { session: Session | null }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClose = useCallback(() => {
        setIsOpen(false);
    }, []);

    useOnClickOutside({ ref: menuRef, onClickOutside: handleClose });

    // 로그인하지 않은 경우: Google 로그인 버튼 표시
    if (!session) {
        return (
            <button
                onClick={() => signIn('google')}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-accent-primary hover:bg-accent-primary-hover text-white font-medium text-sm transition-all duration-200 shadow-lg shadow-accent-primary/30 hover:shadow-accent-primary/50"
            >
                <span>로그인</span>
            </button>
        );
    }

    // 로그인한 경우: 프로필 이미지와 드롭다운 메뉴 표시
    const { user } = session;

    return (
        <div ref={menuRef} className="relative">
            {/* 프로필 버튼 */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-background-elevated transition-colors duration-200 group"
            >
                {/* 프로필 이미지 */}
                {user?.image ? (
                    <Image
                        src={user.image}
                        alt={user.name || '프로필'}
                        width={32}
                        height={32}
                        className="rounded-full border-2 border-accent-primary/50 group-hover:border-accent-primary transition-colors"
                    />
                ) : (
                    <div className="w-8 h-8 rounded-full bg-accent-primary flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                    </div>
                )}
                {/* 사용자 이름 (모바일에서는 숨김) */}
                <span className="text-sm font-medium text-foreground hidden sm:block max-w-[120px] truncate">
                    {user?.name || user?.email}
                </span>
                <ChevronDown
                    className={`w-4 h-4 text-foreground-secondary transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* 드롭다운 메뉴 */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 0, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 top-full mt-2 w-56 bg-background-elevated border border-border rounded-md shadow-lg shadow-black/20 overflow-hidden z-50"
                    >
                        {/* 사용자 정보 섹션 */}
                        <div className="px-4 py-3 border-b border-divider">
                            <p className="text-sm font-medium text-foreground truncate">{user?.name || '사용자'}</p>
                            <p className="text-xs text-foreground-muted truncate mt-1">{user?.email}</p>
                        </div>

                        {/* 메뉴 항목 */}
                        <div className="py-1">
                            <button
                                onClick={() => {
                                    signOut();
                                    setIsOpen(false);
                                }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-background-tertiary transition-colors duration-150"
                            >
                                <LogOut className="w-4 h-4 text-foreground-secondary" />
                                <span>로그아웃</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Login;
