import 'next-auth';
import 'next-auth/jwt';

/**
 * NextAuth 타입 확장
 * 
 * 기본 NextAuth 타입에 커스텀 속성을 추가합니다.
 */
declare module 'next-auth' {
    /**
     * 세션의 User 타입을 확장합니다
     * 기본 User 타입에 id 속성을 추가합니다
     */
    interface User {
        id?: string;
    }

    /**
     * 세션 타입을 확장합니다
     * session.user에 id 속성을 추가합니다
     */
    interface Session {
        user: {
            id: string;
            name?: string | null;
            email?: string | null;
            image?: string | null;
        };
        // 필요시 추가 속성을 여기에 정의할 수 있습니다
        // accessToken?: string;
    }
}

declare module 'next-auth/jwt' {
    /**
     * JWT 토큰 타입을 확장합니다
     * 토큰에 추가 정보를 저장할 수 있습니다
     */
    interface JWT {
        id?: string;
        accessToken?: string;
        // 필요시 추가 속성을 여기에 정의할 수 있습니다
    }
}

