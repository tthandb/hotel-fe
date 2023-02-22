import LayoutWithSidebar from '../components/layouts/LayoutWithSidebar';
import { ReactElement } from 'react';
import { NextPageWithLayout } from './_app';

const Home: NextPageWithLayout = () => {
  return (
    <div>Dashboard 2</div>
  )
};

Home.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Home;
