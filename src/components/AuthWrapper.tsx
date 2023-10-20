import { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

interface AuthWrapperProps {
  children: ReactNode;
}

const AuthWrapper = ({ children }: AuthWrapperProps) => {
  const router = useRouter();
  const { userId } = router.query as { userId: string };

  useEffect(() => {
    const authorized = localStorage.getItem('authorized');
    if (!authorized) {
      router.push('/login');
    } else {
      const authenticated = JSON.parse(authorized);
      if (authenticated.id !== parseInt(userId)) {
        router.push('/login');
      }
    }
  }, [router, userId]);

  return <>{children}</>;
};

export default AuthWrapper;