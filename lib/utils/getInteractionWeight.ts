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

// 공통 베이스 타입 정의
export type WeightedInteraction = {
    weight: number;
    imbed_text: string;
    interaction_type: string;
    created_at: string;
    id: number;
    movie_id: number | null;
    user_id: string | null;
    movie: Movies;
};

// 방문 가중치 계산
export const getVisitsWeight = (data: InteractionVisitsWithMovies[]): WeightedInteraction[] => {
    const sortedData = data.sort((a, b) => {
        return (b.duration || 0) - (a.duration || 0);
    });
    return sortedData
        .map((item, index, { length }) => {
            return {
                ...item,
                weight: Number((INTERACTION_WEIGHTS.visit * (1 - index / length)).toFixed(4)),
                imbed_text: getImbedText(item.movie),
                interaction_type: 'visit',
            };
        })
        .sort((a, b) => {
            return Number(b.weight) - Number(a.weight);
        });
};

// 좋아요 가중치 계산
export const getWishesWeight = (data: InteractionWishesWithMovies[]): WeightedInteraction[] => {
    return data.map((item: InteractionWishesWithMovies) => {
        return {
            ...item,
            weight: Number(INTERACTION_WEIGHTS.wish),
            imbed_text: getImbedText(item.movie),
            interaction_type: 'wish',
        };
    });
};

// 스트리밍 이동 가중치 계산
export const getProvidersWeight = (data: InteractionProvidersWithMovies[]): WeightedInteraction[] => {
    return data.map((item: InteractionProvidersWithMovies) => {
        return {
            ...item,
            weight: Number(INTERACTION_WEIGHTS.provider),
            imbed_text: getImbedText(item.movie),
            interaction_type: 'provider',
        };
    });
};

// 예고편 가중치 계산
export const getVideosWeight = (data: InteractionVideosWithMovies[]): WeightedInteraction[] => {
    const seen = new Set<number>();
    const uniqueData: InteractionVideosWithMovies[] = [];

    data.forEach((item: InteractionVideosWithMovies) => {
        if (item.movie_id && !seen.has(item.movie_id)) {
            seen.add(item.movie_id);
            uniqueData.push(item);
        }
    });

    return uniqueData.map((item: InteractionVideosWithMovies) => {
        return {
            ...item,
            weight: Number(INTERACTION_WEIGHTS.video),
            imbed_text: getImbedText(item.movie),
            interaction_type: 'video',
        };
    });
};
