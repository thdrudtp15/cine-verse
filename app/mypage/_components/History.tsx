import { Clock } from 'lucide-react';
import Card from '@/components/content/Card';
import Link from 'next/link';
import type { MovieListItem } from '@/types/movieList';

interface HistoryProps {
    recentVisits: MovieListItem[];
}

const History = ({ recentVisits }: HistoryProps) => {
    return (
        <div>
            {recentVisits.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {recentVisits.map((movie) => (
                        <Card key={movie.id} content={movie} height={100} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-blue-400/10 flex items-center justify-center mx-auto mb-4">
                        <Clock className="w-10 h-10 text-blue-400/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">최근 본 영화가 없습니다</h3>
                    <p className="text-foreground-secondary mb-6">영화를 탐색하고 상세 페이지를 방문해보세요!</p>
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent-primary hover:bg-accent-primary-hover text-white font-medium transition-colors"
                    >
                        영화 탐색하기
                    </Link>
                </div>
            )}
        </div>
    );
};

export default History;
