'use client';

import useParams from '@/hooks/useParams';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PaginationProps = {
    totalPages: number;
    currentPage: number;
};

const PAGE_CUT = 3;

const PaginationItem = ({
    children,
    disabled,
    active = false,
    onClick,
}: {
    children: React.ReactNode;
    disabled?: boolean;
    active?: boolean;
    onClick?: () => void;
}) => {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`
            cursor-pointer
            w-10 h-10 rounded-lg 
            bg-background/80 
            backdrop-blur-md  
            transition-all 
            duration-200 
            hover:scale-110
            shadow-lg flex 
            items-center 
            justify-center
            disabled:opacity-50
            disabled:cursor-not-allowed
            disabled:bg-background/50
            disabled:backdrop-blur-none
            disabled:hover:scale-100
            disabled:shadow-none
            disabled:text-foreground-muted
            disabled:text-sm
            disabled:font-medium
            ${active ? '!bg-accent-primary text-white' : 'bg-background/80 text-foreground'}
            `}
        >
            {children}
        </button>
    );
};

const Pagination = ({ totalPages, currentPage }: PaginationProps) => {
    const { setParams } = useParams();

    const handleClick = (page: number) => {
        setParams('page', page.toString(), false);
    };

    const itemCount = Math.floor((currentPage - 1) / PAGE_CUT);
    const min = itemCount * PAGE_CUT + 1;
    const max = (itemCount + 1) * PAGE_CUT;

    const array = [];

    for (let i = min; i <= max; i++) {
        if (i > totalPages) break;
        array.push(i);
    }

    return (
        <div className="flex items-center justify-center p-6 gap-4">
            <PaginationItem disabled={currentPage === 1} onClick={() => handleClick(currentPage - 1)}>
                <ChevronLeft />
            </PaginationItem>
            {totalPages > 1 && (
                <>
                    {array.map((item, index) => (
                        <PaginationItem key={index} active={currentPage === item} onClick={() => handleClick(item)}>
                            {item}
                        </PaginationItem>
                    ))}
                </>
            )}
            <PaginationItem disabled={currentPage === totalPages} onClick={() => handleClick(currentPage + 1)}>
                <ChevronRight />
            </PaginationItem>
        </div>
    );
};

export default Pagination;
