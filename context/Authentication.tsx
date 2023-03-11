import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getLoggedOut, getLoginStatus, IUser, postLogin } from 'apis';
import { useRouter } from 'next/router';
import { message } from 'antd';

export type AuthType = {
  user: {
    username: string;
    access_id: number;
    type: string;
    user_id: number;
  };
  login?: (user: IUser) => void;
  signup?: () => void;
  logout?: () => void;
  loading?: boolean;
};

const initUser = {
  access_id: 0,
  type: 'Guest',
  user_id: 0,
  username: 'guest',
}

const AuthContext = createContext<AuthType>({
  user: initUser,
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    username: string;
    access_id: number;
    type: string;
    user_id: number;
  }>(initUser);

  useEffect(() => {
    getStatus();
    return () => {
      setLoading(false);
    };
  }, []);

  const getStatus = async () => {
    try {
      const loginStatus = await getLoginStatus();
      if (loginStatus) {
        setUser(loginStatus.user);
      }
    } catch (e) {
      setUser(initUser);
    }
  }

  const signup = () => {
    return null;
  };

  const login = async (userData: IUser) => {
    try {
      const { data } = await postLogin(userData);
      const user = data?.user
      if (user) {
        setUser(user)
        router.push('/')
      }
    } catch (e: any) {
      message.error(e?.message)
    }
  }

  const logout = async () => {
    await getLoggedOut();
    setUser({
      access_id: 0,
      type: 'Guest',
      user_id: 0,
      username: 'guest',
    })
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
