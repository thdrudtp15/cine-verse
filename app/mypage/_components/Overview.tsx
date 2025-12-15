import { Heart, Clock, Film } from 'lucide-react';
import Card from '@/components/content/Card';
import type { MovieListItem } from '@/types/movieList';

interface OverviewProps {
    wishlistMovies: MovieListItem[];
    recentVisits: MovieListItem[];
    onNavigateToWishlist: () => void;
    onNavigateToHistory: () => void;
}

const Overview = ({ wishlistMovies, recentVisits, onNavigateToWishlist, onNavigateToHistory }: OverviewProps) => {
    return (
        <div className="space-y-8">
            {/* 위시리스트 미리보기 */}
            {wishlistMovies.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/30 flex items-center justify-center">
                                <Heart className="w-5 h-5 text-red-400" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">위시리스트</h3>
                        </div>
                        {wishlistMovies.length > 6 && (
                            <button
                                onClick={onNavigateToWishlist}
                                className="text-sm text-accent-primary hover:text-accent-primary-hover transition-colors"
                            >
                                전체 보기 →
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {wishlistMovies.slice(0, 6).map((movie) => (
                            <Card key={movie.id} content={movie} height={100} />
                        ))}
                    </div>
                </div>
            )}

            {/* 최근 본 영화 미리보기 */}
            {/* {recentVisits.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-blue-400/10 border border-blue-400/30 flex items-center justify-center">
                                <Clock className="w-5 h-5 text-blue-400" />
                            </div>
                            <h3 className="text-xl font-bold text-foreground">최근 본 영화</h3>
                        </div>
                        {recentVisits.length > 6 && (
                            <button
                                onClick={onNavigateToHistory}
                                className="text-sm text-accent-primary hover:text-accent-primary-hover transition-colors"
                            >
                                전체 보기 →
                            </button>
                        )}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {recentVisits.slice(0, 6).map((movie) => (
                            <Card key={movie.id} content={movie} height={100} />
                        ))}
                    </div>
                </div>
            )} */}

            {/* 빈 상태 */}
            {wishlistMovies.length === 0 && recentVisits.length === 0 && (
                <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-background-tertiary flex items-center justify-center mx-auto mb-4">
                        <Film className="w-10 h-10 text-foreground-muted" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">아직 활동 기록이 없습니다</h3>
                    <p className="text-foreground-secondary">영화를 탐색하고 위시리스트에 추가해보세요!</p>
                </div>
            )}
        </div>
    );
};

export default Overview;
