export type Keyword = {
    id: number;
    name: string;
};

export type KeywordResponse = {
    page: number;
    results: Keyword[];
    total_pages: number;
    total_results: number;
};
