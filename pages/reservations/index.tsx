import React, { ReactElement } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import ReservationList from 'components/ReservationList';

const Reservations = () => {
  return (
    <ReservationList />
  );
};

Reservations.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Reservations;
