import { API_URL, OPTIONS } from '@/constants/constans';

export const getActor = async (id: string) => {
    const response = await fetch(`${API_URL}/person/${id}?language=ko-KR`, OPTIONS);
    if (!response.ok) {
        throw new Error('배우 정보를 가져오는데 실패했습니다');
    }
    return response.json();
};
