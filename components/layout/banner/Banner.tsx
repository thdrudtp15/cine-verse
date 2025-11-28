import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Banner = React.memo(() => {
    return (
        <div className="relative w-full h-[85vh] min-h-[700px] overflow-hidden">
            {/* 배경 이미지 */}
            <div className="absolute inset-0">
                <Image
                    src={`https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg`}
                    alt={'Inception'}
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* Railway 스타일 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-black/60 to-transparent" />
            </div>

            {/* 콘텐츠 영역 */}
            <div className="relative z-10 h-full flex items-center">
                <div className="content-container w-full">
                    <div className="max-w-2xl space-y-6">
                        {/* AI 배지 */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent-primary/10 border border-accent-primary/30 backdrop-blur-sm">
                            <svg
                                className="w-5 h-5 text-accent-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                            </svg>
                            <span className="text-sm font-medium text-accent-primary">AI 기반 영화 추천</span>
                        </div>

                        {/* 메인 타이틀 */}
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                            당신만을 위한
                            <br />
                            <span className="bg-gradient-to-r from-accent-primary to-accent-secondary bg-clip-text text-transparent">
                                영화를 발견하세요
                            </span>
                        </h1>

                        {/* 서브 타이틀 */}
                        <p className="text-xl md:text-2xl text-foreground-secondary leading-relaxed">
                            AI가 분석하는 당신의 취향과 행동 패턴으로
                            <br />
                            완벽한 영화를 추천해드립니다
                        </p>

                        {/* CTA 버튼들 */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Link
                                href="/movie"
                                className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-primary-hover hover:to-accent-secondary-hover text-foreground font-semibold text-lg transition-all duration-300 shadow-lg shadow-accent-primary/30 hover:shadow-xl hover:shadow-accent-primary/50 hover:scale-105"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                영화 검색하기
                            </Link>
                            <Link
                                href="/recommendations"
                                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-background-elevated/80 backdrop-blur-sm border border-border hover:border-accent-primary/50 text-foreground font-semibold text-lg transition-all duration-300 hover:bg-background-elevated"
                            >
                                <svg
                                    className="w-5 h-5 text-accent-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                AI 추천 받기
                            </Link>
                        </div>

                        {/* 특징 아이콘들 */}
                        <div className="flex flex-wrap gap-6 pt-8">
                            <div className="flex items-center gap-2 text-foreground-secondary">
                                <svg
                                    className="w-5 h-5 text-accent-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <span className="text-sm">행동 분석 기반 추천</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground-secondary">
                                <svg
                                    className="w-5 h-5 text-accent-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                <span className="text-sm">LLM 기반 맞춤 추천</span>
                            </div>
                            <div className="flex items-center gap-2 text-foreground-secondary">
                                <svg
                                    className="w-5 h-5 text-accent-primary"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                                <span className="text-sm">수백만 개의 영화 데이터</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 하단 페이드 효과 */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
        </div>
    );
});

Banner.displayName = 'Banner';

export default Banner;
