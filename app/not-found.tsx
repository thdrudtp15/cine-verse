'use client';

import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] px-4">
            <div className="flex flex-col items-center gap-8 max-w-2xl w-full text-center">
                {/* 404 숫자 */}
                <div className="relative">
                    <h1 className="text-[120px] md:text-[180px] font-bold text-transparent bg-clip-text bg-gradient-to-br from-accent-primary via-accent-secondary to-accent-primary-light leading-none tracking-tight">
                        404
                    </h1>
                  
                </div>

                {/* 메시지 */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                        페이지를 찾을 수 없습니다
                    </h2>
                </div>

                {/* 액션 버튼 */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-accent-primary hover:bg-accent-primary-hover text-white font-medium rounded-lg transition-all duration-200 shadow-lg shadow-accent-primary/20 hover:shadow-accent-primary/40"
                    >
                        <Home className="w-4 h-4" />
                        홈으로 돌아가기
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center justify-center gap-2 px-6 py-3 bg-background-elevated hover:bg-background-tertiary text-foreground border border-border hover:border-border-hover font-medium rounded-lg transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        이전 페이지
                    </button>
                </div>
            </div>
        </div>
    );
}

