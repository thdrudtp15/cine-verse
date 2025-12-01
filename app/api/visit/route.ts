import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import { supabase } from '@/lib/utils/supabase';

export const POST = async (request: Request) => {
    // const { searchParams } = new URL(request.url);
    // const movieId = searchParams.get('movieId');
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { movie, duration } = await request.json();

    const { error: movieError } = await supabase.from('movies').upsert(
        {
            movie_id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            overview: movie.overview,
            tagline: movie.tagline,
            genres: JSON.stringify(movie.genres),
        },
        {
            onConflict: 'movie_id',
        }
    );

    if (movieError) {
        console.log(movieError, 'movieError');

        return NextResponse.json({ message: movieError.message }, { status: 500 });
    }

    const { error: interactionsError } = await supabase.from('user_interactions').upsert({
        user_id: session.user.id,
        movie_id: movie.id,
        interaction_type: 'visit',
        duration_seconds: duration,
    });

    if (interactionsError) {
        console.log(interactionsError, 'interactionsError');
        return NextResponse.json({ message: interactionsError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Movie visited' }, { status: 200 });
};
