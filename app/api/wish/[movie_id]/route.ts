import { NextResponse } from 'next/server';
import { supabase } from '@/lib/utils/supabase';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

/**
 * 찜하기 상태 조회 API
 * GET /api/wish/[movie_id]
 */
export const GET = async (request: Request, { params }: { params: Promise<{ movie_id: string }> }) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { movie_id } = await params;

        const { data, error } = await supabase
            .from('interactions_wishes')
            .select('*')
            .eq('movie_id', movie_id)
            .eq('user_id', session.user.id)
            .single();

        if (error) {
            // 레코드가 없는 경우는 에러가 아닙니다 (아직 찜하지 않음)
            if (error.code === 'PGRST116') {
                return NextResponse.json({ isWished: false, data: null });
            }
            console.error('찜하기 상태 조회 실패:', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }

        return NextResponse.json({ isWished: true, data });
    } catch (error) {
        console.error('찜하기 상태 조회 중 오류:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : '알 수 없는 오류' },
            { status: 500 }
        );
    }
};

/**
 * 찜하기 추가/제거 API
 * POST /api/wish/[movie_id]
 */
export const POST = async (request: Request, { params }: { params: Promise<{ movie_id: string }> }) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { movie_id } = await params;

        // 먼저 기존 레코드 확인
        const { data: existingData } = await supabase
            .from('interactions_wishes')
            .select('*')
            .eq('movie_id', movie_id)
            .eq('user_id', session.user.id)
            .single();

        if (existingData) {
            // 이미 찜한 경우 제거
            const { error } = await supabase
                .from('interactions_wishes')
                .delete()
                .eq('movie_id', movie_id)
                .eq('user_id', session.user.id);

            if (error) {
                console.error('찜하기 제거 실패:', error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }

            return NextResponse.json({ isWished: false, message: '찜하기가 제거되었습니다' });
        } else {
            // 찜하기 추가
            const { data, error } = await supabase
                .from('interactions_wishes')
                .insert({
                    movie_id: movie_id,
                    user_id: session.user.id,
                })
                .select()
                .single();

            if (error) {
                console.error('찜하기 추가 실패:', error);
                return NextResponse.json({ message: error.message }, { status: 500 });
            }

            return NextResponse.json({ isWished: true, data, message: '찜하기가 추가되었습니다' });
        }
    } catch (error) {
        console.error('찜하기 처리 중 오류:', error);
        return NextResponse.json(
            { message: error instanceof Error ? error.message : '알 수 없는 오류' },
            { status: 500 }
        );
    }
};
