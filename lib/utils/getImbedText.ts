import { Movies } from '@/types/database';

export const getImbedText = (movie: Movies) => {
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
    Tagline : ${movie.tagline}\n
    `;
};
