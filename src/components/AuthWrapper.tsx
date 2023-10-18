import { useEffect } from 'react';
import { useRouter } from 'next/router';

const AuthWrapper = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    // Check if the route is not the default '/'
    if (router.pathname !== '/') {
      const authorized = localStorage.getItem('authorized');

      if (!authorized) {
        router.replace('/login');
      }
    }
  }, [router]);

  return children;
};

export default AuthWrapper;