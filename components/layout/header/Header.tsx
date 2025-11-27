import Link from 'next/link';
import { FilmIcon } from 'lucide-react';

import Nav from '@/components/layout/header/Nav';

const Header = () => {
    return (
        <header className="py-4 fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20">
            <div className="content-container flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                    <FilmIcon className="w-8 h-8" />
                    CineVerse
                </Link>
                <Nav />
                <div>A</div>
            </div>
        </header>
    );
};

export default Header;
