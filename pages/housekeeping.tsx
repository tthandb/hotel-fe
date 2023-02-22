import React, { ReactElement } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import HouseKeeping from '../components/HouseKeeping';
import { getHouseKeepingStatus, getInvoice, getPreInvoice } from '../apis';

const HouseKeepingPage = () => {
  return (
    <HouseKeeping />
  );
};

HouseKeepingPage.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default HouseKeepingPage;
