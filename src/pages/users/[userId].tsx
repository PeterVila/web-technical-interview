import { useRouter } from 'next/router';
import React from 'react';
import AuthWrapper from '../../components/AuthWrapper';
import { useEffect, useState } from 'react';

// TODO : Treat this page as the Cards page
// TODO : Probably isn't best practice to use userId in dynamic urls. But for demonstration purposes.
const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const [data, setData] = useState([]);

  console.debug('file: [userId].tsx:13 ༻༺ UserPage ༻༺ data:', data);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/homes');
        if (response.ok) {
          const responseData = await response.json();
          setData(responseData.homes);
        } else {
          throw new Error('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Something went wrong. Please try again.', error);
      }
    };

    fetchData();
  }, []);

  return (
    <AuthWrapper>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h1>User Profile for User ID: {userId}</h1>
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('authorized');
              router.push('/login');
            }}
            className="text-white px-4 py-4 rounded bg-blue-500 hover:bg-blue-600"
            data-cy="login-button"
          >
            Logout
          </button>
        </div>
      </div>
    </AuthWrapper>
  );
};

export default UserPage;