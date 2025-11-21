'use client';

import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type SectionCategoryProps = {
    categories: { name: string; link: string }[];
    active: string;
    target: string;
};

const SectionCategory = React.memo(({ categories, active, target }: SectionCategoryProps) => {
    const searchParams = useSearchParams();

    const createUrl = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(target, value);
        return `/?${params.toString()}`;
    };

    return (
        <div className="flex items-center gap-4">
            {categories.map((category) => {
                const isActive = category.link === active;
                return (
                    <Link
                        key={category.name}
                        href={createUrl(category.link)}
                        className={`
                            px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300
                            ${
                                isActive
                                    ? 'text-accent-primary bg-accent-primary/10 border border-accent-primary/20 '
                                    : 'text-foreground-muted hover:text-foreground-secondary hover:bg-background-elevated'
                            }
                        `}
                        scroll={false}
                    >
                        {category.name}
                    </Link>
                );
            })}
        </div>
    );
});

SectionCategory.displayName = 'SectionCategory';

export default SectionCategory;
