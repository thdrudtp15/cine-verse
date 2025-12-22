import { API_URL, OPTIONS } from '@/constants/constans';

export const searchKeyword = async (keyword: string) => {
    const response = await fetch(`${API_URL}/search/keyword?query=${keyword}&page=1`, OPTIONS);
    const data = await response.json();
    return data;
};

/**
 *
 * @param keyword_id - 키워드 ID
 * @returns 키워드 정보
 */
export const getKeywords = async (keyword_id: number) => {
    const response = await fetch(`${API_URL}/keyword/${keyword_id}`, OPTIONS);
    const data = await response.json();
    return data;
};
