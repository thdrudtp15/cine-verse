import { Movies } from '@/types/database';

export const getImbedText = (movie: Movies & { similarity?: number }) => {
    // 장르 정보 파싱
    const genres = movie.genres
        ? JSON.parse(movie.genres as string).map((genre: { id: string; name: string }) => genre.name)
        : [];

    // 장르만 사용하여 임베딩 텍스트 생성
    // 장르가 없으면 제목만 사용
    if (genres.length === 0) {
        return `Movie: ${movie.title}(${movie.original_title})`;
    }

    return `Movie: ${movie.title}(${movie.original_title})
Genres: ${genres.join(', ')}`;
};
