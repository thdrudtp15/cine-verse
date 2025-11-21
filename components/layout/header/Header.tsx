import Link from 'next/link';
import { FilmIcon } from 'lucide-react';

import Nav from '@/components/layout/header/Nav';

const Header = () => {
    return (
        <header className="content-container py-4 flex items-center justify-between relative fixed top-0 left-0 right-0 z-10">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <FilmIcon className="w-8 h-8" />
                CineVerse
            </Link>
            <Nav />
            <div>A</div>
        </header>
    );
};

export default Header;
