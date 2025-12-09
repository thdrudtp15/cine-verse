'use client';

import Link from 'next/link';
import Image from 'next/image';
import ExistImage from '@/components/ui/ExistImage';

import type { MovieDetail } from '@/types/movieDetail';

const ProviderItem = ({
    movie,
    link,
    provider,
}: {
    movie: MovieDetail;
    link: string;
    provider: { logo_path: string; provider_name: string; provider_id: number };
}) => {
    const handleClick = async () => {
        try {
            const response = await fetch('/api/interactions/providers', {
                method: 'POST',
                body: JSON.stringify({ movie, provider_name: provider.provider_name }),
            });
            if (!response.ok) {
                throw new Error('Failed to save provider');
            }
        } catch (error) {
            console.error(error, 'Failed to save provider');
        }
    };

    return (
        <Link
            href={link}
            key={provider.provider_id}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 bg-background-elevated border border-border rounded-lg px-3 py-2 hover:border-accent-primary/30 hover:bg-background-tertiary transition-all duration-200"
            title={provider.provider_name}
            onClick={handleClick}
        >
            {provider.logo_path ? (
                <ExistImage
                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                    alt={provider.provider_name}
                    width={20}
                    height={20}
                    className="rounded object-contain flex-shrink-0"
                />
            ) : null}
            <span className="text-xs text-foreground-secondary whitespace-nowrap">{provider.provider_name}</span>
        </Link>
    );
};

export default ProviderItem;
