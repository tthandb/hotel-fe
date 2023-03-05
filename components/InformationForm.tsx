import { PatternFormat } from 'react-number-format';
import { Form, Input } from 'antd';
import React from 'react';

const InformationForm = () => {
  return (
    <div>
      <Form.Item
        name="lastname"
        label="Họ và tên đệm"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="firstname"
        label="Tên"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Số điện thoại"
        required
      >
        <PatternFormat
          customInput={Input}
          allowEmptyFormatting
          format="###-###-####"
          mask="_"
        />
      </Form.Item>
      <Form.Item
        name="email"
        label="E-mail"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="address"
        label="Địa chỉ (tên đường)"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="city"
        label="Thành phố"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="country"
        label="Quốc gia"
        required
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="room_comments"
        label="Ghi chú"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
    </div>
  );
};

export default InformationForm;
