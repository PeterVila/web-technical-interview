import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// Treat this page as the Cards page
const UserPage = () => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  return (
    <div>
      <h1>User Profile for User ID: {userId}</h1>
      <div className='mb-3'>
        <button
          type='button'
          onClick={() => {
            localStorage.removeItem('authorized');
            router.push('/login');
          }}
          className={`text-white px-4 py-4 rounded bg-blue-500 hover:bg-blue-600`}
          data-cy='login-button'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserPage;