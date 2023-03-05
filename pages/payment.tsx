import React, { ReactElement, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Card, message, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getInvoice, getPreInvoice, updateRoomCheckout } from '../apis';
import dayjs from 'dayjs';
import { CheckCircleFilled } from '@ant-design/icons';

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
  num_days: string;
  rate: string;
}


const Payment = ({ invoices, paid, room_num, res_room_id }: any) => {
  const [isPaid, setPaid] = useState(paid);
  let columns: ColumnsType<DataType> = [
    {
      title: 'Số phòng',
      key: 'room_num',
      render: () => room_num,
    },
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
      key: 'check_in_date',
      render: (_, record) => dayjs(record.check_in_date).format('YYYY-MM-DD'),
    },
    {
      title: 'Ngày check-out',
      key: 'check_out_date',
      render: (_, record) => dayjs(record.check_out_date).format('YYYY-MM-DD'),
    },
    {
      title: 'Số đêm',
      dataIndex: 'num_days',
      key: 'num_days',
    },
    {
      title: 'Giá phòng',
      dataIndex: 'rate',
      key: 'rate',
      render: (_, { rate }) => parseFloat(rate).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      }),
    },
    {
      title: 'Tổng giá tiền',
      key: 'room_total',
      render: (_, record) => (parseInt(record.num_days) * parseFloat(record.rate)).toLocaleString('it-IT', {
        style: 'currency',
        currency: 'VND',
      }),
    },
  ];
  const onSubmitPayment = async () => {
    try {
      const data = await updateRoomCheckout(res_room_id, room_num, 'Cash');
      if (data) {
        setPaid(true);
        message.success('payment successfully');
      }
    } catch (e: any) {
      message.error(e.message);
    }
  }
  return (
    <Card title="Hóa đơn">
      <Table columns={columns} dataSource={invoices} />
      {!isPaid ?
        <Button onClick={() => onSubmitPayment()}>
          Gửi thanh toán
        </Button> : (
          <CheckCircleFilled style={{ fontSize: '60px', color: '#52c41a' }} />
        )
      }
    </Card>
  );
}

export async function getServerSideProps(context: any) {
  const { room_num, res_room_id, invoice_id } = context.query;
  let invoices = []
  if (invoice_id) {
    invoices = await getInvoice(invoice_id);
  } else if (res_room_id) {
    invoices = await getPreInvoice(res_room_id)
  }
  return {
    props: {
      invoices: invoices,
      paid: !!invoice_id,
      room_num: room_num || '',
      res_room_id: res_room_id || '',
    },
  }
}

Payment.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Payment;
