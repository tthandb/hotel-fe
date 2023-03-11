import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useAuth } from '../context/Authentication';
import Loading from './Loading';

export default function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user || user?.access_id < 1) {
      router.push('/login');
    }
  }, [router, user]);
  if (loading) return <Loading />
  if (user?.access_id >= 1) {
    return <>{children}</>;
  }
  return <></>;
}
