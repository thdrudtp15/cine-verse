import type { WeightedInteraction } from './getInteractionWeight';

type wishMovies = WeightedInteraction;

export const getTasteVector = (wishMovies: wishMovies[]) => {
    try {
        // 모든 상호작용 영화 배열 평탄화화
        const flat = wishMovies.flatMap((item) => item);

        // 임베딩 벡터 없는 영화 제외외
        const validMovies = flat.filter((movie) => movie.movie?.embedding_vector);

        // 에러러
        if (validMovies.length === 0) {
            throw new Error('벡터가 있는 영화가 존재하지 않습니다.');
        }

        // 벡터 수 구하기
        const vector = JSON.parse(validMovies[0].movie.embedding_vector as string);

        // 차원 수 구하기
        const dimensions = vector.length;

        const totalVector = new Array(dimensions).fill(0);

        validMovies.forEach((movie) => {
            const vector = JSON.parse(movie.movie.embedding_vector as string);
            vector.forEach((v: number, index: number) => {
                totalVector[index] += v;
            });
        });

        const averageVector = totalVector.map((vector: number) => vector / validMovies.length);

        return JSON.stringify(averageVector);
    } catch (error) {
        throw new Error(`계산 중 오류: ${error instanceof Error ? error.message : '알 수 없는 오류'}`);
    }

    // try {
    //     // 모든 배열을 하나로 합치기
    //     const flatInteractions = allInteractions.flat();

    //     // 벡터가 있는 영화들만 필터링
    //     const validMovies = flatInteractions.filter((item) => {
    //         if (!item.movie || !item.movie.embedding_vector) {
    //             return false;
    //         }
    //         return true;
    //     });

    //     if (validMovies.length === 0) {
    //         throw new Error('벡터가 있는 영화가 존재하지 않습니다.');
    //     }

    //     // 첫 번째 영화의 벡터 파싱해서 차원 확인
    //     const firstVector = JSON.parse(validMovies[0].movie.embedding_vector);
    //     const dimensions = firstVector.length;

    //     // movie_id별로 그룹화하여 중복 제거 및 가중치 합산
    //     const movieMap = new Map<
    //         number,
    //         { movie: MovieDetail & { embedding_vector: string }; totalWeight: number; interactions: string[] }
    //     >();

    //     validMovies.forEach((item) => {
    //         const movieId = item.movie_id;
    //         const weight = Number(item.weight) || 0.5;

    //         if (movieMap.has(movieId)) {
    //             // 이미 존재하는 영화면 가중치만 합산
    //             const existing = movieMap.get(movieId)!;
    //             existing.totalWeight += weight;
    //             if (!existing.interactions.includes(item.interaction_type)) {
    //                 existing.interactions.push(item.interaction_type);
    //             }
    //         } else {
    //             // 새로운 영화면 추가
    //             movieMap.set(movieId, {
    //                 movie: item.movie,
    //                 totalWeight: weight,
    //                 interactions: [item.interaction_type],
    //             });
    //         }
    //     });

    //     console.log(movieMap, '유효한 영화');

    //     // 다양성을 위한 가중치 조정: 유사한 영화들이 많으면 가중치를 줄임
    //     const movieArray = Array.from(movieMap.entries());
    //     const adjustedWeights = new Map<number, number>();

    //     // 각 영화의 벡터를 미리 파싱
    //     const movieVectors = new Map<number, number[]>();
    //     movieArray.forEach(([movieId, { movie }]) => {
    //         let vector;
    //         if (typeof movie.embedding_vector === 'string') {
    //             vector = JSON.parse(movie.embedding_vector);
    //         } else {
    //             vector = movie.embedding_vector;
    //         }
    //         movieVectors.set(movieId, vector);
    //     });

    //     // 각 영화에 대해 유사도 기반 가중치 조정
    //     movieArray.forEach(([movieId, { totalWeight: originalWeight }]) => {
    //         const currentVector = movieVectors.get(movieId)!;

    //         // 현재 영화와 유사한 영화들의 수 계산 (코사인 유사도 > 0.7)
    //         let similarCount = 0;
    //         movieArray.forEach(([otherId, _]) => {
    //             if (movieId === otherId) return;

    //             const otherVector = movieVectors.get(otherId)!;

    //             // 코사인 유사도 계산
    //             let dotProduct = 0;
    //             let normA = 0;
    //             let normB = 0;

    //             for (let i = 0; i < dimensions; i++) {
    //                 dotProduct += currentVector[i] * otherVector[i];
    //                 normA += currentVector[i] * currentVector[i];
    //                 normB += otherVector[i] * otherVector[i];
    //             }

    //             const similarity = dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));

    //             if (similarity > 0.7) {
    //                 similarCount++;
    //             }
    //         });

    //         // 유사한 영화가 많을수록 가중치 감소 (다양성 보너스)
    //         // 유사한 영화가 3개 이상이면 가중치를 50% 감소
    //         const diversityFactor = similarCount >= 3 ? 0.5 : similarCount >= 2 ? 0.7 : 1.0;
    //         const adjustedWeight = originalWeight * diversityFactor;

    //         adjustedWeights.set(movieId, adjustedWeight);
    //     });

    //     // 취향 벡터 초기화 (모든 값을 0으로)
    //     const tasteVector = new Array(dimensions).fill(0);
    //     let totalWeight = 0;

    //     // 각 영화를 한 번만 계산 (조정된 가중치 사용)
    //     movieArray.forEach(([movieId, { movie }]) => {
    //         const vector = movieVectors.get(movieId)!;
    //         const adjustedWeight = adjustedWeights.get(movieId)!;

    //         for (let i = 0; i < dimensions; i++) {
    //             tasteVector[i] += vector[i] * adjustedWeight;
    //         }

    //         totalWeight += adjustedWeight;
    //     });

    //     // 평균 내기 (총 가중치로 나누기)
    //     for (let i = 0; i < dimensions; i++) {
    //         tasteVector[i] = tasteVector[i] / totalWeight;
    //     }

    //     // L2 정규화 적용 (벡터의 방향성만 고려하여 유사도 비교 시 각도만 고려)
    //     // 이렇게 하면 유사한 영화들이 많아도 벡터의 방향성만 반영되어 더 정확한 추천 가능
    //     const norm = Math.sqrt(tasteVector.reduce((sum, v) => sum + v * v, 0));

    //     if (norm > 0) {
    //         for (let i = 0; i < dimensions; i++) {
    //             tasteVector[i] = tasteVector[i] / norm;
    //         }
    //     }

    //     return {
    //         vector: JSON.stringify(tasteVector),
    //         dimensions,
    //         moviesUsed: movieMap.size,
    //         totalMovies: flatInteractions.length,
    //         totalWeight,
    //         movies: Array.from(movieMap.entries()).map(
    //             ([movieId, { movie, totalWeight: movieWeight, interactions }]) => ({
    //                 title: movie.title,
    //                 weight: movieWeight,
    //                 types: interactions,
    //             })
    //         ),
    //     };
    // } catch (err) {
    //     throw new Error(`계산 중 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    // }
};

// export const getTasteVector = (allInteractions: any[]) => {
//     try {
//         // 1. 모든 배열을 하나로 합치기
//         const flatInteractions = allInteractions.flat();

//         // 2. 벡터가 유효한 영화들만 필터링
//         const validMovies = flatInteractions.filter((item) => {
//             if (!item.movie || !item.movie.embedding_vector) return false;
//             try {
//                 // JSON 파싱 시 오류가 나면 유효하지 않다고 판단하여 제외
//                 JSON.parse(item.movie.embedding_vector);
//                 return true;
//             } catch {
//                 return false;
//             }
//         });

//         if (validMovies.length === 0) {
//             throw new Error('유효한 벡터 데이터를 가진 영화가 하나도 없습니다. 취향 벡터를 계산할 수 없습니다.');
//         }

//         // 첫 번째 영화의 벡터를 파싱하여 차원(Dimensions) 확인
//         const firstVector = JSON.parse(validMovies[0].movie.embedding_vector);
//         const dimensions = firstVector.length;

//         // 3. 취향 벡터 초기화 및 변수 선언
//         const tasteVector = new Array(dimensions).fill(0);
//         let totalWeight = 0;

//         // 4. 가중 평균 계산 (누적 합산 단계)
//         validMovies.forEach((item) => {
//             const vector = JSON.parse(item.movie.embedding_vector);
//             const weight = item.weight || 1.0; // 가중치가 없으면 기본 1.0

//             // 가중 벡터 (W_i * M_i) 누적 합산
//             for (let i = 0; i < dimensions; i++) {
//                 tasteVector[i] += vector[i] * weight;
//             }
//             totalWeight += weight; // 총 가중치 합산
//         });

//         // 5. 가중 평균 최종 계산 (총 가중치로 나누기)
//         for (let i = 0; i < dimensions; i++) {
//             tasteVector[i] = tasteVector[i] / totalWeight;
//         }

//         // // 6. ⭐ L2 정규화 (Normalization) 적용 (방향성 확보) ⭐
//         // const norm = Math.sqrt(tasteVector.reduce((sum, v) => sum + v * v, 0));

//         // if (norm > 0) {
//         //     for (let i = 0; i < dimensions; i++) {
//         //         // 벡터의 크기를 1로 만들어 유사도 비교 시 각도만 고려되도록 함
//         //         tasteVector[i] = tasteVector[i] / norm;
//         //     }
//         // }

//         // 7. 결과 반환 (디버깅/시연용 정보 포함)
//         return {
//             vector: JSON.stringify(tasteVector),
//             dimensions,
//             moviesUsed: validMovies.length,
//             totalMovies: flatInteractions.length,
//             totalWeight,
//             // 포트폴리오 시연에 유용한 정보
//             movies: validMovies.map((m) => ({
//                 title: m.movie.title,
//                 weight: m.weight,
//                 type: m.interaction_type,
//             })),
//         };
//     } catch (err) {
//         // 계산 과정에서 발생한 모든 오류를 포괄적으로 처리
//         console.error('사용자 취향 벡터 계산 중 심각한 오류 발생:', err);
//         throw new Error(`계산 중 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
//     }
// };
