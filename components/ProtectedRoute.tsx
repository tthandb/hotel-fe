import { useAuth } from '../context/Authentication';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter()

  switch (true) {
    case loading:
      return (<>Loading</>);

    case user?.access_id >= 1:
      return <>{children}</>;

    case user?.access_id < 1:
      router.push('/login');
      return null;

    default:
      return null;
  }
}
