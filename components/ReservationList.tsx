import React, { useState } from 'react';
import { getSomeReservations } from '../apis';

import type { ColumnsType } from 'antd/es/table';
import { Button, DatePicker, Space, Table, Tag } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';
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
    title: 'First Name',
    dataIndex: 'first_name',
    key: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
    key: 'last_name',
  },
  {
    title: 'Check in date',
    dataIndex: 'check_in_date',
    key: 'check_in_date',
  },
  {
    title: 'Check-out date',
    dataIndex: 'check_out_date',
    key: 'check_out_date',
  },
  {
    title: 'Type',
    key: 'type',
    dataIndex: 'type',
    render: (_, { type }) => (
      <Tag color="geekblue">
        {type?.toUpperCase()}
      </Tag>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link href={`/reservations/${record.reservation_id}`}>
          Update
        </Link>
      </Space>
    ),
  },
];

export default function ReservationList() {
  const [criteria, setCriteria] = useState({
    firstname: '',
    lastname: '',
    sdate: '2020-10-20',
    edate: '2020-10-21',
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
  const handleChosenReservation = (id: any) => {
    setCriteria({ ...criteria, reservationChosen: true, chosenReservationId: id })
  }

  const onRangeChange = (_: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dateStrings) {
      console.log(dateStrings)
      setCriteria({ ...criteria, edate: dateStrings[1], sdate: dateStrings[0] })
    }
  };

  return (
    <Space direction="vertical">
      <DatePicker.RangePicker
        defaultValue={[dayjs(criteria.sdate, 'YYYY-MM-DD'), dayjs(criteria.edate, 'YYYY-MM-DD')]}
        format={'YYYY-MM-DD'}
        onCalendarChange={onRangeChange}
      />
      <Button icon={<SearchOutlined />} onClick={handleSubmit}>
        Search
      </Button>
      <Table columns={columns} dataSource={criteria.resRooms} />
    </Space>
  )
}
