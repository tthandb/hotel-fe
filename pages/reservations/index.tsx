import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Card, DatePicker, Space, Table, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
import { getSomeReservations } from 'apis';

import type { ColumnsType } from 'antd/es/table';
import Link from 'next/link';


interface DataType {
  key: string;
  reservation_id: string;
  first_name: string;
  last_name: number;
  check_in_date: string;
  check_out_date: string;
  type: string;
  active: number;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Tên',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Họ',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Ngày check-in',
    dataIndex: 'check_in_date',
    key: 'check_in_date',
  },
  {
    title: 'Ngày check-out',
    dataIndex: 'check_out_date',
    key: 'check_out_date',
  },
  {
    title: 'Kiểu phòng',
    key: 'type',
    dataIndex: 'type',
    render: (_, { type }) => (
      <Tag color="geekblue">
        {type?.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Thao tác',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/reservations/${record.reservation_id}`}>
          Cập nhật
        </Link>
      </Space>
    ),
  },
];
const Reservations = () => {
  const [criteria, setCriteria] = useState({
    firstname: '',
    lastname: '',
    sdate: '',
    edate: '',
    resRooms: [],
    reservationChosen: false,
    chosenReservationId: '',
  })
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const res = await getSomeReservations(criteria);
    if (res) {
      setCriteria({ ...criteria, resRooms: res })
    }
  }

  const onRangeChange = (_: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dateStrings) {
      setCriteria({ ...criteria, edate: dateStrings[1], sdate: dateStrings[0] })
    }
  };
  return (
    <Card title="Danh sách đặt phòng">
      <Space direction="vertical">
        <Space>
          <DatePicker.RangePicker
            format={'YYYY-MM-DD'}
            onCalendarChange={onRangeChange}
            placeholder={['Ngày đến', 'Ngày đi']}
          />
          <Button icon={<SearchOutlined />} onClick={handleSubmit} />
        </Space>
        <Table columns={columns} dataSource={criteria.resRooms} bordered />
      </Space>
    </Card>
  );
};

Reservations.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Reservations;
