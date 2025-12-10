import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';

const MyPage = async () => {
    const session = await getServerSession(authOptions);

    return (
        <div>
            <h1>MyPage</h1>
        </div>
    );
};

export default MyPage;
