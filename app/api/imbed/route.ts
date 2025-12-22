import { supabase } from '@/lib/utils/supabase';
import { NextResponse } from 'next/server';
import { getImbedText } from '@/lib/utils/getImbedText';
import { GoogleGenAI } from '@google/genai';
import type { Movies } from '@/types/database';

/**
 * 임베딩 벡터 생성 및 업데이트 API
 *
 * 벡터화되지 않은 영화 데이터를 가져와서 임베딩 벡터를 생성하고 업데이트합니다.
 */
export const POST = async () => {
    try {
        // 벡터화되지 않은 영화 데이터 조회
        const { data, error } = await supabase
            .from('movies')
            .select('movie_id, title, original_title, overview, genres, tagline, is_vectorized')
            .eq('is_vectorized', false)
            .limit(100);

        if (error) {
            console.error('영화 데이터 조회 실패:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ message: 'No new movies to embed.' }, { status: 200 });
        }

        // 임베딩할 텍스트 리스트 추출
        const textsToEmbed = data.map((movie) => getImbedText(movie as Movies));

        // Google GenAI 임베딩 생성
        const gen = new GoogleGenAI({
            apiKey: process.env.GOOGLE_API_KEY,
        });

        const response = await gen.models.embedContent({
            model: 'text-embedding-004',
            contents: textsToEmbed,
        });

        const embeddings = response.embeddings;

        if (!embeddings || embeddings.length !== textsToEmbed.length) {
            console.error('임베딩 생성 실패:', {
                embeddingsLength: embeddings?.length,
                textsLength: textsToEmbed.length,
            });
            return NextResponse.json({ error: 'Failed to generate embeddings.' }, { status: 500 });
        }

        // 업데이트할 데이터 준비
        // embedding_vector는 string 타입이므로 배열을 JSON 문자열로 변환
        const updates = data.map((movie, index) => {
            const embedding = embeddings[index];

            // embedding 구조 확인 및 변환
            let embeddingString: string | null = null;

            if (embedding) {
                // embedding.values가 배열인 경우
                if ('values' in embedding && Array.isArray(embedding.values)) {
                    embeddingString = JSON.stringify(embedding.values);
                }
                // embedding 자체가 배열인 경우
                else if (Array.isArray(embedding)) {
                    embeddingString = JSON.stringify(embedding);
                }
                // 이미 문자열인 경우
                else if (typeof embedding === 'string') {
                    embeddingString = embedding;
                }
                // 객체인 경우 JSON 문자열로 변환
                else {
                    embeddingString = JSON.stringify(embedding);
                }
            }

            return {
                ...movie,
                embedding_vector: embeddingString,
                is_vectorized: true,
            };
        });

        // upsert 실행 (movie_id를 기준으로 업데이트)
        const { error: updateError } = await supabase.from('movies').upsert(updates, {
            onConflict: 'movie_id', // movie_id가 중복되면 업데이트
        });

        if (updateError) {
            console.error('영화 데이터 업데이트 실패:', updateError);
            return NextResponse.json({ error: updateError.message }, { status: 500 });
        }

        return NextResponse.json(
            {
                success: true,
                count: embeddings.length,
                message: `${embeddings.length}개의 영화 임베딩이 완료되었습니다.`,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('임베딩 처리 중 오류:', error);
        return NextResponse.json(
            {
                error: error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.',
            },
            { status: 500 }
        );
    }
};
