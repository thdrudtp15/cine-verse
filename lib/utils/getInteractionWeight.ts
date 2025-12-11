import type {
    InteractionsVisits,
    InteractionsWishes,
    InteractionsProviders,
    InteractionsVideos,
    Movies,
} from '@/types/database';
import { INTERACTION_WEIGHTS } from '@/constants/constans';
import { getImbedText } from './getImbedText';

type InteractionVisitsWithMovies = InteractionsVisits & {
    movie: Movies;
};

type InteractionWishesWithMovies = InteractionsWishes & {
    movie: Movies;
};

type InteractionProvidersWithMovies = InteractionsProviders & {
    movie: Movies;
};

type InteractionVideosWithMovies = InteractionsVideos & {
    movie: Movies;
};

// 방문 가중치 계산
export const getVisitsWeight = (data: InteractionVisitsWithMovies[]) => {
    const sortedData = data.sort((a, b) => {
        return (b.duration || 0) - (a.duration || 0);
    });
    return sortedData
        .map((item, index, { length }) => {
            return {
                ...item,
                weight: (INTERACTION_WEIGHTS.visit * (1 - index / length)).toFixed(4),
                imbed_text: getImbedText(item.movie),
                interaction_type: 'visit',
            };
        })
        .sort((a, b) => {
            return Number(b.weight) - Number(a.weight);
        });
};

// 좋아요 가중치 계산
export const getWishesWeight = (data: InteractionWishesWithMovies[]) => {
    return data.map((item: InteractionWishesWithMovies) => {
        return {
            ...item,
            weight: INTERACTION_WEIGHTS.wish,
            imbed_text: getImbedText(item.movie),
            interaction_type: 'wish',
        };
    });
};

// 스트리밍 이동 가중치 계산
export const getProvidersWeight = (data: InteractionProvidersWithMovies[]) => {
    return data.map((item: InteractionWishesWithMovies) => {
        return {
            ...item,
            weight: INTERACTION_WEIGHTS.provider,
            imbed_text: getImbedText(item.movie),
            interaction_type: 'provider',
        };
    });
};

// 예고편 가중치 계산
export const getVideosWeight = (data: InteractionVideosWithMovies[]) => {
    const obj: Record<number, number> = {};
    data.forEach((item: InteractionVideosWithMovies) => {
        if (item.movie_id) {
            if (!obj[item.movie_id]) {
                obj[item.movie_id] = 1;
            }
            obj[item.movie_id]++;
        }
    });

    const array: (InteractionVideosWithMovies & { weight: number; imbed_text: string; interaction_type: 'video' })[] =
        [];

    Object.entries(obj).map(([movie_id, count]) => {
        const item = data.find((item: InteractionVideosWithMovies) => item.movie_id === parseInt(movie_id));
        if (!item) return null;
        array.push({
            ...item,
            weight: INTERACTION_WEIGHTS.video * count,
            imbed_text: getImbedText(item?.movie),
            interaction_type: 'video',
        });
    });

    return array;
};
