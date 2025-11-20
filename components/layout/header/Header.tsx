import Link from 'next/link';
import { FilmIcon } from 'lucide-react';

import Nav from '@/components/layout/header/Nav';

const Header = () => {
    return (
        <header className="content-container py-4 flex items-center justify-between relative">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                <FilmIcon className="w-8 h-8" />
                CineVerse
            </Link>
            <Nav />
            <div>Account</div>
        </header>
    );
};

export default Header;
