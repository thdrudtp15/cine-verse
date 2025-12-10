import { getServerSession } from 'next-auth';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { redirect } from 'next/navigation';

const MyPage = async () => {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login');
    }

    return (
        <div>
            <h1>MyPage</h1>
        </div>
    );
};

export default MyPage;
