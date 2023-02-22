import { PatternFormat } from 'react-number-format';
import { Form, Input } from 'antd';
import React from 'react';

const InformationForm = () => {
  return (
    <div>
      <Form.Item
        name="firstname"
        label="First name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="lastname"
        label="Last name"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="phone"
        label="Phone Number"
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
        label="Street"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="city"
        label="City"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="country"
        label="Country"
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="room_comments"
        label="Comments"
      >
        <Input.TextArea showCount maxLength={100} />
      </Form.Item>
    </div>
  );
};

export default InformationForm;
