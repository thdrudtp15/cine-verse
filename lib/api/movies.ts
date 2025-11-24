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
