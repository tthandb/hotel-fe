import { Col, DatePicker, Form, Input, Select } from 'antd';
import React, { useState } from 'react';

const { Option } = Select;

interface DataNodeType {
  value: string;
  label: string;
  children?: DataNodeType[];
}

const ReservationForm = ({ roomTypes }: any) => {
  const [rate, setRate] = useState([]);
  const [reservationSuccess, setReservationSuccess] = useState(false);
  const [newReservationId, setNewReservationId] = useState();

  return (
    <Col>
      <Form.Item name="dateRange" label="Date range">
        <DatePicker.RangePicker />
      </Form.Item>
      <Form.Item
        name="nights"
        label="Total nights"
        required
      >
        <Input readOnly disabled />
      </Form.Item>
      <Form.Item
        name="numRooms"
        label="Rooms"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="adults"
        label="Adults"
      >
        <Input type="number" />
      </Form.Item>
      <Form.Item
        name="roomtype"
        label="Room type"
      >
        <Select
          placeholder="Select a option and change input text above"
          allowClear
        >
          {roomTypes.map(({ room_type_id, type, rate }: any) => (
            <Option key={room_type_id} value={room_type_id}>
              {type} - {rate}
            </Option>
          ))}
        </Select>
      </Form.Item>
    </Col>
  );
};

export default ReservationForm;
