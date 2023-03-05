import React, { ReactNode } from 'react';
import Navigation from 'components/Navigation';
import { Layout } from 'antd';

const { Content } = Layout;

const contentStyle: React.CSSProperties = {
  margin: '24px 16px',
  padding: '24px',
  minHeight: '280px',
  backgroundColor: 'transparent',
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
