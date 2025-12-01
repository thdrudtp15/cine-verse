import { supabase } from '@/lib/utils/supabase';
import type { MovieDetail } from '@/types/movieDetail';

type Props = {
    movie: MovieDetail;
    duration: number;
};

export const visitMovie = async ({ movie, duration }: Props) => {
    console.log(movie, 'movie');

    // const { data, error } = await supabase.from('movies').upsert();

    // if (error) {
    //     throw new Error(error.message);
    // }
    // return data;
};
