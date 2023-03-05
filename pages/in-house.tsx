import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Card, Form, Input, Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getGuests } from '../apis';
import Link from 'next/link';

interface DataType {
  key: string;
  reservation_id: number;
  res_room_id: number
  first_name: string;
  selectedRoom: string;
  last_name: string;
  room_num: string;
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
    title: 'Ngày đến',
    dataIndex: 'check_in_date',
    key: 'check_in_date',
  },
  {
    title: 'Ngày đi',
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
    title: 'Số phòng',
    key: 'room_num',
    dataIndex: 'room_num',
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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const InHouse = () => {
  const [form] = Form.useForm();
  const [guests, setGuests] = useState([]);
  const onFinish = async (values: any) => {
    const criteria = {
      firstname: values.firstname,
      lastname: values.lastname,
      roomNumber: values.roomNumber,
      confirmationNumber: values.confirmationNumber,
    }
    const data = await getGuests(criteria);
    if (data) {
      setGuests(data);
    }
  }
  return (
    <Card title="Khách đang lưu trú">
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: 300 }}
        scrollToFirstError
      >
        <Form.Item
          name="roomNumber"
          label="Số phòng"
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="firstname"
          label="Tên"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastname"
          label="Họ"
        >
          <Input />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={guests} bordered/>
    </Card>
  );
}

InHouse.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default InHouse;
