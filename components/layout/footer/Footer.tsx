import Link from 'next/link';

import { FilmIcon } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="content-container py-4 flex ">
            <div className="border-t border-(--border) flex flex-col items-center justify-center w-full gap-4 py-4">
                <div className="flex items-center gap-2">
                    <FilmIcon className="w-8 h-8" />
                </div>
                <span className="text-sm">
                    data provided: &nbsp;
                    <Link
                        href="https://www.themoviedb.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-primary"
                    >
                        TMDB
                    </Link>
                </span>
                <p className="text-sm">© 2025 CineVerse Corp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
