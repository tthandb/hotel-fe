import { ReactNode } from 'react';
import Navigation from 'components/Navigation';
import { Layout } from 'antd';

export default function LayoutWithSidebar({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navigation />
      {children}
    </Layout>
  );
}
