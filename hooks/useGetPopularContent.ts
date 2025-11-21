'use client';

import { useQuery } from '@tanstack/react-query';
import { API_URL, OPTIONS } from '@/constants/constans';

const useGetPopularContent = (category: 'movie' | 'tv') => {
    return useQuery({
        queryKey: ['popular', category],
        queryFn: () => fetch(`${API_URL}/movie/popular?language=ko-KR&page=1`, OPTIONS).then((res) => res.json()),
    });
};

export default useGetPopularContent;
