import LayoutWithSidebar from 'components/layouts/LayoutWithSidebar';
import React, { ReactElement, useEffect, useState } from 'react';
import { Button, Checkbox, Form, message, Table } from 'antd';
import { getHouseKeepingStatus } from '../apis';
import ModalCell from 'components/ModalCell';

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

const HouseKeepingPage = () => {
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
      title: 'Phòng',
      dataIndex: 'room_num',
    },
    {
      title: 'Kiểu phòng',
      dataIndex: 'type',
    },
    {
      title: 'Trạng thái buồng phòng',
      render: (_: any, record: any) => <ModalCell record={record} />,
    },
    {
      title: 'Trạng thái lễ tân',
      dataIndex: 'occupied',
      render: (occupied: number) => (occupied === 0 ? 'Còn trống' : 'Đang có khách'),

    },
    {
      title: 'Trạng thái đặt phòng',
      render: (_: any, record: any) => {
        if (record.checked_out) return 'Đã rời đi';
        if (record.dueout === 'Due Out') return 'Chuẩn bị rời đi';
        if (record.stayover) return 'Ở lại';
        if (record.checked_in) return 'Đã đến';
        return 'Không đặt phòng';
      }
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
    try {
      const data = await getHouseKeepingStatus(criteria);
      if (data) {
        setRooms(data);
        message.success('Cập nhật danh sách thành công');
      }
    } catch (e: any) {
      message.success('Cập nhật danh sách lỗi: ' + e.message);
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
        <Form.Item name="room" label="Trạng thái phòng">
          <Checkbox.Group options={[
            { value: 'clean', label: 'Sạch' },
            { value: 'dirty', label: 'Bẩn' },
          ]} />
        </Form.Item>
        <Form.Item name="frontOffice" label="Lễ tân">
          <Checkbox.Group options={[
            { value: 'vacant', label: 'Bỏ trống' },
            { value: 'occupied', label: 'Có khách' },
          ]} />
        </Form.Item>
        <Form.Item name="reservation" label="Đặt phòng">
          <Checkbox.Group options={[
            { value: 'arrived', label: 'Đã đến' },
            { value: 'stayOver', label: 'Ở lại' },
            { value: 'dueOut', label: 'Chuẩn bị rời đi' },
            { value: 'departed', label: 'Đã rời đi' },
            { value: 'notReserved', label: 'Không đặt phòng' },
          ]} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Tìm kiếm
          </Button>
        </Form.Item>
      </Form>
      <Table dataSource={rooms as any} columns={columns} />
    </div>
  );
};

HouseKeepingPage.getLayout = (page: ReactElement) => (
  <LayoutWithSidebar>
    {page}
  </LayoutWithSidebar>
);

export default HouseKeepingPage;
