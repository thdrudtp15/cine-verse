'use client';
import Image from 'next/image';
import { useState } from 'react';

const Loading = () => {
    return <div className="absolute inset-0 w-full h-full overflow-hidden rounded-lg skeleton animate-pulse" />;
};

const ExistImage = ({
    src,
    alt,
    width,
    height,
    fill,
    loading,
    className,
}: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    fill?: boolean;
    loading?: 'lazy' | 'eager';
    className?: string;
}) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <>
            {isLoading && <Loading />}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                fill={fill}
                loading={loading}
                onLoad={handleLoad}
                className={className}
            />
        </>
    );
};

export default ExistImage;
