import { useRouter, useSearchParams } from 'next/navigation';

const useParams = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const setParams = (key: string, value: string) => {
        const params = new URLSearchParams(searchParams);
        params.set(key, value);
        router.push(`?${params.toString()}`);
    };

    const deleteParams = (key: string) => {
        const params = new URLSearchParams(searchParams);
        params.delete(key);
        router.push(`?${params.toString()}`);
    };

    return { setParams, deleteParams };
};

export default useParams;
