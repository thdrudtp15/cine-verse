import Link from 'next/link';

const Header = () => {
    return (
        <header className="content-container py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold">
                CineVerse
            </Link>
            <ul className="flex items-center gap-4">
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
            <div>Account</div>
        </header>
    );
};

export default Header;
