import { Movies } from '@/types/database';

export const getImbedText = (movie: Movies & { similarity?: number }) => {
    // 장르 정보 파싱
    const genres = movie.genres
        ? JSON.parse(movie.genres as string).map((genre: { id: string; name: string }) => genre.name)
        : [];

    return `Title: ${movie.original_title}
            Genres: ${genres.join(', ')}
            Overview: ${movie.overview}
            `;
};
