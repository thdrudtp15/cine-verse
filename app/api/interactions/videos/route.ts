import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabase';

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { movie, progress } = await request.json();

    console.log(movie, progress, 'movie, progress');

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

    const { error } = await supabase.from('interactions_videos').insert({
        user_id: session.user.id,
        movie_id: movie.id,
        progress: progress,
    });

    if (error) {
        console.log(error, '영화 예고편 시청 기록 저장 실패');
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: '영화 예고편 시청 기록 저장 성공' }, { status: 200 });
};
