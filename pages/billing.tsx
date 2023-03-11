import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Form, Input, InputNumber, Radio, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getDepartures, getInvoiceId } from '../apis';
import { useRouter } from 'next/router';

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
  checked_out: number;
  num_days: number;
  rate: number;
}

let columns: ColumnsType<DataType> = [
  {
    title: 'Số phòng',
    key: 'room_num',
    dataIndex: 'room_num',
  },
  {
    title: 'Họ và tên',
    dataIndex: 'name',
    key: 'first_name',
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
    title: 'Tổng chi phí',
    key: 'balance',
    render: (_, record) => {
      const a = Number(record.num_days * record.rate)
      return a.toLocaleString('en-US', {
        style: 'currency',
        currency: 'VND',
      })
    },
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

const options = [
  { value: 'stayOver', label: 'Ở lại thêm' },
  { value: 'dueOut', label: 'Đến hạn trả phòng' },
  { value: 'checkedOut', label: 'Đã check-out' },
];

const Billing = () => {
  const [form] = Form.useForm();
  const [departures, setDepartures] = useState([]);
  const router = useRouter()
  const onCheckOut = (id: number, room_num: string) => {
    router.push({
      pathname: '/payment',
      query: { room_num, res_room_id: id },
    })
  }

  const onLinkInvoice = async (id: number, room_num: string) => {
    const data = await getInvoiceId(id);
    if (data) {
      router.push({
        pathname: '/payment',
        query: { room_num, invoice_id: data[0].invoice_id },
      })
    }
  }

  columns[5] = {
    title: 'Thao tác',
    key: 'action',
    render: (_, record) => {
      if (record.checked_out === 0) return (
        <Button danger onClick={() => onCheckOut(record.res_room_id, record.room_num)}>Check Out</Button>
      )
      return <Button onClick={() => onLinkInvoice(record.res_room_id, record.room_num)}>Hóa đơn</Button>
    },
  }

  const onFinish = async (values: any) => {
    const criteria = {
      firstname: values.firstname,
      lastname: values.lastname,
      roomNumber: values.roomNumber,
      stayOver: values.roomStatus === 'stayOver',
      dueOut: values.roomStatus === 'dueOut',
      checkedOut: values.roomStatus === 'checkedOut',
    }
    const data = await getDepartures(criteria);
    if (data) {
      setDepartures(data);
    }
  }
  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{}}
        style={{ maxWidth: 1000 }}
        scrollToFirstError
      >
        <Form.Item
          name="roomNumber"
          label="Số phòng"
        >
          <InputNumber min="101" />
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
        <Form.Item name="roomStatus" label="Trạng thái phòng">
          <Radio.Group options={options} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={departures} />
    </div>
  );
}

Billing.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Billing;
