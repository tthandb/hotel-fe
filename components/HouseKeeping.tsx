import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, message, Select, Table } from 'antd';
import { getHouseKeepingStatus, updateCleanStatus } from '../apis';

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

const HouseKeeping: React.FC = () => {
  const [rooms, setRooms] = useState([]);
  const [form] = Form.useForm();

  const getHouseKeepingRooms = async (payload: any) => {
    const data = await getHouseKeepingStatus(payload)
    if (data) {
      setRooms(data);
    }
  }

  useEffect(() => {
    getHouseKeepingRooms({
      clean: false,
      dirty: false,
      vacant: false,
      occupied: false,
      arrived: false,
      stayOver: false,
      dueOut: false,
      departed: false,
      notReserved: false,
    });
  }, [])


  const columns = [
    {
      title: 'Room',
      dataIndex: 'room_num',
    },
    {
      title: 'Room Type',
      dataIndex: 'type',
    },
    {
      title: 'Room Status',
      render: (_: any, record: any) => {
        const handleChange = async (value: string) => {
          try {
            const data = await updateCleanStatus(record.room_id, value);
            if (data) {
              message.success('Update clean status successful');
            }
          } catch (e) {
            message.error('Update clean status error');
          }
        };
        return (
          <Form.Item
            style={{ margin: 0 }}
          >
            <Select
              defaultValue={record.clean as string}
              style={{ width: 120 }}
              onChange={handleChange}
              options={[
                { value: 0, label: 'Dirty' },
                { value: 1, label: 'Clean' },
              ]} />
          </Form.Item>
        )
      },
    },
    {
      title: 'Front Office Status',
      dataIndex: 'occupied',
      render: (occupied: number) => (occupied === 1 ? 'Occupied' : 'Vacant'),

    },
    {
      title: 'Reservation Status',
      render: (_: any, record: any) => (record.checked_out === 1
          ? 'Departed'
          : record.departure
            ? record.departure
            : record.stayover
              ? record.stayover
              : record.checked_in === 1
                ? 'Arrived'
                : 'Not Reserved'
      ),
    },
  ];
  const onFinish = async (values: any) => {
    const criteria = {
      clean: values.room.includes('clean'),
      dirty: values.room.includes('dirty'),
      vacant: values.frontOffice.includes('vacant'),
      occupied: values.frontOffice.includes('occupied'),
      arrived: values.reservation.includes('arrived'),
      stayOver: values.reservation.includes('stayOver'),
      dueOut: values.reservation.includes('dueOut'),
      departed: values.reservation.includes('departed'),
      notReserved: values.reservation.includes('notReserved'),
    }
    console.log(values, criteria)
    try {
      const data = await getHouseKeepingStatus(criteria);
      if (data) {
        setRooms(data);
        message.success('Get Housekeeping status room successfully');
      }
    } catch (e: any) {
      message.success('Get Housekeeping status room error: ' + e.message);

    }
  }

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        onFinish={onFinish}
        initialValues={{ room: [], frontOffice: [], reservation: [] }}
        style={{ maxWidth: 1000 }}
        scrollToFirstError
      >
        <Form.Item name="room" label="Room status">
          <Checkbox.Group options={[
            { value: 'clean', label: 'Clean' },
            { value: 'dirty', label: 'Dirty' },
          ]} />
        </Form.Item>
        <Form.Item name="frontOffice" label="Front Office Status">
          <Checkbox.Group options={[
            { value: 'vacant', label: 'Vacant' },
            { value: 'occupied', label: 'Occupied' },
          ]} />
        </Form.Item>
        <Form.Item name="reservation" label="Reservation Status">
          <Checkbox.Group options={[
            { value: 'arrived', label: 'Arrived' },
            { value: 'stayOver', label: 'Stay Over' },
            { value: 'dueOut', label: 'Due Out' },
            { value: 'departed', label: 'Departed' },
            { value: 'notReserved', label: 'Not Reserved' },
          ]} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Search
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={rooms as any} columns={columns} />
    </div>
  );
};

export default HouseKeeping;
