import Search from './_components/Search';
import List from './_components/List';

const Page = async () => {
    return (
        <div className="content-container flex pt-16 gap-4">
            <Search />
            <List />
        </div>
    );
};

export default Page;
