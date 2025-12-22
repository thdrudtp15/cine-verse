import { supabase } from '../utils/supabase';
import type { MovieDetail } from '@/types/movieDetail';

export const movieUpsert = async (movie: MovieDetail) => {
    const { data, error } = await supabase.from('movies').upsert(
        {
            movie_id: movie.id,
            title: movie.title,
            original_title: movie.original_title,
            overview: movie.overview,
            tagline: movie.tagline,
            genres: JSON.stringify(movie.genres),
            poster_path: movie.poster_path,
        },
        {
            onConflict: 'movie_id',
        }
    );

    return { data, error };
};
