'use client';
import { use, useEffect, useRef } from 'react';

import type { MovieDetail } from '@/types/movieDetail';
import type { Session } from 'next-auth';

type Props = {
    movie: Promise<MovieDetail>;
    session: Session | null;
};

const Duration = ({ movie, session }: Props) => {
    const data = use(movie);
    const visitTime = useRef<number>(new Date().getTime());

    const visitInfoCollection = async () => {
        if (!session) {
            return;
        }
        const now = new Date().getTime();
        const duration = now - visitTime.current;

        if (duration < 5000) {
            return;
        }

        const response = await fetch('/api/visit', {
            method: 'POST',
            body: JSON.stringify({
                movie: data,
                duration,
            }),
        });

        console.log(response, 'response');
        if (!response.ok) {
            throw new Error('Failed to visit movie');
        }
    };

    useEffect(() => {
        return () => {
            try {
                visitInfoCollection();
            } catch (error) {
                console.error((error as Error)?.message, '요청 실패');
            }
        };
    }, [session]);

    return null;
};

export default Duration;
