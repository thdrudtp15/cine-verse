import React from 'react';
import Image from 'next/image';

const Banner = React.memo(() => {
    // TODO: TMDB API로 인기 영화 데이터 가져오기
    const featuredMovie = {
        title: '인셉션',
        overview: '꿈 속에서 일어나는 일들을 조작할 수 있는 기술을 이용해 기업의 비밀을 훔치는 도둑.',
        backdropPath: '/s3TBrRGB1iav7gFOCNx3H31MoES.jpg',
    };

    return (
        <div className="relative w-full h-[80vh] min-h-[600px] overflow-hidden">
            {/* 배경 이미지 */}
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat">
                <Image
                    src={`https://image.tmdb.org/t/p/original${featuredMovie.backdropPath}`}
                    alt={featuredMovie.title}
                    fill
                    priority
                    className="object-cover object-center"
                />
                {/* 그라데이션 오버레이 */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="z-10 relative top-30 left-0 content-container">
                <h1 className="text-4xl font-bold">환영합니다.</h1>
                <p className="text-lg text-foreground-secondary">간단한 프로젝트 소개</p>
            </div>

            {/* 하단 페이드 효과 */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent" />
        </div>
    );
});

Banner.displayName = 'Banner';

export default Banner;
