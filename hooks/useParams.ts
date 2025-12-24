import { useRouter, useSearchParams } from 'next/navigation';

const useParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setParams = (key: string, value: string, scroll = true) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.set(key, value);
        router.push(`?${params.toString()}`, { scroll });
    };

    const deleteParams = (key: string) => {
        const params = new URLSearchParams(searchParams?.toString() || '');
        params.delete(key);
        router.push(`?${params.toString()}`);
    };

    return { setParams, deleteParams };
};

export default useParams;
