import { Movies } from '@/types/database';

export const getImbedText = (movie: Movies & { similarity?: number }) => {
    return `
    Movie: ${movie.title}(${movie.original_title})\n
    Overview : ${movie.overview}\n
    ${
        movie.genres
            ? `Genre : ${JSON.parse(movie.genres as string).map(
                  (genre: { id: string; name: string }) => genre?.name
              )}\n`
            : ''
    }\n
    ${movie.similarity ? `Similarity : ${movie.similarity}\n` : ''}
    Tagline : ${movie.tagline}\n
    `;
};
