'use client';
import { useState, useRef, useCallback, memo } from 'react';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import useOnClickOutside from '@/hooks/useOutsideClick';
import { useRouter } from 'next/navigation';

type NavContentProps = {
    open: boolean;
    onClick: () => void;
};

const NAV_ITEMS: string[] = ['영화', 'AI 추천'];

const NavContent = memo(({ open, onClick }: NavContentProps) => {
    const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        e.stopPropagation();
        onClick();
    };

    const menuItems = ['Movie 1', 'Movie 2', 'Movie 3'];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border border-(--border) rounded-md p-2 absolute top-full left-0 mt-1 bg-background-elevated text-nowrap"
                >
                    <ul className="flex flex-col gap-2">
                        {menuItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={handleClick}
                                className="cursor-pointer hover:bg-background-elevated rounded px-2 py-1"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
    );
});

NavContent.displayName = 'NavContent';

type NavItemProps = {
    children?: React.ReactNode;
    title: string;
    onClick: () => void;
    open: boolean;
};

const NavItem = memo(({ children, title, onClick, open }: NavItemProps) => {
    const baseClassName =
        'group cursor-pointer hover:bg-background-elevated rounded-md px-4 py-2 flex items-center justify-center gap-2 relative';

    const itemClassName = `${baseClassName} ${open ? 'bg-background-elevated' : ''}`;

    const chevronClassName = `w-4 h-4 transition-transform duration-300 ${
        open ? 'rotate-180' : 'group-hover:rotate-180'
    }`;

    return (
        <li onClick={onClick} className={itemClassName}>
            <p className="text-sm">{title}</p>
            <ChevronUp className={chevronClassName} />
            {children}
        </li>
    );
});

NavItem.displayName = 'NavItem';

const Nav = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const ref = useRef<HTMLUListElement>(null);
    const router = useRouter();

    const handleClose = useCallback(() => {
        setOpenIndex(null);
    }, []);

    useOnClickOutside({ ref, onClickOutside: handleClose });

    const handleItemClick = useCallback((index: number) => {
        setOpenIndex((prev) => (prev === index ? null : index));
    }, []);

    const handleNavContentClick = useCallback(
        (path: string) => {
            router.push(path);
            setOpenIndex(null);
        },
        [router]
    );

    return (
        <ul ref={ref} className="flex z-1 items-center gap-8 absolute left-1/2 -translate-x-1/2 hidden md:flex">
            {NAV_ITEMS.map((item, index) => (
                <NavItem key={index} title={item} onClick={() => handleItemClick(index)} open={openIndex === index}>
                    <NavContent open={openIndex === index} onClick={() => handleNavContentClick('')} />
                </NavItem>
            ))}
        </ul>
    );
};

export default Nav;
