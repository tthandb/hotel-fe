import React, { ReactElement } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import HouseStatus from '../components/HouseStatus';

const HouseStatusPage = () => {
  return (
    <HouseStatus />
  );
};

HouseStatusPage.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default HouseStatusPage;
