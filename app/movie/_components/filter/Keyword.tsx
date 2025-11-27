'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Input from '@/components/ui/Input';
import { XIcon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { searchKeyword } from '@/lib/api/search';
import useParams from '@/hooks/useParams';
import type { Keyword as KeywordType } from '@/types/keywords';
import Section from './Section';
import { getKeywords } from '@/lib/api/movies';

const KeywordItem = React.memo(({ id, children }: { id: number; children: React.ReactNode }) => {
    const { data, isLoading } = useQuery({
        queryKey: ['keyword_data', id],
        queryFn: () => getKeywords(id),
    });

    if (isLoading) {
        return (
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-background-elevated border border-border rounded-full text-sm">
                <div className="w-3.5 h-3.5 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                <span className="text-foreground-muted">로딩 중...</span>
            </div>
        );
    }

    return (
        <div className="group inline-flex items-center gap-2 px-3 py-1.5 bg-background-elevated border border-border rounded-full text-sm text-foreground hover:bg-background-tertiary hover:border-accent-primary/50 transition-all duration-200">
            <span className="text-nowrap">{data?.name}</span>
            <div className="flex items-center opacity-70 group-hover:opacity-100 transition-opacity duration-200">
                {children}
            </div>
        </div>
    );
});

KeywordItem.displayName = 'KeywordItem';

const Keyword = React.memo(() => {
    const ref = useRef<HTMLInputElement | null>(null);
    const queryClient = useQueryClient();

    const keywords = useSearchParams().get('keywords')?.split(',');

    const { setParams, deleteParams } = useParams();

    const [input, setInput] = useState('');

    const {
        data: keywordList,
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ['search_keyword', input],
        queryFn: () => searchKeyword(input),
        enabled: false,
    });

    useEffect(() => {
        const STO = setTimeout(() => {
            if (input === '' || !input) {
                queryClient.setQueryData(['search_keyword', input], null);
                return;
            }
            refetch();
        }, 500);

        return () => clearTimeout(STO);
    }, [input, queryClient, refetch]);

    return (
        <Section title="키워드">
            <div className="relative w-full">
                <Input
                    placeholder="키워드를 입력해주세요."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onBlur={() => {
                        setTimeout(() => {
                            setInput('');
                            if (ref.current) {
                                ref.current.value = '';
                            }
                        }, 200);
                    }}
                    ref={ref}
                />
                {(keywordList?.results || isLoading) && input && (
                    <ul className="absolute top-full left-0 w-full mt-2 bg-background-elevated border border-border rounded-lg shadow-lg shadow-black/20 overflow-hidden z-10 max-h-80 overflow-y-auto">
                        {isLoading && (
                            <li className="px-4 py-3 text-foreground-muted text-sm flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-accent-primary border-t-transparent rounded-full animate-spin" />
                                검색 중...
                            </li>
                        )}
                        {!isLoading && keywordList?.results?.length === 0 && (
                            <li className="px-4 py-3 text-foreground-muted text-sm text-center">
                                검색 결과가 없습니다.
                            </li>
                        )}
                        {!isLoading &&
                            keywordList?.results?.map((keyword: KeywordType) => (
                                <li
                                    key={keyword.id}
                                    className="px-4 py-3 text-foreground hover:bg-background-tertiary cursor-pointer transition-colors duration-200 border-b border-divider last:border-b-0"
                                    onClick={() => {
                                        setParams('keywords', [...(keywords || []), keyword.id].join(','));
                                    }}
                                >
                                    {keyword.name}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <div className="flex gap-2 flex-wrap">
                {keywords?.map((keyword) => (
                    <React.Fragment key={keyword}>
                        <KeywordItem id={Number(keyword)}>
                            <XIcon
                                className="w-3.5 h-3.5 cursor-pointer hover:text-accent-primary transition-colors duration-200"
                                onClick={() => {
                                    if (keywords?.length === 1) {
                                        deleteParams('keywords');
                                        return;
                                    }
                                    setParams('keywords', keywords?.filter((k) => k !== keyword).join(','));
                                }}
                            />
                        </KeywordItem>
                    </React.Fragment>
                ))}
            </div>
        </Section>
    );
});

export default Keyword;

Keyword.displayName = 'Keyword';
