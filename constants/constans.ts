export const API_URL = process.env.NEXT_PUBLIC_TMDB_API_URL;
export const OPTIONS = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN}`,
    },
};

export const GENRES = [
    { id: 28, name: '액션' },
    { id: 12, name: '어드벤쳐' },
    { id: 16, name: '애니메이션' },
    { id: 35, name: '코미디' },
    { id: 80, name: '범죄' },
    { id: 99, name: '다큐멘터리' },
    { id: 18, name: '드라마' },
    { id: 10751, name: '가족' },
    { id: 14, name: '판타지' },
    { id: 36, name: '역사' },
    { id: 27, name: '공포' },
    { id: 10402, name: '음악' },
    { id: 9648, name: '미스터리' },
    { id: 10749, name: '로맨스' },
    { id: 878, name: 'SF' },
    { id: 10770, name: 'TV 영화' },
    { id: 53, name: '스릴러' },
    { id: 10752, name: '전쟁' },
    { id: 37, name: '서부' },
];

export const INTERACTION_WEIGHTS = {
    wish: 5.0, // 찜하기 - 가장 강한 신호
    provider: 2.0, // 스트리밍 이동 - 보려는 의도
    video: 1.0, // 예고편 - 관심
    visit: 0.3, // 방문 - 약한 신호
} as const;
