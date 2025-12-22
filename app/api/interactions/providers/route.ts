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

    const { movie, provider_name } = await request.json();

    const { error: movieUpsertError } = await movieUpsert(movie);

    if (movieUpsertError) {
        console.log(movieUpsertError, '영화 정보 저장 실패');
        return NextResponse.json({ message: movieUpsertError.message }, { status: 500 });
    }

    const { error } = await supabase.from('interactions_providers').insert({
        user_id: session.user.id,
        movie_id: movie.id,
        provider: provider_name,
    });

    if (error) {
        console.log(error, '영화 제공자 저장 실패');
        return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Hello, world!' });
};
