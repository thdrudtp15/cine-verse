'use client';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';

import Input from '@/components/ui/Input';
import { XIcon } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { searchKeyword } from '@/lib/api/search';
import useParams from '@/hooks/useParams';
import type { Keyword as KeywordType } from '@/types/keywords';

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
        <div className="flex flex-col gap-4">
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
                                        setParams('keywords', [...(keywords || []), keyword.name].join(','));
                                    }}
                                >
                                    {keyword.name}
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            <div className="flex gap-4">
                {keywords?.map((keyword) => (
                    <button
                        key={keyword}
                        className="flex items-center gap-2 bg-background-elevated rounded-md px-4 py-2 hover:bg-background-tertiary transition-colors duration-200 cursor-pointer"
                    >
                        {keyword}
                        <XIcon
                            className="w-4 h-4 cursor-pointer"
                            onClick={() => {
                                if (keywords?.length === 1) {
                                    deleteParams('keywords');
                                    return;
                                }
                                setParams('keywords', keywords?.filter((k) => k !== keyword).join(','));
                            }}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
});

export default Keyword;

Keyword.displayName = 'Keyword';
