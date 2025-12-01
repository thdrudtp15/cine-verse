import { Roboto_Flex } from 'next/font/google';

import type { Metadata } from 'next';

import { Providers as TanstackProviders } from '@/providers/tanstack';

import Header from '@/components/layout/header/Header';
import Footer from '@/components/layout/footer/Footer';
import TopLoader from 'nextjs-toploader';
import { SessionProvider } from 'next-auth/react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

import './globals.css';

const robotoFlex = Roboto_Flex({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export const metadata: Metadata = {
    title: 'Cine verse',
    description: '영화 검색 및 AI 영화 추천 서비스',
};

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={robotoFlex.className}>
                <TopLoader color="#8b5cf6" height={4} showSpinner={false} />

                <TanstackProviders>
                    <Header />
                    {children}
                    <Footer />
                </TanstackProviders>
            </body>
        </html>
    );
}
