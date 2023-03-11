import React, { ReactNode, Suspense } from 'react';
import Navigation from 'components/Navigation';
import { Layout } from 'antd';
import Loading from '../Loading';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  margin: '0 12px',
  padding: '24px',
  minHeight: '280px',
  backgroundColor: 'transparent',
  position: 'relative',
};
export default function LayoutWithSidebar({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout>
        <Navigation />
        <Content style={contentStyle}>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
