'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FilmIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';


const LoginPage = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const callbackUrl = searchParams?.get('callbackUrl') || '/';

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn('google', {
                callbackUrl,
                redirect: true,
            });
        } catch (error) {
            console.error('로그인 실패:', error);
            setIsLoading(false);
            setIsError(true);
        }
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isError) {
            timeout = setTimeout(() => {
                setIsError(false);
            }, 3000);
        }
        return () => {
            clearTimeout(timeout);
        };
    },[isError])


    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-8rem)] px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <div className="bg-background-elevated border border-border rounded-2xl p-8 shadow-xl shadow-black/20">
                    {/* 로고 및 헤더 */}
                    <div className="flex flex-col items-center gap-4 mb-8">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-primary-light flex items-center justify-center border border-accent-primary/30 shadow-lg shadow-accent-primary/20">
                            <FilmIcon className="w-10 h-10 text-white" />
                        </div>
                        <div className="text-center">
                            <h1 className="text-3xl font-bold text-foreground mb-2">CineVerse</h1>
                            <p className="text-sm text-foreground-secondary">영화 검색 및 AI 추천 서비스</p>
                        </div>
                    </div>
                    {/* Google 로그인 버튼 */}
                    <button
                        onClick={handleGoogleSignIn}
                        disabled={isLoading}
                        className="w-full cursor-pointer flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-primary hover:from-accent-primary-hover hover:via-accent-secondary-hover hover:to-accent-primary-hover text-white font-medium rounded-lg border border-accent-primary/30 transition-all duration-200 shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        {isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                <span>로그인 중...</span>
                            </>
                        ) : (
                            <>
                                <span>구글 로그인</span>
                            </>
                        )}
                    </button>
                   
                    <AnimatePresence>
                    {isError &&
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-red-500 text-sm text-center mt-4">로그인에 실패했습니다. 다시 시도해주세요.
                        </motion.p>
                    }
                    </AnimatePresence>
                    
                </div>
            </motion.div>
        </div>
    );
};

export default LoginPage;
