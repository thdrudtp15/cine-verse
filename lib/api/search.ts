import { API_URL, OPTIONS } from '@/constants/constans';

export const searchKeyword = async (keyword: string) => {
    const response = await fetch(`${API_URL}/search/keyword?query=${keyword}&page=1`, OPTIONS);
    const data = await response.json();
    return data;
};
