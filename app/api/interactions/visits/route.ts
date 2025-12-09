import { supabase } from '@/lib/utils/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { movie, duration } = await request.json();

    // 영화 정보 DB 저장
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
        console.log(movieError, '영화 정보 저장 실패');
        return NextResponse.json({ message: movieError.message }, { status: 500 });
    }

    const { error } = await supabase.from('interactions_visits').upsert(
        {
            user_id: session.user.id,
            movie_id: movie.id,
            duration: duration,
        },
        {
            onConflict: 'user_id, movie_id',
        }
    );

    if (error) {
        console.log(error, '방문 기록 저장 실패');
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '방문 기록 저장 성공' }, { status: 200 });
};
