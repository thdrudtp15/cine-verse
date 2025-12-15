import { supabase } from '@/lib/utils/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { NextResponse } from 'next/server';
import { movieUpsert } from '@/lib/actions/movieUpsert';

export const POST = async (request: Request) => {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { movie, duration } = await request.json();

    // 영화 정보 DB 저장
    const { error: movieUpsertError } = await movieUpsert(movie);

    if (movieUpsertError) {
        console.log(movieUpsertError, '영화 정보 저장 실패');
        return NextResponse.json({ message: movieUpsertError.message }, { status: 500 });
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
