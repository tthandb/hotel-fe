import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getLoggedOut, IUser, postLogin } from '../apis/authentication';
import { useRouter } from 'next/router';

export type AuthType = {
  user: IUser | null;
  login?: (user: IUser) => void;
  signup?: () => void;
  logout?: () => void;
  loading?: boolean;
};

const AuthContext = createContext<AuthType>({ user: null });

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const signup = () => {
    return null;
  };

  const login = async (userData: IUser) => {
    const { data } = await postLogin(userData);
    const user = data?.user
    if (user) {
      setUser(user)
      await router.push("/")
    }
  }

  const logout = async () => {
    setUser(null);
    await getLoggedOut();
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
