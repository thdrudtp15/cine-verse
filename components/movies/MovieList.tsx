import React from 'react';
import Link from 'next/link';

//===============================================
// 헤더 컴포넌트
//===============================================
type HeaderProps = {
    title: string;
    link?: string;
};

const Header = React.memo(({ title, link }: HeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">{title}</h2>
            {link && (
                <Link href={link} className="text-blue-500 hover:text-blue-600 transition-colors">
                    더보기
                </Link>
            )}
        </div>
    );
});

Header.displayName = 'MovieListHeader';

//===============================================
// 그리드 컴포넌트
//===============================================

const Grid = React.memo(({ children }: { children: React.ReactNode }) => {
    return <div className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4`}>{children}</div>;
});

Grid.displayName = 'MovieGrid';

//===============================================
// 메인 컴포넌트
//===============================================

const MovieList = React.memo(({ children }: { children: React.ReactNode }) => {
    return <div className={`content-container py-4 flex flex-col gap-4 mb-14`}>{children}</div>;
});

MovieList.displayName = 'MovieList';

// 기존 방식도 지원 (하위 호환성)
export default Object.assign(MovieList, {
    Header: Header,
    Grid: Grid,
});
