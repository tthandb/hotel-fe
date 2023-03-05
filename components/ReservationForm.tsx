import { Col, DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const { Option } = Select;

const ReservationForm = ({ roomTypes, form }: any) => {
  const [from, to] = form.getFieldValue('dateRange') || [];
  const [numOfNights, setNumOfNights] = useState(dayjs(to).diff(dayjs(from), 'day'));
  return (
    <Col>
      <Form.Item name="dateRange" label="Khoảng ngày" required>
        <DatePicker.RangePicker
          placeholder={['Ngày đến', 'Ngày đi']}
          onChange={(_, [from, to]) => setNumOfNights(dayjs(to).diff(dayjs(from), 'day'))}
        />
      </Form.Item>
      <Form.Item label="Số đêm">
        <Input value={numOfNights} readOnly disabled />
      </Form.Item>
      <Form.Item
        name="numRooms"
        label="Số lượng phòng"
        required
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        required
        name="adults"
        label="Số lượng người lớn"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="roomtype"
        label="Kiểu phòng"
        required
      >
        <Select
          allowClear
        >
          {roomTypes.map(({ room_type_id, type, rate }: any) => (
            <Option key={room_type_id} value={room_type_id}>
              {type} - {parseFloat(rate).toLocaleString('it-IT', {
              style: 'currency',
              currency: 'VND',
            })}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  );
};

export default ReservationForm;
