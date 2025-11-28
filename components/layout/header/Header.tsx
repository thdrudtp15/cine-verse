import Link from 'next/link';
import { FilmIcon } from 'lucide-react';

import Nav from '@/components/layout/header/Nav';
import Login from '@/components/layout/header/Login';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const Header = async () => {
    const session = await getServerSession(authOptions);

    console.log(session);

    return (
        <header className="py-4 fixed top-0 left-0 right-0 z-100 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-lg shadow-black/20">
            <div className="content-container flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                    <FilmIcon className="w-8 h-8" />
                    CineVerse
                </Link>
                <Nav />
                <Login session={session} />
            </div>
        </header>
    );
};

export default Header;
