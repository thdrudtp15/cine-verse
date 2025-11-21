import React from 'react';
import Link from 'next/link';

type SectionHeaderProps = {
    title: string;
    link?: string;
    children?: React.ReactNode;
};

const SectionHeader = React.memo(({ title, link, children }: SectionHeaderProps) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <h2 className="text-4xl font-bold">{title}</h2>
                {children && children}
            </div>
            {link && (
                <Link
                    href={link}
                    className="group flex items-center gap-2 text-foreground-secondary hover:text-accent-primary transition-colors duration-300"
                >
                    <span className="text-sm font-medium">더보기</span>
                </Link>
            )}
        </div>
    );
});

SectionHeader.displayName = 'SectionHeader';

export default SectionHeader;
