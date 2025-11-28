import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import type { NextAuthOptions } from 'next-auth';

/**
 * NextAuth 설정 옵션
 *
 * 이 파일은 NextAuth의 인증 설정을 정의합니다.
 * Google OAuth를 사용하여 사용자 인증을 처리합니다.
 */
export const authOptions: NextAuthOptions = {
    // 인증 제공자 설정
    // Google OAuth를 사용하여 로그인 기능을 제공합니다
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            // Google OAuth에서 추가 정보를 요청할 수 있습니다
            // authorization: {
            //     params: {
            //         prompt: 'consent',
            //         access_type: 'offline',
            //         response_type: 'code',
            //     },
            // },
        }),
    ],

    // 콜백 함수들
    // 인증 과정에서 발생하는 이벤트를 처리합니다
    callbacks: {
        /**
         * JWT 토큰이 생성되거나 업데이트될 때 호출됩니다
         * 토큰에 사용자 정보를 추가할 수 있습니다
         */
        async jwt({ token, user, account }) {
            // 초기 로그인 시 user 객체에서 정보를 가져옵니다
            if (user) {
                token.id = user.id;
            }
            // OAuth 계정 정보가 있으면 토큰에 저장합니다
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },

        /**
         * 세션이 확인될 때마다 호출됩니다
         * 클라이언트에서 사용할 수 있는 세션 객체를 반환합니다
         */
        async session({ session, token }) {
            // 세션에 사용자 정보가 없으면 그대로 반환
            if (!session.user) return session;

            // JWT 토큰에서 사용자 ID를 세션에 추가합니다
            // token.sub는 JWT의 subject claim으로 사용자의 고유 ID입니다
            session.user.id = token.sub as string;

            // 필요시 추가 정보를 세션에 포함할 수 있습니다
            // session.accessToken = token.accessToken;

            return session;
        },

        /**
         * 사용자가 로그인할 때 호출됩니다
         * 로그인 허용 여부를 결정할 수 있습니다
         */
        // async signIn({ user, account, profile }) {
        //     // 특정 조건에 따라 로그인을 허용/거부할 수 있습니다
        //     // 예: 특정 이메일 도메인만 허용
        //     if (user.email?.endsWith('@example.com')) {
        //         return true;
        //     }
        //     return false;
        // },
    },

    // 커스텀 페이지 경로 설정
    // NextAuth의 기본 페이지 대신 커스텀 페이지를 사용할 수 있습니다
    pages: {
        // signIn: '/auth/signin',        // 로그인 페이지
        // signOut: '/auth/signout',       // 로그아웃 페이지
        // error: '/auth/error',           // 에러 페이지
        // verifyRequest: '/auth/verify-request', // 이메일 인증 요청 페이지
        // newUser: '/auth/new-user',      // 신규 사용자 환영 페이지
    },

    // 세션 설정
    session: {
        // 세션 전략: 'jwt' 또는 'database'
        // 'jwt'는 서버 메모리에 저장, 'database'는 DB에 저장
        strategy: 'jwt',

        // 세션 만료 시간 (초 단위)
        // 기본값: 30일 (30 * 24 * 60 * 60)
        maxAge: 30 * 24 * 60 * 60, // 30일

        // 세션을 자동으로 업데이트할지 여부
        updateAge: 24 * 60 * 60, // 24시간마다 업데이트
    },

    // 보안 설정
    // secret: process.env.NEXTAUTH_SECRET, // JWT 서명에 사용되는 비밀키 (환경변수에서 자동으로 가져옴)

    // 디버그 모드 (개발 환경에서만 활성화)
    debug: process.env.NODE_ENV === 'development',
};

/**
 * NextAuth 핸들러 내보내기
 *
 * 이 핸들러는 /api/auth/* 경로로 들어오는 모든 요청을 처리합니다.
 * NextAuth가 자동으로 라우팅을 처리합니다:
 * - GET /api/auth/signin - 로그인 페이지
 * - POST /api/auth/signin - 로그인 처리
 * - GET /api/auth/signout - 로그아웃
 * - GET /api/auth/session - 현재 세션 정보
 * - GET /api/auth/csrf - CSRF 토큰
 * - GET /api/auth/providers - 사용 가능한 인증 제공자 목록
 */
export default NextAuth(authOptions);
