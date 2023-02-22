import React, { ReactElement, useEffect, useState } from 'react';
import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import { ColumnsType } from 'antd/es/table';
import { Button, DatePicker, Form, Input, Modal, Table } from 'antd';
import { createRoomIssue, getRoomIssues, getRoomsIdNum, updateRoomIssues, updateRoomIssuesFixed } from '../apis';
import dayjs from 'dayjs';

interface DataType {
  key: string;
  reservation_id: number;
  res_room_id: number
  first_name: string;
  selectedRoom: string;
  last_name: string;
  room_num: string;
  start_date: string;
  end_date: string;
  type: string;
  active: number;
  checked_out: number;
  num_days: string;
  rate: string;
  room_issue_id: number;
  issue: string;
}

let columns: ColumnsType<DataType> = [
  {
    title: 'Room Number',
    key: 'room_num',
    dataIndex: 'room_num',
  },
  {
    title: 'Room Number',
    key: 'type',
    dataIndex: 'type',
  },
  {
    title: 'Start Date',
    dataIndex: 'start_date',
    key: 'start_date',
    render: (_, record) => dayjs(record.start_date).format('YYYY-MM-DD'),
  },
  {
    title: 'End Date',
    dataIndex: 'end_date',
    key: 'end_date',
    render: (_, record) => dayjs(record.end_date).format('YYYY-MM-DD'),
  },
  {
    title: 'Problem',
    dataIndex: 'issue',
    key: 'issue',
  },
];
const Maintenance = ({ rooms }: any) => {
  const [issues, setIssues] = useState([]);
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  columns[5] = {
    key: 'action',
    render: (_, record) => (
      <>
        <Button onClick={() => {
          console.log(record)

          form.setFieldsValue({
            roomNumber: record.room_num,
            issue: record.issue,
            dateRange: [dayjs(record.start_date), dayjs(record.end_date)],
          });
          showModal(record.room_issue_id)
        }}>Update</Button>
        <Button onClick={() => updateFixedRoom(record.room_issue_id)}>Fixed</Button>
      </>
    ),
  }

  const showModal = (id: number) => {
    setEdit(!!id);
    form.setFieldValue('room_issue_id', id)
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onFinish = async (values: any) => {
    const payload = [
      values.issue,
      4, // values.user.user_id,
      values.dateRange[0].format('YYYY-MM-DD'),
      values.dateRange[1].format('YYYY-MM-DD'),
    ]
    const matchingRoom = rooms.filter((room: any) => room.room_num === values.roomNumber);
    if (matchingRoom.length === 1) {
      payload.unshift(matchingRoom[0].room_id)
      if (edit) {
        const data = await updateRoomIssues(form.getFieldValue('room_issue_id'), payload);
        if (data) {
          form.resetFields();
          await fetchRoomIssues();
          setIsModalOpen(false);
        }
      } else {
        const data = await createRoomIssue(payload);
        if (data) {
          form.resetFields();
          await fetchRoomIssues();
          setIsModalOpen(false);
        }
      }
    }
  }

  const fetchRoomIssues = async () => {
    const data = await getRoomIssues();
    if (data) {
      setIssues(data);
    }
  }

  const updateFixedRoom = async (id: number) => {
    const data = await updateRoomIssuesFixed(id);
    if (data) {
      await fetchRoomIssues();
    }
  }

  useEffect(() => {
    fetchRoomIssues();
  }, [])

  return (
    <div>
      maintenance
      <Button type="primary" onClick={() => showModal(0)}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={form.submit} onCancel={handleCancel}>
        <Form
          form={form}
          onFinish={onFinish}
          initialValues={{}}
          style={{ maxWidth: 1000 }}
          scrollToFirstError
        >
          <Form.Item
            name="roomNumber"
            label="Room Number"
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item name="dateRange" label="Date">
            <DatePicker.RangePicker />
          </Form.Item>
          <Form.Item
            name="issue"
            label="Problem"
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={issues} />
    </div>
  )
    ;
};

export async function getServerSideProps(context: any) {
  const data = await getRoomsIdNum();

  return {
    props: {
      rooms: data || null,
    },
  }
}

Maintenance.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default Maintenance;
