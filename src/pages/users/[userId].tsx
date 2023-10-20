import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import AuthWrapper from '../../components/AuthWrapper';
import Card from '../../components/Card';

interface Home {
  id: number;
  address: string;
  city: string;
  state: string;
  zipCode: number;
  bedrooms: number;
  yearBuilt: number;
  bathrooms: number;
  sqft: number;
  imgSrc: string;
}

const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };
  const [data, setData] = useState<Home[]>([]);

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
      <Head>
        <title>Home</title>
        <meta name='home' content='Home' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <h1 className='my-4'>User Profile for User ID: {userId}</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-6'>
          {data.map((home) => (
            <Card
              key={home.id}
              id={home.id}
              address={home.address}
              city={home.city}
              state={home.state}
              zipCode={home.zipCode}
              bedrooms={home.bedrooms}
              yearBuilt={home.yearBuilt}
              bathrooms={home.bathrooms}
              sqft={home.sqft}
              imageSrc={home.imgSrc}
            />
          ))}
        </div>
        <div className="flex justify-end mb-3">
          <button
            type="button"
            onClick={() => {
              localStorage.removeItem('authorized');
              router.push('/login');
            }}
            className="text-white px-6 py-4 rounded bg-blue-500 hover:bg-blue-600"
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