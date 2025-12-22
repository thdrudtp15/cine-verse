import { useEffect, useRef } from 'react';

type Props = {
    ref: React.RefObject<HTMLElement | null>;
    onClickOutside: () => void;
};

const useOnClickOutside = ({ ref, onClickOutside }: Props) => {
    const onClickOutsideRef = useRef(onClickOutside);

    // 최신 콜백 참조 유지
    useEffect(() => {
        onClickOutsideRef.current = onClickOutside;
    }, [onClickOutside]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                onClickOutsideRef.current();
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [ref]);
};

export default useOnClickOutside;
