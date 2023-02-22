import React, { ReactElement, useEffect, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { Button, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { getInvoice, getPreInvoice, updateRoomCheckout } from '../apis';
import toast from 'react-hot-toast';
import { useRole } from '@floating-ui/react-dom-interactions';
import { useRouter } from 'next/router';
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
      title: 'Room Number',
      key: 'room_num',
      render: () => room_num,
    },
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
      title: 'Checked In Date',
      key: 'check_in_date',
      render: (_, record) => dayjs(record.check_in_date).format('YYYY-MM-DD'),
    },
    {
      title: 'Check Out Date',
      key: 'check_out_date',
      render: (_, record) => dayjs(record.check_out_date).format('YYYY-MM-DD'),
    },
    {
      title: 'Payment Type',
      dataIndex: 'payment_type',
      key: 'payment_type',
    },
    {
      title: 'Num nights',
      dataIndex: 'num_days',
      key: 'num_days',
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'Room Total',
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
        toast.success('payment successfully');
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  }
  return (
    <div>
      INVOICE
      <Table columns={columns} dataSource={invoices} />
      {!isPaid ?
        <Button onClick={() => onSubmitPayment()}>
          Submit Payment
        </Button> : (
          <CheckCircleFilled style={{ fontSize: '60px', color: '#52c41a' }} />
        )
      }
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { room_num, res_room_id, invoice_id } = context.query;
  let invoices = []
  if (invoice_id) {
    invoices = await getInvoice(invoice_id);
  } else if (res_room_id) {
    invoices = await getPreInvoice(res_room_id)
    console.log(invoices)
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
