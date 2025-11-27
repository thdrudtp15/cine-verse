import Search from './_components/Search';
import List from './_components/List';

type PageProps = {
    searchParams: Promise<{ query: string; keywords: string; genre: string; rated: string }>;
};

const Page = async ({ searchParams }: PageProps) => {
    const { query, keywords, genre, rated } = await searchParams;

    return (
        <div className="content-container flex pt-16">
            <Search />
            <List />
        </div>
    );
};

export default Page;
