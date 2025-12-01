import { API_URL, OPTIONS } from '@/constants/constans';

/**
 *
 * @param slug
 * @returns 영화 상세 정보
 */
export const getMovieDetail = async (slug: string) => {
    const response = await fetch(`${API_URL}/movie/${slug}?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param slug
 * @returns 영화 캐스팅 정보
 */
export const getMovieCredits = async (slug: string) => {
    const response = await fetch(`${API_URL}/movie/${slug}/credits?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param slug - 영화 슬러그
 * @returns 영화 비디오 정보
 */
export const getMovieVideos = async (slug: string) => {
    const response = await fetch(`${API_URL}/movie/${slug}/videos?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param slug - 영화 슬러그
 * @returns 영화 키워드 정보
 */
export const getMovieKeywords = async (slug: string) => {
    const response = await fetch(`${API_URL}/movie/${slug}/keywords?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param slug - 영화 슬러그
 * @returns 영화 추천 정보
 */
export const getMovieRecommendations = async (slug: string) => {
    const response = await fetch(`${API_URL}/movie/${slug}/recommendations?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param category - 영화 또는 시리즈
 * @returns 인기 콘텐츠 목록
 */
export const popularContent = async (category: string) => {
    const response = await fetch(`${API_URL}/${category}/popular?language=ko-KR&page=1`, OPTIONS);
    const data = await response.json();
    return data.results;
};

/**
 *
 * @param category - 영화 또는 시리즈
 * @returns 평점 높은 콘텐츠 목록
 */

export const topRatedContent = async (category: string) => {
    const response = await fetch(`${API_URL}/${category}/top_rated?language=ko-KR&page=1`, OPTIONS);
    const data = await response.json();
    return data.results;
};

/**
 *
 * @returns 영화 장르 목록
 */
export const movieGenres = async () => {
    const response = await fetch(`${API_URL}/genre/movie/list?language=ko-KR`, OPTIONS);
    const data = await response.json();
    return data.genres;
};

/**
 *
 * @param query - 검색어
 * @param keywords - 키워드
 * @param genre - 장르
 * @param rated - 평점
 * @returns 영화 목록
 */

export const searchMovies = async (query: string, keywords: string, genre: string, rated: string, page: number) => {
    const [rateMin, rateMax] = rated.split(',').map(Number);

    const response = await fetch(
        `${API_URL}/discover/movie?language=ko-KR
        &query=${query}
        &with_keywords=${keywords}
        &with_genres=${genre}
        &vote_average.gte=${rateMin}
        &vote_average.lte=${rateMax}
        &page=${page}
        `,
        OPTIONS
    );
    const data = await response.json();

    console.log(data, 'data입니두');
    return data;
};
