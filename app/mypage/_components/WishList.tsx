import { Heart } from 'lucide-react';
import Card from '@/components/content/Card';
import Link from 'next/link';
import { unstable_cache } from 'next/cache';
import { supabase } from '@/lib/utils/supabase';

interface WishListProps {
    userId: string;
}

const getWishlistMovies = unstable_cache(
    async (userId: string) => {
        const { data, error } = await supabase
            .from('interactions_wishes')
            .select('*, movie:movie_id(title, overview, poster_path, id: movie_id)')
            .eq('user_id', userId);
        return { data, error };
    },
    ['wishlist_movies'],
    { tags: ['wishlist_movies'], revalidate: 60 * 60 * 24 }
);

const WishList = async ({ userId }: WishListProps) => {
    const { data, error } = (await getWishlistMovies(userId)) || [];

    if (error || !data) {
        console.error(error);
        return <div>Error: {error?.message}</div>;
    }

    return (
        <div>
            {data.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data.map((movie) => (
                        <Card key={movie.movie_id} content={movie.movie} height={100} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <div className="w-20 h-20 rounded-full bg-red-400/10 flex items-center justify-center mx-auto mb-4">
                        <Heart className="w-10 h-10 text-red-400/50" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">위시리스트가 비어있습니다</h3>
                    <p className="text-foreground-secondary mb-6">관심 있는 영화를 위시리스트에 추가해보세요!</p>
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

export default WishList;
