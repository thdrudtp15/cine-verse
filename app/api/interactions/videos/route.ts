import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabase';
import { movieUpsert } from '@/lib/actions/movieUpsert';

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { movie, progress } = await request.json();

    console.log(movie, progress, 'movie, progress');

    // 영화 정보 DB 저장
    const { error: movieUpsertError } = await movieUpsert(movie);

    if (movieUpsertError) {
        console.log(movieUpsertError, '영화 정보 저장 실패');
        return NextResponse.json({ message: movieUpsertError.message }, { status: 500 });
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
