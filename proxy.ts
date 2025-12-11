import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export const proxy = async (request: NextRequest) => {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET! });

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
};

export const config = {
    matcher: [
        '/mypage/:path*', // /dashboard 하위 모든 경로
        '/recommendation/:path*', // /profile 하위 모든 경로
    ],
};
