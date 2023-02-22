import '../styles/globals.css'
import 'react-datetime/css/react-datetime.css';
import type { AppProps } from 'next/app'
import { AuthProvider } from '../context/Authentication';
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import ProtectedRoute from '../components/ProtectedRoute';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

const protectedRoutes = ['/'];

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <AuthProvider>
      {getLayout(
        // protectedRoutes.includes(router.pathname) ? (
        //   <ProtectedRoute>
        //     <Component {...pageProps} />
        //   </ProtectedRoute>
        // ) : (
        //   <Component {...pageProps} />
        // ),
        <Component {...pageProps} />,
      )}
    </AuthProvider>
  )
}
