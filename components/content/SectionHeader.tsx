import React from 'react';
import Link from 'next/link';

type SectionHeaderProps = {
    title: string;
    link?: string;
};

const SectionHeader = React.memo(({ title, link }: SectionHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <h2 className="text-4xl font-bold">{title}</h2>
            {link && (
                <Link href={link} className="text-blue-500 hover:text-blue-600 transition-colors">
                    더보기
                </Link>
            )}
        </div>
    );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
