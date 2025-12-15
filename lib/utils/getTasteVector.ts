/**
 * 사용자 행동 기록 배열을 받아 통합된 취향 벡터(U)를 계산합니다.
 * @param {Array<Array<Object>>} allInteractions - 모든 상호작용 기록 (배열의 배열)
 * @returns {{vector: number[], dimensions: number, ...}} 계산된 벡터와 통계 정보
 */

export const getTasteVector = (allInteractions: any[]) => {
    try {
        // 모든 배열을 하나로 합치기
        const flatInteractions = allInteractions.flat();

        // 벡터가 있는 영화들만 필터링
        const validMovies = flatInteractions.filter((item) => {
            if (!item.movie || !item.movie.embedding_vector) {
                return false;
            }
            return true;
        });

        if (validMovies.length === 0) {
            throw new Error('벡터가 있는 영화가 존재하지 않습니다.');
        }

        // 첫 번째 영화의 벡터 파싱해서 차원 확인
        const firstVector = JSON.parse(validMovies[0].movie.embedding_vector);
        const dimensions = firstVector.length;

        // 취향 벡터 초기화 (모든 값을 0으로)
        const tasteVector = new Array(dimensions).fill(0);
        let totalWeight = 0;

        // 각 영화의 벡터에 가중치를 곱해서 더하기
        validMovies.forEach((item) => {
            let vector;

            // embedding_vector가 문자열인 경우와 배열인 경우 모두 처리
            if (typeof item.movie.embedding_vector === 'string') {
                vector = JSON.parse(item.movie.embedding_vector);
            } else {
                vector = item.movie.embedding_vector;
            }

            const weight = Number(item.weight) || 1.0;

            for (let i = 0; i < dimensions; i++) {
                tasteVector[i] += vector[i] * weight;
            }

            totalWeight += weight;
        });

        // 평균 내기 (총 가중치로 나누기)
        for (let i = 0; i < dimensions; i++) {
            tasteVector[i] = tasteVector[i] / totalWeight;
        }

        return {
            vector: JSON.stringify(tasteVector),
            dimensions,
            moviesUsed: validMovies.length,
            totalMovies: flatInteractions.length,
            totalWeight,
            movies: validMovies.map((m) => ({
                title: m.movie.title,
                weight: m.weight,
                type: m.interaction_type,
            })),
        };
    } catch (err) {
        throw new Error(`계산 중 오류: ${err instanceof Error ? err.message : '알 수 없는 오류'}`);
    }
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
