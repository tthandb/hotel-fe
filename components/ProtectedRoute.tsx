import { useAuth } from '../context/Authentication';
import { useRouter } from 'next/router';

export default function ProtectedRoute({ children }: { children?: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  console.log(user)
  switch (true) {
    case loading:
      return (<>Loading</>);

    case !user:
      router.push('/login');
      return null;

    case !!user:
      return <>{children}</>;

    default:
      return null;
  }
}
