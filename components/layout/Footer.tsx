import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="content-container py-4 flex ">
            <div className="border-t border-(--border) flex flex-col items-center justify-center w-full gap-4 py-4">
                <div>LOGO</div>
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
                <p className="text-sm">© 2025 Railway Corp. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
